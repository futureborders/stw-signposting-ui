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

beforeEach(() => {
  jest.clearAllMocks();
  process.env.EXPORTS_ENABLED = 'false';
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe(`[GET] ${Route.goodsIntent}`, () => {
  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.goodsIntent}?tradeType=import`)
    .set('user-agent', 'node-superagent')
    .expect(200));

  it('It should respond with statusCode 302', () => request(app.getServer())
    .get(`${Route.goodsIntent}?tradeType=export`)
    .set('user-agent', 'node-superagent')
    .expect(302)
    .expect(
      'Location',
      'https://www.check-duties-customs-exporting-goods.service.gov.uk/selectdest',
    ));

  it('It should respond with statusCode 302 and show an error message', () => request(app.getServer())
    .get(`${Route.goodsIntent}`)
    .set('user-agent', 'node-superagent')
    .expect(302)
    .expect(
      'Location',
      '/type-of-trade?&error=Select%20if%20you%20want%20to%20import%20or%20export%20goods',
    ));

  it(`It should respond with statusCode 302 and redirect to ${Route.exportCheckYourAnswers}`, () => {
    process.env.EXPORTS_ENABLED = 'true';
    return request(app.getServer())
      .get(`${Route.goodsIntent}?tradeType=export&original=export`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.exportCheckYourAnswers}?tradeType=export&original=export`);
  });

  it(`It should respond with statusCode 302 and redirect to ${Route.exportGoodsIntent}`, () => {
    process.env.EXPORTS_ENABLED = 'true';
    return request(app.getServer())
      .get(`${Route.goodsIntent}?tradeType=export`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.exportGoodsIntent}?tradeType=export`);
  });
});
