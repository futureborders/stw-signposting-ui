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
  mockedRestrictiveMeasures,
} from '../../../utils/mockedData';

import { mockedAdditionalQuestionsData } from '../../../utils/mockedAdditionalQuestionsData';

import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';

import { Params } from '../../../interfaces/params.interface';
import ImportAdditionalQuestionsController from './controller';

import { getParams } from '../../../utils/queryHelper';
import getTodaysDate from '../../../utils/tests/getTodaysDate';
import translation from '../../../translation/en';
import { MeasureType } from '../../../interfaces/enums.interface';

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

describe(`[GET] ${Route.importAdditionalQuestions}`, () => {
  it('It should respond with statusCode 200 and show additional question for CITES', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(axiosRestrictiveMeasuresResponse);

    await request(app.getServer())
      .get(`${Route.importAdditionalQuestions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toContain(translation.page.additionalQuestions[MeasureType.CITES].question);
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it(`It should respond with statusCode 200 and redirect back to ${Route.importAdditionalQuestions} with error`, async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(axiosRestrictiveMeasuresResponse);
    params.additionalCode = 'someCode';
    params['additional-question'] = '710';

    await request(app.getServer())
      .get(`${Route.importAdditionalQuestions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toContain(translation.page.additionalQuestions[MeasureType.CITES].question);
        expect(res.text).toContain(translation.page.additionalQuestions[MeasureType.CITES].errorText);
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should respond with statusCode 200 and show next additional question for ORGANICS', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(axiosRestrictiveMeasuresResponse);

    params['additional-question'] = '710';
    params['710'] = 'yes';

    await request(app.getServer())
      .get(`${Route.importAdditionalQuestions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toContain(translation.page.additionalQuestions[MeasureType.ORGANICS].question);
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it(`It should respond with statusCode 200 and redirect to ${Route.importCheckLicencesAndRestrictions}`, async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(axiosRestrictiveMeasuresResponse);

    params['additional-question'] = '750';
    params['710'] = 'yes';
    params['750'] = 'yes';

    await request(app.getServer())
      .get(`${Route.importAdditionalQuestions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.importCheckLicencesAndRestrictions}${getParams(params)}`);
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it(`It should respond with statusCode 200 and redirect to ${Route.typeOfTrade} when missing commodity param`, async () => {
    delete params.commodity;
    await request(app.getServer())
      .get(`${Route.importAdditionalQuestions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.typeOfTrade}`);
  });

  it(`It should respond with statusCode 200 and redirect to ${Route.importDate} when invalid date`, async () => {
    params.importDateMonth = 'someDate';
    await request(app.getServer())
      .get(`${Route.importAdditionalQuestions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.importDate}${getParams(params)}&error=Enter%20a%20month%20using%20numbers%20only`);
  });

  it(`It should respond with statusCode 200 and redirect to ${Route.importGoods} when commodity not found`, async () => {
    params.commodity = '0000000000';
    await request(app.getServer())
      .get(`${Route.importAdditionalQuestions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.importGoods}${getParams(params)}&error=This%20code%20is%20not%20valid.%20Enter%20a%20valid%20commodity%20code`);
  });

  it('It should return status 500', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedAdditionalQuestionsData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(axiosRestrictiveMeasuresResponse);

    const createMockRequest = () => (
      {
        query: {
          additionalCode: 'false',
          ...params,
        },
        route: {
          path: Route.importAdditionalQuestions,
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
    mockResponse.render = () => { throw mockError; };
    const controller = new ImportAdditionalQuestionsController(mockedStwTradeTariffApi);
    await controller.importAdditionalQuestions(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
