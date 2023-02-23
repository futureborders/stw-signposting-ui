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

import {
  NextFunction, Request, Response,
} from 'express';

import { AUTH_PROVIDER_URL, AUTH_CALLBACK_URL } from '../app';

const checkUserIsAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.url === '/robots.txt'
    || req.url === '/health'
    || req.url === AUTH_PROVIDER_URL
    || req.url.startsWith(AUTH_CALLBACK_URL)
    || req.isAuthenticated()) {
      next();
    } else {
      res.redirect(AUTH_PROVIDER_URL);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = checkUserIsAuthenticated;
