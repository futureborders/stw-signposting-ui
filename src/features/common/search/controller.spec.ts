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

import {
  mockedSearchDataCommodity,
  mockedSearchDataCommodities,
  mockedSearchDataChapter,
  mockedSearchDataChapters,
  mockedSearchDataHorses,
  mockedSearchDataCommodityAdditionalCode,
  mockedSearchDataAdditionalCode,
  mockedSearchDataHeading,
  mockedSearchDataSubheading,
  mockedSearchDataSubheadingLvl,
  mockedSearchDataDeclarableHeading,
} from '../../../utils/mockedSearchData';

import {
  mockedInvalidDestinationError,
  mockedOriginCountryError,
  mockedInvalidTradeTypeError,
} from '../../../utils/mockedData';

import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';
import InvalidDestinationCountryError from '../../../exceptions/invalidDestinationCountry';
import InvalidOriginCountryError from '../../../exceptions/invalidOriginCountry';
import InvalidTradeTypeError from '../../../exceptions/invalidTradeType';
import { Params } from '../../../interfaces/params.interface';

import { getParams } from '../../../utils/queryHelper';
import translation from '../../../translation/en';
import getTodaysDate from '../../../utils/tests/getTodaysDate';
import Search from './controller';

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
let exportParams:Params = {};

