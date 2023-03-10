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
import {
  NextFunction, Request, Response,
} from 'express';

import logger from '../utils/logger';

const url = require('url');
const path = require('path');

const checkFileHash = (req: Request, res: Response) => {
  const period = process.env.CACHE_PERIOD || 15770000;
  const parsed = url.parse(String(req.originalUrl));

  if (req.query.ref && res.locals.fileHash[path.basename(parsed.pathname)].includes(req.query.ref)) {
    res.setHeader('Cache-control', `public, max-age=${period}`);
    logger.debug('Cache-control set for GET request assets');
  } else {
    res.setHeader('Cache-control', 'no-store');
    res.status(302);
    logger.debug('Cache-control set to no-store');
  }
};

const setCache = (
  req: Request,
  res: Response,
  next: NextFunction,
):void => {
  if (req.method === 'GET' && req.url.includes('/static/')) {
    checkFileHash(req, res);
  } else {
    res.setHeader('Cache-control', 'no-store');
  }
  next();
};

export default setCache;
