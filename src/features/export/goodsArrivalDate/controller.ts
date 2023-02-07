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
import { Route } from '../../../interfaces/routes.interface';
import { getImportDateFromQuery, updateQueryParams } from '../../../utils/queryHelper';
import validateImportDate, { hasDateErrors } from '../../../utils/validateImportDate';
import { DateErrors } from '../../../interfaces/importDate.interface';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../../../utils/sessionHelpers';
import { removeParam } from '../../../utils/filters/removeParam';
import { getErrorIdForAnchor } from '../../../utils/getErrorIdForAnchor';
import { redirectRoute } from '../../../utils/redirectRoute';
import { journey } from '../../../utils/previousNextRoutes';

class ExportGoodsArrivalDateController {
  public exportGoodsArrivalDate: RequestHandler = (req, res, next) => {
    setSessionCurrentPath(req);
    const isDirty = req.url.includes('tradeDateDay');
    const showErrorMessage: any = isDirty ? getErrorMessage(req) : undefined;
    clearSessionErrorMessages(req);

    try {
      const { tradeDetails } = req.query;
      const { queryParams, translation } = res.locals;
      const tradeDate = getImportDateFromQuery(req);
      const isEdit = req.query.isEdit === 'true';

      const getQueryParams = updateQueryParams(queryParams, {
        tradeDateDay: req.query.originalTradeDateDay || tradeDate.day,
        tradeDateMonth: req.query.originalTradeDateMonth || tradeDate.month,
        tradeDateYear: req.query.originalTradeDateYear || tradeDate.year,
      });

      const originalTradeDateDay = tradeDate.day || req.query.originalTradeDateDay;
      const originalTradeDateMonth = tradeDate.month || req.query.originalTradeDateMonth;
      const originalTradeDateYear = tradeDate.year || req.query.originalTradeDateYear;

      const dateErrors: DateErrors = hasDateErrors(showErrorMessage?.id);
      const previousPage = `${journey.export.exportGoodsArrivalDate.previousPage(isEdit)}?${getQueryParams}`;
      const jsBackButton = !!tradeDetails;

      res.render('export/goodsArrivalDate/view.njk', {
        Route,
        jsBackButton,
        previousPage,
        tradeDate,
        isEdit,
        originalTradeDateDay,
        originalTradeDateMonth,
        originalTradeDateYear,
        tradeDetails,
        dateErrors,
        errors: showErrorMessage
          ? {
            text: showErrorMessage.message,
            idForAnchor: getErrorIdForAnchor(showErrorMessage.id),
            id: showErrorMessage.id,
            visuallyHiddenText: translation.common.errors.error,
          }
          : null,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  };

  public exportGoodsArrivalDateSubmit: RequestHandler = (req, res, next) => {
    const {
      tradeDateDay,
      tradeDateMonth,
      tradeDateYear,
      originalTradeDateDay,
      originalTradeDateMonth,
      originalTradeDateYear,
      isEdit,
    } = req.body;

    const { queryParams, translation, language } = res.locals;
    const tradeDate = getImportDateFromQuery(req, true);
    const error = validateImportDate(tradeDate, translation, String(req.query.tradeType), language);

    const updatedQueryParams = updateQueryParams(queryParams, {
      tradeDateDay,
      tradeDateMonth,
      tradeDateYear,
    });

    const getUpdatedQueryParams = isEdit ? updateQueryParams(updatedQueryParams, {
      originalTradeDateDay,
      originalTradeDateMonth,
      originalTradeDateYear,
      isEdit,
    }) : updatedQueryParams;

    try {
      if (error) {
        redirectRoute(
          Route.exportGoodsArrivalDate,
          getUpdatedQueryParams,
          res,
          req,
          error,
        );
      } else if (isEdit) {
        redirectRoute(
          Route.checkYourAnswers,
          removeParam(updatedQueryParams, [
            'originalTradeDateDay',
            'originalTradeDateMonth',
            'originalTradeDateYear',
          ]),
          res,
        );
      } else {
        redirectRoute(
          journey.export.exportGoodsArrivalDate.nextPage(),
          removeParam(updatedQueryParams, [
            'originalTradeDateDay',
            'originalTradeDateMonth',
            'originalTradeDateYear',
          ]),
          res,
        );
      }
    } catch (e) {
      next(e);
    }
  };
}

export default ExportGoodsArrivalDateController;