beforeEach(() => {
  jest.clearAllMocks();
  params = {
    commodity: '1006101000',
    tradeType: 'import',
    goodsIntent: 'bringGoodsToSell',
    importDeclarations: 'yes',
    userTypeTrader: 'yes',
    destinationCountry: 'GB',
    originCountry: 'XX',
    additionalCode: 'false',
    importDateDay: getTodaysDate.day,
    importDateMonth: getTodaysDate.month,
    importDateYear: getTodaysDate.year,
  };
  exportParams = {
    commodity: '1006101000',
    tradeType: 'export',
    exportDeclarations: 'yes',
    destinationCountry: 'CN',
    originCountry: 'GB',
    tradeDateDay: getTodaysDate.day,
    tradeDateMonth: getTodaysDate.month,
    tradeDateYear: getTodaysDate.year,
    exportGoodsIntent: 'goodsExportedToBeSoldForBusiness',
  };
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe(`[GET] ${Route.search}`, () => {
  it('It should return status 200 and display chapters', async () => {
    const axiosSearchDataResponse: AxiosResponse = {
      ...mockedSearchDataChapter,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const searchTradeTariffByTypeResponse: AxiosResponse = {
      ...mockedSearchDataChapters,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedTradeTariffApi.searchTradeTariffByType.mockResolvedValue(searchTradeTariffByTypeResponse);
    mockedTradeTariffApi.searchTradeTariff.mockResolvedValue(axiosSearchDataResponse.data);

    params.commodity = 'apples';

    await request(app.getServer())
      .get(`${Route.search}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => expect(res.text).toEqual(
        expect.stringContaining(
          'Fruit, dried, other than that of headings 0801 to 0806; mixtures of nuts or dried fruits of this chapter',
        ),
      ));
  });

  it('It should return status 200 and display commodities and categories', async () => {
    const axiosSearchDataResponse: AxiosResponse = {
      ...mockedSearchDataHorses,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const searchTradeTariffByTypeResponse: AxiosResponse = {
      ...mockedSearchDataCommodities,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedTradeTariffApi.searchTradeTariffByType.mockResolvedValue(searchTradeTariffByTypeResponse);
    mockedTradeTariffApi.searchTradeTariff.mockResolvedValue(axiosSearchDataResponse.data);

    params.commodity = 'horses';

    await request(app.getServer())
      .get(`${Route.search}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Categories matching \'horses\''));
        expect(res.text).toEqual(expect.stringContaining('Commodities matching \'horses\''));
        expect(res.text).toEqual(expect.stringContaining('Live <mark>horses</mark>, asses, mules and hinnies'));
        expect(res.text).toEqual(expect.stringContaining('0206909100'));
      });
  });

  it('It should return status 200 and display additional codes page', async () => {
    const axiosSearchDataResponse: AxiosResponse = {
      ...mockedSearchDataCommodityAdditionalCode,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const axiosAdditionalCodeResponse: AxiosResponse = {
      ...mockedSearchDataAdditionalCode,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(axiosAdditionalCodeResponse);
    mockedTradeTariffApi.searchTradeTariff.mockResolvedValue(axiosSearchDataResponse.data);

    params.commodity = '9102910000';
    params.originCountry = 'IQ';

    await request(app.getServer())
      .get(`${Route.search}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.additionalCode}${getParams(params)}`,
      );
  });

  it('It should return status 302 and redirect to /search:id wih a valid commodityCode', async () => {
    const axiosSearchDataResponse: AxiosResponse = {
      ...mockedSearchDataHeading,
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

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(axiosAdditionalCodeResponse);
    mockedTradeTariffApi.searchTradeTariff.mockResolvedValue(axiosSearchDataResponse.data);

    params.commodity = 'cheese';

    await request(app.getServer())
      .get(`${Route.search}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.search}/${mockedSearchDataHeading.data.results[0].goods_nomenclature_item_id}/0${getParams(params)}&isHeading=true`,
      );
  });

  it(`It should return status 302 and redirect to ${Route.checkYourAnswers} wih a valid commodityCode`, async () => {
    const axiosSearchDataResponse: AxiosResponse = {
      ...mockedSearchDataCommodity,
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

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(axiosAdditionalCodeResponse);
    mockedTradeTariffApi.searchTradeTariff.mockResolvedValue(axiosSearchDataResponse.data);

    params.commodity = '1006101000';
    delete params.additionalCode;

    await request(app.getServer())
      .get(`${Route.search}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.checkYourAnswers}${getParams(params)}`,
      );
  });

  it('It should return status 302 and redirect to previous page with empty commodity', async () => {
    const axiosSearchDataResponse: AxiosResponse = {
      ...mockedSearchDataCommodity,
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

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(axiosAdditionalCodeResponse);
    mockedTradeTariffApi.searchTradeTariff.mockResolvedValue(axiosSearchDataResponse.data);

    params.commodity = '';

    await request(app.getServer())
      .get(`${Route.search}${getParams(params)}&isEdit=true`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importGoods}${getParams(params)}&isEdit=true&error=${encodeURIComponent(translation.page.importGoods.errors.required)}`,
      );
  });

  it('It should return status 302 and redirect to /type-of-trade', async () => {
    const axiosSearchDataResponse: AxiosResponse = {
      ...mockedSearchDataCommodity,
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

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(axiosAdditionalCodeResponse);
    mockedTradeTariffApi.searchTradeTariff.mockResolvedValue(axiosSearchDataResponse.data);

    params.commodity = '';

    await request(app.getServer())
      .get(`${Route.search}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importGoods}${getParams(params)}&error=${encodeURIComponent(translation.page.importGoods.errors.required)}`,
      );
  });

  it('It should return status 302 and redirect to /import-date when invalid date', async () => {
    params.importDateDay = '99';
    await request(app.getServer())
      .get(`${Route.search}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importDate}${getParams(params)}&error=${encodeURIComponent(translation.page.importDate.errorInvalidDay)}`,
      );
  });

  it('It should return status 302 and redirect to /destination-country when invalidDestinationCountry', async () => {
    const axiosAdditionalCodeResponse: AxiosResponse = {
      ...mockedInvalidDestinationError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getAdditionalCode.mockRejectedValue(
      new InvalidDestinationCountryError(axiosAdditionalCodeResponse),
    );

    params.destinationCountry = 'INVALID_DESTINATION_COUNTRY';

    await request(app.getServer())
      .get(`${Route.search}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.destinationCountry}${getParams(params)}&error=${encodeURIComponent(translation.page.destinationCountry.error)}`,
      );
  });

  it('It should return status 302 and redirect to /country-of-origin when invalidOriginCountry', async () => {
    const axiosAdditionalCodeResponse: AxiosResponse = {
      ...mockedOriginCountryError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getAdditionalCode.mockRejectedValue(
      new InvalidOriginCountryError(axiosAdditionalCodeResponse),
    );

    params.originCountry = 'INVALID_ORIGIN_COUNTRY';

    await request(app.getServer())
      .get(`${Route.search}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importCountryOrigin}${getParams(params)}&error=${encodeURIComponent(translation.page.importCountryOrigin.error)}`,
      );
  });

  it('It should return status 302 and redirect to /type-of-trade when invalidTradeType', async () => {
    const axiosAdditionalCodeResponse: AxiosResponse = {
      ...mockedInvalidTradeTypeError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getAdditionalCode.mockRejectedValue(
      new InvalidTradeTypeError(axiosAdditionalCodeResponse),
    );

    params.tradeType = 'INVALID_TRADE_TYPE';

    await request(app.getServer())
      .get(`${Route.search}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.typeOfTrade}${getParams(params)}&error=${encodeURIComponent(translation.page.typeOfTrade.error)}`,
      );
  });

  it('It should return status 302 and redirect to /type-of-trade when missing param', async () => {
    delete params.tradeType;
    await request(app.getServer())
      .get(`${Route.search}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', Route.typeOfTrade);
  });

  it('It should return status 302 and display subheadings', async () => {
    const axiosSearchDataResponse: AxiosResponse = {
      ...mockedSearchDataSubheading,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const searchTradeTariffByTypeResponse: AxiosResponse = {
      ...mockedSearchDataSubheadingLvl,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedTradeTariffApi.searchTradeTariffByType.mockResolvedValue(searchTradeTariffByTypeResponse);
    mockedTradeTariffApi.searchTradeTariff.mockResolvedValue(axiosSearchDataResponse.data);

    params.commodity = 'lvl';

    await request(app.getServer())
      .get(`${Route.search}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.search}/4412410000/0${getParams(params)}&subheadingSuffix=10&isSubheading=true`);
  });

  it(`It should return status 302 and redirect to ${Route.checkYourAnswers} wih a valid commodityCode`, async () => {
    const axiosSearchDataResponse: AxiosResponse = {
      ...mockedSearchDataCommodity,
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

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(axiosAdditionalCodeResponse);
    mockedTradeTariffApi.searchTradeTariff.mockResolvedValue(axiosSearchDataResponse.data);

    await request(app.getServer())
      .get(`${Route.search}${getParams(exportParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.checkYourAnswers}${getParams(exportParams)}`,
      );
  });

  it(`It should return status 302 and redirect to ${Route.checkYourAnswers} wih a valid declarable heading`, async () => {
    const axiosSearchDataResponse: AxiosResponse = {
      ...mockedSearchDataDeclarableHeading,
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

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(axiosAdditionalCodeResponse);
    mockedTradeTariffApi.searchTradeTariff.mockResolvedValue(axiosSearchDataResponse.data);

    const requestParams = {
      ...exportParams,
      commodity: '1006',
    };

    await request(app.getServer())
      .get(`${Route.search}${getParams(requestParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.checkYourAnswers}${getParams(exportParams)}`,
      );
  });

  it('It should throw an error and call next', async () => {
    const createMockRequest = () => (
        {
          originalUrl: Route.search,
          query: {
            additionalCode: 'false',
            ...params,
          },
          route: {
            path: Route.search,
          },
          params: {
            sid: 'some-sid',
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
            backPath: Route.search,
          },
          redirect: jest.fn(),
        } as unknown as e.Response
    );
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockNext = jest.fn();
    const mockError = Error();
    mockResponse.redirect = () => { throw mockError; };
    const controller = new Search(mockedTradeTariffApi, mockedStwTradeTariffApi);
    await controller.search(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
