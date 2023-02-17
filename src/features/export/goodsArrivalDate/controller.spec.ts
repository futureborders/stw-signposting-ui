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

import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';
import getTodaysDate from '../../../utils/tests/getTodaysDate';
import ExportGoodsArrivalDateController from './controller';
import { getParams } from '../../../utils/queryHelper';
import translation from '../../../translation/en';
import { Params } from '../../../interfaces/params.interface';

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
    tradeDateDay: getTodaysDate.day,
    tradeDateMonth: getTodaysDate.month,
    tradeDateYear: getTodaysDate.year,
    originCountry: 'GB',
    exportDeclarations: 'yes',
    destinationCountry: 'CN',
    commodity: '0301921000',
  };
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe(`[GET] ${Route.exportGoodsArrivalDate}`, () => {
  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.exportGoodsArrivalDate}`)
    .set('user-agent', 'node-superagent')
    .expect(200));

  it('It should respond with statusCode 200 and show correct error', () => request(app.getServer())
    .get(`${Route.exportGoodsArrivalDate}${getParams(params)}&error=someError`)
    .set('user-agent', 'node-superagent')
    .expect(200)
    .then((res) => {
      expect(res.text).toEqual(expect.stringContaining('Error: When will the goods arrive at the UK border?'));
    }));

  it('It should throw an error and call next', async () => {
    params.commodity = 'something';
    params.isEdit = 'true';

    const createMockRequest = () => (
        {
          originalUrl: Route.exportGoodsArrivalDate,
          query: {
            additionalCode: 'false',
            ...params,
          },
          route: {
            path: Route.exportGoodsArrivalDate,
          },
          url: {
            includes: jest.fn(),
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
            backPath: Route.exportGoodsArrivalDate,
          },
        } as unknown as e.Response
    );
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockNext = jest.fn();
    const mockError = Error();
    mockResponse.render = () => { throw mockError; };
    const controller = new ExportGoodsArrivalDateController();
    await controller.exportGoodsArrivalDate(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});

describe(`[POST] ${Route.exportGoodsArrivalDate}`, () => {
  it('It should respond with statusCode 302 when posted', async (done) => {
    await request(app.getServer())
      .get(`${Route.exportGoodsArrivalDate}${getParams(params)}`)
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

    params.tradeDateDay = data.tradeDateDay;
    params.tradeDateMonth = data.tradeDateMonth;
    params.tradeDateYear = data.tradeDateYear;

    await request(app.getServer())
      .post(`${Route.exportGoodsArrivalDate}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportOriginCountry}${getParams(params)}`);
  });

  it('It should respond with statusCode 302 and redirect back when date error', async (done) => {
    await request(app.getServer())
      .get(`${Route.exportGoodsArrivalDate}${getParams(params)}`)
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

    params.tradeDateDay = data.tradeDateDay;
    params.tradeDateMonth = data.tradeDateMonth;
    params.tradeDateYear = data.tradeDateYear;

    await request(app.getServer())
      .post(`${Route.exportGoodsArrivalDate}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportGoodsArrivalDate}${getParams(params)}`);
  });

  it(`It should respond with statusCode 302 and redirect to ${Route.checkYourAnswers} when isEdit`, async (done) => {
    await request(app.getServer())
      .get(`${Route.exportGoodsArrivalDate}${getParams(params)}`)
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

    params.tradeDateDay = data.tradeDateDay;
    params.tradeDateMonth = data.tradeDateMonth;
    params.tradeDateYear = data.tradeDateYear;

    await request(app.getServer())
      .post(`${Route.exportGoodsArrivalDate}${getParams(params)}`)
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
          commodity: '0000000000',
          isEdit: 'true',
        },
        route: {
          path: Route.exportGoodsArrivalDate,
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
    const controller = new ExportGoodsArrivalDateController();
    await controller.exportGoodsArrivalDateSubmit(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
