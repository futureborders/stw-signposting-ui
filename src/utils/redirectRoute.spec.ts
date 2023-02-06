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

import { Route } from '../interfaces/routes.interface';
import { redirectRoute } from './redirectRoute';

const req: any = {
  session: {},
  cookies: {
    stw_signposting: {},
  },
};

const res: any = {
  redirect: jest.fn(),
  locals: {
    queryParams: 'foo=bar',
  },
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Testing redirectRoute', () => {
  test('It should redirect with error message', async () => {
    await redirectRoute(Route.index, res.locals.queryParams, res, req, 'somme-error-message');
    expect(res.redirect).toBeCalledTimes(1);
    expect(req?.session?.errorMessage).toBe('somme-error-message');
  });
  test('It should redirect', async () => {
    await redirectRoute(Route.index, res.locals.queryParams, res);
    expect(res.redirect).toBeCalledTimes(1);
  });
});
