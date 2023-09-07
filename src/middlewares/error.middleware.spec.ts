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

import errorMiddleware from './error.middleware';
import translation from '../translation/en';

import winstonLogger from '../utils/winston';

let { title } = translation.common.errors['500'];
let { message } = translation.common.errors['500'];

jest.mock('../utils/winston');

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Testing error middleware', () => {
  const res: any = {
    render: jest.fn(),
    locals: {
      translation: {
        ...translation,
      },
    },
  };

  const req: any = jest.fn();
  const next: any = jest.fn();

  test('It should return default message with status 510', async () => {
    res.status = jest.fn().mockReturnThis();
    const error: any = {
      response: {
        status: 510,
      },
    };
    const { status } = error.response;
    await errorMiddleware(error, req, res, next);
    expect(res.status).toBeCalledWith(error.response.status);
    expect(res.render).toBeCalledWith('error.njk', {
      title,
      message,
      status,
    });
  });

  test('It should return default message with status 500', async () => {
    res.status = jest.fn().mockReturnThis();
    const error: any = {
      response: {
        status: 500,
      },
    };
    const { status } = error.response;
    await errorMiddleware(error, req, res, next);
    expect(res.status).toBeCalledWith(error.response.status);
    expect(res.render).toBeCalledWith('error.njk', {
      title,
      message,
      status,
    });
  });

  test('It should return default message with status 500 when no error object', async () => {
    res.status = jest.fn().mockReturnThis();
    const error: any = null;
    await errorMiddleware(error, req, res, next);
    expect(res.status).toBeCalledWith(500);
    expect(res.render).toBeCalledWith('error.njk', {
      title,
      message,
      status: 500,
    });
  });

  test('It should return default message with status 500 when no response object', async () => {
    res.status = jest.fn().mockReturnThis();
    const error: any = {
      response: {},
    };
    await errorMiddleware(error, req, res, next);
    expect(res.status).toBeCalledWith(500);
    expect(res.render).toBeCalledWith('error.njk', {
      title,
      message,
      status: 500,
    });
  });

  test('It should log out level Info, showCookieMessage false and show session expired when EBADCSRFTOKEN', async () => {
    res.status = jest.fn().mockReturnThis();
    res.locals.showCookieMessage = true;
    const error: any = {
      code: 'EBADCSRFTOKEN',
      response: {
        status: '',
      },
    };
    await errorMiddleware(error, req, res, next);
    expect(winstonLogger.info).toHaveBeenCalledWith('Info', {
      error: {
        code: 'EBADCSRFTOKEN',
        response: {
          status: '',
        },
      },
      message: '',
      name: '',
      stackTrace: '',
    });

    title = translation.common.session.expire;
    message = translation.common.session.message;
    const status = 200;

    expect(res.render).toBeCalledWith('error.njk', {
      title,
      message,
      status,
    });

    expect(res.locals.showCookieMessage).toBe(false);
  });
});
