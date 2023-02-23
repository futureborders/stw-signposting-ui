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
import 'dotenv/config';
import {
  mockedRestrictiveMeasures,
  mockedRestrictiveMeasuresWithProhibitions,
  mockedAdditionalCodeData,
  mockedInvalidDestinationError,
  mockedOriginCountryError,
  mockedAdditionalCodeError,
  mockedInvalidTradeTypeError,
  mockedTariffAndTaxesData,
  mockedTradeDataWithHeaders,
} from '../utils/mockedData';

import StwTradeTariffApi from '../services/StwTradeTariffApi.service';
import TradeTariffApi from '../services/TradeTariffApi.service';
import { Route } from '../interfaces/routes.interface';
import IndexRoute from '../routes/index.route';

import CommodityNotFoundException from '../exceptions/commodityNotFoundException';
import InvalidDestinationCountryError from '../exceptions/invalidDestinationCountry';
import InvalidOriginCountryError from '../exceptions/invalidOriginCountry';
import InvalidAdditionalCodeError from '../exceptions/invalidAdditionalCode';
import InvalidTradeTypeError from '../exceptions/invalidTradeType';
import { Params } from '../interfaces/params.interface';

import { getParams } from '../utils/queryHelper';
import getTodaysDate from '../utils/tests/getTodaysDate';
import translation from '../translation/en';

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
    originCountry: 'CN',
    additionalCode: 'false',
    importDateDay: getTodaysDate.day,
    importDateMonth: getTodaysDate.month,
    importDateYear: getTodaysDate.year,
  };
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe(`[GET] ${Route.manageThisTrade}`, () => {
  it('It should return status 200', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
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

    const axiosTariffAndTaxesDataResponse: AxiosResponse = {
      ...mockedTariffAndTaxesData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );
    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );
    mockedStwTradeTariffApi.getTariffAndTaxesData.mockResolvedValue(
      axiosTariffAndTaxesDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('China'));
        expect(res.text).toEqual(expect.stringContaining('England, Scotland or Wales'));
        expect(res.text).toEqual(expect.stringContaining('0208907000'));
        expect(res.text).toEqual(expect.stringContaining("Frogs' legs"));
        expect(res.text).toEqual(
          expect.stringContaining('Before buying the goods'),
        );
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getTariffAndTaxesData).toHaveBeenCalled();
  });

  it('It should respond with statusCode 302 and redirect back to /destination-country on invalidDestinationCountry', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedInvalidDestinationError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockRejectedValue(
      new InvalidDestinationCountryError(axiosRestrictiveMeasuresResponse),
    );

    params.destinationCountry = 'INVALID_DESTINATION_COUNTRY';

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.destinationCountry}${getParams(params)}&error=${encodeURIComponent(translation.page.destinationCountry.error)}`,
      );
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should respond with statusCode 302 and redirect back to /destination-country on invalidDestinationCountry and originCountry = XI with no errors', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedInvalidDestinationError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };
    mockedStwTradeTariffApi.getRestrictiveMeasures.mockRejectedValue(
      new InvalidDestinationCountryError(axiosRestrictiveMeasuresResponse),
    );

    params.destinationCountry = 'INVALID_DESTINATION_COUNTRY';
    params.originCountry = 'XI';

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.destinationCountry}${getParams(params)}`,
      );
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should respond with statusCode 302 and redirect back to /import-origin-country on invalidOriginCountry', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedOriginCountryError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockRejectedValue(
      new InvalidOriginCountryError(axiosRestrictiveMeasuresResponse),
    );

    params.originCountry = 'INVALID_ORIGIN_COUNTRY';

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importCountryOrigin}${getParams(params)}&error=${encodeURIComponent(translation.page.importCountryOrigin.error)}`,
      );
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should respond with statusCode 302 and redirect back to /import-goods on invalidCommodityCode', async () => {
    mockedStwTradeTariffApi.getRestrictiveMeasures.mockRejectedValue(
      new CommodityNotFoundException(''),
    );

    params.commodity = 'INVALID_COMMODITY';

    return request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importGoods}${getParams(params)}&error=${encodeURIComponent(translation.page.importGoods.errors.commodityNotFound)}`,
      );
  });

  it('It should respond with statusCode 302 and redirect back to /import-goods on invalidCommodityCode (missing from codes.json)', async () => {
    params.commodity = '0000000000';

    return request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importGoods}${getParams(params)}&error=${encodeURIComponent(translation.page.importGoods.errors.commodityNotFound)}`,
      );
  });

  it('It should respond with statusCode 302 and redirect back to /additional-code on invalidAdditionalCode', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedAdditionalCodeError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };
    mockedStwTradeTariffApi.getRestrictiveMeasures.mockRejectedValue(
      new InvalidAdditionalCodeError(axiosRestrictiveMeasuresResponse),
    );

    params.additionalCode = 'INVALID_ADDITIONAL_CODE';

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.additionalCode}${getParams(params)}&error=${encodeURIComponent(translation.page.additionalCode.error)}`,
      );
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should respond with statusCode 302 and redirect back to /type-of-trade on invalidTradeType', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedInvalidTradeTypeError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };
    mockedStwTradeTariffApi.getRestrictiveMeasures.mockRejectedValue(
      new InvalidTradeTypeError(axiosRestrictiveMeasuresResponse),
    );

    params.tradeType = 'INVALID_TRADE_TYPE';

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.typeOfTrade}${getParams(params)}&error=${encodeURIComponent(translation.page.typeOfTrade.error)}`,
      );
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should respond with statusCode 302 and redirect back to /import-goods on additionalCode=false', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedAdditionalCodeError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockRejectedValue(
      new InvalidAdditionalCodeError(axiosRestrictiveMeasuresResponse),
    );

    params.additionalCode = 'false';

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importGoods}${getParams(params)}&error=${encodeURIComponent(translation.page.additionalCode.error)}`,
      );
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should respond with statusCode 302 and redirect back to /additional-code when isInvalidAdditionalCode with errors', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const axiosAdditionalCodeResponse: AxiosResponse = {
      ...mockedAdditionalCodeData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );
    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );

    params.commodity = '9102910000';
    params.originCountry = 'IQ';

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.additionalCode}${getParams(params)}&error=${encodeURIComponent(translation.page.additionalCode.error)}`,
      );
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });

  it('It should respond with statusCode 302 and redirect back to /additional-code when isInvalidAdditionalCode without errors', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const axiosAdditionalCodeResponse: AxiosResponse = {
      ...mockedAdditionalCodeData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );
    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );

    params.commodity = '9102910000';
    params.originCountry = 'IQ';
    params.original = 'GB';

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.additionalCode}${getParams(params)}`,
      );
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });

  it('It should return status 200 and show sanctions page', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasuresWithProhibitions,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
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

    const axiosTariffAndTaxesDataResponse: AxiosResponse = {
      ...mockedTariffAndTaxesData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );
    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );
    mockedStwTradeTariffApi.getTariffAndTaxesData.mockResolvedValue(
      axiosTariffAndTaxesDataResponse,
    );

    params.additionalCode = 'false';

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importProhibitionsAndRestrictions}${getParams(params)}`,
      );
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });

  it('It should respond with statusCode 302 and redirect back to additional-code if commodity not found', async () => {
    mockedStwTradeTariffApi.getRestrictiveMeasures.mockRejectedValue(
      new CommodityNotFoundException(`${params.commodity}`),
    );

    params.additionalCode = '1234';

    return request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.additionalCode}${getParams(params)}&error=${encodeURIComponent(translation.page.importGoods.errors.commodityNotFound)}`,
      );
  });

  it(`It should respond with statusCode 302 and redirect back to ${Route.typeOfTrade} if missing param tradeType`, async () => {
    delete params.tradeType;
    return request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', Route.typeOfTrade);
  });

  it(`It should respond with statusCode 302 and redirect back to ${Route.importDate} if invalidDate`, async () => {
    params.importDateDay = '99';
    return request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importDate}${getParams(params)}&error=${encodeURIComponent(translation.page.importDate.errorInvalidDay)}`,
      );
  });

  it('It should return status 200 and display the correct links', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedTradeDataWithHeaders,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
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

    const axiosTariffAndTaxesDataResponse: AxiosResponse = {
      ...mockedTariffAndTaxesData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );
    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );
    mockedStwTradeTariffApi.getTariffAndTaxesData.mockResolvedValue(
      axiosTariffAndTaxesDataResponse,
    );

    params.destinationCountry = 'XI';

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Before buying the goods'));
        expect(res.text).toEqual(expect.stringContaining('Check licences, certificates and other restrictions'));
        expect(res.text).toEqual(expect.stringContaining(`${Route.manageThisTrade}/check-licences-certificates-and-other-restrictions`));
        expect(res.text).toEqual(expect.stringContaining('Calculate the Customs Duty and Import VAT (opens in new tab)'));
        expect(res.text).toEqual(expect.stringContaining('https://www.trade-tariff.service.gov.uk/duty-calculator/prefill'));
        expect(res.text).toEqual(expect.stringContaining('Register to bring goods across the border'));
        expect(res.text).toEqual(expect.stringContaining(`${Route.manageThisTrade}/register-to-bring-goods-across-the-border`));
        expect(res.text).toEqual(expect.stringContaining('When the goods are ready to import'));
        expect(res.text).toEqual(expect.stringContaining('Check what information and documents you may need'));
        expect(res.text).toEqual(expect.stringContaining(`${Route.manageThisTrade}/check-what-information-and-documents-you-may-need`));
        expect(res.text).toEqual(expect.stringContaining('Find out how to make an entry summary declaration (ENS) (opens in new tab)'));
        expect(res.text).toEqual(expect.stringContaining('https://www.gov.uk/guidance/making-an-entry-summary-declaration'));
        expect(res.text).toEqual(expect.stringContaining('Find out how to make an import declaration (opens in new tab)'));
        expect(res.text).toEqual(expect.stringContaining('https://www.gov.uk/guidance/making-a-full-import-declaration'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getTariffAndTaxesData).toHaveBeenCalled();
  });

  it('It should return status 200 and not show "Find out how to make an import declaration" link for nonDeclaringTrader', async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
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

    const axiosTariffAndTaxesDataResponse: AxiosResponse = {
      ...mockedTariffAndTaxesData,
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
    mockedStwTradeTariffApi.getTariffAndTaxesData.mockResolvedValue(
      axiosTariffAndTaxesDataResponse,
    );

    params.importDeclarations = 'no';

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).not.toContain('Find out how to make an import declaration (opens in new tab)');
        expect(res.text).not.toContain('https://www.gov.uk/guidance/making-a-full-import-declaration');
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getTariffAndTaxesData).toHaveBeenCalled();
  });

  it('It should return status 200 and display the correct links including additionalQuestions link', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
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

    const axiosTariffAndTaxesDataResponse: AxiosResponse = {
      ...mockedTariffAndTaxesData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };
    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );
    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );
    mockedStwTradeTariffApi.getTariffAndTaxesData.mockResolvedValue(
      axiosTariffAndTaxesDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Before buying the goods'));
        expect(res.text).toEqual(expect.stringContaining('Check licences, certificates and other restrictions'));
        expect(res.text).toEqual(expect.stringContaining(`${Route.manageThisTrade}/additional-question`));
        expect(res.text).toEqual(expect.stringContaining('Calculate the Customs Duty and Import VAT'));
        expect(res.text).toEqual(expect.stringContaining(`${Route.manageThisTrade}/calculate-the-customs-duty-and-import-vat?`));
        expect(res.text).toEqual(expect.stringContaining('Register to bring goods across the border'));
        expect(res.text).toEqual(expect.stringContaining(`${Route.manageThisTrade}/register-to-bring-goods-across-the-border`));
        expect(res.text).toEqual(expect.stringContaining('When the goods are ready to import'));
        expect(res.text).toEqual(expect.stringContaining('Check what information and documents you may need'));
        expect(res.text).toEqual(expect.stringContaining(`${Route.manageThisTrade}/check-what-information-and-documents-you-may-need`));
        expect(res.text).toEqual(expect.stringContaining('Find out how to make an entry summary declaration (ENS) (opens in new tab)'));
        expect(res.text).toEqual(expect.stringContaining('https://www.gov.uk/guidance/making-an-entry-summary-declaration'));
        expect(res.text).toEqual(expect.stringContaining('Find out how to make an import declaration (opens in new tab)'));
        expect(res.text).toEqual(expect.stringContaining('https://www.gov.uk/guidance/making-a-full-import-declaration'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getTariffAndTaxesData).toHaveBeenCalled();
  });

  it('It should return status 200 and display no import declaration needed when originCountry = XI and destinationCountry = GB', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedTradeDataWithHeaders,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
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

    const axiosTariffAndTaxesDataResponse: AxiosResponse = {
      ...mockedTariffAndTaxesData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };
    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );
    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );
    mockedStwTradeTariffApi.getTariffAndTaxesData.mockResolvedValue(
      axiosTariffAndTaxesDataResponse,
    );

    params.destinationCountry = 'GB';
    params.originCountry = 'XI';

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining(translation.page.manageThisTrade.importDeclarationsNotRequired));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getTariffAndTaxesData).toHaveBeenCalled();
  });

  it('It should return status 200 and display no import declaration needed when originCountry is in the EU and destinationCountry = XI', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedTradeDataWithHeaders,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
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

    const axiosTariffAndTaxesDataResponse: AxiosResponse = {
      ...mockedTariffAndTaxesData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );
    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );
    mockedStwTradeTariffApi.getTariffAndTaxesData.mockResolvedValue(
      axiosTariffAndTaxesDataResponse,
    );

    params.destinationCountry = 'XI';
    params.originCountry = 'FR';

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.northernIrelandAndEUTrading}${getParams(params)}`,
      );
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getTariffAndTaxesData).toHaveBeenCalled();
  });

  it('It should return status 200 and display the correct link with no duties or vat to pay', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedTradeDataWithHeaders,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
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

    mockedTariffAndTaxesData.data.tariffs = [
      {
        measureTypeId: '305',
        text: 'Preferential tariff quota',
        subtext: null,
        value: '0.00 %',
        additionalCode: null,
        geographicalArea: {
          id: 'MA',
          description: 'Morocco',
        },
        quota: {
          number: '051104',
        },
      },
    ];

    mockedTariffAndTaxesData.data.taxes = [
      {
        measureTypeId: '305',
        text: 'Value added tax',
        subtext: null,
        value: '0.00 %',
        additionalCode: null,
      },
    ];

    const axiosTariffAndTaxesDataResponse: AxiosResponse = {
      ...mockedTariffAndTaxesData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );
    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );
    mockedStwTradeTariffApi.getTariffAndTaxesData.mockResolvedValue(
      axiosTariffAndTaxesDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('There is no Customs Duty to pay'));
        expect(res.text).toEqual(expect.stringContaining('There is no Import VAT to pay'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getTariffAndTaxesData).toHaveBeenCalled();
  });

  it('It should return status 200 and display the correct message and link with no duty to pay but VAT to pay', async () => {
    mockedTariffAndTaxesData.data.tariffs = [
      {
        measureTypeId: '103',
        text: 'Third country duty',
        subtext: null,
        value: '0.00 %',
        additionalCode: null,
        geographicalArea: { id: '1011', description: 'ERGA OMNES' },
        quota: null,
      },
    ];

    mockedTariffAndTaxesData.data.taxes = [
      {
        measureTypeId: '305',
        text: 'Value added tax',
        subtext: null,
        value: '5.00 %',
        additionalCode: null,
      },
    ];

    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedTradeDataWithHeaders,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
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

    const axiosTariffAndTaxesDataResponse: AxiosResponse = {
      ...mockedTariffAndTaxesData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );
    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );
    mockedStwTradeTariffApi.getTariffAndTaxesData.mockResolvedValue(
      axiosTariffAndTaxesDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('There is no Customs Duty to pay'));
        expect(res.text).toEqual(expect.stringContaining('Calculate the Import VAT (opens in new tab)'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getTariffAndTaxesData).toHaveBeenCalled();
  });

  it('It should return status 200 and display the correct link with tax and duty to pay', async () => {
    mockedTariffAndTaxesData.data.tariffs = [
      {
        measureTypeId: '105',
        text: 'Preferential tariff quota',
        subtext: null,
        value: '5.00 %',
        additionalCode: null,
        geographicalArea: {
          id: 'MA',
          description: 'Morocco',
        },
        quota: {
          number: '051104',
        },
      },
    ];

    mockedTariffAndTaxesData.data.taxes = [
      {
        measureTypeId: '305',
        text: 'Value added tax',
        subtext: null,
        value: '5.00 %',
        additionalCode: null,
      },
    ];

    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedTradeDataWithHeaders,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
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

    const axiosTariffAndTaxesDataResponse: AxiosResponse = {
      ...mockedTariffAndTaxesData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };
    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );
    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );
    mockedStwTradeTariffApi.getTariffAndTaxesData.mockResolvedValue(
      axiosTariffAndTaxesDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Calculate the Customs Duty and Import VAT'));
        expect(res.text).toEqual(expect.stringContaining('/manage-this-trade/calculate-the-customs-duty-and-import-vat?'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getTariffAndTaxesData).toHaveBeenCalled();
  });

  it('It should return status 200 and display the correct link when importing to XI from GB', async () => {
    params.destinationCountry = 'XI';
    params.originCountry = 'GB';

    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedTradeDataWithHeaders,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
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

    const axiosTariffAndTaxesDataResponse: AxiosResponse = {
      ...mockedTariffAndTaxesData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };
    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );
    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );
    mockedStwTradeTariffApi.getTariffAndTaxesData.mockResolvedValue(
      axiosTariffAndTaxesDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Calculate the Customs Duty and Import VAT (opens in new tab)'));
        expect(res.text).toEqual(expect.stringContaining('https://www.trade-tariff.service.gov.uk/duty-calculator/prefill?'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getTariffAndTaxesData).toHaveBeenCalled();
  });

  it('It should return status 200 and display the correct link when importing to XI from CN', async () => {
    params.destinationCountry = 'XI';
    params.originCountry = 'CN';

    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedTradeDataWithHeaders,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
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

    const axiosTariffAndTaxesDataResponse: AxiosResponse = {
      ...mockedTariffAndTaxesData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );
    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );
    mockedStwTradeTariffApi.getTariffAndTaxesData.mockResolvedValue(
      axiosTariffAndTaxesDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Calculate the Customs Duty and Import VAT (opens in new tab'));
        expect(res.text).toEqual(expect.stringContaining('https://www.trade-tariff.service.gov.uk/duty-calculator/prefill?'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getTariffAndTaxesData).toHaveBeenCalled();
  });

  it('It should return status 302 an redirect to /destination-country when originCountry = destinationCountry', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedTradeDataWithHeaders,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
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

    const axiosTariffAndTaxesDataResponse: AxiosResponse = {
      ...mockedTariffAndTaxesData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };
    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );
    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );
    mockedStwTradeTariffApi.getTariffAndTaxesData.mockResolvedValue(
      axiosTariffAndTaxesDataResponse,
    );

    params.destinationCountry = 'GB';
    params.originCountry = 'GB';

    await request(app.getServer())
      .get(`${Route.manageThisTrade}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.destinationCountry}${getParams(params)}`,
      );

    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getTariffAndTaxesData).toHaveBeenCalled();
  });
});
