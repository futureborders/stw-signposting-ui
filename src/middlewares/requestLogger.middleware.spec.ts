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

import requestLoggerMiddleware from './requestLogger.middleware';
import securityLogger from '../utils/securityLogger';

jest.mock('../utils/securityLogger');

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

describe('Testing requestLoggerMiddleware', () => {
  const mockRequest = () => ({
    protocol: 'http',
    headers: { host: 'somehost.com' },
    originalUrl: '/someurl?q=xyz',
  });

  const res: any = jest.fn();
  const next: any = jest.fn();
  const mockedSecurityLogger = <jest.Mock>securityLogger;

  test('It should call requestLoggerMiddleware', async () => {
    const req: any = mockRequest();
    await requestLoggerMiddleware(req, res, next);
    expect(mockedSecurityLogger).toBeCalledTimes(1);
    expect(next).toBeCalled();
  });
});
