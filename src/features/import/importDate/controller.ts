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
import { redirectRoute } from '../../../utils/redirectRoute';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../../../utils/sessionHelpers';

import { DateErrors } from '../../../interfaces/importDate.interface';
import { getImportDateFromQuery, updateQueryParams } from '../../../utils/queryHelper';
import { getErrorIdForAnchor } from '../../../utils/getErrorIdForAnchor';
import validateImportDate, { hasDateErrors } from '../../../utils/validateImportDate';
import { journey } from '../../../utils/previousNextRoutes';
import { removeParam } from '../../../utils/filters/removeParam';

class ImportDateController {
  public importDate: RequestHandler = (req, res, next) => {
    const isDirty = req.url.includes('importDateDay');
    const showErrorMessage: any = isDirty ? getErrorMessage(req) : undefined;
    clearSessionErrorMessages(req);

    try {
      setSessionCurrentPath(req);

      const { queryParams } = res.locals;
      const isEdit = req.query.isEdit === 'true';
      const importDate = getImportDateFromQuery(req);
      const { translation } = res.locals;

      const getQueryParams = updateQueryParams(queryParams, {
        importDateDay: req.query.originalImportDateDay || importDate.day,
        importDateMonth: req.query.originalImportDateMonth || importDate.month,
        importDateYear: req.query.originalImportDateYear || importDate.year,
      });

      const originalImportDateDay = importDate.day || req.query.originalImportDateDay;
      const originalImportDateMonth = importDate.month || req.query.originalImportDateMonth;
      const originalImportDateYear = importDate.year || req.query.originalImportDateYear;

      const dateErrors: DateErrors = hasDateErrors(showErrorMessage?.id);
      const previousPage = `${journey.import.importDate.previousPage(isEdit)}?${getQueryParams}`;

      res.render('import/importDate/view.njk', {
        previousPage,
        importDate,
        isEdit,
        originalImportDateDay,
        originalImportDateMonth,
        originalImportDateYear,
        dateErrors,
        Route,
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

  public importDateSubmit: RequestHandler = (req, res, next) => {
    const {
      importDateDay,
      importDateMonth,
      importDateYear,
      originalImportDateDay,
      originalImportDateMonth,
      originalImportDateYear,
    } = req.body;

    const isEdit = req.body.isEdit === 'true';
    const { language, translation, queryParams } = res.locals;
    const importDate = getImportDateFromQuery(req, true);
    const error = validateImportDate(importDate, translation, String(req.query.tradeType), language);

    const updatedQueryParams = updateQueryParams(queryParams, {
      importDateDay,
      importDateMonth,
      importDateYear,
    });

    const getUpdatedQueryParams = isEdit ? updateQueryParams(updatedQueryParams, {
      originalImportDateDay,
      originalImportDateMonth,
      originalImportDateYear,
      isEdit,
    }) : updatedQueryParams;

    try {
      if (error) {
        redirectRoute(
          Route.importDate,
          getUpdatedQueryParams,
          res,
          req,
          error,
        );
      } else if (isEdit) {
        redirectRoute(
          Route.checkYourAnswers,
          removeParam(updatedQueryParams, [
            'originalImportDateDay',
            'originalImportDateMonth',
            'originalImportDateYear',
          ]),
          res,
        );
      } else {
        redirectRoute(
          journey.import.importDate.nextPage(),
          removeParam(updatedQueryParams, [
            'originalImportDateDay',
            'originalImportDateMonth',
            'originalImportDateYear',
          ]),
          res,
        );
      }
    } catch (e) {
      next(e);
    }
  };
}
export default ImportDateController;
