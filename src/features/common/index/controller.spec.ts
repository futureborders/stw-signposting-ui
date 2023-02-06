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
import App from '../../../app';
import 'dotenv/config';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';

jest.mock('../../../services/TradeTariffApi.service');
jest.mock('../../../services/StwTradeTariffApi.service');

const MockedTradeTariffApi = <jest.Mock<TradeTariffApi>>TradeTariffApi;
const mockedTradeTariffApi = <jest.Mocked<TradeTariffApi>> new MockedTradeTariffApi();

const MockedStwTradeTariffApi = <jest.Mock<StwTradeTariffApi>>StwTradeTariffApi;
const mockedStwTradeTariffApi = <jest.Mocked<StwTradeTariffApi>> new MockedStwTradeTariffApi();

const indexRoute = new IndexRoute(mockedTradeTariffApi, mockedStwTradeTariffApi);
const app = new App([indexRoute]);

describe('Testing indexController', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...OLD_ENV };
  });

  afterAll(async () => {
    process.env = OLD_ENV;
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
  });

  it('It should respond with statusCode 200 when startPage enabled', () => {
    process.env.STARTPAGE_ENABLED = 'true';
    return request(app.getServer())
      .get(Route.index)
      .set('user-agent', 'node-superagent')
      .expect(200);
  });
  it('It should respond with statusCode 302 startPage disabled', () => {
    process.env.STARTPAGE_ENABLED = 'false';
    return request(app.getServer())
      .get(Route.index)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', Route.typeOfTrade);
  });
});
