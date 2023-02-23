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

import { checkYourAnswersRows } from './model';
import { mockedCheckYourAnswersRows, mockedResponse, mockedCommodityData } from './mockedData';

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

afterEach(() => {
  jest.resetAllMocks();
});

const req:any = {
  query: {
    commodity: '0301110000',
    tradeType: 'export',
    exportGoodsIntent: 'bringGoodsToSellForBusiness',
    originCountry: 'GB',
    exportUserTypeTrader: 'NE',
    exportDeclarations: 'yes',
    destinationCountry: 'CN',
    tradeDateDay: '01',
    tradeDateMonth: '12',
    tradeDateYear: '2022',
  },
};

const res: any = mockedResponse(req);

describe('checkYourAnswersRows', () => {
  test('It should return the correct rows', () => {
    const result = checkYourAnswersRows(req, res, mockedCommodityData);
    expect(result).toEqual(mockedCheckYourAnswersRows);
  });
});
