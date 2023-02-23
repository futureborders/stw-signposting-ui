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
import { ExportGoodsIntent } from '../../../interfaces/enums.interface';

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

describe(`[GET] ${Route.exportGoodsIntent}`, () => {
  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.exportGoodsIntent}`)
    .set('user-agent', 'node-superagent')
    .expect(200));
});

describe(`[POST] ${Route.exportGoodsIntent}`, () => {
  it('It should respond with statusCode 302 when posted with `The goods are being exported to be sold, processed or used by a business`', async (done) => {
    await request(app.getServer())
      .get(`${Route.exportGoodsIntent}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      exportGoodsIntent: ExportGoodsIntent.goodsExportedToBeSoldForBusiness,
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportGoodsIntent}?tradeType=export`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportGoodsArrivalDate}?tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness`);
  });

  it('It should respond with statusCode 302 when posted with `Bring goods temporarily for business`', async (done) => {
    await request(app.getServer())
      .get(`${Route.exportGoodsIntent}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      exportGoodsIntent: ExportGoodsIntent.goodsExportedTemporarilyForBusiness,
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportGoodsIntent}?tradeType=export`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', 'https://www.gov.uk/taking-goods-out-uk-temporarily?step-by-step-nav=b9347000-c726-4c3c-b76a-e52b6cebb3eb');
  });

  it('It should respond with statusCode 302 when posted with `Bring goods to sell for personal`', async (done) => {
    await request(app.getServer())
      .get(`${Route.exportGoodsIntent}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      exportGoodsIntent: ExportGoodsIntent.goodsSoldInLuggageForBusiness,
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportGoodsIntent}?tradeType=export`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', 'https://www.gov.uk/take-goods-sell-abroad?step-by-step-nav=b9347000-c726-4c3c-b76a-e52b6cebb3eb');
  });

  it('It should respond with statusCode 302 when posted with', async (done) => {
    await request(app.getServer())
      .get(`${Route.exportGoodsIntent}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      exportGoodsIntent: ExportGoodsIntent.goodsExportedToBeSoldForBusiness,
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportGoodsIntent}?tradeType=export`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportGoodsArrivalDate}?tradeType=export&exportGoodsIntent=goodsExportedToBeSoldForBusiness`);
  });

  it('It should respond with statusCode 302 when posted with `Bring goods in luggage for personal`', async (done) => {
    await request(app.getServer())
      .get(`${Route.exportGoodsIntent}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      exportGoodsIntent: ExportGoodsIntent.goodsPostedForPersonal,
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportGoodsIntent}?tradeType=export`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', 'https://personal.help.royalmail.com/app/answers/detail/a_id/106');
  });

  it('It should respond with statusCode 302 and redirect back when empty post', async (done) => {
    await request(app.getServer())
      .get(`${Route.exportGoodsIntent}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      exportGoodsIntent: '',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportGoodsIntent}?tradeType=export`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportGoodsIntent}?tradeType=export`);
  });

  it(`It should respond with statusCode 302 and redirect to ${Route.exportCheckYourAnswers} when isEdit`, async (done) => {
    await request(app.getServer())
      .get(`${Route.exportGoodsIntent}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      exportGoodsIntent: ExportGoodsIntent.goodsExportedToBeSoldForBusiness,
      isEdit: 'true',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportGoodsIntent}?tradeType=export&exportDeclarations=yes&originCountry=GB&destinationCountry=BR&checkWhatServicesYouNeedToRegister=true&exportGoodsIntent=goodsExportedToBeSoldForBusiness`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportCheckYourAnswers}?tradeType=export&exportDeclarations=yes&originCountry=GB&destinationCountry=BR&checkWhatServicesYouNeedToRegister=true&exportGoodsIntent=goodsExportedToBeSoldForBusiness`);
  });
});
