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

import { NextFunction, Request, Response } from 'express';

const useragent = require('express-useragent');

const xssProtectionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
):void => {
  const source = req.headers['user-agent'];

  if (source) {
    const response = useragent.parse(source);

    if (response.isIE || response.isSafari) {
      res.setHeader('X-XSS-Protection', '1; mode=block');
    }
  }
  next();
};

export default xssProtectionMiddleware;
