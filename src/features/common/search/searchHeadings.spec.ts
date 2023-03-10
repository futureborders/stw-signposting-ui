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
  mockedSearchDataChapters,
  mockedSearchDataValidCommodity,
  mockedSearchDataSubheadingLvl,
} from '../../../utils/mockedSearchData';

import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';
import { Params } from '../../../interfaces/params.interface';
import { getParams } from '../../../utils/queryHelper';
import SearchHeadingsController from './searchHeadings';
import translation from '../../../translation/en';
import getTodaysDate from '../../../utils/tests/getTodaysDate';

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
    commodity: 'someSearchTerm',
    tradeType: 'import',
    goodsIntent: 'bringGoodsToSell',
    importDeclarations: 'yes',
    userTypeTrader: 'yes',
    destinationCountry: 'GB',
    originCountry: 'CN',
    additionalCode: '',
    importDateDay: '01',
    importDateMonth: '01',
    importDateYear: '2022',
  };
  exportParams = {
    commodity: 'someSearchTerm',
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

describe(`[GET] ${Route.searchHeadings}`, () => {
  it('It should return status 200 and display headings', async () => {
    const searchTradeTariffByTypeResponse: AxiosResponse = {
      ...mockedSearchDataChapters,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedTradeTariffApi.searchTradeTariffByType.mockResolvedValue(searchTradeTariffByTypeResponse);

    await request(app.getServer())
      .get(`${Route.search}/${mockedSearchDataChapters.data.data.attributes.goods_nomenclature_item_id}/0${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => expect(res.text).toEqual(
        expect.stringContaining(mockedSearchDataChapters.data.data.attributes.formatted_description),
      ));
  });

  it('It should return status 200 and display correct H1 with caption and title', async () => {
    const searchTradeTariffByTypeResponse: AxiosResponse = {
      ...mockedSearchDataChapters,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedTradeTariffApi.searchTradeTariffByType.mockResolvedValue(searchTradeTariffByTypeResponse);

    await request(app.getServer())
      .get(`${Route.search}/${mockedSearchDataChapters.data.data.attributes.goods_nomenclature_item_id}/31666${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining(`${mockedSearchDataChapters.data.included[2].attributes.description}:  Search results within category 0800 - Check how to import or export goods - GOV.UK`));
        expect(res.text).toEqual(expect.stringContaining(`<span class="govuk-caption-l">${mockedSearchDataChapters.data.included[2].attributes.description}</span>`));
        expect(res.text).toEqual(expect.stringContaining('Search results within category 0800'));
      });
  });

  it(`It should return status 302 and redirect to ${Route.taskList}`, async () => {
    const searchTradeTariffByTypeResponse: AxiosResponse = {
      ...mockedSearchDataValidCommodity,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedTradeTariffApi.searchTradeTariffByType.mockResolvedValue(searchTradeTariffByTypeResponse);

    params.commodity = mockedSearchDataValidCommodity.data.data.attributes.goods_nomenclature_item_id;

    await request(app.getServer())
      .get(`${Route.search}/${mockedSearchDataValidCommodity.data.data.attributes.goods_nomenclature_item_id}/0${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.checkYourAnswers}${getParams(params)}&additionalCode=false`);
  });

  it('It should return status 200 and display subheadings', async () => {
    const searchTradeTariffByTypeResponse: AxiosResponse = {
      ...mockedSearchDataSubheadingLvl,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedTradeTariffApi.searchTradeTariffByType.mockResolvedValue(searchTradeTariffByTypeResponse);
    params.commodity = 'lvl';
    params.subheadingSuffix = '10';
    params.isSubheading = 'true';

    await request(app.getServer())
      .get(`${Route.search}/${mockedSearchDataSubheadingLvl.data.data.attributes.goods_nomenclature_item_id}/0${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Laminated veneered lumber (lvl)'));
        expect(res.text).toEqual(expect.stringContaining('Commodity code: <strong>4412420000</strong>'));
        expect(res.text).toEqual(expect.stringContaining('With at least one outer ply of tropical wood'));
        expect(res.text).toEqual(expect.stringContaining('Other, with both outer plies of coniferous wood'));
      });
  });

  it('It should throw an error and call next', async () => {
    const createMockRequest = () => (
        {
          originalUrl: Route.searchHeadings,
          query: {
            additionalCode: 'false',
            ...exportParams,
          },
          route: {
            path: Route.searchHeadings,
          },
          params: {
            sid: 'some-sid',
            itemId: 'some-id',
          },
          csrfToken: () => 'csrftoken',
        } as unknown as e.Request
    );

    const creatMockResponse = () => (
        {
          render: jest.fn(),
          locals: {
            language: 'en',
            queryParams: getParams(exportParams).substring(1),
            translation: {
              ...translation,
            },
            backPath: Route.searchHeadings,
          },
          redirect: jest.fn(),
        } as unknown as e.Response
    );
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockNext = jest.fn();
    const mockError = Error();
    mockResponse.render = () => { throw mockError; };
    const controller = new SearchHeadingsController(mockedTradeTariffApi, mockedStwTradeTariffApi);
    await controller.searchHeadings(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
