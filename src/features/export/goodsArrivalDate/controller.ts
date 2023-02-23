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

import { RequestHandler, Request } from 'express';
import { GoodsIntent } from '../../../interfaces/enums.interface';
import { Route } from '../../../interfaces/routes.interface';
import { getImportDateFromQuery, updateQueryParams } from '../../../utils/queryHelper';
import validateImportDate, { hasDateErrors } from '../../../utils/validateImportDate';
import { ImportDate, DateErrors } from '../../../interfaces/importDate.interface';
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
      const {
        tradeType, goodsIntent, commodity, destinationCountry, tradeDetails,
      } = req.query;
      const { queryParams } = res.locals;
      const tradeDate = getImportDateFromQuery(req);
      const isEdit = req.query.isEdit === 'true';

      const originalValues = this.persistOriginalValues(`${isEdit}`, tradeDate, req, queryParams);

      const previousPage = journey.export.exportGoodsArrivalDate.previousPage(`${originalValues.originalTradeDateDay}`);

      const { originalTradeDateDay } = originalValues;
      const { originalTradeDateMonth } = originalValues;
      const { originalTradeDateYear } = originalValues;
      const { originalQueryParams } = originalValues;
      const dateErrors: DateErrors = hasDateErrors(showErrorMessage?.id);

      res.render('export/goodsArrivalDate/view.njk', {
        Route,
        tradeType,
        goodsIntent,
        previousPage,
        GoodsIntent,
        tradeDate,
        isEdit,
        commodity,
        destinationCountry,
        originalTradeDateDay,
        originalTradeDateMonth,
        originalTradeDateYear,
        originalQueryParams,
        tradeDetails,
        dateErrors,
        errors: showErrorMessage
          ? {
            text: showErrorMessage.message,
            idForAnchor: getErrorIdForAnchor(showErrorMessage.id),
            id: showErrorMessage.id,
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

    const { queryParams, translation } = res.locals;
    const tradeDate = getImportDateFromQuery(req, true);
    const error = validateImportDate(tradeDate, translation, String(req.query.tradeType));

    const updatedQueryParams = updateQueryParams(queryParams, {
      tradeDateDay,
      tradeDateMonth,
      tradeDateYear,
    });

    const getUpdatedQueryParams = isEdit ? updateQueryParams(updatedQueryParams, {
      originalTradeDateDay,
      originalTradeDateMonth,
      originalTradeDateYear,
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
          Route.exportCheckYourAnswers,
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
          updatedQueryParams,
          res,
        );
      }
    } catch (e) {
      next(e);
    }
  };

  private persistOriginalValues = (
    isEdit: string,
    tradeDate: ImportDate,
    req: Request,
    queryParams: string,
  ) => {
    let originalTradeDateDay;
    let originalTradeDateMonth;
    let originalTradeDateYear;
    let originalQueryParams;

    if (isEdit === 'true') {
      originalTradeDateDay = tradeDate.day;
      originalTradeDateMonth = tradeDate.month;
      originalTradeDateYear = tradeDate.year;
    } else {
      originalTradeDateDay = req.query.originalTradeDateDay;
      originalTradeDateMonth = req.query.originalTradeDateMonth;
      originalTradeDateYear = req.query.originalTradeDateYear;
      originalQueryParams = updateQueryParams(queryParams, {
        tradeDateDay: `${originalTradeDateDay}`,
        tradeDateMonth: `${originalTradeDateMonth}`,
        tradeDateYear: `${originalTradeDateYear}`,
      });
    }
    return {
      originalTradeDateDay,
      originalTradeDateMonth,
      originalTradeDateYear,
      originalQueryParams,
    };
  }
}

export default ExportGoodsArrivalDateController;
