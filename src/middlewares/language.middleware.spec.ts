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

/* eslint-disable no-underscore-dangle */
import languageToggleMiddleware from './language.middleware';

jest.mock('../translation/en', () => ({
  __esModule: true,
  default: {
    test: 'English text',
    onlyInEnglish: {
      test: 'Only exists in English',
    },
    testUndefined: 'something',
  },
}));

jest.mock('../translation/cy', () => ({
  __esModule: true,
  default: {
    test: 'Welsh text',
    testUndefined: undefined,
  },
}));

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

afterEach(() => {
  jest.resetAllMocks();
});

beforeEach(() => {
  process.env.SHOW_LANGUAGE_TOGGLE = 'true';
});

let req: any = jest.fn();
let res: any = jest.fn();
const next: any = jest.fn();

beforeEach(() => {
  req = {
    query: {},
    cookies: {
      stw_cookie_preferences: {
        cookieRememberSettings: true,
      },
      stw_language: 'en',
    },
    originalUrl: '/',
  };

  res = {
    headers: {},
    locals: {
      language: {},
    },
    data: null,
    cookie(name: any, value: any) {
      this.headers[name] = value;
    },
  };

  next.mockReset();
});

describe('Testing languageToggleMiddleware', () => {
  describe('languageToggle', () => {
    test('It should set the default language as en', async () => {
      await languageToggleMiddleware(req, res, next);
      expect(res.locals.language).toBe('en');
      expect(res.locals.toggledLanguagePath).toBe(`${req.originalUrl}?lang=cy`);
      expect(next).toBeCalled();
    });
    test('It should toggle the language to cy', async () => {
      req.query.lang = 'cy';
      await languageToggleMiddleware(req, res, next);
      expect(res.headers.stw_language).toBe('cy');
      expect(res.locals.language).toBe('cy');
      expect(res.locals.toggledLanguagePath).toBe(`${req.originalUrl}?lang=en`);
      expect(next).toBeCalled();
    });
    test('It should toggle the language to en', async () => {
      req.query.lang = 'en';
      await languageToggleMiddleware(req, res, next);
      expect(res.locals.language).toBe('en');
      expect(res.locals.toggledLanguagePath).toBe(`${req.originalUrl}?lang=cy`);
      expect(next).toBeCalled();
    });
    test('It should toggle the language to en with queryOperator &', async () => {
      req.query.lang = 'en';
      req.originalUrl = '/?query1=a&query2=b';
      await languageToggleMiddleware(req, res, next);
      expect(res.locals.language).toBe('en');
      expect(res.locals.toggledLanguagePath).toBe(`${req.originalUrl}&lang=cy`);
      expect(next).toBeCalled();
    });
    test('It should toggle the language to en with queryOperator &', async () => {
      req.query.lang = 'en';
      req.originalUrl = '/?query1=a';
      await languageToggleMiddleware(req, res, next);
      expect(res.locals.language).toBe('en');
      expect(res.locals.toggledLanguagePath).toBe(`${req.originalUrl}&lang=cy`);
      expect(next).toBeCalled();
    });
    test('It should toggle the language to en with queryOperator ?', async () => {
      req.query.lang = 'en';
      req.originalUrl = '/?lang=cy';
      await languageToggleMiddleware(req, res, next);
      expect(res.locals.language).toBe('en');
      expect(res.locals.toggledLanguagePath).toBe('/?lang=cy');
      expect(next).toBeCalled();
    });
    test('It should not toggle the language to cy', async () => {
      process.env.SHOW_LANGUAGE_TOGGLE = 'false';
      req.cookies.stw_cookie_preferences.cookieRememberSettings = false;
      req.query.lang = 'cy';
      await languageToggleMiddleware(req, res, next);
      expect(res.headers.stw_language).toBe(undefined);
      expect(res.locals.language).toBe('en');
      expect(res.locals.toggledLanguagePath).toBe('/?lang=cy');
      expect(next).toBeCalled();
    });
  });

  describe('messages files', () => {
    it('should give English when en selected', async () => {
      req.query.lang = 'en';
      await languageToggleMiddleware(req, res, next);

      expect(res.locals.translation.test).toBe('English text');
    });

    it('should give Welsh when cy selected', async () => {
      req.query.lang = 'cy';
      await languageToggleMiddleware(req, res, next);

      expect(res.locals.translation.test).toBe('Welsh text');
    });

    it('should fall back to English when cy selected but Welsh doesn\'t exist', async () => {
      req.query.lang = 'cy';
      await languageToggleMiddleware(req, res, next);

      expect(res.locals.translation.onlyInEnglish.test).toBe("<span lang='en'>Only exists in English</span>");
    });

    it('should fall back to English when cy selected but Welsh is undefined', async () => {
      req.query.lang = 'cy';
      await languageToggleMiddleware(req, res, next);

      expect(res.locals.translation.testUndefined).toBe("<span lang='en'>something</span>");
    });
  });
});
