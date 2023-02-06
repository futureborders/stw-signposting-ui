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

import * as en from '../src/translation/en';
import * as cy from '../src/translation/cy';
import * as csv from 'csv';
import * as fs from 'fs';
import { getCountryNameByCode } from '../src/utils/filters/getCountryNameByCode';

const outputDir = `${__dirname}/../translationOutput`;

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

interface TranslationRecord {
    key: string,
    en: string,
    cy: string
}

const excludedKeys = [
    'page.startPage',
    'common.footer.toggle',
];

const urlRegex = /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/ig;

const outputFilename = `${outputDir}/current.csv`;

console.info('---------');
console.info('🏴󠁧󠁢󠁷󠁬󠁳󠁿 STW-GS Signposting UI Welsh Translation Tool 🏴󠁧󠁢󠁷󠁬󠁳󠁿');
console.info('---------');

const records = Array<TranslationRecord>();

function handleFunction(prefix: string, englishFunc: Function, welshFunc: Function) {
    const getFuncBody = (func: Function): string => {
        if(!func) {
            return '';
        }

        const match = /^[^`]*`(.*)`$/s.exec(func.toString());

        if(!match) {
            console.error(`Couldn't parse function for '${prefix}' : ${func.toString()}`);
            return '';
        }

        return match[1];
    }

    const englishBody = getFuncBody(englishFunc)
    const welshBody = getFuncBody(welshFunc)

    records.push({
        key: prefix,
        en: englishBody,
        cy: welshBody
    });
}

function handleString(prefix: string, english: string, welsh: string) {
    if(urlRegex.test(english)) {
        console.info(`${prefix} contains only a url - skipping`);
        return;
    }

    records.push({
        key: prefix,
        en: english,
        cy: welsh ? welsh : ''
    });
}

const processSection = (prefix: string, englishSection: any, welshSection: any) => {
    for (const key in englishSection) {
        if (Object.hasOwnProperty.call(englishSection, key)) {
            const newPrefix = `${prefix}${prefix && '.'}${key}`;

            const element = englishSection[key];
            const rawWelshElement = welshSection ? welshSection[key] : undefined;

            let welsh: any = rawWelshElement;

            if(rawWelshElement && rawWelshElement.toString && rawWelshElement.toString().includes('(Welsh)')) {
                console.info(`Ignoring Welsh placeholder content for key ${newPrefix}`);
                welsh = undefined;
            }

            if(excludedKeys.includes(newPrefix)) {
                console.info(`Skipping excluded key ${newPrefix}`);
                continue;
            }

            if(!welsh) {
                console.info(`Welsh language key missing: ${newPrefix}`);
            }

            switch(typeof element) {
                case 'object':
                    processSection(newPrefix, element, welsh);
                    break;

                case 'function':
                    handleFunction(newPrefix, element, welsh);
                    break;

                case 'string':
                    handleString(newPrefix, element, welsh);
                    break;

                default:
                    console.error(`Unknown type for key ${prefix} : ${typeof element}`);
            }
        }
    }
}



console.info('🏴󠁧󠁢󠁷󠁬󠁳󠁿 Processing translation file');
console.info('---------');
processSection('', en.default, cy.default);
console.info('---------');

console.info(`🏴󠁧󠁢󠁷󠁬󠁳󠁿 Writing CSV to '${outputFilename}'`);

csv.stringify(records, {
    bom: true,
    header: true,
    columns: {
        key: 'Key',
        en: 'English',
        cy: 'Welsh',
        comment: 'Comments'
    }
}, (err: any, result: any) => {
    fs.writeFileSync(outputFilename, result);
});

console.info('🏴󠁧󠁢󠁷󠁬󠁳󠁿 Done');
console.info('---------');
