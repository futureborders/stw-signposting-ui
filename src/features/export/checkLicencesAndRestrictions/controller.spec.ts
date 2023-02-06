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
import { AxiosResponse } from 'axios';
import App from '../../../app';
import 'dotenv/config';
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';
import CommodityNotFoundException from '../../../exceptions/commodityNotFoundException';
import { ImportDate } from '../../../interfaces/importDate.interface';

import {
  mockedRestrictiveMeasures,
  mockedRestrictiveMeasuresNo999L,
} from './mockedData';

import { mockedAdditionalCodeData } from '../../common/additionalCode/mockedData';

import translation from '../../../translation/en';
import { Params } from '../../../interfaces/params.interface';
import { getParams } from '../../../utils/queryHelper';
import getTodaysDate from '../../../utils/tests/getTodaysDate';
import { formatDate } from '../../../utils/filters/formatDate';

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
    tradeType: 'export',
    tradeDateDay: getTodaysDate.day,
    tradeDateMonth: getTodaysDate.month,
    tradeDateYear: getTodaysDate.year,
    originCountry: 'GB',
    exportDeclarations: 'yes',
    destinationCountry: 'CN',
    commodity: '0301921000',
    exportGoodsIntent: 'goodsExportedToBeSoldForBusiness',
  };
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe(`[GET] ${Route.exportCheckLicencesAndRestrictions}`, () => {
  it('It should return status 200', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );

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
      .get(`${Route.exportCheckLicencesAndRestrictions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Some Measure heading 1'));
        expect(res.text).toEqual(expect.stringContaining('Some Measure heading 2'));
        expect(res.text).toEqual(expect.stringContaining('Document codes'));
        expect(res.text).toEqual(expect.stringContaining('Y900'));
        expect(res.text).toEqual(expect.stringContaining('C400'));
        expect(res.text).toEqual(expect.stringContaining('Customs Declaration Service (CDS) Licence Waiver'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });

  it('It should return status 200 and not display codes and details element for non-declaring traders', async () => {
    params.exportDeclarations = 'no';

    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );

    await request(app.getServer())
      .get(`${Route.exportCheckLicencesAndRestrictions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Some Measure heading 1'));
        expect(res.text).toEqual(expect.stringContaining('Some Measure heading 2'));
        expect(res.text).not.toEqual(expect.stringContaining('Document codes'));
        expect(res.text).not.toEqual(expect.stringContaining('Y900'));
        expect(res.text).not.toEqual(expect.stringContaining('C400'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should return status 200 and not display CDS content', async () => {
    params.exportDeclarations = 'yes';

    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasuresNo999L,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );

    await request(app.getServer())
      .get(`${Route.exportCheckLicencesAndRestrictions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).not.toEqual(expect.stringContaining('Customs Declaration Service (CDS) Licence Waiver'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should respond with statusCode 302 and redirect back to /export/export-commodity-search on CommodityNotFoundException', async () => {
    mockedStwTradeTariffApi.getRestrictiveMeasures.mockRejectedValue(
      new CommodityNotFoundException(''),
    );

    params.commodity = 'INVALID_COMMODITY';

    return request(app.getServer())
      .get(`${Route.exportCheckLicencesAndRestrictions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.exportCommoditySearch}${getParams(params)}&error=${encodeURIComponent(translation.page.importGoods.errors.commodityNotFound)}`,
      );
  });

  it(`It should respond with statusCode 302 and redirect back to ${Route.typeOfTrade} if missing param tradeType`, async () => {
    delete params.tradeType;
    return request(app.getServer())
      .get(`${Route.exportCheckLicencesAndRestrictions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', Route.typeOfTrade);
  });

  it(`It should respond with statusCode 302 and redirect to ${Route.additionalCode} if invalid additional code`, async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );

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

    params.additionalCode = '0000';

    await request(app.getServer())
      .get(`${Route.exportCheckLicencesAndRestrictions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.additionalCode}${getParams(params)}&error=${encodeURIComponent(translation.common.additionalCode.error)}`);
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });

  it('It should return status 200 and show correct trade details', async () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosRestrictiveMeasuresResponse,
    );

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

    const date = {
      day: params.tradeDateDay,
      month: params.tradeDateMonth,
      year: params.tradeDateYear,
    };

    await request(app.getServer())
      .get(`${Route.exportCheckLicencesAndRestrictions}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Commodity code'));
        expect(res.text).toEqual(expect.stringContaining(String(params.commodity)));
        expect(res.text).toEqual(expect.stringContaining('Export date'));
        expect(res.text).toEqual(expect.stringContaining(formatDate(date as ImportDate)));
        expect(res.text).toEqual(expect.stringContaining('Country of departure'));
        expect(res.text).toEqual(expect.stringContaining('Great Britain (England, Scotland and Wales)'));
        expect(res.text).toEqual(expect.stringContaining('Goods going into'));
        expect(res.text).toEqual(expect.stringContaining('China'));
        expect(res.text).toEqual(expect.stringContaining('Classification'));
        expect(res.text).toEqual(expect.stringContaining('Live fish  &mdash; Other live fish  &mdash; Eels (Anguilla spp.) &mdash; <strong>Of a length of less than 12 cm</strong>'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });
});
