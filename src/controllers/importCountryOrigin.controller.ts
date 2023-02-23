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
import 'dotenv/config';
import { getCountryDropdown } from '../models/countries.models';

import { Route } from '../interfaces/routes.interface';
import { redirectRoute } from '../utils/redirectRoute';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../utils/sessionHelpers';

import { getImportDateFromQuery } from '../utils/queryHelper';

class ImportCountryOriginController {
  public importCountryOrigin: RequestHandler = async (req, res, next) => {
    setSessionCurrentPath(req);
    const { translation } = res.locals;

    const countryDropdown = getCountryDropdown(
      req,
      res.locals.language,
      translation.common.accessibility.defaultCountrySelectLabel,
    );

    const showErrorMessage = getErrorMessage(req);

    clearSessionErrorMessages(req);

    try {
      const title = translation.page.importCountryOrigin.questionImporting;
      const { userTypeTrader } = req.query;
      const { tradeType } = req.query;
      const { goodsIntent } = req.query;
      const { destinationCountry } = req.query;
      const { originCountry } = req.query;
      const { additionalCode } = req.query;
      const { importDeclarations } = req.query;
      const { queryParams } = res.locals;
      const { isEdit } = req.query;
      const { commodity } = req.query;
      const isUserTypeTrader = userTypeTrader === 'true';
      const importDate = getImportDateFromQuery(req);
      const previousPage = this.previousPage(`${isEdit}`, isUserTypeTrader);
      const originalValues = this.persistOriginalValues(`${isEdit}`, `${req.query.original}`, `${originCountry}`, `${queryParams}`);
      const { original } = originalValues;
      const { originalQueryParams } = originalValues;

      if (isUserTypeTrader && !importDeclarations) {
        redirectRoute(
          Route.importDeclarations,
          queryParams,
          res,
          req,
          translation.page.importDeclarations.error,
        );
      } else {
        res.render('import-country-origin', {
          countryDropdown,
          tradeType,
          goodsIntent,
          userTypeTrader,
          destinationCountry,
          importDeclarations,
          title,
          isEdit,
          commodity,
          originCountry,
          importDate,
          original,
          originalQueryParams,
          previousPage,
          additionalCode,
          errors: showErrorMessage ? { text: showErrorMessage } : null,
          csrfToken: req.csrfToken(),
        });
      }
    } catch (e) {
      next(e);
    }
  };

  private previousPage = (isEdit: string, isUserTypeTrader: boolean) => {
    if (isEdit === 'true') {
      return Route.manageThisTrade;
    } if (isUserTypeTrader) {
      return Route.importDeclarations;
    }
    return Route.identifyUserType;
  };

  private persistOriginalValues = (
    isEdit: string,
    originalValue: string,
    originCountry: string,
    queryParams: string,
  ) => {
    let original;
    let originalQueryParams;

    if (isEdit === 'true') {
      original = originalValue !== 'undefined' ? originalValue : originCountry;
      const params = new URLSearchParams(queryParams);
      params.set('originCountry', `${original}`);
      originalQueryParams = params.toString();
    }

    return {
      original,
      originalQueryParams,
    };
  }
}

export default ImportCountryOriginController;
