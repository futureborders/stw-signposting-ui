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

import { Route } from '../interfaces/routes.interface';
import { redirectRoute } from '../utils/redirectRoute';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../utils/sessionHelpers';
import { getImportDateFromQuery } from '../utils/queryHelper';
import {
  cleanCommodity,
} from '../utils/validateCommodityCode';

import validateImportDate from '../utils/validateImportDate';

class ImportGoodsController {
  public importGoods: RequestHandler = (req, res, next) => {
    setSessionCurrentPath(req);
    const { translation } = res.locals;
    const showErrorMessage = getErrorMessage(req);

    clearSessionErrorMessages(req);

    try {
      const { commodity } = req.query;
      const { userTypeTrader } = req.query;
      const { goodsIntent } = req.query;
      const { originCountry } = req.query;
      const { tradeType } = req.query;
      const { importDeclarations } = req.query;
      const { destinationCountry } = req.query;
      const { additionalCode } = req.query;
      const { queryParams } = res.locals;
      const { isEdit } = req.query;
      const importDate = getImportDateFromQuery(req);
      const previousPage = isEdit ? Route.manageThisTrade : Route.importDate;
      const error = validateImportDate(importDate, translation);
      const originalValues = this.persistOriginalValues(`${isEdit}`, `${commodity}`, `${req.query?.original}`, `${queryParams}`);
      const { original } = originalValues;
      const { originalQueryParams } = originalValues;

      if (error) {
        redirectRoute(Route.importDate, queryParams, res, req, error);
      } else if (isEdit && req.query.originalImportDateDay) {
        redirectRoute(Route.manageThisTrade, queryParams, res);
      } else {
        res.render('import-goods', {
          tradeType,
          goodsIntent,
          userTypeTrader,
          originCountry,
          destinationCountry,
          importDeclarations,
          commodity: cleanCommodity(commodity as string),
          importDate,
          previousPage,
          isEdit,
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
    commodity: string,
    originalCommodity: string,
    queryParams: string,
  ) => {
    let original;
    let originalQueryParams;
    if (isEdit === 'true') {
      original = commodity;
    } else {
      original = originalCommodity !== 'undefined' ? originalCommodity : '';
      const params = new URLSearchParams(queryParams);
      params.set('commodity', `${original}`);
      originalQueryParams = params.toString();
    }
    return {
      original,
      originalQueryParams,
    };
  }
}

export default ImportGoodsController;
