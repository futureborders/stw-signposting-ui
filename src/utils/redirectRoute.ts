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

import { Request, Response } from 'express';
import { Route } from '../interfaces/routes.interface';

export const redirectRoute = (
  route: Route,
  queryParams: string,
  res: Response,
  req?: Request,
  errorMessage?: string,
): void => {
  const queryOperator = queryParams ? '?' : '';

  if (errorMessage) {
    if (req?.session) {
      req.session.errorMessage = errorMessage;
    }
    let errorMessageText: any = errorMessage;
    if (errorMessageText.message) {
      errorMessageText = errorMessageText.message;
    }
    const noCookies = !req?.cookies.stw_signposting
      ? `&error=${encodeURIComponent(errorMessageText)}`
      : '';
    return res.redirect(`${route}?${queryParams}${noCookies}`);
  }
  return res.redirect(`${route}${queryOperator}${queryParams}`);
};

export default redirectRoute;
