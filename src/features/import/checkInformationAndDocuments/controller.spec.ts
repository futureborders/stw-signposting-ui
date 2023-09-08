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

import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';

import { Params } from '../../../interfaces/params.interface';
import ImportCheckInformationAndDocumentsController from './controller';

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

describe(`[GET] ${Route.importCheckInformationAndDocuments}`, () => {
  it('It should respond with statusCode 200', async () => {
    await request(app.getServer())
      .get(`${Route.importCheckInformationAndDocuments}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('Check what information and documents you may need');
      });
  });

  it('It should throw an error and call next', async () => {
    const createMockRequest = () => (
      {
        query: {
          additionalCode: 'false',
          ...params,
        },
        route: {
          path: Route.importCheckInformationAndDocuments,
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
    const controller = new ImportCheckInformationAndDocumentsController();
    await controller.importCheckInformationAndDocuments(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
