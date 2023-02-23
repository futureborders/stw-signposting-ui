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
import { Route } from '../interfaces/routes.interface';
import IndexRoute from '../routes/index.route';
import App from '../app';
import 'dotenv/config';
import { Params } from '../interfaces/params.interface';
import { getParams } from '../utils/queryHelper';
import translation from '../translation/en';

import StwTradeTariffApi from '../services/StwTradeTariffApi.service';
import TradeTariffApi from '../services/TradeTariffApi.service';

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
    originCountry: 'CN',
    userTypeTrader: 'true',
    goodsIntent: 'bringGoodsToSell',
    tradeType: 'import',
    importDeclarations: 'yes',
  };
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe(`[GET] ${Route.destinationCountry}`, () => {
  it('It should respond with statusCode 302 and redirect to /import-country-origin with errors', async () => {
    params.originCountry = '';

    await request(app.getServer())
      .get(
        `${Route.destinationCountry}${getParams(params)}`,
      )
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importCountryOrigin}${getParams(params)}&error=${encodeURIComponent(translation.page.importCountryOrigin.error)}`,
      );
  });

  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.destinationCountry}${getParams(params)}`)
    .set('user-agent', 'node-superagent')
    .expect(200));

  it('It should respond with statusCode 200 and show the correct text for GB into XI', async () => {
    params.originCountry = 'GB';

    await request(app.getServer())
      .get(
        `${Route.destinationCountry}${getParams(params)}`,
      )
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => expect(res.text).toEqual(
        expect.stringContaining(translation.page.destinationCountry.assumedText(translation.page.destinationCountry.gb, translation.page.destinationCountry.xi)),
      ));
  });

  it('It should respond with statusCode 200 and show the correct text for XI into GB', async () => {
    params.originCountry = 'XI';

    await request(app.getServer())
      .get(
        `${Route.destinationCountry}${getParams(params)}`,
      )
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => expect(res.text).toEqual(
        expect.stringContaining(translation.page.destinationCountry.assumedText(translation.page.destinationCountry.xi, translation.page.destinationCountry.gb)),
      ));
  });

  it('It should respond with statusCode 200 when editing destinationCountry', async () => {
    params.isEdit = 'true';

    await request(app.getServer())
      .get(
        `${Route.destinationCountry}${getParams(params)}`,
      )
      .set('user-agent', 'node-superagent')
      .expect(200);
  });

  it('It should respond with statusCode 302 to /manage-this-trade after editing destinationCountry', async () => {
    params.isEdit = 'true';
    params.original = 'CN';

    await request(app.getServer())
      .get(
        `${Route.destinationCountry}${getParams(params)}`,
      )
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.manageThisTrade}${getParams(params).replace(/&isEdit=true/g, '')}`,
      );
  });
});
