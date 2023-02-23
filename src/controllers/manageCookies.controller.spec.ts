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
import App from '../app';
import 'dotenv/config';
import getCsrfToken from '../utils/getCsrfToken';
import { CsrfToken } from '../interfaces/helpers.interface';
import TradeTariffApi from '../services/TradeTariffApi.service';
import StwTradeTariffApi from '../services/StwTradeTariffApi.service';
import { Route } from '../interfaces/routes.interface';
import IndexRoute from '../routes/index.route';

jest.mock('../services/TradeTariffApi.service');
jest.mock('../services/StwTradeTariffApi.service');

const MockedTradeTariffApi = <jest.Mock<TradeTariffApi>>TradeTariffApi;
const mockedTradeTariffApi = <jest.Mocked<TradeTariffApi>> new MockedTradeTariffApi();

const MockedStwTradeTariffApi = <jest.Mock<StwTradeTariffApi>>StwTradeTariffApi;
const mockedStwTradeTariffApi = <jest.Mocked<StwTradeTariffApi>> new MockedStwTradeTariffApi();

jest.mock('../middlewares/auth-middleware', () => jest.fn((req, res, next) => next()));

const indexRoute = new IndexRoute(mockedTradeTariffApi, mockedStwTradeTariffApi);
const app = new App([indexRoute]);

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

let csrfResponse: CsrfToken;

beforeEach(() => {
  jest.clearAllMocks();
});

process.env.STARTPAGE_ENABLED = 'true';

