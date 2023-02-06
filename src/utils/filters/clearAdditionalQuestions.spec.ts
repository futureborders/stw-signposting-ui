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

import { clearAdditionalQuestions } from './clearAdditionalQuestions';

describe('Testing clear additional Questions params', () => {
  test('It should return same params if no questions passed', () => {
    const params = 'commodity=0208907000&originCountry=AQ&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB';
    const searchParams = new URLSearchParams(params);
    const result = clearAdditionalQuestions(params, []);

    expect(result).toEqual(searchParams);
  });

  test('It should remove the param on the question array', () => {
    const params = '710=yes&commodity=0208907000&originCountry=AQ&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB';
    const expectedParams = 'commodity=0208907000&originCountry=AQ&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB';

    const expectedSearchParams = new URLSearchParams(expectedParams);
    const result = clearAdditionalQuestions(params, ['710']);

    expect(result).toEqual(expectedSearchParams);
  });

  test('It should remove multiple param on the question array', () => {
    const params = '710=yes&commodity=0208907000&originCountry=AQ&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB';
    const expectedParams = 'originCountry=AQ&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB';

    const expectedSearchParams = new URLSearchParams(expectedParams);
    const result = clearAdditionalQuestions(params, ['710', 'commodity']);

    expect(result).toEqual(expectedSearchParams);
  });
});
