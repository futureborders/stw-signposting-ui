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
  Request, Response, NextFunction,
} from 'express';
import { Route } from '../interfaces/routes.interface';
import { cleanCommodity } from '../utils/validateCommodityCode';
import { trimDateInput } from '../utils/queryHelper';

const url = require('url');

const queryParamsMiddleware = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  const queryParams = url.parse(req.url, true);

  let queryString = queryParams.search ? queryParams.search.replace(/\?/g, '') : '';

  const removeDuplicateParams = (pairs: URLSearchParams) => Array.from(pairs).reduce(
    (acc, [key, value]) => Object.assign(acc, { [key]: value }),
    {},
  );

  queryString = new URLSearchParams(removeDuplicateParams(new URLSearchParams(queryString))).toString();

  const queryOperator = queryString ? '?' : '';

  let currentPath;
  if (req.session) {
    currentPath = req.session.currentPath;
  }
  const backPath = currentPath + queryOperator + queryString;
  const fromFooter = currentPath === Route.manageCookies || currentPath === Route.accessibility || currentPath === Route.privacyNotice;
  const params = new URLSearchParams(queryString);
  params.delete('isEdit');
  params.delete('tradeDetails');
  if (params.has('commodity')) {
    params.set('commodity', cleanCommodity(String(params.get('commodity'))));
  }
  if (params.has('tradeDateDay')) {
    params.set('tradeDateDay', trimDateInput(String(params.get('tradeDateDay'))));
  }
  if (params.has('tradeDateMonth')) {
    params.set('tradeDateMonth', trimDateInput(String(params.get('tradeDateMonth'))));
  }
  if (params.has('tradeDateYear')) {
    params.set('tradeDateYear', trimDateInput(String(params.get('tradeDateYear'))));
  }
  if (params.has('importDateDay')) {
    params.set('importDateDay', trimDateInput(String(params.get('importDateDay'))));
  }
  if (params.has('importDateMonth')) {
    params.set('importDateMonth', trimDateInput(String(params.get('importDateMonth'))));
  }
  if (params.has('importDateYear')) {
    params.set('importDateYear', trimDateInput(String(params.get('importDateYear'))));
  }
  res.locals.queryParams = params.toString();
  res.locals.backPath = fromFooter ? Route.index : backPath;
  res.locals.currentUrl = `${req.protocol}://${req.headers.host}${req.baseUrl}${req.path}`;
  next();
};

export default queryParamsMiddleware;
