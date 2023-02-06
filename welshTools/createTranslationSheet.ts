/**
 * Copyright 2023 Crown Copyright (Single Trade Window)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as csv from 'csv/sync';
import * as fs from 'fs';
const xl: any = require('excel4node');

const outputDir = `${__dirname}/../translationOutput`;
const thisDir = __dirname;

const previousCsvFilename = `${thisDir}/latestTranslations.csv`;
const currentCsvFilename = `${outputDir}/current.csv`;
const outputXlsxFilename = `${outputDir}/translations.xlsx`;

interface TranslationRecord {
    key: string,
    en: string,
    cy: string,
    comment: string
}

function readCsv(inputFilename: string): TranslationRecord[] {
    if(!fs.existsSync(inputFilename)) {
        throw Error(`Could not find csv file ${inputFilename}... Aborting.`);
    }

    console.info(`Importing translations from CSV file ${inputFilename}`);

    const csvContent = fs.readFileSync(inputFilename);

    return csv.parse(csvContent, {
        bom: true,
        columns: () => [
            'key',
            'en',
            'cy',
            'comment',
        ]
    });
}

const previousCsv = readCsv(previousCsvFilename);
const previousCsvMap = new Map(previousCsv.map(record => [record.key, record]));

const currentCsv = readCsv(currentCsvFilename);

const stats = {
    new: 0,
    updated: 0,
}

const outputCsv = currentCsv.map(currentRecord => {
    const previousRecord = previousCsvMap.get(currentRecord.key);

    let comment = "";

    if(!currentRecord.cy) {
        if(previousRecord?.cy) {
            console.warn(`previous.csv has translation for '${currentRecord.key}' but current.csv doesn't. Did you forget to import the translations?`);
        }
        comment = 'No Welsh translation found';

        stats.new++;
    } else if(currentRecord.en.trim() === previousRecord?.en.trim()) {
        if(previousRecord && previousRecord?.cy !== currentRecord.cy) {
            console.warn(`Welsh translation for '${currentRecord.key}' has changed but English text hasn't.`);
            console.warn(`Previous translation: "${previousRecord.cy}"`);
            console.warn(`Current translation: "${currentRecord.cy}"`);
        }
        comment = 'English message unchanged';
    } else if(!previousRecord) {
        comment = `New message with existing Welsh translation`;
    } else {
        comment = `Message changed (previous message was: ${previousRecord?.en} / ${previousRecord?.cy})`;
        stats.updated++;
    }

    return {
        key: currentRecord.key,
        en: currentRecord.en,
        cy: currentRecord.cy,
        comment,
    }
});

/*
const outputCsvString = csv.stringify(outputCsv, {
    bom: true,
    header: true,
    columns: {
        key: 'Key',
        en: 'English',
        cy: 'Welsh',
        comment: 'Comments'
    }
});

fs.writeFileSync(outputCsvFilename, outputCsvString);
*/

// Create a new instance of a Workbook class
var wb = new xl.Workbook();

// Add Worksheets to the workbook
var ws = wb.addWorksheet('Translations');

ws.column(1).setWidth(50);
ws.column(2).setWidth(75);
ws.column(3).setWidth(75);
ws.column(4).setWidth(75);

ws.cell(1, 1).string('Key').style({ font: { bold: true }, alignment: { wrapText: true } });
ws.cell(1, 2).string('English').style({ font: { bold: true }, alignment: { wrapText: true } });
ws.cell(1, 3).string('Welsh').style({ font: { bold: true }, alignment: { wrapText: true } });
ws.cell(1, 4).string('Comments').style({ font: { bold: true }, alignment: { wrapText: true } });

for(let i = 0; i < outputCsv.length; ++i) {
    const record = outputCsv[i];
    ws.cell(i + 2, 1).string(record.key).style({alignment: { wrapText: true } });
    ws.cell(i + 2, 2).string(record.en).style({alignment: { wrapText: true } });
    ws.cell(i + 2, 3).string(record.cy).style({alignment: { wrapText: true } });
    ws.cell(i + 2, 4).string(record.comment).style({alignment: { wrapText: true } });
}

wb.write(outputXlsxFilename);

console.info(`🏴󠁧󠁢󠁷󠁬󠁳󠁿 There are ${stats.new} new entries, and ${stats.updated} updated entries`);

console.info(`🏴󠁧󠁢󠁷󠁬󠁳󠁿 Writing Excel file to '${outputXlsxFilename}'`);

if(stats.new > 0 || stats.updated > 0) {
    console.info(`🏴󠁧󠁢󠁷󠁬󠁳󠁿 This should be now sent to the HMRC Welsh Unit for translation.`);
} else {
    console.info(`🏴󠁧󠁢󠁷󠁬󠁳󠁿 There are no translations required.`);
}
