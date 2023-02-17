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
import { Params } from '../../../interfaces/params.interface';
import { ExportUserTypeTrader, ExportGoodsIntent } from '../../../interfaces/enums.interface';
import { getParams } from '../../../utils/queryHelper';
import getTodaysDate from '../../../utils/tests/getTodaysDate';
import translation from '../../../translation/en';
import ExportUserTypeTraderController from './controller';

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
    exportGoodsIntent: ExportGoodsIntent.goodsExportedToBeSoldForBusiness,
    tradeDateDay: getTodaysDate.day,
    tradeDateMonth: getTodaysDate.month,
    tradeDateYear: getTodaysDate.year,
    originCountry: 'GB',
    exportDeclarations: 'yes',
    exportUserTypeTrader: ExportUserTypeTrader.neitherApply,
    destinationCountry: 'CN',
    commodity: '0301921000',
  };
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe(`[GET] ${Route.exportUserTypeTrader}`, () => {
  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.exportUserTypeTrader}`)
    .set('user-agent', 'node-superagent')
    .expect(200));

  it('It should respond with statusCode 200 and show correct error', () => request(app.getServer())
    .get(`${Route.exportUserTypeTrader}${getParams(params)}&error=someError`)
    .set('user-agent', 'node-superagent')
    .expect(200)
    .then((res) => {
      expect(res.text).toEqual(expect.stringContaining('Error: What are you responsible for?'));
    }));

  it('It should throw an error and call next', async () => {
    const createMockRequest = () => (
        {
          query: {},
          body: {
            isEdit: 'true',
          },
          route: {
            path: Route.exportUserTypeTrader,
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
    const controller = new ExportUserTypeTraderController();
    await controller.exportUserTypeTrader(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});

describe(`[POST] ${Route.exportUserTypeTrader}`, () => {
  it(`It should respond with statusCode 302 and redirect to ${Route.exportUserTypeTrader} when posting empty exportUserTypeTrader`, async (done) => {
    await request(app.getServer())
      .get(`${Route.exportUserTypeTrader}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });

    const data = {
      exportUserTypeTrader: '',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(
        `${Route.exportUserTypeTrader}${getParams(params)}`,
      )
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect(
        'Location',
        `${Route.exportUserTypeTrader}${getParams(params)}`,
      );
  });

  it(`It should respond with statusCode 302 and redirect to ${Route.checkYourAnswers} when isEdit`, async (done) => {
    await request(app.getServer())
      .get(`${Route.exportUserTypeTrader}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      exportUserTypeTrader: ExportUserTypeTrader.neitherApply,
      isEdit: true,
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(
        `${Route.exportUserTypeTrader}${getParams(params)}`,
      )
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect(
        'Location',
        `${Route.checkYourAnswers}${getParams(params)}`,
      );
  });

  it(`It should respond with statusCode 302 and redirect to ${Route.exportDeclarations}`, async (done) => {
    await request(app.getServer())
      .get(`${Route.exportUserTypeTrader}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      exportUserTypeTrader: ExportUserTypeTrader.neitherApply,
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(
        `${Route.exportUserTypeTrader}${getParams(params)}`,
      )
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect(
        'Location',
        `${Route.exportDeclarations}${getParams(params)}`,
      );
  });

  it('It should throw an error and call next', async () => {
    const createMockRequest = () => (
      {
        query: {},
        body: {
          isEdit: 'true',
        },
        route: {
          path: Route.exportUserTypeTrader,
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
    const controller = new ExportUserTypeTraderController();
    await controller.exportUserTypeTraderSubmit(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
