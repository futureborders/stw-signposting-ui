/**
 * Copyright 2021 Crown Copyright (Single Trade Window)
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
import { mockedAdditionalCodeData } from './mockedData';
import { ExportsParams } from '../../../interfaces/exports.interface';
import getTodaysDate from '../../../utils/tests/getTodaysDate';
import { getParams } from '../../../utils/queryHelper';
import ExportAdditionalCodeController from './controller';

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

jest.mock('../../../middlewares/auth-middleware', () => jest.fn((req, res, next) => next()));

const indexRoute = new IndexRoute(
  mockedTradeTariffApi,
  mockedStwTradeTariffApi,
);
const app = new App([indexRoute]);

let csrfResponse: CsrfToken;

let params:ExportsParams = {};

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

describe(`[GET] ${Route.exportAdditionalCode}`, () => {
  it('It should return status 200', async () => {
    params.error = 'errorMessage';

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
      .get(`${Route.exportAdditionalCode}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(
          expect.stringContaining(
            'Describe the goods you are exporting in more detail',
          ),
        );
        expect(res.text).toEqual(
          expect.stringContaining('<strong>4200</strong> - Procyon lotor'),
        );
        expect(res.text).toEqual(
          expect.stringContaining('<strong>4201</strong> - Canis lupus'),
        );
        expect(res.text).toEqual(
          expect.stringContaining('<strong>4202</strong> - Martes zibellina'),
        );
      });
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });

  it('It should return status 500', async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      data: {},
      status: 500,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getAdditionalCode.mockRejectedValue(
      axiosTradeDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.exportAdditionalCode}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(500);
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });
});

describe(`[POST] ${Route.exportAdditionalCode}`, () => {
  it(`It should respond with statusCode 302 when posted and redirect to ${Route.exportCheckYourAnswers}`, async (done) => {
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
      .get(`${Route.exportAdditionalCode}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });

    const data = {
      additionalCode: '4200',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportAdditionalCode}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportCheckYourAnswers}${getParams(params)}&additionalCode=${data.additionalCode}`);
  });

  it('It should respond with statusCode 302 and redirect back when empty post', async (done) => {
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
      .get(`${Route.exportAdditionalCode}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });

    const data = {
      additionalCode: '',
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.exportAdditionalCode}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(data)
      .expect(302, {})
      .expect('Location', `${Route.exportAdditionalCode}${getParams(params)}`);
  });

  it('It should return status 500', async () => {
    const createMockRequest = () => (
      {
        body: {
          additionalCode: '123',
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
        },
      } as unknown as e.Response
    );
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockNext = jest.fn();

    const mockError = Error();
    mockResponse.redirect = () => { throw mockError; };
    const controller = new ExportAdditionalCodeController(mockedStwTradeTariffApi);
    await controller.exportAdditionalCodeSubmit(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
