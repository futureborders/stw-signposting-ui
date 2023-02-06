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

import * as request from 'supertest';
import App from '../../../app';
import 'dotenv/config';

import getCsrfToken from '../../../utils/getCsrfToken';
import { CsrfToken } from '../../../interfaces/helpers.interface';

import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';

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

describe(`[GET] ${Route.exportCountryDestination}`, () => {
  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.exportCountryDestination}`)
    .set('user-agent', 'node-superagent')
    .expect(200));
});

describe(`[POST] ${Route.exportCountryDestination}`, () => {
  it('It should respond with statusCode 302 when posted', async (done) => {
    await request(app.getServer())
      .get(`${Route.exportCountryDestination}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      exportDeclarations: 'yes',
      tradeType: 'export',
      destinationCountry: 'BE',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportCountryDestination}?tradeType=export&exportDeclarations=yes&originCountry=GB&checkWhatServicesYouNeedToRegister=true`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportCommoditySearch}?tradeType=export&exportDeclarations=yes&originCountry=GB&checkWhatServicesYouNeedToRegister=true&destinationCountry=BE`);
  });

  it('It should respond with statusCode 302 when posted (Northern Ireland to outside EU)', async (done) => {
    await request(app.getServer())
      .get(`${Route.exportCountryDestination}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      exportDeclarations: 'yes',
      tradeType: 'export',
      destinationCountry: 'BR',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportCountryDestination}?tradeType=export&exportDeclarations=yes&originCountry=XI&checkWhatServicesYouNeedToRegister=true`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportCommoditySearch}?tradeType=export&exportDeclarations=yes&originCountry=XI&checkWhatServicesYouNeedToRegister=true&destinationCountry=BR`);
  });

  it('It should respond with statusCode 302 when posted (Northern Ireland to EU)', async (done) => {
    await request(app.getServer())
      .get(`${Route.exportCountryDestination}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      exportDeclarations: 'yes',
      tradeType: 'export',
      destinationCountry: 'FR',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportCountryDestination}?tradeType=export&exportDeclarations=yes&originCountry=XI&checkWhatServicesYouNeedToRegister=true`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportMovingGoodsFromNorthernIrelandToAnEUCountry}?tradeType=export&exportDeclarations=yes&originCountry=XI&checkWhatServicesYouNeedToRegister=true&destinationCountry=FR`);
  });

  it('It should respond with statusCode 302 and redirect back when empty post', async (done) => {
    await request(app.getServer())
      .get(`${Route.exportCountryDestination}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      exportDeclarations: 'yes',
      tradeType: 'export',
      destinationCountry: '',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportCountryDestination}?tradeType=export&exportDeclarations=yes&originCountry=GB&checkWhatServicesYouNeedToRegister=true`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportCountryDestination}?tradeType=export&exportDeclarations=yes&originCountry=GB&checkWhatServicesYouNeedToRegister=true`);
  });

  it(`It should respond with statusCode 302 and redirect to ${Route.checkYourAnswers} when isEdit`, async (done) => {
    await request(app.getServer())
      .get(`${Route.exportCountryDestination}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      exportDeclarations: 'true',
      tradeType: 'export',
      destinationCountry: 'CN',
      isEdit: 'true',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportCountryDestination}?tradeType=export&exportDeclarations=yes&originCountry=GB&destinationCountry=BR&checkWhatServicesYouNeedToRegister=true`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.checkYourAnswers}?tradeType=export&exportDeclarations=yes&originCountry=GB&destinationCountry=CN&checkWhatServicesYouNeedToRegister=true`);
  });
});
