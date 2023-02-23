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
import { Route } from '../../../interfaces/routes.interface';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../../../utils/sessionHelpers';
import { updateQueryParams } from '../../../utils/queryHelper';
import { redirectRoute } from '../../../utils/redirectRoute';
import { journey } from '../../../utils/previousNextRoutes';
import { ExportUserTypeTrader } from '../../../interfaces/enums.interface';

class ExportUserTypeTraderController {
  public exportUserTypeTrader: RequestHandler = (req, res, next) => {
    setSessionCurrentPath(req);

    const showErrorMessage = getErrorMessage(req);

    clearSessionErrorMessages(req);

    try {
      const { exportUserTypeTrader } = req.query;
      const isEdit = req.query.isEdit === 'true';
      const previousPage = journey.export.exportUserTypeTrader.previousPage(isEdit);

      res.render('export/userTypeTrader/view.njk', {
        previousPage,
        exportUserTypeTrader,
        ExportUserTypeTrader,
        isEdit,
        Route,
        errors: showErrorMessage ? { text: showErrorMessage } : null,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  };

  public exportUserTypeTraderSubmit: RequestHandler = (req, res, next) => {
    const { exportUserTypeTrader, isEdit } = req.body;
    const { exportDeclarations } = req.query;
    const { queryParams, translation } = res.locals;
    const updatedQueryParams = updateQueryParams(queryParams, { exportUserTypeTrader });

    try {
      if (!exportUserTypeTrader) {
        redirectRoute(
          Route.exportUserTypeTrader,
          queryParams,
          res,
          req,
          translation.page.exportUserTypeTrader.error,
        );
      } else if (isEdit && exportUserTypeTrader !== ExportUserTypeTrader.actingOnBehalfOfSeller && exportDeclarations) {
        redirectRoute(
          Route.exportCheckYourAnswers,
          updatedQueryParams,
          res,
        );
      } else if (isEdit && exportUserTypeTrader !== ExportUserTypeTrader.actingOnBehalfOfSeller && !exportDeclarations) {
        redirectRoute(
          Route.exportDeclarations,
          updateQueryParams(updatedQueryParams, { isEdit: true }),
          res,
        );
      } else if (isEdit && exportUserTypeTrader === ExportUserTypeTrader.actingOnBehalfOfSeller) {
        redirectRoute(
          Route.exportCheckYourAnswers,
          updateQueryParams(updatedQueryParams, { exportDeclarations: '' }),
          res,
        );
      } else if (!isEdit && exportUserTypeTrader === ExportUserTypeTrader.actingOnBehalfOfSeller) {
        redirectRoute(
          Route.exportOriginCountry,
          updateQueryParams(updatedQueryParams, { exportDeclarations: '' }),
          res,
        );
      } else {
        redirectRoute(
          Route.exportDeclarations,
          updatedQueryParams,
          res,
        );
      }
    } catch (e) {
      next(e);
    }
  };
}

export default ExportUserTypeTraderController;
