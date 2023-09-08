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
import IndexRoute from '../../../routes/index.route';
import 'dotenv/config';

import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import { Params } from '../../../interfaces/params.interface';
import { getParams } from '../../../utils/queryHelper';
import translation from '../../../translation/en';
import getTodaysDate from '../../../utils/tests/getTodaysDate';
import ImportGoodsController from './controller';
import getCsrfToken from '../../../utils/getCsrfToken';
import { CsrfToken } from '../../../interfaces/helpers.interface';

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

let params:Params = {};

let csrfResponse: CsrfToken;

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
    importDateDay: getTodaysDate.day,
    importDateMonth: getTodaysDate.month,
    importDateYear: getTodaysDate.year,
    additionalCode: '',
  };
});

afterAll(async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
});

describe(`[GET] ${Route.importGoods}`, () => {
  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.importGoods}${getParams(params)}`)
    .set('user-agent', 'node-superagent')
    .expect(200));

  it('It should respond with statusCode 302 and redirect to /import-declarations with errors', async () => {
    params.importDeclarations = '';
    await request(app.getServer())
      .get(`${Route.importGoods}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importDeclarations}${getParams(params)}&error=Select%20who%20will%20submit%20the%20declaration`,
      );
  });

  it('It should respond with statusCode 200 and show correct error', () => request(app.getServer())
    .get(`${Route.importGoods}${getParams(params)}&error=someError`)
    .set('user-agent', 'node-superagent')
    .expect(200)
    .then((res) => {
      expect(res.text).toEqual(expect.stringContaining('Error: What is the name or the commodity code of the goods?'));
    }));

  it('It should throw an error and call next', async () => {
    params.commodity = 'something';
    params.isEdit = 'true';

    const createMockRequest = () => (
        {
          originalUrl: Route.importGoods,
          query: {
            additionalCode: 'false',
            ...params,
          },
          route: {
            path: Route.importGoods,
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
            backPath: Route.importGoods,
          },
        } as unknown as e.Response
    );
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockNext = jest.fn();
    const mockError = Error();
    mockResponse.render = () => { throw mockError; };
    const controller = new ImportGoodsController();
    await controller.importGoods(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});

describe(`[POST] ${Route.importGoods}`, () => {
  it('It should respond with statusCode 302 when posted', async (done) => {
    params.commodity = '0000000000';
    await request(app.getServer())
      .get(`${Route.importGoods}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });

    const data = {
      commodity: '0000000000',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.importGoods}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.search}${getParams(params)}`);
  });

  it('It should respond with statusCode 302 and redirect back when empty post', async (done) => {
    await request(app.getServer())
      .get(`${Route.importGoods}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      commodity: '',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.importGoods}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.importGoods}${getParams(params)}`);
  });

  it('It should respond with statusCode 302 and redirect back when empty post when edit', async (done) => {
    await request(app.getServer())
      .get(`${Route.importGoods}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      isEdit: 'true',
      original: '0000000000',
      commodity: '',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.importGoods}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.importGoods}${getParams(params)}&original=0000000000&isEdit=true`);
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
          path: Route.importGoods,
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
    const controller = new ImportGoodsController();
    await controller.importGoodsSubmit(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
