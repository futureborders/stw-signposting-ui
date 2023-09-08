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
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';
import App from '../../../app';
import 'dotenv/config';
import { Params } from '../../../interfaces/params.interface';
import { getParams } from '../../../utils/queryHelper';
import translation from '../../../translation/en';
import getCsrfToken from '../../../utils/getCsrfToken';
import { CsrfToken } from '../../../interfaces/helpers.interface';

import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import DestinationCountryController from './controller';

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
    originCountry: 'CN',
    userTypeTrader: 'yes',
    goodsIntent: 'bringGoodsToSell',
    tradeType: 'import',
    importDeclarations: 'yes',
  };
});

afterAll(async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
});

describe(`[GET] ${Route.destinationCountry}`, () => {
  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.destinationCountry}${getParams(params)}`)
    .set('user-agent', 'node-superagent')
    .expect(200));

  it('It should respond with statusCode 200 and show the correct text for GB into XI', async () => {
    params.originCountry = 'GB';

    await request(app.getServer())
      .get(
        `${Route.destinationCountry}${getParams(params)}`,
      )
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => expect(res.text).toEqual(
        expect.stringContaining(translation.page.destinationCountry.assumedText(translation.common.countries.GB, translation.common.countries.XI)),
      ));
  });

  it('It should respond with statusCode 200 and show the correct text for XI into GB', async () => {
    params.originCountry = 'XI';

    await request(app.getServer())
      .get(
        `${Route.destinationCountry}${getParams(params)}`,
      )
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => expect(res.text).toEqual(
        expect.stringContaining(translation.page.destinationCountry.assumedText(translation.common.countries.XI, translation.common.countries.GB)),
      ));
  });

  it('It should respond with statusCode 200 when editing destinationCountry', async () => {
    params.isEdit = 'true';

    await request(app.getServer())
      .get(
        `${Route.destinationCountry}${getParams(params)}`,
      )
      .set('user-agent', 'node-superagent')
      .expect(200);
  });

  it(`It should respond with statusCode 200 and render ${Route.destinationCountry} after editing destinationCountry`, async () => {
    params.isEdit = 'true';
    params.original = 'CN';

    await request(app.getServer())
      .get(
        `${Route.destinationCountry}${getParams(params)}`,
      )
      .set('user-agent', 'node-superagent')
      .expect(200);
  });

  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.destinationCountry}${getParams(params)}&error=someError`)
    .set('user-agent', 'node-superagent')
    .expect(200)
    .then((res) => {
      expect(res.text).toEqual(expect.stringContaining('Error: Where are the goods arriving?'));
    }));

  it('It should throw an error and call next', async () => {
    params.destinationCountry = 'GB';
    params.isEdit = 'true';

    const createMockRequest = () => (
        {
          originalUrl: Route.destinationCountry,
          query: {
            additionalCode: 'false',
            ...params,
          },
          route: {
            path: Route.destinationCountry,
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
            backPath: Route.destinationCountry,
          },
        } as unknown as e.Response
    );
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockNext = jest.fn();
    const mockError = Error();
    mockResponse.render = () => { throw mockError; };
    const controller = new DestinationCountryController();
    await controller.destinationCountry(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});

describe(`[POST] ${Route.destinationCountry}`, () => {
  it('It should respond with statusCode 302 when posted', async (done) => {
    await request(app.getServer())
      .get(`${Route.destinationCountry}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });

    const data = {
      destinationCountry: 'GB',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.destinationCountry}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.identifyUserType}${getParams(params)}&destinationCountry=GB`);
  });

  it('It should respond with statusCode 302 and redirect back when empty post', async (done) => {
    await request(app.getServer())
      .get(`${Route.destinationCountry}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      destinationCountry: '',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.destinationCountry}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.destinationCountry}${getParams(params)}`);
  });

  it('It should respond with statusCode 302 and redirect back and isEdit', async (done) => {
    await request(app.getServer())
      .get(`${Route.destinationCountry}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      isEdit: 'true',
      destinationCountry: 'GB',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.destinationCountry}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.checkYourAnswers}${getParams(params)}&destinationCountry=GB`);
  });

  it(`It should respond with statusCode 302 and redirect to ${Route.northernIrelandAndEUTrading}`, async (done) => {
    params.originCountry = 'FR';

    await request(app.getServer())
      .get(`${Route.destinationCountry}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      destinationCountry: 'XI',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.destinationCountry}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.northernIrelandAndEUTrading}${getParams(params)}&destinationCountry=XI`);
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
          path: Route.destinationCountry,
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
    const controller = new DestinationCountryController();
    await controller.destinationCountrySubmit(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
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
          path: Route.destinationCountry,
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
    const controller = new DestinationCountryController();
    await controller.destinationCountrySubmit(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
