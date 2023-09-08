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

import cookiesMiddleware from './cookies.middleware';
import { CookiesBannerDecision } from '../interfaces/enums.interface';

afterAll(async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
});

afterEach(() => {
  jest.resetAllMocks();
});
const req: any = {
  url: 'http://some.url.com',
};
const next: any = jest.fn();
const res: any = {
  headers: {},
  locals: {},
  cookie(name: any, value: any) {
    this.headers[name] = value;
  },
};

describe('Testing cookiesMiddleware', () => {
  describe('cookies settings page', () => {
    test('It should not set any cookies on intial load and the cookie preferences should equal false', async () => {
      await cookiesMiddleware(req, res, next);
      expect(res.locals.allowGoogleAnalytics).toBe(false);
      expect(res.headers.stw_cookie_preferences).toBe(undefined);
    });
    test('when additional cookies settings page are accepted, do not show showCookieConsent and allowGoogleAnalytics', async () => {
      req.cookies = {
        stw_cookie_preferences: { cookieGoogleAnalytics: true, cookieRememberSettings: true },
      };

      req.session = {
        showCookieSuccessBanner: true,
      };

      await cookiesMiddleware(req, res, next);
      expect(res.locals.showCookieMessage).toBe(false);
      expect(res.locals.allowGoogleAnalytics).toBe(true);
      expect(res.locals.decision).toBe(CookiesBannerDecision.acceptedCookies);
    });
  });
});
