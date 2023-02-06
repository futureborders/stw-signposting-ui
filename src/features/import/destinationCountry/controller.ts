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
import { DestinationCountry, OriginCountry } from '../../../interfaces/enums.interface';
import { Route } from '../../../interfaces/routes.interface';
import { redirectRoute } from '../../../utils/redirectRoute';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../../../utils/sessionHelpers';

import { getImportDateFromQuery, updateQueryParams } from '../../../utils/queryHelper';
import { journey } from '../../../utils/previousNextRoutes';
import { isImportFromEUIntoNorthernIreland } from '../../../utils/isImportFromEUIntoNorthernIreland';

class DestinationCountryController {
  public destinationCountry: RequestHandler = (req, res, next) => {
    const showErrorMessage = getErrorMessage(req);
    clearSessionErrorMessages(req);

    try {
      setSessionCurrentPath(req);
      const {
        destinationCountry,
        originCountry,
      } = req.query;

      const isEdit = req.query.isEdit === 'true';
      const { translation } = res.locals;
      const previousPage = `${journey.import.destinationCountry.previousPage(isEdit)}?${res.locals.queryParams}`;
      const importDate = getImportDateFromQuery(req);
      const original = originCountry;

      res.render('import/destinationCountry/view.njk', {
        OriginCountry,
        originCountry,
        DestinationCountry,
        destinationCountry,
        previousPage,
        isEdit,
        importDate,
        original,
        Route,
        errors: showErrorMessage ? { text: showErrorMessage, visuallyHiddenText: translation.common.errors.error } : null,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  };

  public destinationCountrySubmit: RequestHandler = (req, res, next) => {
    const {
      destinationCountry,
    } = req.body;

    const { queryParams, translation } = res.locals;
    const isEdit = req.body.isEdit === 'true';
    const nextPage = journey.import.destinationCountry.nextPage();
    const updatedQueryParams = updateQueryParams(queryParams, { destinationCountry });

    try {
      if (!destinationCountry) {
        redirectRoute(
          Route.destinationCountry,
          queryParams,
          res,
          req,
          translation.page.destinationCountry.error,
        );
      } else if (isImportFromEUIntoNorthernIreland(destinationCountry as DestinationCountry, String(req.query.originCountry))) {
        redirectRoute(Route.northernIrelandAndEUTrading, updatedQueryParams, res);
      } else if (isEdit) {
        redirectRoute(
          Route.checkYourAnswers,
          updatedQueryParams,
          res,
        );
      } else {
        redirectRoute(
          nextPage,
          updatedQueryParams,
          res,
        );
      }
    } catch (e) {
      next(e);
    }
  };
}

export default DestinationCountryController;
