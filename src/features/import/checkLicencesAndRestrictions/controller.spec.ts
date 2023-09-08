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

import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';

import { Params } from '../../../interfaces/params.interface';
import ImportCheckLicencesAndRestrictionsController from './controller';

import { getParams } from '../../../utils/queryHelper';
import getTodaysDate from '../../../utils/tests/getTodaysDate';
import translation from '../../../translation/en';
import { renderMarkdown } from '../../../utils/filters/renderMarkdown';

import { mockedAdditionalQuestionsData } from '../../../utils/mockedAdditionalQuestionsData';

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

describe(`[GET] ${Route.importCheckLicencesAndRestrictions}`, () => {
  it('It should respond with statusCode 200', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(axiosRestrictiveMeasuresResponse);

    await request(app.getServer())
      .get(`${Route.importCheckLicencesAndRestrictions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('Check licences, certificates and other restrictions');
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should respond with statusCode 200 and show no measures or restrictions text', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      data: {
        measures: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(axiosRestrictiveMeasuresResponse);

    await request(app.getServer())
      .get(`${Route.importCheckLicencesAndRestrictions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('There are no measures or restrictions for importing this commodity into the UK from China');
        expect(res.text).toContain('Please check back later, as the rules may change.');
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should respond with statusCode 200 and show correct content for non_declaring_trader', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(axiosRestrictiveMeasuresResponse);

    params.importDeclarations = 'no';

    await request(app.getServer())
      .get(`${Route.importCheckLicencesAndRestrictions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toContain(
          renderMarkdown(translation.common.measures.checkLicensesAndCertificates.non_declaring_trader(), translation),
        );
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should respond with statusCode 200 and show correct content for declaring_trader', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(axiosRestrictiveMeasuresResponse);

    params.importDeclarations = 'yes';

    const showSdsContent = `#### ${translation.common.measures['999L'].header}\n\n${translation.common.measures['999L'].body}`;

    await request(app.getServer())
      .get(`${Route.importCheckLicencesAndRestrictions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toContain(
          renderMarkdown(translation.common.measures.checkLicensesAndCertificates.declaring_trader(showSdsContent), translation),
        );
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should respond with statusCode 200 and show correct content for intermediary', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(axiosRestrictiveMeasuresResponse);

    params.userTypeTrader = 'no';

    const showSdsContent = `#### ${translation.common.measures['999L'].header}\n\n${translation.common.measures['999L'].body}`;

    await request(app.getServer())
      .get(`${Route.importCheckLicencesAndRestrictions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toContain(
          renderMarkdown(translation.common.measures.checkLicensesAndCertificates.intermediary(showSdsContent), translation),
        );
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it(`It should respond with statusCode 200 and redirect back to ${Route.importCheckLicencesAndRestrictions} correct copy when each selected yes`, async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedAdditionalQuestionsData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(axiosRestrictiveMeasuresResponse);

    params.additionalCode = 'false';

    await request(app.getServer())
      .get(`${Route.importCheckLicencesAndRestrictions}${getParams(params)}&710=yes&712=yes&750=yes&additional-question=750&360=yes`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).not.toContain('999L waiver applies');
        expect(res.text).not.toContain('descriptionOverlay Y251');
        expect(res.text).toContain('descriptionOverlay N851');
        expect(res.text).toContain('descriptionOverlay C644');
        expect(res.text).not.toContain('descriptionOverlay Y929');
        expect(res.text).toContain('descriptionOverlay C400');
        expect(res.text).not.toContain('descriptionOverlay Y900');
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it(`It should respond with statusCode 200 and redirect back to ${Route.importCheckLicencesAndRestrictions} with correct copy when each selected no`, async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedAdditionalQuestionsData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(axiosRestrictiveMeasuresResponse);

    params.additionalCode = 'false';

    await request(app.getServer())
      .get(`${Route.importCheckLicencesAndRestrictions}${getParams(params)}&710=no&712=no&750=no&additional-question=750&360=no`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).not.toContain('999L waiver applies');
        expect(res.text).toContain('descriptionOverlay Y251');
        expect(res.text).not.toContain('descriptionOverlay N851');
        expect(res.text).not.toContain('descriptionOverlay C644');
        expect(res.text).toContain('descriptionOverlay Y929');
        expect(res.text).not.toContain('descriptionOverlay C400');
        expect(res.text).toContain('descriptionOverlay Y900');
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it(`It should respond with statusCode 200 and redirect back to ${Route.importCheckLicencesAndRestrictions} with correct copy when each selected notSure`, async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedAdditionalQuestionsData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(axiosRestrictiveMeasuresResponse);

    params.additionalCode = 'false';

    await request(app.getServer())
      .get(`${Route.importCheckLicencesAndRestrictions}${getParams(params)}&710=notSure&712=notSure&750=notSure&additional-question=750&360=notSure`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('999L waiver also applies');
        expect(res.text).toContain('descriptionOverlay Y251');
        expect(res.text).toContain('descriptionOverlay N851');
        expect(res.text).toContain('descriptionOverlay C644');
        expect(res.text).toContain('descriptionOverlay Y929');
        expect(res.text).toContain('descriptionOverlay C400');
        expect(res.text).toContain('descriptionOverlay Y900');
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it(`It should respond with statusCode 200 and redirect to ${Route.typeOfTrade} when missing commodity param`, async () => {
    params.additionalCode = 'someCode';
    delete params.commodity;
    await request(app.getServer())
      .get(`${Route.importCheckLicencesAndRestrictions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.typeOfTrade}`);
  });

  it(`It should respond with statusCode 200 and redirect to ${Route.importDate} when invalid date`, async () => {
    params.importDateMonth = 'someDate';
    await request(app.getServer())
      .get(`${Route.importCheckLicencesAndRestrictions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.importDate}${getParams(params)}&error=Enter%20a%20month%20using%20numbers%20only`);
  });

  it(`It should respond with statusCode 200 and redirect to ${Route.importGoods} when commodity not found`, async () => {
    params.commodity = '0000000000';
    await request(app.getServer())
      .get(`${Route.importCheckLicencesAndRestrictions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.importGoods}${getParams(params)}&error=This%20code%20is%20not%20valid.%20Enter%20a%20valid%20commodity%20code`);
  });

  it('It should throw an error and call next', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
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
          path: Route.importCheckLicencesAndRestrictions,
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
    const controller = new ImportCheckLicencesAndRestrictionsController(mockedStwTradeTariffApi);
    await controller.importCheckLicencesAndRestrictions(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
