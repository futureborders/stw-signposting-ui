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

import queryParamsMiddleware from './queryParams.middleware';
import { Route } from '../interfaces/routes.interface';

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

afterEach(() => {
  jest.resetAllMocks();
});

const next:any = jest.fn();
const res:any = {
  headers: {},
  locals: {},
};
describe('Testing persistentBackButtonMiddleware', () => {
  describe('Store queryParams and backPath', () => {
    const req:any = {
      url: 'htp://www.some-url.com/some-path?foo=bar&pow=pop',
      session: {
        currentPath: '/current-path',
      },
      headers: {
        host: 'www.some-url.com',
      },
      protocol: 'http',
      baseUrl: '/base-url',
      path: '/some-path',
    };
    test('It should add queryParams to the stored currentPath', async () => {
      await queryParamsMiddleware(req, res, next);
      expect(res.locals.queryParams).toBe('foo=bar&pow=pop');
      expect(res.locals.backPath).toBe('/current-path?foo=bar&pow=pop');
    });
    test('It should get currentUrl', async () => {
      await queryParamsMiddleware(req, res, next);
      expect(res.locals.currentUrl).toBe('http://www.some-url.com/base-url/some-path');
    });
  });

  describe('When currentPath is a link in the footer - manageCookies', () => {
    const req:any = {
      url: 'htp://www.some-url.com/some-path?foo=bar',
      session: {
        currentPath: Route.manageCookies,
      },
      headers: {
        host: 'somehost',
      },
    };
    test('It should set backPath to /', async () => {
      await queryParamsMiddleware(req, res, next);
      expect(res.locals.backPath).toBe('/');
    });
  });

  describe('When currentPath is a link in the footer - accessibility', () => {
    const req:any = {
      url: 'htp://www.some-url.com/some-path?foo=bar',
      session: {
        currentPath: Route.accessibility,
      },
      headers: {
        host: 'somehost',
      },
    };
    test('It should set backPath to /', async () => {
      await queryParamsMiddleware(req, res, next);
      expect(res.locals.backPath).toBe('/');
    });
  });

  describe('When currentPath is a link in the footer - privacyNotice', () => {
    const req:any = {
      url: 'htp://www.some-url.com/some-path?foo=bar',
      session: {
        currentPath: Route.privacyNotice,
      },
      headers: {
        host: 'somehost',
      },
    };
    test('It should set backPath to /', async () => {
      await queryParamsMiddleware(req, res, next);
      expect(res.locals.backPath).toBe('/');
    });
  });

  describe('Testing queryParams', () => {
    test('Should return strip out . + ? from the queryParams', async () => {
      const req:any = {
        url: 'htp://www.some-url.com/some-path?foo=00?00',
        headers: {
          host: 'somehost',
        },
      };
      await queryParamsMiddleware(req, res, next);
      expect(res.locals.queryParams).toBe('foo=0000');
    });
    test('Should empty queryParams', async () => {
      const req:any = {
        url: 'htp://www.some-url.com/some-path',
        headers: {
          host: 'somehost',
        },
      };
      await queryParamsMiddleware(req, res, next);
      expect(res.locals.queryParams).toBe('');
    });
    test('Should decode and strip out spaces in queryParams', async () => {
      const req:any = {
        url: 'htp://www.some-url.com?tradeDateDay=%201%20%201%20&tradeDateMonth=+1++2+&tradeDateYear=2.0.2.2.',
        headers: {
          host: 'somehost',
        },
      };
      await queryParamsMiddleware(req, res, next);
      expect(res.locals.queryParams).toBe('tradeDateDay=11&tradeDateMonth=12&tradeDateYear=2022');
    });
    test('Should decode and strip out spaces in queryParams', async () => {
      const req:any = {
        url: 'htp://www.some-url.com?importDateDay=%201%20%201%20&importDateMonth=(1)(2)&importDateYear=-2-0-2-2-',
        headers: {
          host: 'somehost',
        },
      };
      await queryParamsMiddleware(req, res, next);
      expect(res.locals.queryParams).toBe('importDateDay=11&importDateMonth=12&importDateYear=2022');
    });
  });
});
