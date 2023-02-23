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

import { RequestHandler } from 'express';
import cleanXSS from '../utils/cleanXSS';
import cleanSQL from '../utils/cleanSQL';
import cleanPath from '../utils/cleanPath';

const sanitizeMiddleware: RequestHandler = (req, res, next):void => {
  if (req.body && Object.keys(req.body).length) {
    Object.keys(req.body).forEach((key) => {
      req.body[key] = cleanPath(cleanSQL(cleanXSS(`${req.body[key]}`, req), req), req);
    });
  }
  if (req.query && Object.keys(req.query).length) {
    Object.keys(req.query).forEach((key) => {
      req.query[key] = cleanPath(cleanSQL(cleanXSS(`${req.query[key]}`, req), req), req);
    });
  }
  return next();
};

export default sanitizeMiddleware;
