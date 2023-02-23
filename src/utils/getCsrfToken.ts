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

import { CsrfToken } from '../interfaces/helpers.interface';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getCsrfToken = (res: any): any => {
  const csrfResponse: CsrfToken = {};
  const dom = new JSDOM(res.text);
  csrfResponse.cookies = res.header['set-cookie'];
  csrfResponse.token = dom.window.document.getElementsByName('_csrf')[0].value;
  return csrfResponse;
};

export default getCsrfToken;
