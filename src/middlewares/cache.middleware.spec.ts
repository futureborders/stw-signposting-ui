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

import setCache from './cache.middleware';

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Testing cache middleware', () => {
  const res: any = {
    setHeader(k: string, v: string) {
      this.header = `${k}: ${v}`;
      return this.header;
    },
    locals: {
      fileHash: {
        'some_asset.png': '?ref=abc',
      },
    },
    status: jest.fn(),
    end() {
      return null;
    },
  };

  const next: any = jest.fn();

  test('It should set to Cache-control default max-age for assets', async () => {
    const req: any = {
      url: '/static/some_asset.png?ref=abc',
      originalUrl: '/static/some_asset.png?ref=abc',
      method: 'GET',
      headers: {},
      query: {
        ref: 'abc',
      },
    };

    await setCache(req, res, next);
    expect(res.header).toBe('Cache-control: public, max-age=15770000');
    expect(next).toBeCalled();
  });

  test('It should not set Cache-control for pages', async () => {
    const req: any = {
      url: '/',
      method: 'GET',
      headers: {},
    };
    await setCache(req, res, next);
    expect(res.header).toBe('Cache-control: no-store');
    expect(next).toBeCalled();
  });

  test('It should set to "Cache-control: public, max-age=3600"', async () => {
    process.env.CACHE_PERIOD = '3600';
    const req: any = {
      url: '/static/some_asset.png?ref=abc',
      originalUrl: '/static/some_asset.png?ref=abc',
      method: 'GET',
      headers: {},
      query: {
        ref: 'abc',
      },
    };
    await setCache(req, res, next);
    expect(res.header).toBe('Cache-control: public, max-age=3600');
    expect(next).toBeCalled();
  });

  test('It should set to "Cache-control: no-store"', async () => {
    const req: any = {
      url: '/some/path',
      originalUrl: '/some/path',
      method: 'POST',
      headers: {},
    };
    await setCache(req, res, next);
    expect(res.header).toBe('Cache-control: no-store');
    expect(next).toBeCalled();
  });

  test('It should set to "Cache-control: no-store" when hashes don\'t match', async () => {
    process.env.CACHE_PERIOD = '3600';
    const req: any = {
      url: '/static/some_asset.png?ref=xyz',
      originalUrl: '/static/some_asset.png?ref=xyz',
      method: 'GET',
      headers: {},
      query: {
        ref: 'xyz',
      },
    };
    await setCache(req, res, next);
    expect(res.header).toBe('Cache-control: no-store');
    expect(res.status).toBeCalledWith(302);
    expect(next).toBeCalled();
  });
});
