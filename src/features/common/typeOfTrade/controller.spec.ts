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
import TypeOfTradeController from './controller';

import { getParams } from '../../../utils/queryHelper';
import getTodaysDate from '../../../utils/tests/getTodaysDate';
import translation from '../../../translation/en';

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
    commodity: '0208907000',
    tradeType: 'import',
    goodsIntent: 'bringGoodsToSell',
    importDeclarations: 'yes',
    userTypeTrader: 'yes',
    destinationCountry: 'GB',
    originCountry: 'CN',
    additionalCode: 'false',
    importDateDay: getTodaysDate.day,
    importDateMonth: getTodaysDate.month,
    importDateYear: getTodaysDate.year,
  };
});

afterAll(async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
});

describe(`[GET] ${Route.typeOfTrade}`, () => {
  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.typeOfTrade}`)
    .set('user-agent', 'node-superagent')
    .expect(200));

  it('It should respond with statusCode 200 and show an error message', () => request(app.getServer())
    .get(`${Route.typeOfTrade}?error=an%20error%20message`)
    .set('user-agent', 'node-superagent')
    .expect(200)
    .then((res) => expect(res.text).toEqual(
      expect.stringContaining(
        '<span class="govuk-visually-hidden">Error:</span> an error message',
      ),
    )));

  it('It should respond with statusCode 200 and show the correct back button path /check-your-answers', () => request(app.getServer())
    .get(`${Route.typeOfTrade}?commodity=2007101050&tradeType=export&exportDeclarations=yes&destinationCountry=CN&isEdit=true`)
    .set('user-agent', 'node-superagent')
    .expect(200)
    .then((res) => expect(res.text).toEqual(expect.stringContaining('/check-your-answers?'))));

  it('It should respond with statusCode 200 and show the correct original values', () => {
    params.tradeType = 'export';
    params.isEdit = 'true';
    return request(app.getServer())
      .get(`${Route.typeOfTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => expect(res.text).toEqual(expect.stringContaining('<input type="hidden" name="original" value="export">')));
  });

  it('It should respond with statusCode 200 and show the correct back button path /', () => {
    process.env.STARTPAGE_ENABLED = 'true';
    return request(app.getServer())
      .get(Route.typeOfTrade)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => expect(res.text).toEqual(
        expect.stringContaining(Route.index),
      ));
  });

  it('It should throw an error and call next', async () => {
    const createMockRequest = () => (
      {
        query: {
          additionalCode: 'false',
          ...params,
        },
        route: {
          path: Route.goodsIntent,
        },
        csrfToken: () => 'csrftoken',
      } as unknown as e.Request
    );

    const creatMockResponse = () => (
      {
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
    const controller = new TypeOfTradeController();
    await controller.typeOfTrade(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});

describe(`[POST] ${Route.typeOfTrade}`, () => {
  it('It should respond with statusCode 302 and redirect to export journey when posted with export', async (done) => {
    await request(app.getServer())
      .get(`${Route.typeOfTrade}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      tradeType: 'export',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.typeOfTrade}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportGoodsIntent}?tradeType=export`);
  });

  it('It should respond with statusCode 302 and redirect to import journey when posted with import', async (done) => {
    await request(app.getServer())
      .get(`${Route.typeOfTrade}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      tradeType: 'import',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.typeOfTrade}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.goodsIntent}?tradeType=import`);
  });

  it('It should respond with statusCode 302 and redirect back when empty post', async (done) => {
    await request(app.getServer())
      .get(`${Route.typeOfTrade}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      tradeType: '',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.typeOfTrade}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.typeOfTrade}?`);
  });

  it(`It should respond with statusCode 200, reset queryParams and redirect to ${Route.exportGoodsIntent} after changing import to export`, async (done) => {
    await request(app.getServer())
      .get(`${Route.typeOfTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      tradeType: 'export',
      original: params.tradeType,
      isEdit: 'true',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.typeOfTrade}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportGoodsIntent}?tradeType=export`);
  });

  it(`It should respond with statusCode 200, reset queryParams and redirect to ${Route.goodsIntent} after changing export to import`, async (done) => {
    params.tradeType = 'export';

    await request(app.getServer())
      .get(`${Route.typeOfTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      tradeType: 'import',
      original: params.tradeType,
      isEdit: 'true',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.typeOfTrade}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.goodsIntent}?tradeType=import`);
  });

  it(`It should respond with statusCode 200 and redirect to ${Route.checkYourAnswers} after no change`, async (done) => {
    await request(app.getServer())
      .get(`${Route.typeOfTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      tradeType: 'import',
      original: 'import',
      isEdit: 'true',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.typeOfTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.checkYourAnswers}${getParams(params)}`);
  });

  it('It should throw an error and call next', async () => {
    const createMockRequest = () => (
      {
        body: {
          tradeType: 'import',
        },
        route: {
          path: Route.goodsIntent,
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
    const controller = new TypeOfTradeController();
    await controller.typeOfTradeSubmit(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
