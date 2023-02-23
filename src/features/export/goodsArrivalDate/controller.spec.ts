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
import App from '../../../app';
import 'dotenv/config';

import getCsrfToken from '../../../utils/getCsrfToken';
import { CsrfToken } from '../../../interfaces/helpers.interface';

import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';
import getTodaysDate from '../../../utils/tests/getTodaysDate';
import { removeParam } from '../../../utils/filters/removeParam';

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

let csrfResponse: CsrfToken;

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe(`[GET] ${Route.exportGoodsArrivalDate}`, () => {
  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.exportGoodsArrivalDate}`)
    .set('user-agent', 'node-superagent')
    .expect(200));
});

describe(`[POST] ${Route.exportGoodsArrivalDate}`, () => {
  it('It should respond with statusCode 302 when posted', async (done) => {
    await request(app.getServer())
      .get(`${Route.exportGoodsArrivalDate}?tradeType=export`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      tradeDateDay: getTodaysDate.day,
      tradeDateMonth: getTodaysDate.month,
      tradeDateYear: getTodaysDate.year,
      _csrf: csrfResponse.token,
    };

    const params = `tradeType=export&tradeDateDay=${data.tradeDateDay}&tradeDateMonth=${data.tradeDateMonth}&tradeDateYear=${data.tradeDateYear}`;

    await request(app.getServer())
      .post(`${Route.exportGoodsArrivalDate}?tradeType=export`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportUserTypeTrader}?${params}`);
  });

  it('It should respond with statusCode 302 and redirect back when date error', async (done) => {
    await request(app.getServer())
      .get(`${Route.exportGoodsArrivalDate}?tradeType=export`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      tradeDateDay: 'a',
      tradeDateMonth: getTodaysDate.month,
      tradeDateYear: getTodaysDate.year,
      _csrf: csrfResponse.token,
    };

    const params = `tradeType=export&tradeDateDay=${data.tradeDateDay}&tradeDateMonth=${data.tradeDateMonth}&tradeDateYear=${data.tradeDateYear}`;

    await request(app.getServer())
      .post(`${Route.exportGoodsArrivalDate}?tradeType=export`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportGoodsArrivalDate}?${params}`);
  });

  it(`It should respond with statusCode 302 and redirect to ${Route.exportCheckYourAnswers} when isEdit`, async (done) => {
    const params = `commodity=0301110000&tradeType=export&exportDeclarations=yes&destinationCountry=CN&originCountry=GB&tradeDateDay=${getTodaysDate.day}&tradeDateMonth=${getTodaysDate.month}&tradeDateYear=${getTodaysDate.year}&isEdit=true`;

    await request(app.getServer())
      .get(`${Route.exportGoodsArrivalDate}?${params}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      tradeDateDay: getTodaysDate.day,
      tradeDateMonth: getTodaysDate.month,
      tradeDateYear: getTodaysDate.year,
      isEdit: 'true',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportGoodsArrivalDate}?${params}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportCheckYourAnswers}?${removeParam(params, ['isEdit'])}`);
  });
});
