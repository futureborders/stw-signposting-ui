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
import { Route } from '../interfaces/routes.interface';
import { redirectRoute } from '../utils/redirectRoute';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../utils/sessionHelpers';
import translation from '../translation/en';

import {
  DestinationCountry,
} from '../interfaces/enums.interface';

import { ImportDate, DateErrors } from '../interfaces/importDate.interface';
import { getImportDateFromQuery, updateQueryParams } from '../utils/queryHelper';
import { isImportFromEUIntoNorthernIreland } from '../utils/isImportFromEUIntoNorthernIreland';
import { getErrorIdForAnchor } from '../utils/getErrorIdForAnchor';
import { hasDateErrors } from '../utils/validateImportDate';

class ImportDateController {
  public importDate: RequestHandler = (req, res, next) => {
    const isDirty = req.url.includes('importDateDay');
    const showErrorMessage: any = isDirty ? getErrorMessage(req) : undefined;
    clearSessionErrorMessages(req);

    try {
      setSessionCurrentPath(req);
      const { queryParams } = res.locals;
      const { backPath } = res.locals;
      const { tradeType } = req.query;
      const { goodsIntent } = req.query;
      const { destinationCountry } = req.query;
      const { originCountry } = req.query;
      const { userTypeTrader } = req.query;
      const { importDeclarations } = req.query;
      const { commodity } = req.query;
      const { additionalCode } = req.query;
      const { isEdit } = req.query;
      const previousPage = isEdit ? Route.manageThisTrade : Route.destinationCountry;
      const importDate = getImportDateFromQuery(req);
      const originalValues = this.persistOriginalValues(`${isEdit}`, importDate, req, queryParams);
      const { originalImportDateDay } = originalValues;
      const { originalImportDateMonth } = originalValues;
      const { originalImportDateYear } = originalValues;
      const { originalQueryParams } = originalValues;
      const dateErrors: DateErrors = hasDateErrors(showErrorMessage?.id);

      if (!destinationCountry) {
        redirectRoute(Route.destinationCountry, queryParams, res, req, translation.page.destinationCountry.error);
      } else if (isImportFromEUIntoNorthernIreland(destinationCountry as DestinationCountry, originCountry as string)) {
        redirectRoute(Route.northernIrelandAndEUTrading, queryParams, res);
      } else if ((isEdit && req.query.originalImportDateDay) || (isEdit && req.query.original) || (isEdit && backPath.includes(Route.destinationCountry))) {
        redirectRoute(Route.manageThisTrade, queryParams, res);
      } else {
        res.render('import-date', {
          tradeType,
          goodsIntent,
          previousPage,
          originCountry,
          importDeclarations,
          destinationCountry,
          userTypeTrader,
          importDate,
          isEdit,
          commodity,
          originalImportDateDay,
          originalImportDateMonth,
          originalImportDateYear,
          originalQueryParams,
          additionalCode,
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
      }
    } catch (e) {
      next(e);
    }
  };

  private persistOriginalValues = (
    isEdit: string,
    importDate: ImportDate,
    req: Request,
    queryParams: string,
  ) => {
    let originalImportDateDay;
    let originalImportDateMonth;
    let originalImportDateYear;
    let originalQueryParams;

    if (isEdit === 'true') {
      originalImportDateDay = importDate.day;
      originalImportDateMonth = importDate.month;
      originalImportDateYear = importDate.year;
    } else {
      originalImportDateDay = req.query.originalImportDateDay;
      originalImportDateMonth = req.query.originalImportDateMonth;
      originalImportDateYear = req.query.originalImportDateYear;
      originalQueryParams = updateQueryParams(queryParams, {
        importDateDay: `${originalImportDateDay}`,
        importDateMonth: `${originalImportDateMonth}`,
        importDateYear: `${originalImportDateYear}`,
      });
    }
    return {
      originalImportDateDay,
      originalImportDateMonth,
      originalImportDateYear,
      originalQueryParams,
    };
  }
}
export default ImportDateController;
