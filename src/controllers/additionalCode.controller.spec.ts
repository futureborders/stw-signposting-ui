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
import { AxiosResponse } from 'axios';
import App from '../app';
import IndexRoute from '../routes/index.route';
import 'dotenv/config';

import StwTradeTariffApi from '../services/StwTradeTariffApi.service';
import TradeTariffApi from '../services/TradeTariffApi.service';
import { Route } from '../interfaces/routes.interface';
import { getParams } from '../utils/queryHelper';
import translation from '../translation/en';

import {
  mockedRestrictiveMeasures,
  mockedAdditionalCodeData,
  mockedInvalidDestinationError,
  mockedOriginCountryError,
  mockedInvalidTradeTypeError,
} from '../utils/mockedData';
import CommodityNotFoundException from '../exceptions/commodityNotFoundException';
import InvalidDestinationCountryError from '../exceptions/invalidDestinationCountry';
import InvalidOriginCountryError from '../exceptions/invalidOriginCountry';
import InvalidTradeTypeError from '../exceptions/invalidTradeType';
import { Params } from '../interfaces/params.interface';
import getTodaysDate from '../utils/tests/getTodaysDate';

jest.mock('../services/TradeTariffApi.service');
jest.mock('../services/StwTradeTariffApi.service');

const MockedTradeTariffApi = <jest.Mock<TradeTariffApi>>TradeTariffApi;
const mockedTradeTariffApi = <jest.Mocked<TradeTariffApi>>(
  new MockedTradeTariffApi()
);

const MockedStwTradeTariffApi = <jest.Mock<StwTradeTariffApi>>StwTradeTariffApi;
const mockedStwTradeTariffApi = <jest.Mocked<StwTradeTariffApi>>(
  new MockedStwTradeTariffApi()
);

jest.mock('../middlewares/auth-middleware', () => jest.fn((req, res, next) => next()));

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
    userTypeTrader: 'true',
    destinationCountry: 'GB',
    originCountry: 'XX',
    importDateDay: getTodaysDate.day,
    importDateMonth: getTodaysDate.month,
    importDateYear: getTodaysDate.year,
    additionalCode: 'false',
  };
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe(`[GET] ${Route.additionalCode}`, () => {
  it('It should return status 200', async () => {
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
      .get(`${Route.additionalCode}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(
          expect.stringContaining(
            'Describe the goods you are importing in more detail',
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

  it('It should return status 200 (no originCountry)', async () => {
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

    params.originCountry = '';
    params.destinationCountry = 'NI';

    await request(app.getServer())
      .get(`${Route.additionalCode}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(
          expect.stringContaining(
            'Describe the goods you are importing in more detail',
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

  it('It should respond with statusCode 302 and redirect back to import-goods on failed regex (commodity required)', () => {
    params.commodity = '';
    return request(app.getServer())
      .get(`${Route.additionalCode}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importGoods}${getParams(params)}&error=${encodeURIComponent(translation.page.importGoods.errors.required)}`,
      );
  });

  it('It should respond with statusCode 302 and redirect back to import-goods on failed regex (commodity must be a number)', () => {
    params.commodity = 'abc';
    return request(app.getServer())
      .get(`${Route.additionalCode}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importGoods}${getParams(params)}&error=${encodeURIComponent(translation.page.importGoods.errors.mustBeNumber)}`,
      );
  });

  it('It should respond with statusCode 302 and redirect back to import-goods on failed regex (commodity length)', () => {
    params.commodity = '12345678910';
    return request(app.getServer())
      .get(`${Route.additionalCode}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importGoods}${getParams(params)}&error=${encodeURIComponent(translation.page.importGoods.errors.digits)}`,
      );
  });

  it('It should respond with statusCode 302 and redirect back to import-goods if commodity not found', async () => {
    mockedStwTradeTariffApi.getAdditionalCode.mockRejectedValue(
      new CommodityNotFoundException('1234567890'),
    );
    params.commodity = '1234567800';
    return request(app.getServer())
      .get(
        `${Route.additionalCode}${getParams(params)}`,
      )
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importGoods}${getParams(params)}&error=${encodeURIComponent(translation.page.importGoods.errors.commodityNotFound)}`,
      );
  });

  it('It should respond with statusCode 302 and redirect back to manage-this-trade when no additionalCode', () => {
    const axiosTradeDataResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const axiosAdditionalCodeResponse: AxiosResponse = {
      data: [],
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );
    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );

    const paramsWithoutAdditionalCode = getParams(params).replace('&additionalCode=false', '');

    return request(app.getServer())
      .get(`${Route.additionalCode}${paramsWithoutAdditionalCode}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.manageThisTrade}${getParams(params)}`,
      );
  });

  it(`It should respond with statusCode 302 and redirect back to ${Route.typeOfTrade} if missing commodity param`, async () => {
    delete params.tradeType;
    return request(app.getServer())
      .get(`${Route.additionalCode}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', Route.typeOfTrade);
  });

  it(`It should respond with statusCode 302 and redirect back to ${Route.importDate} if invalidDate`, async () => {
    params.importDateDay = '99';
    return request(app.getServer())
      .get(`${Route.additionalCode}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.importDate}${getParams(params)}&error=${encodeURIComponent(translation.page.importDate.errorInvalidDay)}`);
  });

  it(`It should respond with statusCode 302 and redirect back to ${Route.importDate} if invalidDestinationCountry`, async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      ...mockedInvalidDestinationError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getAdditionalCode.mockRejectedValue(
      new InvalidDestinationCountryError(axiosTradeDataResponse),
    );

    params.destinationCountry = 'INVALID_DESTINATION_COUNTRY';

    await request(app.getServer())
      .get(`${Route.additionalCode}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.destinationCountry}${getParams(params)}&error=${encodeURIComponent(translation.page.destinationCountry.error)}`,
      );

    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });

  it(`It should respond with statusCode 302 and redirect back to ${Route.importCountryOrigin} on invalidOriginCountry`, async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      ...mockedOriginCountryError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getAdditionalCode.mockRejectedValue(
      new InvalidOriginCountryError(axiosTradeDataResponse),
    );

    params.originCountry = 'INVALID_ORIGIN_COUNTRY';

    await request(app.getServer())
      .get(`${Route.additionalCode}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importCountryOrigin}${getParams(params)}&error=${encodeURIComponent(translation.page.importCountryOrigin.error)}`,
      );
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });

  it(`It should respond with statusCode 302 and redirect back to ${Route.typeOfTrade} on InvalidTradeType`, async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      ...mockedInvalidTradeTypeError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getAdditionalCode.mockRejectedValue(
      new InvalidTradeTypeError(axiosTradeDataResponse),
    );

    params.tradeType = 'INVALID_TRADE_TYPE';

    await request(app.getServer())
      .get(`${Route.additionalCode}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.typeOfTrade}${getParams(params)}&error=${encodeURIComponent(translation.page.typeOfTrade.error)}`,
      );
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });
});
