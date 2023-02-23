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

const checkUserIsAuthenticated = require('./auth-middleware');

afterEach(() => {
  jest.resetAllMocks();
});

describe('Testing auth middleware', () => {
  const mockRequest = (url: string, isAuthenticated: boolean) => ({
    url,
    isAuthenticated: () => isAuthenticated,
  });

  const res = {
    redirect: jest.fn(),
  };
  const next: any = jest.fn();

  describe('checkUserIsAuthenticated', () => {
    test('It should not redirect to login page if already authenticated', () => {
      const req = mockRequest('/', true);
      checkUserIsAuthenticated(req, res, next);
      expect(next).toBeCalled();
      expect(res.redirect).not.toBeCalled();
    });

    test('It should not redirect to login page for health check', () => {
      const req = mockRequest('/health', false);
      checkUserIsAuthenticated(req, res, next);
      expect(next).toBeCalled();
      expect(res.redirect).not.toBeCalled();
    });

    test('It should not redirect to login page for /robots.txt', () => {
      const req = mockRequest('/robots.txt', false);
      checkUserIsAuthenticated(req, res, next);
      expect(next).toBeCalled();
      expect(res.redirect).not.toBeCalled();
    });

    test('It should not redirect to login page if user wants to access to login page (infinite loop...)', () => {
      const req = mockRequest('/auth/provider', false);
      checkUserIsAuthenticated(req, res, next);
      expect(next).toBeCalled();
      expect(res.redirect).not.toBeCalled();
    });

    test('It should not redirect to login page if callback function called', () => {
      const req = mockRequest('/auth/callback?code=1234', false);
      checkUserIsAuthenticated(req, res, next);
      expect(next).toBeCalled();
      expect(res.redirect).not.toBeCalled();
    });

    test('It should redirect to login page if user not logged in and try to reach home page', () => {
      const req = mockRequest('/', false);
      checkUserIsAuthenticated(req, res, next);
      expect(next).not.toBeCalled();
      expect(res.redirect).toBeCalledWith('/auth/provider');
    });
  });
});
