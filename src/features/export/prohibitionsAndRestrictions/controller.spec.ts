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

import * as request from 'supertest';
import { AxiosResponse } from 'axios';
import App from '../../../app';
import 'dotenv/config';
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';

import { mockedRestrictiveMeasuresWithProhibitions } from './mockedData';

import { ExportsParams } from '../../../interfaces/exports.interface';
import { getParams } from '../../../utils/queryHelper';
import getTodaysDate from '../../../utils/tests/getTodaysDate';

jest.mock('../../../services/TradeTariffApi.service');
jest.mock('../../../services/StwTradeTariffApi.service');

const MockedTradeTariffApi = <jest.Mock<TradeTariffApi>>TradeTariffApi;
const mockedTradeTariffApi = <jest.Mocked<TradeTariffApi>>(
  new MockedTradeTariffApi()
);

const MockedStwTradeTariffApi = <jest.Mock<StwTradeTariffApi>>StwTradeTariffApi;
const mockedStwTradeTariffApi = <jest.Mocked<StwTradeTariffApi>>(
  new MockedStwTradeTariffApi()
);

jest.mock('../../../middlewares/auth-middleware', () => jest.fn((req, res, next) => next()));

const indexRoute = new IndexRoute(
  mockedTradeTariffApi,
  mockedStwTradeTariffApi,
);
const app = new App([indexRoute]);

let params:ExportsParams = {};

beforeEach(() => {
  jest.clearAllMocks();
  params = {
    tradeType: 'export',
    tradeDateDay: getTodaysDate.day,
    tradeDateMonth: getTodaysDate.month,
    tradeDateYear: getTodaysDate.year,
    originCountry: 'GB',
    exportDeclarations: 'yes',
    destinationCountry: 'KP',
    commodity: '7102100000',
    checkRestrictions: 'true',
    exportGoodsIntent: 'goodsExportedToBeSoldForBusiness',
  };
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe(`[GET] ${Route.exportProhibitionsAndRestrictions}`, () => {
  it('It should return status 200 and show correct prohibition text', async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      ...mockedRestrictiveMeasuresWithProhibitions,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.exportProhibitionsAndRestrictions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Exporting goods to North Korea: what you need to do'));
        expect(res.text).toEqual(expect.stringContaining('Read the North Korea sanctions guidance (opens in new tab)'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should return status 500', async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      data: {},
      status: 500,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockRejectedValue(
      axiosTradeDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.exportProhibitionsAndRestrictions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(500);
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });
});
