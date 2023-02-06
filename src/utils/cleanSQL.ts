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

/* eslint-disable no-underscore-dangle */
import { Request } from 'express';
import sanitizeSQL from './sanitizeSQL';
import securityLogger from './securityLogger';

const cleanSQL = (userInput: string, req: Request): string => {
  const userInputCleaned = sanitizeSQL(userInput);

  if (userInput !== userInputCleaned) {
    securityLogger(req, 'Syntax_Check_Failed', 'SQL injection attempt');
  }

  return userInputCleaned;
};

export default cleanSQL;
