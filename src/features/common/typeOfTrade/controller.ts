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

import { RequestHandler } from 'express';
import { TypeOfTrade } from '../../../interfaces/enums.interface';
import { redirectRoute } from '../../../utils/redirectRoute';
import { Route } from '../../../interfaces/routes.interface';
import { setSessionCurrentPath, getErrorMessage, clearSessionErrorMessages } from '../../../utils/sessionHelpers';
import { updateQueryParams } from '../../../utils/queryHelper';
import { journey } from '../../../utils/previousNextRoutes';

class TypeOfTradeController {
  public typeOfTrade: RequestHandler = (req, res, next) => {
    setSessionCurrentPath(req);
    const showErrorMessage = getErrorMessage(req);
    clearSessionErrorMessages(req);

    try {
      const {
        tradeType,
        commodity,
        exportDeclarations,
        destinationCountry,
        tradeDateDay,
        tradeDateMonth,
        tradeDateYear,
        originCountry,
        exportGoodsIntent,
        exportUserTypeTrader,
      } = req.query;
      const isEdit = req.query.isEdit === 'true';
      const { queryParams, translation } = res.locals;
      const original = isEdit ? tradeType : req.query.original;
      const startPageEnabled = process.env.STARTPAGE_ENABLED === 'true';
      const previousPage = journey.common.typeOfTrade.previousPage(isEdit, startPageEnabled, `${process.env.STARTPAGE_URL}`, queryParams);

      res.render('common/typeOfTrade/view.njk', {
        TypeOfTrade,
        tradeType,
        isEdit,
        exportDeclarations,
        destinationCountry,
        previousPage,
        commodity,
        original,
        tradeDateDay,
        tradeDateMonth,
        tradeDateYear,
        originCountry,
        exportGoodsIntent,
        exportUserTypeTrader,
        errors: showErrorMessage ? { text: showErrorMessage, visuallyHiddenText: translation.common.errors.error } : null,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  }

  public typeOfTradeSubmit: RequestHandler = (req, res, next) => {
    const { tradeType, original } = req.body;
    const { queryParams, translation } = res.locals;
    const isEdit = req.body.isEdit === 'true';
    const hasChanged = original !== tradeType;
    const updatedQueryParams = hasChanged ? `tradeType=${tradeType}` : updateQueryParams(queryParams, { tradeType });
    const nextPage = journey.common.typeOfTrade.nextPage(isEdit, tradeType, hasChanged);

    try {
      if (!tradeType) {
        redirectRoute(Route.typeOfTrade, queryParams, res, req, translation.page.typeOfTrade.error);
      } else {
        redirectRoute(nextPage, updatedQueryParams, res);
      }
    } catch (e) {
      next(e);
    }
  };
}

export default TypeOfTradeController;
