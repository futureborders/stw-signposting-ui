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
import e from 'express';
import App from '../../../app';
import 'dotenv/config';

import getCsrfToken from '../../../utils/getCsrfToken';
import { CsrfToken } from '../../../interfaces/helpers.interface';
import { Params } from '../../../interfaces/params.interface';
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';
import translation from '../../../translation/en';
import ExportCountryDestinationController from './controller';
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

const indexRoute = new IndexRoute(
  mockedTradeTariffApi,
  mockedStwTradeTariffApi,
);
const app = new App([indexRoute]);

let csrfResponse: CsrfToken;

let params:Params = {};

beforeEach(() => {
  jest.clearAllMocks();
  params = {
    tradeType: 'export',
    exportGoodsIntent: 'goodsExportedToBeSoldForBusiness',
    tradeDateDay: getTodaysDate.day,
    tradeDateMonth: getTodaysDate.month,
    tradeDateYear: getTodaysDate.year,
    originCountry: 'GB',
  };
});

afterAll(async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
});

describe(`[GET] ${Route.exportCountryDestination}`, () => {
  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.exportCountryDestination}${getParams(params)}`)
    .set('user-agent', 'node-superagent')
    .expect(200));

  it('It should respond with statusCode 200 and show correct error', () => request(app.getServer())
    .get(`${Route.exportCountryDestination}${getParams(params)}&error=someError`)
    .set('user-agent', 'node-superagent')
    .expect(200)
    .then((res) => {
      expect(res.text).toEqual(expect.stringContaining('Error: Which country are the goods being sent to?'));
    }));

  it('It should throw an error and call next', async () => {
    const createMockRequest = () => (
        {
          query: {},
          body: {
            isEdit: 'true',
          },
          route: {
            path: Route.exportCountryDestination,
          },
          csrfToken: () => 'csrftoken',
        } as unknown as e.Request
    );

    const creatMockResponse = () => (
        {
          render: jest.fn(),
          locals: {
            language: 'en',
            queryParams: getParams(params).substring(1),
            translation: {
              ...translation,
            },
          },
        } as unknown as e.Response
    );
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockNext = jest.fn();
    const mockError = Error();
    mockResponse.render = () => { throw mockError; };
    const controller = new ExportCountryDestinationController(mockedTradeTariffApi);
    await controller.exportCountryDestination(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});

describe(`[POST] ${Route.exportCountryDestination}`, () => {
  it('It should respond with statusCode 302 when posted', async (done) => {
    await request(app.getServer())
      .get(`${Route.exportCountryDestination}${getParams(params)}`)
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
      .post(`${Route.exportCountryDestination}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportUserTypeTrader}${getParams(params)}&destinationCountry=BE`);
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
      .expect('Location', `${Route.exportUserTypeTrader}?tradeType=export&exportDeclarations=yes&originCountry=XI&checkWhatServicesYouNeedToRegister=true&destinationCountry=BR`);
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

  it('It should throw an error and call next', async () => {
    const createMockRequest = () => (
      {
        query: {},
        body: {
          destinationCountry: 'GB',
          isEdit: 'true',
        },
        route: {
          path: Route.exportCountryDestination,
        },
        cookies: {
          stw_signposting: 'some value',
        },
        csrfToken: () => 'csrftoken',
      } as unknown as e.Request
    );

    const creatMockResponse = () => (
      {
        redirect: jest.fn(),
        locals: {
          language: 'en',
          queryParams: getParams(params).substring(1),
          translation: {
            ...translation,
          },
        },
      } as unknown as e.Response
    );
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockNext = jest.fn();
    const mockError = Error();
    mockResponse.redirect = () => { throw mockError; };
    const controller = new ExportCountryDestinationController(mockedTradeTariffApi);
    await controller.exportCountryDestinationSubmit(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
