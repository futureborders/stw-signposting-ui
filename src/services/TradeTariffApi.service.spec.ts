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

import axios, { AxiosResponse } from 'axios';
import TradeTariffApi from './TradeTariffApi.service';

import { mockedSearchDataChapter, mockedSearchDataSearchByType } from '../utils/mockedSearchData';

const tradeTariffApi = new TradeTariffApi();

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Testing TradeTariffApi', () => {
  describe('searchTradeTariff', () => {
    test('search apples', async () => {
      const axiosTradeDataResponse: AxiosResponse = {
        ...mockedSearchDataChapter,
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
      };
      mockedAxios.get.mockResolvedValue(axiosTradeDataResponse);
      const response = await tradeTariffApi.searchTradeTariff('apples');
      expect(response).toEqual(mockedSearchDataChapter.data);
      expect(mockedAxios.get).toHaveBeenCalled();
    });
  });

  describe('searchTradeTariffByType', () => {
    test('search /api/v2/chapters/08', async () => {
      const axiosTradeDataResponse: AxiosResponse = {
        ...mockedSearchDataSearchByType,
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
      };
      mockedAxios.get.mockResolvedValue(axiosTradeDataResponse);
      const response = await tradeTariffApi.searchTradeTariffByType(
        'chapters',
        mockedSearchDataSearchByType.data.included[0].attributes.goods_nomenclature_item_id,
        '',
      );
      expect(response.data).toEqual(mockedSearchDataSearchByType.data);
      expect(mockedAxios.get).toHaveBeenCalled();
    });

    test('search /api/v2/headings/8160', async () => {
      const axiosTradeDataResponse: AxiosResponse = {
        ...mockedSearchDataSearchByType,
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
      };
      mockedAxios.get.mockResolvedValue(axiosTradeDataResponse);
      const response = await tradeTariffApi.searchTradeTariffByType(
        'headings',
        mockedSearchDataSearchByType.data.included[1].attributes.goods_nomenclature_item_id,
        '',
      );
      expect(response.data).toEqual(mockedSearchDataSearchByType.data);
      expect(mockedAxios.get).toHaveBeenCalled();
    });
  });
});
