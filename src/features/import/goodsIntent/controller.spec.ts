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
import { GoodsIntent } from '../../../interfaces/enums.interface';

import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';

import { Params } from '../../../interfaces/params.interface';
import GoodsIntentController from './controller';

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

describe(`[GET] ${Route.goodsIntent}`, () => {
  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.goodsIntent}?tradeType=import`)
    .set('user-agent', 'node-superagent')
    .expect(200));

  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.goodsIntent}?tradeType=import&error=someError`)
    .set('user-agent', 'node-superagent')
    .expect(200)
    .then((res) => {
      expect(res.text).toEqual(expect.stringContaining('Error: Why are the goods being brought into the UK?'));
    }));

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
    const controller = new GoodsIntentController();
    await controller.goodsIntent(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});

describe(`[POST] ${Route.goodsIntent}`, () => {
  it('It should respond with statusCode 302 when posted', async (done) => {
    await request(app.getServer())
      .get(`${Route.goodsIntent}?tradeType=import`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      goodsIntent: 'bringGoodsToSell',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.goodsIntent}?tradeType=import`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.importDate}?tradeType=import&goodsIntent=bringGoodsToSell`);
  });

  it('It should respond with statusCode 302 and redirect back when empty post', async (done) => {
    await request(app.getServer())
      .get(`${Route.goodsIntent}`)
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
      .post(`${Route.goodsIntent}?tradeType=import`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.goodsIntent}?tradeType=import`);
  });

  it(`It should respond with statusCode 302 and redirect to ${Route.checkYourAnswers} when isEdit`, async (done) => {
    await request(app.getServer())
      .get(`${Route.goodsIntent}?tradeType=import`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      goodsIntent: 'bringGoodsToSell',
      isEdit: 'true',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.goodsIntent}?tradeType=import`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.checkYourAnswers}?tradeType=import&goodsIntent=bringGoodsToSell`);
  });

  it('It should respond with statusCode 302 and redirect to correct url', async (done) => {
    await request(app.getServer())
      .get(`${Route.goodsIntent}?tradeType=import`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      goodsIntent: GoodsIntent.bringGoodsThroughPost,
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.goodsIntent}?tradeType=import`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', 'https://www.gov.uk/goods-sent-from-abroad?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5');
  });

  it('It should respond with statusCode 302 and redirect to correct url', async (done) => {
    await request(app.getServer())
      .get(`${Route.goodsIntent}?tradeType=import`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      goodsIntent: GoodsIntent.bringGoodsInLuggage,
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.goodsIntent}?tradeType=import`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', 'https://www.gov.uk/duty-free-goods?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5');
  });

  it('It should respond with statusCode 302 and redirect to correct url', async (done) => {
    await request(app.getServer())
      .get(`${Route.goodsIntent}?tradeType=import`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      goodsIntent: GoodsIntent.bringGoodsInLuggageForBusiness,
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.goodsIntent}?tradeType=import`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', 'https://www.gov.uk/guidance/bringing-commercial-goods-into-great-britainin-your-baggage');
  });

  it('It should respond with statusCode 302 and redirect to correct url', async (done) => {
    await request(app.getServer())
      .get(`${Route.goodsIntent}?tradeType=import`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      goodsIntent: GoodsIntent.bringGoodsTemporarily,
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.goodsIntent}?tradeType=import`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', 'https://www.gov.uk/guidance/apply-to-import-goods-temporarily-to-the-uk-or-eu');
  });

  it('It should respond with statusCode 302 and redirect to correct url', async (done) => {
    await request(app.getServer())
      .get(`${Route.goodsIntent}?tradeType=import`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      goodsIntent: GoodsIntent.movingToUkWithBelongings,
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.goodsIntent}?tradeType=import`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', 'https://www.gov.uk/moving-to-uk?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5');
  });

  it('It should throw an error and call next', async () => {
    const createMockRequest = () => (
      {
        body: {
          goodsIntent: GoodsIntent.movingToUkWithBelongings,
          isEdit: 'false',
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
    const controller = new GoodsIntentController();
    await controller.goodsIntentSubmit(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
