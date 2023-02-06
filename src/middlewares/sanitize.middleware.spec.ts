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

import sanitizeMiddleware from './sanitize.middleware';
import securityLogger from '../utils/securityLogger';

jest.mock('../utils/securityLogger');

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Testing sanitizeMiddleware', () => {
  const data = {
    protocol: 'http',
    headers: { host: 'somehost.com' },
    originalUrl: '/someurl?q=xyz',
  };

  const mockRequest = (string: string) => ({
    query: { inputField: string },
    body: { inputField: string },
    data,
  });

  const res: any = jest.fn();
  const next: any = jest.fn();

  const mockedSecurityLogger = <jest.Mock>securityLogger;

  const expectedResult = async (
    expectedReq: any,
    expectedRes: any,
    expectedNext: any,
    mockedLogger: any,
    result: string,
    called: number,
  ) => {
    await sanitizeMiddleware(expectedReq, expectedRes, expectedNext);
    expect(expectedReq.query).toEqual({ inputField: result });
    expect(expectedReq.body).toEqual({ inputField: result });
    expect(mockedLogger).toBeCalledTimes(called);
  };

  describe('cleanXSS', () => {
    test('It should remain unchanged', async () => {
      const req: any = mockRequest('some string');
      await expectedResult(req, res, next, mockedSecurityLogger, 'some string', 0);
    });

    test('It should strip out bad tags and leave a string', async () => {
      const req: any = mockRequest('<STYLE>li {list-style-image: url("javascript:alert(\'XSS\')");}</STYLE><UL><LI>XSS</br>');
      await expectedResult(req, res, next, mockedSecurityLogger, 'XSS', 2);
    });

    test('It should strip out bad tags and leave an empty string', async () => {
      const req: any = mockRequest('<SCRIPT SRC=http://xss.rocks/xss.js></SCRIPT>');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });

    test('It should strip out bad tags and leave an empty string', async () => {
      const req: any = mockRequest('<INPUT TYPE="IMAGE" SRC="javascript:alert(\'XSS\');">');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });

    test('It should strip out bad tags and leave an empty string', async () => {
      const req: any = mockRequest('<DIV STYLE="background-image: url(javascript:alert(\'XSS\'))">');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });

    test('It should strip out bad tags and leave an empty string', async () => {
      const req: any = mockRequest('<IMG LOWSRC="javascript:alert(\'XSS\')">');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });

    test('It should strip out "javascript" and leave an empty string', async () => {
      const req: any = mockRequest('javascript');
      expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });

    test('It should strip out "javascript" and leave an empty string', async () => {
      const req: any = mockRequest('javajavascriptscript');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });

    test('It should strip out "javascript" and leave an empty string', async () => {
      const req: any = mockRequest('jjavascriptajavascriptvjavascriptajavascriptsjavascriptcjavascriptrjavascriptijavascriptpjavascripttjavascript');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });
  });

  describe('cleanSQL', () => {
    test('It should strip out ";--" and leave an empty string', async () => {
      const req: any = mockRequest(';--');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });

    test('It should strip out "; --" and leave an empty string', async () => {
      const req: any = mockRequest('; --');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });

    test('It should strip out "SELECT user" and leave an empty string', async () => {
      const req: any = mockRequest('SELECT user');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });

    test('It should strip out "SELECT current_database" and leave an ()', async () => {
      const req: any = mockRequest('SELECT current_database()');
      await expectedResult(req, res, next, mockedSecurityLogger, '()', 2);
    });

    test('It should strip out "SELECT column_name FROM information_schema.columns WHERE table_name=\'data_table\'" and leave an empty string', async () => {
      const req: any = mockRequest('SELECT column_name FROM information_schema.columns WHERE table_name=\'data_table\'');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });
  });

  describe('cleanPath', () => {
    test('It should strip out "%2e" and leave an empty string', async () => {
      const req: any = mockRequest('%2e');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });

    test('It should strip out "%252e" and leave an empty string', async () => {
      const req: any = mockRequest('%252e');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });

    test('It should strip out "%2f" and leave an empty string', async () => {
      const req: any = mockRequest('%2f');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });

    test('It should strip out "%252f" and leave an empty string', async () => {
      const req: any = mockRequest('%252f');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });

    test('It should strip out "%5c" and leave an empty string', async () => {
      const req: any = mockRequest('%5c');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });

    test('It should strip out "%255c" and leave an empty string', async () => {
      const req: any = mockRequest('%255c');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });

    test('It should strip out "../" and leave an empty string', async () => {
      const req: any = mockRequest('../');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });

    test('It should strip out "..\\" and leave an empty string', async () => {
      const req: any = mockRequest('..\\');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });

    test('It should strip out ".." and leave an empty string', async () => {
      const req: any = mockRequest('..');
      await expectedResult(req, res, next, mockedSecurityLogger, '', 2);
    });

    test('It should strip out the first "/"', async () => {
      const req: any = mockRequest('/etc/');
      await expectedResult(req, res, next, mockedSecurityLogger, 'etc/', 2);
    });
  });
});
