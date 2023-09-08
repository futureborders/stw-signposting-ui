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

import { checkYourAnswersRows } from './model';
import {
  mockedCheckYourAnswersRowsExports,
  mockedResponseExports,
  mockedCheckYourAnswersRowsImports,
  mockedResponseImports,
  mockedCommodityData,
} from './mockedData';

afterAll(async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('checkYourAnswersRows', () => {
  test('It should return the correct rows for exports check your answers', () => {
    const req:any = {
      query: {
        commodity: '0301110000',
        tradeType: 'export',
        exportGoodsIntent: 'goodsExportedToBeSoldForBusiness',
        originCountry: 'GB',
        exportUserTypeTrader: 'NE',
        exportDeclarations: 'yes',
        destinationCountry: 'CN',
        exportResponsibleForDeclaringGoods: 'yes',
        tradeDateDay: '01',
        tradeDateMonth: '12',
        tradeDateYear: '2022',
      },
    };
    const res: any = mockedResponseExports(req);
    const result = checkYourAnswersRows(req, res, mockedCommodityData);
    expect(result).toEqual(mockedCheckYourAnswersRowsExports);
  });

  test('It should return the correct rows for imports check your answers', () => {
    const req:any = {
      query: {
        commodity: '0301110000',
        tradeType: 'import',
        goodsIntent: 'bringGoodsToSell',
        importDeclarations: 'yes',
        originCountry: 'CN',
        userTypeTrader: 'yes',
        declarations: 'yes',
        destinationCountry: 'GB',
        importDateDay: '01',
        importDateMonth: '12',
        importDateYear: '2022',
        additionalCode: '1234',
      },
    };
    const res: any = mockedResponseImports(req);
    const result = checkYourAnswersRows(req, res, mockedCommodityData);
    expect(result).toEqual(mockedCheckYourAnswersRowsImports);
  });
});
