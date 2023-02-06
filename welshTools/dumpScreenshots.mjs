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

import captureWebsite from 'capture-website';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const baseurl = 'http://localhost:3000';

const outputDir = `${path.dirname(fileURLToPath(import.meta.url))}/../translationOutput/screenshots`;

const language = 'en'; // Change to 'cy' for Welsh

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

const options = {
	width: 1024,
    height: 768,
    isJavaScriptEnabled: false,
    fullPage: true,
    type: 'jpeg',
    quality: 0.7,
    scaleFactor: 1,
    cookies: [
        {
            url: baseurl,
            name: 'stw_cookie_preferences',
            value: 'j:{"cookieGoogleAnalytics":false,"cookieRememberSettings":false}',
            expires: Math.round(new Date('3000-01-01').getTime() / 1000)
        },
        {
            url: baseurl,
            name: 'stw_language',
            value: language,
            expires: Math.round(new Date('3000-01-01').getTime() / 1000)
        }
    ],
    overwrite: true,
    modules: [`
        document.body.querySelectorAll('details').forEach(el => {
          if(el.open)
          {
            el.dataset.open = '1';
          }
          else
          {
            el.setAttribute('open', '');
          }
        });
    `]
};

const pages = [
    // Common pages
    ['page.typeOfTrade', '/type-of-trade'],
    ['page.cookies', '/cookies'],
    ['page.privacy', '/privacy-notice'],

    // Export pages
    ['page.exportGoodsIntent-export', '/export/goods-intent?tradeType=export'],
    ['page.exportGoodsArrivalDate-export', '/export/export-goods-arrival-date?tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness'],
    ['page.exportUserTypeTrader-export', '/export/what-are-you-responsible-for?tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness&tradeDateDay=19&tradeDateMonth=07&tradeDateYear=2023'],
    ['page.exportDeclarations-export', '/export/export-declarations?tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness&tradeDateDay=19&tradeDateMonth=07&tradeDateYear=2023&exportUserTypeTrader=goodsExportedToBeSold'],
    ['page.exportOriginCountry-export', '/export/export-origin-country?tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness&tradeDateDay=19&tradeDateMonth=07&tradeDateYear=2023&exportUserTypeTrader=goodsExportedToBeSold&exportDeclarations=yes'],
    ['page.exportCountryDestination-export', '/export/country-destination?tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness&tradeDateDay=19&tradeDateMonth=07&tradeDateYear=2023&exportUserTypeTrader=goodsExportedToBeSold&exportDeclarations=yes&originCountry=GB'],
    ['page.movingGoodsFromNorthernIrelandToAnEUCountry-export', '/export/moving-goods-from-northern-ireland-to-an-eu-country?tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness&tradeDateDay=19&tradeDateMonth=07&tradeDateYear=2023&exportUserTypeTrader=goodsExportedToBeSold&exportDeclarations=yes&originCountry=XI&destinationCountry=FR'],
    ['page.exportCommoditySearch-export', '/export/export-commodity-search?tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness&tradeDateDay=19&tradeDateMonth=07&tradeDateYear=2023&exportUserTypeTrader=goodsExportedToBeSold&exportDeclarations=yes&originCountry=GB&destinationCountry=CN'],
    ['page.searchResults-export', '/search?commodity=test&tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness&exportDeclarations=yes&destinationCountry=CN&originCountry=GB&tradeDateDay=19&tradeDateMonth=07&tradeDateYear=2023&exportUserTypeTrader=goodsExportedToBeSold'],
    ['page.searchResults2-export', '/search/9024000000/0?commodity=test&tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness&exportDeclarations=yes&destinationCountry=CN&originCountry=GB&tradeDateDay=19&tradeDateMonth=07&tradeDateYear=2023&exportUserTypeTrader=goodsExportedToBeSold&searchParent=test'],
    ['page.checkYourAnswers-export', '/check-your-answers?commodity=9024800000&tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness&exportDeclarations=yes&destinationCountry=CN&originCountry=GB&tradeDateDay=19&tradeDateMonth=07&tradeDateYear=2023&exportUserTypeTrader=goodsExportedToBeSold&searchParent=test'],
    ['page.taskList-export', '/task-list?commodity=9024800000&tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness&exportDeclarations=yes&destinationCountry=CN&originCountry=GB&tradeDateDay=19&tradeDateMonth=07&tradeDateYear=2023&exportUserTypeTrader=goodsExportedToBeSold&searchParent=test'],
    ['common.measures-export', '/export/export-check-licences-and-restrictions?commodity=4103900000&tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness&exportDeclarations=yes&destinationCountry=CN&originCountry=GB&tradeDateDay=19&tradeDateMonth=07&tradeDateYear=2023&exportUserTypeTrader=goodsExportedToBeSold&searchParent=test'],
    ['page.checkWhatServicesYouNeedToRegister-export', '/export/check-which-services-you-need-to-register?commodity=9024800000&tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness&exportDeclarations=yes&destinationCountry=CN&originCountry=GB&tradeDateDay=19&tradeDateMonth=07&tradeDateYear=2023&exportUserTypeTrader=goodsExportedToBeSold&searchParent=test'],
    ['page.checkInformationAndDocuments-export', '/export/check-information-and-documents?commodity=9024800000&tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness&exportDeclarations=yes&destinationCountry=CN&originCountry=GB&tradeDateDay=19&tradeDateMonth=07&tradeDateYear=2023&exportUserTypeTrader=goodsExportedToBeSold&searchParent=test'],
    ['page.checkDeclarations-export', '/export/export-check-declarations?commodity=9024800000&tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness&exportDeclarations=yes&destinationCountry=CN&originCountry=GB&tradeDateDay=19&tradeDateMonth=07&tradeDateYear=2023&exportUserTypeTrader=goodsExportedToBeSold&searchParent=test'],
    ['common.additionalCode-export', '/additional-code?commodity=9024800000&tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness&exportDeclarations=yes&destinationCountry=KP&originCountry=XI&tradeDateDay=19&tradeDateMonth=07&tradeDateYear=2023&exportUserTypeTrader=goodsExportedToBeSold'],
    ['page.exportProhibitionsAndRestrictions-export', '/export/prohibitions-and-restrictions?commodity=9024800000&tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness&exportDeclarations=yes&destinationCountry=KP&originCountry=XI&tradeDateDay=19&tradeDateMonth=07&tradeDateYear=2023&exportUserTypeTrader=goodsExportedToBeSold&additionalCode=4099'],

    // Import pages
    ['page.goodsIntent-import', '/goods-intent?tradeType=import'],
    ['page.identifyUserType-import', '/identify-user-type?goodsIntent=bringGoodsToSell&tradeType=import'],
    ['page.importDeclarations-import', '/import-declarations?userTypeTrader=true&tradeType=import&goodsIntent=bringGoodsToSell'],
    ['page.importCountryOrigin-import', '/import-country-origin?importDeclarations=yes&userTypeTrader=true&goodsIntent=bringGoodsToSell&tradeType=import'],
    ['page.destinationCountry-import', '/destination-country?originCountry=CN&userTypeTrader=true&goodsIntent=bringGoodsToSell&tradeType=import&importDeclarations=yes'],
    ['page.importDate-import', '/import-date?destinationCountry=GB&tradeType=import&goodsIntent=bringGoodsToSell&userTypeTrader=true&importDeclarations=yes&originCountry=CN'],
    ['page.importGoods-import', '/import-goods?importDateDay=23&importDateMonth=10&importDateYear=2022&tradeType=import&goodsIntent=bringGoodsToSell&userTypeTrader=true&importDeclarations=yes&destinationCountry=GB&originCountry=CN'],
    ['common.additionalCode-import', '/additional-code?commodity=4103900000&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=true&tradeType=import&destinationCountry=GB&importDeclarations=yes&importDateDay=23&importDateMonth=10&importDateYear=2022'],
    ['page.checkYourAnswers-import', '/check-your-answers?commodity=9024800000&originCountry=KP&goodsIntent=bringGoodsToSell&userTypeTrader=true&tradeType=import&destinationCountry=GB&importDeclarations=yes&importDateDay=23&importDateMonth=10&importDateYear=2022'],
    ['page.taskList-import', '/task-list?commodity=3907400025&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=true&tradeType=import&destinationCountry=GB&importDeclarations=yes&importDateDay=23&importDateMonth=10&importDateYear=2022&original=9024800000'],
    ['common.measures-import', '/import/check-licences-certificates-and-other-restrictions?commodity=3907400025&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=true&tradeType=import&destinationCountry=GB&importDeclarations=yes&importDateDay=23&importDateMonth=10&importDateYear=2022'],
    ['page.registerToBringGoodsAcrossTheBorder-import', '/import/check-which-services-you-need-to-register-with?commodity=3907400025&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=true&tradeType=import&destinationCountry=GB&importDeclarations=yes&importDateDay=23&importDateMonth=10&importDateYear=2022'],
    ['page.checkWhatServicesYouNeedToRegister-import', '/import/check-what-information-and-documents-you-may-need?commodity=3907400025&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=true&tradeType=import&destinationCountry=GB&importDeclarations=yes&importDateDay=23&importDateMonth=10&importDateYear=2022'],
    ['page.calculateCustomsDutyImportVat-import', '/import/calculate-the-customs-duty-and-import-vat?commodity=3907400025&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=true&tradeType=import&destinationCountry=GB&importDeclarations=yes&importDateDay=23&importDateMonth=10&importDateYear=2022'],
    ['page.checkDeclarations-import', '/import/check-which-declarations-you-need-to-submit?commodity=3907400025&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=true&tradeType=import&destinationCountry=GB&importDeclarations=yes&importDateDay=23&importDateMonth=10&importDateYear=2022'],
    ['page.prohibitions-import', '/import/prohibitions-and-restrictions?commodity=9024800000&originCountry=KP&goodsIntent=bringGoodsToSell&userTypeTrader=true&tradeType=import&destinationCountry=GB&importDeclarations=yes&importDateDay=23&importDateMonth=10&importDateYear=2022&original=3907400025'],
    ['page.northernIrelandAndEUTrading-import', '/northern-ireland-and-eu-trading?destinationCountry=XI&tradeType=import&goodsIntent=bringGoodsToSell&userTypeTrader=true&importDeclarations=yes&originCountry=FR'],
];

pages.reduce((p, element) =>
    p.then(() => {
        const [filename, url, extraOptions] = element;

        const thisOptions = {
            ...options,
            ...extraOptions
        }

        console.info(`Capturing ${filename}.png`)

        return captureWebsite.file(baseurl + url, `${outputDir}/${filename}-${language}.jpg`, thisOptions);
    }), Promise.resolve()
);
