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
import { Route } from '../../../interfaces/routes.interface';
import { Params } from '../../../interfaces/params.interface';
import IndexRoute from '../../../routes/index.route';
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { getParams } from '../../../utils/queryHelper';
import translation from '../../../translation/en';
import getTodaysDate from '../../../utils/tests/getTodaysDate';
import getCsrfToken from '../../../utils/getCsrfToken';
import { CsrfToken } from '../../../interfaces/helpers.interface';
import ImportDateController from './controller';

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
    commodity: '',
    tradeType: 'import',
    goodsIntent: 'bringGoodsToSell',
    importDeclarations: 'yes',
    userTypeTrader: 'yes',
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

describe(`[GET] ${Route.importDate}`, () => {
  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.importDate}`)
    .set('user-agent', 'node-superagent')
    .expect(200));

  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.importDate}${getParams(params)}&error=someError&originalImportDateDay=1`)
    .set('user-agent', 'node-superagent')
    .expect(200)
    .then((res) => {
      expect(res.text).toEqual(expect.stringContaining('Error: When will the goods arrive at the UK border?'));
    }));

  it('It should throw an error and call next', async () => {
    params.importDateDay = getTodaysDate.day;
    params.importDateMonth = getTodaysDate.month;
    params.importDateYear = getTodaysDate.year;
    params.isEdit = 'true';

    const createMockRequest = () => (
        {
          originalUrl: Route.importDate,
          query: {
            additionalCode: 'false',
            ...params,
          },
          route: {
            path: Route.importDate,
          },
          csrfToken: () => 'csrftoken',
          url: {
            includes: jest.fn(),
          },
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
            backPath: Route.importDate,
          },
        } as unknown as e.Response
    );
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockNext = jest.fn();
    const mockError = Error();
    mockResponse.render = () => { throw mockError; };
    const controller = new ImportDateController();
    await controller.importDate(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});

describe(`[POST] ${Route.importDate}`, () => {
  it('It should respond with statusCode 302 when posted', async (done) => {
    await request(app.getServer())
      .get(`${Route.importDate}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      importDateDay: getTodaysDate.day,
      importDateMonth: getTodaysDate.month,
      importDateYear: getTodaysDate.year,
      _csrf: csrfResponse.token,
    };

    params.importDateDay = data.importDateDay;
    params.importDateMonth = data.importDateMonth;
    params.importDateYear = data.importDateYear;

    await request(app.getServer())
      .post(`${Route.importDate}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.importCountryOrigin}${getParams(params)}`);
  });

  it('It should respond with statusCode 302 and redirect back when date error', async (done) => {
    await request(app.getServer())
      .get(`${Route.importDate}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      importDateDay: 'a',
      importDateMonth: getTodaysDate.month,
      importDateYear: getTodaysDate.year,
      _csrf: csrfResponse.token,
    };

    params.importDateDay = data.importDateDay;
    params.importDateMonth = data.importDateMonth;
    params.importDateYear = data.importDateYear;

    await request(app.getServer())
      .post(`${Route.importDate}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.importDate}${getParams(params)}`);
  });

  it(`It should respond with statusCode 302 and redirect to ${Route.checkYourAnswers} when isEdit`, async (done) => {
    await request(app.getServer())
      .get(`${Route.importDate}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      importDateDay: getTodaysDate.day,
      importDateMonth: getTodaysDate.month,
      importDateYear: getTodaysDate.year,
      isEdit: 'true',
      _csrf: csrfResponse.token,
    };

    params.importDateDay = data.importDateDay;
    params.importDateMonth = data.importDateMonth;
    params.importDateYear = data.importDateYear;

    await request(app.getServer())
      .post(`${Route.importDate}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.checkYourAnswers}${getParams(params)}`);
  });

  it('It should throw an error and call next', async () => {
    const createMockRequest = () => (
      {
        query: {},
        body: {
          importDateDay: getTodaysDate.day,
          importDateMonth: getTodaysDate.month,
          importDateYear: getTodaysDate.year,
          isEdit: 'true',
        },
        route: {
          path: Route.importDate,
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
    const controller = new ImportDateController();
    await controller.importDateSubmit(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
