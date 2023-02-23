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
import App from '../app';
import { Route } from '../interfaces/routes.interface';
import { Params } from '../interfaces/params.interface';
import IndexRoute from '../routes/index.route';
import StwTradeTariffApi from '../services/StwTradeTariffApi.service';
import TradeTariffApi from '../services/TradeTariffApi.service';
import { getParams } from '../utils/queryHelper';
import translation from '../translation/en';

jest.mock('../services/TradeTariffApi.service');
jest.mock('../services/StwTradeTariffApi.service');

const MockedTradeTariffApi = <jest.Mock<TradeTariffApi>>TradeTariffApi;
const mockedTradeTariffApi = <jest.Mocked<TradeTariffApi>>(
  new MockedTradeTariffApi()
);

const MockedStwTradeTariffApi = <jest.Mock<StwTradeTariffApi>>StwTradeTariffApi;
const mockedStwTradeTariffApi = <jest.Mocked<StwTradeTariffApi>>(
  new MockedStwTradeTariffApi()
);

jest.mock('../middlewares/auth-middleware', () => jest.fn((req, res, next) => next()));
const indexRoute = new IndexRoute(
  mockedTradeTariffApi,
  mockedStwTradeTariffApi,
);

const app = new App([indexRoute]);

let params:Params = {};

beforeEach(() => {
  jest.clearAllMocks();
  params = {
    commodity: '',
    tradeType: 'import',
    goodsIntent: 'bringGoodsToSell',
    importDeclarations: 'yes',
    userTypeTrader: 'true',
    destinationCountry: 'GB',
    originCountry: 'CN',
    importDateDay: '',
    importDateMonth: '',
    importDateYear: '',
    additionalCode: '',
  };
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe('Controller: importDate', () => {
  it('It should respond with statusCode 200 and render /import-date EU into GB', async () => {
    params.destinationCountry = 'GB';
    params.originCountry = 'FR';

    await request(app.getServer())
      .get(`${Route.importDate}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200);
  });

  it('It should respond with statusCode 200 and render /import-date ROW into GB', async () => {
    await request(app.getServer())
      .get(`${Route.importDate}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200);
  });

  it('It should respond with statusCode 200 and render /import-date ROW into XI', async () => {
    params.destinationCountry = 'XI';
    await request(app.getServer())
      .get(`${Route.importDate}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200);
  });

  it('It should respond with statusCode 302 redirect to /destination-country with errors', () => {
    params.destinationCountry = '';
    return request(app.getServer())
      .get(`${Route.importDate}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.destinationCountry}${getParams(params)}&error=${encodeURIComponent(translation.page.destinationCountry.error)}`,
      );
  });

  it('It should respond with statusCode 302 redirect to /northern-ireland-and-eu-trading when importing into XI from EU', () => {
    params.originCountry = 'FR';
    params.destinationCountry = 'XI';
    return request(app.getServer())
      .get(`${Route.importDate}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.northernIrelandAndEUTrading}${getParams(params)}`);
  });

  it('It should respond with statusCode 302 and redirect to /manage-this-trade on a date change', async () => {
    params.isEdit = 'true';
    params.originalImportDateDay = '1';

    await request(app.getServer())
      .get(`${Route.importDate}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.manageThisTrade}${getParams(params).replace(/&isEdit=true/g, '')}`,
      );
  });

  it('It should respond with statusCode 302 and redirect to /manage-this-trade when originCountry changed', async () => {
    params.isEdit = 'true';
    params.original = 'GB';

    await request(app.getServer())
      .get(`${Route.importDate}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.manageThisTrade}${getParams(params).replace(/&isEdit=true/g, '')}`,
      );
  });
});
