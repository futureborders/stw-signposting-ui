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
import { AxiosResponse } from 'axios';
import App from '../../../app';
import 'dotenv/config';
import getCsrfToken from '../../../utils/getCsrfToken';
import { CsrfToken } from '../../../interfaces/helpers.interface';

import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';
import { Params } from '../../../interfaces/params.interface';
import getTodaysDate from '../../../utils/tests/getTodaysDate';
import { getParams } from '../../../utils/queryHelper';
import { mockedAdditionalCodeData } from '../../common/additionalCode/mockedData';

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
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
});

describe(`[GET] ${Route.exportOriginCountry}`, () => {
  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.exportOriginCountry}`)
    .set('user-agent', 'node-superagent')
    .expect(200));
});

describe(`[POST] ${Route.exportOriginCountry}`, () => {
  it('It should respond with statusCode 302 when posted', async (done) => {
    await request(app.getServer())
      .get(`${Route.exportOriginCountry}?tradeType=export&exportDeclarations=yes`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      originCountry: 'GB',
      exportDeclarations: 'yes',
      tradeType: 'export',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportOriginCountry}?tradeType=export&exportDeclarations=yes`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportCountryDestination}?tradeType=export&exportDeclarations=yes&originCountry=GB`);
  });

  it('It should respond with statusCode 302 and redirect back when empty post', async (done) => {
    await request(app.getServer())
      .get(`${Route.exportOriginCountry}?tradeType=export&exportDeclarations=yes`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      originCountry: '',
      exportDeclarations: 'yes',
      tradeType: 'export',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportOriginCountry}?tradeType=export&exportDeclarations=yes`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportOriginCountry}?tradeType=export&exportDeclarations=yes`);
  });

  it(`It should respond with statusCode 302 and redirect to ${Route.checkYourAnswers} when isEdit`, async (done) => {
    await request(app.getServer())
      .get(`${Route.exportOriginCountry}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      originCountry: 'XI',
      exportDeclarations: 'yes',
      tradeType: 'export',
      isEdit: 'true',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportOriginCountry}?tradeType=export&exportDeclarations=yes`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.checkYourAnswers}?tradeType=export&exportDeclarations=yes&originCountry=XI`);
  });

  it(`It should respond with statusCode 302 and redirect to ${Route.checkYourAnswers} when isEdit`, async (done) => {
    await request(app.getServer())
      .get(`${Route.exportOriginCountry}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      original: 'XI',
      originCountry: 'XI',
      exportDeclarations: 'yes',
      tradeType: 'export',
      isEdit: 'true',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportOriginCountry}?tradeType=export&exportDeclarations=yes`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.checkYourAnswers}?tradeType=export&exportDeclarations=yes&originCountry=XI`);
  });

  it(`It should respond with statusCode 302 and redirect to ${Route.additionalCode} when isEdit and originCountryHasChanged`, async (done) => {
    const params: Params = {
      tradeType: 'export',
      tradeDateDay: getTodaysDate.day,
      tradeDateMonth: getTodaysDate.month,
      tradeDateYear: getTodaysDate.year,
      originCountry: 'GB',
      exportDeclarations: 'yes',
      destinationCountry: 'CN',
      commodity: '0301921000',
      hasAddionalCode: '4200',
    };

    const axiosAdditionalCodeResponse: AxiosResponse = {
      ...mockedAdditionalCodeData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );

    await request(app.getServer())
      .get(`${Route.exportOriginCountry}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });

    const data = {
      originCountry: 'GB',
      original: 'XI',
      isEdit: 'true',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportOriginCountry}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.additionalCode}${getParams(params)}`);
  });

  it(`It should respond with statusCode 302 and redirect to ${Route.exportMovingGoodsFromNorthernIrelandToAnEUCountry} when importFromXIToEU`, async (done) => {
    await request(app.getServer())
      .get(`${Route.exportOriginCountry}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      originCountry: 'XI',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportOriginCountry}?tradeType=export&exportDeclarations=yes&destinationCountry=FR`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportMovingGoodsFromNorthernIrelandToAnEUCountry}?tradeType=export&exportDeclarations=yes&destinationCountry=FR&originCountry=XI`);
  });
});
