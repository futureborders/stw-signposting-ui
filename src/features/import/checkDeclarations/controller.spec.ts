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
import { getParams } from '../../../utils/queryHelper';
import getTodaysDate from '../../../utils/tests/getTodaysDate';
import { formatDate } from '../../../utils/filters/formatDate';
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';
import { ImportDate } from '../../../interfaces/importDate.interface';
import { Params } from '../../../interfaces/params.interface';
import ImportCheckDeclarationsController from './controller';
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
    tradeType: 'import',
    goodsIntent: 'bringGoodsToSell',
    userTypeTrader: 'yes',
    importDeclarations: 'yes',
    importDateDay: getTodaysDate.day,
    importDateMonth: getTodaysDate.month,
    importDateYear: getTodaysDate.year,
    originCountry: 'CN',
    destinationCountry: 'GB',
    commodity: '0301921000',
  };
});

afterAll(async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
});

describe(`[GET] ${Route.importCheckDeclarations}`, () => {
  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.importCheckDeclarations}`)
    .set('user-agent', 'node-superagent')
    .expect(200));

  it('It should return status 200 and show correct trade details', async () => {
    const date = {
      day: params.importDateDay,
      month: params.importDateMonth,
      year: params.importDateYear,
    };

    await request(app.getServer())
      .get(`${Route.importCheckDeclarations}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Commodity code'));
        expect(res.text).toEqual(expect.stringContaining(String(params.commodity)));
        expect(res.text).toEqual(expect.stringContaining('Import date'));
        expect(res.text).toEqual(expect.stringContaining(formatDate(date as ImportDate)));
        expect(res.text).toEqual(expect.stringContaining('Country of origin'));
        expect(res.text).toEqual(expect.stringContaining('China'));
        expect(res.text).toEqual(expect.stringContaining('Goods coming into'));
        expect(res.text).toEqual(expect.stringContaining('China'));
        expect(res.text).toEqual(expect.stringContaining('Classification'));
        expect(res.text).toEqual(expect.stringContaining('Live fish  &mdash; Other live fish  &mdash; Eels (Anguilla spp.) &mdash; <strong>Of a length of less than 12 cm</strong>'));
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
          path: Route.importCheckDeclarations,
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
    const controller = new ImportCheckDeclarationsController();
    await controller.importCheckDeclarations(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
