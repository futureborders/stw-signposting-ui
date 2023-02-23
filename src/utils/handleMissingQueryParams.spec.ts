/**
 * Copyright 2021 Crown Copyright (Single Trade Window)
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

import { Route } from '../interfaces/routes.interface';
import { handleMissingQueryParams } from './handleMissingQueryParams';

const req: any = {
  route: {
    path: '/some-path',
  },
  query: {
    commodity: '12345678910',
    originCountry: 'CN',
    goodsIntent: 'bringGoodsToSell',
    userTypeTrader: 'true',
    tradeType: 'import',
    destinationCountry: 'GB',
    importDeclarations: 'yes',
    importDateDay: '01',
    importDateMonth: '01',
    importDateYear: '2022',
    exportGoodsIntent: 'goodsExportedToBeSoldForBusiness',
  },
};

const testParam = (
  path: string,
  missingParam: string,
  tradeType: string,
) => {
  test(`It should return true when missing ${missingParam} for ${path} for ${tradeType}`, () => {
    req.route.path = path;
    req.query.tradeType = tradeType;
    delete req.query[missingParam];
    expect(handleMissingQueryParams(req)).toBe(true);
  });
};

describe('Testing handleMissingQueryParams', () => {
  Object.keys(req.query).forEach((key: any) => {
    testParam(`${Route.search}`, key, 'import');
    testParam(`${Route.manageThisTrade}`, key, 'import');
    testParam(`${Route.additionalCode}`, key, 'import');
    testParam(`${Route.importAdditionalQuestions}`, key, 'import');

    testParam(`${Route.exportCheckLicencesAndRestrictions}`, key, 'export');
    testParam(`${Route.exportTaskList}`, key, 'export');
    testParam(`${Route.exportCheckYourAnswers}`, key, 'export');
  });
});
