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
import { DestinationCountry, OriginCountry } from '../interfaces/enums.interface';
import { Route } from '../interfaces/routes.interface';
import { redirectRoute } from '../utils/redirectRoute';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../utils/sessionHelpers';

import { getImportDateFromQuery } from '../utils/queryHelper';

class DestinationCountryController {
  public destinationCountry: RequestHandler = (req, res, next) => {
    const { translation } = res.locals;
    const showErrorMessage = getErrorMessage(req);

    clearSessionErrorMessages(req);

    try {
      setSessionCurrentPath(req);
      const { userTypeTrader } = req.query;
      const { tradeType } = req.query;
      const { commodity } = req.query;
      const { additionalCode } = req.query;
      const { importDeclarations } = req.query;
      const { queryParams } = res.locals;
      const { destinationCountry } = req.query;
      const { originCountry } = req.query;
      const { goodsIntent } = req.query;
      const { isEdit } = req.query;
      const { backPath } = res.locals;
      const previousPage = isEdit && backPath.includes(Route.manageThisTrade) ? Route.manageThisTrade : Route.importCountryOrigin;
      const importDate = getImportDateFromQuery(req);
      const { original } = req.query;
      const originalQueryParams = this.persistOriginalValues(`${isEdit}`, `${original}`, `${originCountry}`, `${queryParams}`);

      if (!originCountry) {
        redirectRoute(Route.importCountryOrigin, queryParams, res, req, translation.page.importCountryOrigin.error);
      } else if (isEdit && original && destinationCountry !== originCountry) {
        redirectRoute(Route.manageThisTrade, queryParams, res);
      } else {
        res.render('destination-country', {
          OriginCountry,
          originCountry,
          tradeType,
          goodsIntent,
          userTypeTrader,
          DestinationCountry,
          destinationCountry,
          importDeclarations,
          previousPage,
          isEdit,
          importDate,
          commodity,
          original,
          originalQueryParams,
          additionalCode,
          errors: showErrorMessage ? { text: showErrorMessage } : null,
          csrfToken: req.csrfToken(),
        });
      }
    } catch (e) {
      next(e);
    }
  };

  private persistOriginalValues = (
    isEdit: string,
    original: string,
    originCountry: string,
    queryParams: string,
  ) => {
    let originalQueryParams;

    if (isEdit === 'true') {
      const getOriginCountry = (original !== 'undefined') ? original : originCountry;
      const params = new URLSearchParams(queryParams);
      params.set('originCountry', getOriginCountry);
      originalQueryParams = params.toString();
    }
    return originalQueryParams;
  }
}

export default DestinationCountryController;
