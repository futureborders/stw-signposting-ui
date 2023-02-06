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

import { Request } from 'express';
import * as sanitize from 'sanitize-html';
import securityLogger from './securityLogger';

const options = {
  allowedTags: [],
  allowedAttributes: {},
  textFilter: (text: string) => (
    text.replace(/javascript/gi, '').replace(/javascript/gi, '')
  ),
};

const cleanXSS = (userInput: string, req: Request): string => {
  const userInputCleaned = sanitize(userInput, options);
  if (userInput !== userInputCleaned) {
    securityLogger(req, 'Syntax_Check_Failed', 'XSS attempt');
  }
  return userInputCleaned;
};

export default cleanXSS;
