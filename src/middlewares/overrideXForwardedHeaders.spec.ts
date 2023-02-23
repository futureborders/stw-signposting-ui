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

import overrideXForwardedHeaders from './overrideXForwardedHeaders';

afterEach(() => {
  jest.resetAllMocks();
});

describe('Testing overrideXForwardedHeaders middleware', () => {
  const mockRequest = () => ({
    headers: {},
  });

  const res: any = {
    redirect: jest.fn(),
  };
  const next: any = jest.fn();

  test('It should add the "X-Forwarded-Proto" header in production', () => {
    const req: any = mockRequest();
    process.env.NODE_ENV = 'production';
    overrideXForwardedHeaders(req, res, next);
    expect(next).toBeCalled();
    expect(req.headers['x-forwarded-proto']).toBe('https');
  });

  test('It should not add the "X-Forwarded-Proto" header in development', () => {
    const req: any = mockRequest();
    process.env.NODE_ENV = 'development';
    overrideXForwardedHeaders(req, res, next);
    expect(next).toBeCalled();
    expect(req.headers['x-forwarded-proto']).toBeUndefined();
  });
});
