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

import xssProtectionMiddleware from './xssProtection.middleware';

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Testing sanitizeMiddleware', () => {
  const req: any = {
    headers: {},
  };

  const res: any = {
    setHeader(k: string, v: string) {
      this.header = `${k}: ${v}`;
      return this.header;
    },
    end() {
      return null;
    },
  };

  const next: any = jest.fn();

  describe('xssProtection', () => {
    test('It should set true for Safari', async () => {
      req.headers = {
        'user-agent': 'Safari/537.36',
        'X-XSS-Protection': '0',
      };
      await xssProtectionMiddleware(req, res, next);
      expect(res.header).toBe('X-XSS-Protection: 1; mode=block');
      expect(next).toBeCalled();
    });
    test('It should set true for IE', async () => {
      req.headers = {
        'user-agent': 'MSIE 8.0',
        'X-XSS-Protection': '0',
      };
      await xssProtectionMiddleware(req, res, next);
      expect(res.header).toBe('X-XSS-Protection: 1; mode=block');
      expect(next).toBeCalled();
    });
  });
});
