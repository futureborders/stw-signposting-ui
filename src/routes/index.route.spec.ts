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
import App from '../app';
import IndexRoute from './index.route';
import 'dotenv/config';

import Translation from '../translation/en';
import StwTradeTariffApi from '../services/StwTradeTariffApi.service';
import TradeTariffApi from '../services/TradeTariffApi.service';
import { Route } from '../interfaces/routes.interface';

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

const indexRoute = new IndexRoute(
  mockedTradeTariffApi,
  mockedStwTradeTariffApi,
);

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Testing routes', () => {
  const app = new App([indexRoute]);

  describe(`[GET] ${Route.privacyNotice}`, () => {
    it('It should return 200 if server is healthy', () => request(app.getServer())
      .get(`${Route.privacyNotice}`)
      .set('user-agent', 'node-superagent')
      .expect(200));
  });

  describe('[GET] /not-a-route', () => {
    it('It should respond with statusCode 404', () => request(app.getServer())
      .get('/not-a-route')
      .set('user-agent', 'node-superagent')
      .expect(404)
      .then((res) => {
        expect(res.text).toEqual(
          expect.stringContaining(Translation.common.errors['404'].title),
        );
        expect(res.text).toEqual(
          expect.stringContaining(Translation.common.errors['404'].message),
        );
      }));
  });

  describe('[GET] /robots.txt', () => {
    it('It should respond with statusCode 200', () => request(app.getServer())
      .get('/robots.txt')
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => expect(res.text).toEqual('User-agent: *\nDisallow: /')));
  });
});

describe('Testing basic auth', () => {
  process.env.AUTH_ENABLED = 'true';
  const app = new App([indexRoute]);

  it('It should respond with statusCode 401', () => request(app.getServer())
    .get(Route.typeOfTrade)
    .set('user-agent', 'node-superagent')
    .expect(401));

  it('It should respond with statusCode 200', () => request(app.getServer())
    .get(Route.typeOfTrade)
    .auth('stwUser', `${process.env.BASIC_AUTH_SECRET}`)
    .set('user-agent', 'node-superagent')
    .expect(200));
});
