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
import { ExportsParams } from '../../../interfaces/exports.interface';

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

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe(`[GET] ${Route.exportCheckWhatServicesYouNeedToRegister}`, () => {
  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.exportCheckWhatServicesYouNeedToRegister}`)
    .set('user-agent', 'node-superagent')
    .expect(200));

  it('It should return status 200 and show correct trade details', async () => {
    const date = {
      day: params.tradeDateDay,
      month: params.tradeDateMonth,
      year: params.tradeDateYear,
    };

    await request(app.getServer())
      .get(`${Route.exportCheckWhatServicesYouNeedToRegister}${getParams(params)}`)
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
  });
});
