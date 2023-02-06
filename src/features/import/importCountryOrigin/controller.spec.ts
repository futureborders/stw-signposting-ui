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
import { getParams } from '../../../utils/queryHelper';
import getTodaysDate from '../../../utils/tests/getTodaysDate';
import ImportCountryOriginController from './controller';
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

let params:Params = {};

let csrfResponse: CsrfToken;

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

beforeEach(() => {
  jest.clearAllMocks();
  params = {
    tradeType: 'import',
    goodsIntent: 'bringGoodsToSell',
    importDeclarations: 'yes',
    userTypeTrader: 'yes',
  };
});

describe(`[GET] ${Route.importCountryOrigin}`, () => {
  it('It should respond with statusCode 200 and show error when error in query', () => request(app.getServer())
    .get(`${Route.importCountryOrigin}${getParams(params)}&error=error`)
    .set('user-agent', 'node-superagent')
    .expect(200)
    .then((res) => {
      expect(res.text).toContain('Error: What is the country of origin of the goods?');
    }));

  it('It should respond with statusCode 200 and show the correct hidden inputs when isEdit', async () => {
    params.isEdit = 'true';
    params.destinationCountry = 'GB';
    params.commodity = '0208907000';
    params.original = 'CN';
    params.importDateDay = getTodaysDate.day;
    params.importDateMonth = getTodaysDate.month;
    params.importDateYear = getTodaysDate.year;

    await request(app.getServer())
      .get(`${Route.importCountryOrigin}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('<input type="hidden" name="isEdit" value="true">');
        expect(res.text).toContain('<input type="hidden" name="original" value="CN">');
      });
  });

  it('It should throw an error and call next', async () => {
    params.userTypeTrader = 'true';
    params.isEdit = 'true';

    const createMockRequest = () => (
          {
            originalUrl: Route.importCountryOrigin,
            query: {
              additionalCode: 'false',
              ...params,
            },
            route: {
              path: Route.importCountryOrigin,
            },
            csrfToken: () => 'csrftoken',
            session: () => {
              'no';
            },
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
              backPath: Route.importDeclarations,
            },
          } as unknown as e.Response
    );
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockNext = jest.fn();
    const mockError = Error();
    mockResponse.redirect = () => { throw mockError; };
    const controller = new ImportCountryOriginController(mockedStwTradeTariffApi);
    await controller.importCountryOrigin(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});

describe(`[POST] ${Route.importCountryOrigin}`, () => {
  it(`It should respond with statusCode 302 and redirect to ${Route.destinationCountry} when isEdit`, async (done) => {
    await request(app.getServer())
      .get(`${Route.importCountryOrigin}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      originCountry: 'GB',
      destinationCountry: 'GB',
      isEdit: 'true',
      original: '',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.importCountryOrigin}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.destinationCountry}${getParams(params)}&originCountry=GB&isEdit=true&original=`);
  });

  it('It should respond with statusCode 302 when posted', async (done) => {
    await request(app.getServer())
      .get(`${Route.importCountryOrigin}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      originCountry: '',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.importCountryOrigin}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.importCountryOrigin}${getParams(params)}`);
  });

  it('It should respond with statusCode 200 when posted with a valid country selected', async (done) => {
    await request(app.getServer())
      .get(`${Route.importCountryOrigin}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      originCountry: 'CN',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.importCountryOrigin}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.destinationCountry}${getParams(params)}&originCountry=CN`);
  });

  it(`It should respond with statusCode 302 and redirect to ${Route.checkYourAnswers} when isEdit`, async (done) => {
    await request(app.getServer())
      .get(`${Route.importCountryOrigin}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });
    const data = {
      originCountry: 'CN',
      original: 'CN',
      destinationCountry: 'GB',
      isEdit: 'true',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.importCountryOrigin}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.checkYourAnswers}${getParams(params)}&originCountry=CN`);
  });

  it(`It should respond with statusCode 302 and check for additional codes if originCountry has changed then redirect to ${Route.checkYourAnswers} if no additional codes`, async (done) => {
    await request(app.getServer())
      .get(`${Route.importCountryOrigin}${getParams(params)}`)
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

    const axiosAdditionalCodeResponse: AxiosResponse = {
      data: {
        data: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );

    await request(app.getServer())
      .post(`${Route.importCountryOrigin}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.checkYourAnswers}${getParams(params)}&originCountry=GB`);

    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });

  it(`It should respond with statusCode 302 and check for additional codes if originCountry has changed then redirect to ${Route.additionalCode} if additional codes`, async (done) => {
    await request(app.getServer())
      .get(`${Route.importCountryOrigin}${getParams(params)}`)
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

    const axiosAdditionalCodeResponse: AxiosResponse = {
      data: {
        data: [
          { code: '4200', description: 'Procyon lotor' },
          { code: '4201', description: 'Canis lupus' },
        ],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );

    await request(app.getServer())
      .post(`${Route.importCountryOrigin}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.additionalCode}${getParams(params)}&originCountry=GB`);

    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });

  it('It should throw an error and call next', async () => {
    const createMockRequest = () => (
      {
        body: {
          originCountry: 'CN',
          isEdit: 'true',
          original: 'CN',
        },
        query: {
          destinationCountry: 'GB',
        },
        route: {
          path: Route.importCountryOrigin,
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
    const controller = new ImportCountryOriginController(mockedStwTradeTariffApi);
    await controller.importCountryOriginSubmit(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
