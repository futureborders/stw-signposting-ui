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

import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';

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

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe(`[GET] ${Route.exportCommoditySearch}`, () => {
  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(`${Route.exportCommoditySearch}`)
    .set('user-agent', 'node-superagent')
    .expect(200));

  it('It should respond with statusCode 200 and show correct back url when isEdit=true', () => request(app.getServer())
    .get(`${Route.exportCommoditySearch}?commodity=0000000000&isEdit=true&original=0000000000`)
    .set('user-agent', 'node-superagent')
    .expect(200)
    .then((res) => {
      expect(res.text).toEqual(expect.stringContaining('/check-your-answers'));
      expect(res.text).toEqual(expect.stringContaining('commodity=0000000000'));
      expect(res.text).toEqual(expect.stringContaining('original=0000000000'));
    }));

  it('It should respond with statusCode 200 and show correct back url when commodity is empty', () => request(app.getServer())
    .get(`${Route.exportCommoditySearch}?commodity=`)
    .set('user-agent', 'node-superagent')
    .expect(200)
    .then((res) => {
      expect(res.text).toEqual(expect.stringContaining('/country-destination'));
      expect(res.text).toEqual(expect.stringContaining('commodity='));
    }));

  it('It should respond with statusCode 200 and show correct back url when commodity is empty and has original ', () => request(app.getServer())
    .get(`${Route.exportCommoditySearch}?commodity=&original=0000000000`)
    .set('user-agent', 'node-superagent')
    .expect(200)
    .then((res) => {
      expect(res.text).toEqual(expect.stringContaining('/check-your-answers'));
      expect(res.text).toEqual(expect.stringContaining('commodity='));
      expect(res.text).toEqual(expect.stringContaining('original=0000000000'));
    }));
});