describe('Manage Cookies Controller', () => {
  describe(`[POST] ${Route.saveCookieSettings}`, () => {
    it('It should respond with statusCode 302 when additional cookies are rejected and set cookies to false ', async (done) => {
      await request(app.getServer())
        .get(`${Route.index}`)
        .set('user-agent', 'node-superagent')
        .then((res) => {
          csrfResponse = getCsrfToken(res);
          done();
        });

      const postData = {
        _csrf: csrfResponse.token,
        cookies: 'reject',
      };

      const expectedCookies = /^stw_cookie_preferences=j:{"cookieGoogleAnalytics":false,"cookieRememberSettings":false}/;

      await request(app.getServer())
        .post(`${Route.saveCookieSettings}`)
        .set('user-agent', 'node-superagent')
        .set('Cookie', csrfResponse.cookies)
        .send(postData)
        .expect(302, {})
        .expect('Location', '/')
        .then((res) => expect(res.header['set-cookie'][0]).toEqual(expect.stringMatching(expectedCookies)));
    });
  });

  it('It should respond with statusCode 302 when additional cookies are all accepted and set the cookies to true', async (done) => {
    await request(app.getServer())
      .get(`${Route.index}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });

    const postData = {
      _csrf: csrfResponse.token,
      cookies: 'accept',
    };

    const expectedCookies = /^stw_cookie_preferences=j:{"cookieGoogleAnalytics":true,"cookieRememberSettings":true}/;

    await request(app.getServer())
      .post(`${Route.saveCookieSettings}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(postData)
      .expect(302, {})
      .expect('Location', '/')
      .then((res) => expect(res.header['set-cookie'][0]).toEqual(expect.stringMatching(expectedCookies)));
  });

  it('It should respond with statusCode 302 when "hide the message" is clicked', async (done) => {
    await request(app.getServer())
      .get(`${Route.index}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });

    const postData = {
      _csrf: csrfResponse.token,
      hideCookieSuccessBanner: 'true',
    };

    await request(app.getServer())
      .post(`${Route.saveCookieSettings}`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(postData)
      .expect(302, {})
      .expect('Location', '/');
  });

  it('It should respond with statusCode 302 and append queryParams', async (done) => {
    await request(app.getServer())
      .get(`${Route.index}`)
      .set('user-agent', 'node-superagent')
      .then((res) => {
        csrfResponse = getCsrfToken(res);
        done();
      });

    const postData = {
      _csrf: csrfResponse.token,
    };

    await request(app.getServer())
      .post(`${Route.saveCookieSettings}?foo=bar`)
      .set('user-agent', 'node-superagent')
      .set('Cookie', csrfResponse.cookies)
      .send(postData)
      .expect(302, {})
      .expect('Location', '/cookies?foo=bar');
  });

  describe(`[GET] ${Route.manageCookies}`, () => {
    it('It should respond with statusCode 200', () => request(app.getServer())
      .get(`${Route.manageCookies}`)
      .set('user-agent', 'node-superagent')
      .expect(200));
  });

  describe(`[POST] ${Route.manageCookies}`, () => {
    it('It should respond with statusCode 302 when cookies are all accepted', async (done) => {
      await request(app.getServer())
        .get(`${Route.manageCookies}`)
        .set('user-agent', 'node-superagent')
        .then((res) => {
          csrfResponse = getCsrfToken(res);
          done();
        });

      const data = {
        cookieGoogleAnalytics: 'true',
        cookieRememberSettings: 'true',
        _csrf: csrfResponse.token,
      };

      const expected = /^stw_cookie_preferences=j:{"cookieGoogleAnalytics":true,"cookieRememberSettings":true}/;

      await request(app.getServer())
        .post(`${Route.saveCookieSettings}`)
        .set('user-agent', 'node-superagent')
        .set('Cookie', csrfResponse.cookies)
        .send(data)
        .expect(302, {})
        .expect('Location', '/cookies')
        .then((res) => expect(res.header['set-cookie'][0]).toEqual(
          expect.stringMatching(expected),
        ));
    });

    it('It should respond with statusCode 302 when cookies are not accepted', async (done) => {
      await request(app.getServer())
        .get(`${Route.manageCookies}`)
        .set('user-agent', 'node-superagent')
        .then((res) => {
          csrfResponse = getCsrfToken(res);
          done();
        });

      const data = {
        cookieGoogleAnalytics: 'false',
        cookieRememberSettings: 'false',
        _csrf: csrfResponse.token,
      };

      const expected = /^stw_cookie_preferences=j:{"cookieGoogleAnalytics":false,"cookieRememberSettings":false}/;

      await request(app.getServer())
        .post(`${Route.saveCookieSettings}`)
        .set('user-agent', 'node-superagent')
        .set('Cookie', csrfResponse.cookies)
        .send(data)
        .expect(302, {})
        .expect('Location', '/cookies')
        .then((res) => expect(res.header['set-cookie'][0]).toEqual(
          expect.stringMatching(expected),
        ));
    });

    it('It should respond with statusCode 302 when cookies are not sent and settings remain false', async (done) => {
      await request(app.getServer())
        .get(`${Route.manageCookies}`)
        .set('user-agent', 'node-superagent')
        .then((res) => {
          csrfResponse = getCsrfToken(res);
          done();
        });

      const data = {
        _csrf: csrfResponse.token,
      };

      const expected = /^stw_cookie_preferences=j:{"cookieGoogleAnalytics":false,"cookieRememberSettings":false}/;

      await request(app.getServer())
        .post(`${Route.saveCookieSettings}`)
        .set('user-agent', 'node-superagent')
        .set('Cookie', csrfResponse.cookies)
        .send(data)
        .expect(302, {})
        .expect('Location', '/cookies')
        .then((res) => expect(res.header['set-cookie'][0]).toEqual(
          expect.stringMatching(expected),
        ));
    });

    it('It should respond with statusCode 302 when stw_cookie_preference cookie is not set and settings remain false', async (done) => {
      await request(app.getServer())
        .get(`${Route.manageCookies}`)
        .set('user-agent', 'node-superagent')
        .then((res) => {
          res.header['set-cookie'][0] = '';
          csrfResponse = getCsrfToken(res);
          done();
        });
      const data = {
        _csrf: csrfResponse.token,
      };

      const expected = /^stw_cookie_preferences=j:{"cookieGoogleAnalytics":false,"cookieRememberSettings":false}/;

      await request(app.getServer())
        .post(`${Route.saveCookieSettings}`)
        .set('user-agent', 'node-superagent')
        .set('Cookie', csrfResponse.cookies)
        .send(data)
        .expect(302, {})
        .expect('Location', '/cookies')
        .then((res) => expect(res.header['set-cookie'][1]).toEqual(
          expect.stringMatching(expected),
        ));
    });
  });
});
