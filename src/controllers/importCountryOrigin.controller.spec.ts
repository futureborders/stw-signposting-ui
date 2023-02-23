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
import 'dotenv/config';
import StwTradeTariffApi from '../services/StwTradeTariffApi.service';
import TradeTariffApi from '../services/TradeTariffApi.service';
import { Route } from '../interfaces/routes.interface';
import IndexRoute from '../routes/index.route';
import { Params } from '../interfaces/params.interface';
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

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

let params:Params = {};

beforeEach(() => {
  jest.clearAllMocks();
  params = {
    userTypeTrader: 'true',
    tradeType: 'import',
    goodsIntent: 'bringGoodsToSell',
    importDeclarations: 'yes',
  };
});

describe(`[GET] ${Route.importCountryOrigin}`, () => {
  it('It should respond with statusCode 302 and redirect to /import-declarations with errors', async () => {
    params.importDeclarations = '';

    await request(app.getServer())
      .get(`${Route.importCountryOrigin}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importDeclarations}${getParams(params)}&error=${encodeURIComponent(translation.page.importDeclarations.error)}`,
      );
  });

  it('It should return status 200 and a selected country', async () => {
    params.originCountry = 'CN';

    await request(app.getServer())
      .get(
        `${Route.importCountryOrigin}${getParams(params)}`,
      )
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('<option value="CN" selected>China</option>'));
      });
  });

  it('It should return status 200 and should have the correct back link when userTypeTrader = false', async () => {
    params.originCountry = 'XX';
    params.userTypeTrader = 'false';

    await request(app.getServer())
      .get(
        `${Route.importCountryOrigin}${getParams(params)}`,
      )
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining(`<a href="${Route.identifyUserType}`));
      });
  });

  it('It should return status 200 and should have the correct back link when userTypeTrader = true', async () => {
    params.originCountry = 'XX';

    await request(app.getServer())
      .get(
        `${Route.importCountryOrigin}${getParams(params)}`,
      )
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining(`<a href="${Route.importDeclarations}`));
      });
  });

  it('It should return status 200', async () => {
    await request(app.getServer())
      .get(
        `${Route.importCountryOrigin}${getParams(params)}`,
      )
      .set('user-agent', 'node-superagent')
      .expect(200);
  });

  it('It should return status 200 when editing originCountry', async () => {
    params.isEdit = 'true';

    await request(app.getServer())
      .get(
        `${Route.importCountryOrigin}${getParams(params)}`,
      )
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining(`<a href="${Route.manageThisTrade.substring(1)}`));
      });
  });
});
