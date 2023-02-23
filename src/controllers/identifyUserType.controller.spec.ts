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
import * as sessionHelpers from '../utils/sessionHelpers';
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

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe(`[GET] ${Route.identifyUserType}`, () => {
  beforeEach(() => {
    jest.resetModules();
    jest
      .spyOn(sessionHelpers, 'getSessionCurrentPath')
      .mockImplementationOnce(() => '/');
  });

  it('responds with statusCode  when goods intent is bring goods to sell', async () => {
    await request(app.getServer())
      .get(
        `${Route.identifyUserType}?tradeType=import&goodsIntent=bringGoodsToSell`,
      )
      .set('user-agent', 'node-superagent')
      .expect(200);
  });

  it('It should respond with statusCode 302', () => request(app.getServer())
    .get(
      `${Route.identifyUserType}?tradeType=import&goodsIntent=bringGoodsThroughPost`,
    )
    .set('user-agent', 'node-superagent')
    .expect(302)
    .expect(
      'Location',
      'https://www.gov.uk/goods-sent-from-abroad?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5',
    ));

  it('It should respond with statusCode 302', () => request(app.getServer())
    .get(
      `${Route.identifyUserType}?tradeType=import&goodsIntent=bringGoodsInLuggage`,
    )
    .set('user-agent', 'node-superagent')
    .expect(302)
    .expect(
      'Location',
      'https://www.gov.uk/duty-free-goods?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5',
    ));

  it('It should respond with statusCode 302', () => request(app.getServer())
    .get(
      `${Route.identifyUserType}?tradeType=import&goodsIntent=bringGoodsInLuggageForBusiness`,
    )
    .set('user-agent', 'node-superagent')
    .expect(302)
    .expect(
      'Location',
      'https://www.gov.uk/guidance/bringing-commercial-goods-into-great-britainin-your-baggage',
    ));

  it('It should respond with statusCode 302', () => request(app.getServer())
    .get(
      `${Route.identifyUserType}?tradeType=import&goodsIntent=bringGoodsTemporarily`,
    )
    .set('user-agent', 'node-superagent')
    .expect(302)
    .expect(
      'Location',
      'https://www.gov.uk/guidance/apply-to-import-goods-temporarily-to-the-uk-or-eu',
    ));

  it('It should respond with statusCode 302', () => request(app.getServer())
    .get(
      `${Route.identifyUserType}?tradeType=import&goodsIntent=movingToUkWithBelongings`,
    )
    .set('user-agent', 'node-superagent')
    .expect(302)
    .expect(
      'Location',
      'https://www.gov.uk/moving-to-uk?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5',
    ));

  it('It should respond with statusCode 302 and show an error message', () => request(app.getServer())
    .get(`${Route.identifyUserType}?tradeType=import`)
    .set('user-agent', 'node-superagent')
    .expect(302)
    .expect(
      'Location',
      '/goods-intent?tradeType=import&error=Select%20what%20you%20are%20doing%20with%20the%20goods',
    ));
});
