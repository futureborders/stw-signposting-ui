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
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../../../utils/sessionHelpers';

import { updateQueryParams } from '../../../utils/queryHelper';

import { redirectRoute } from '../../../utils/redirectRoute';

import { journey } from '../../../utils/previousNextRoutes';

class ExportDeclarationsController {
  public exportDeclarations: RequestHandler = (req, res, next) => {
    setSessionCurrentPath(req);

    const showErrorMessage = getErrorMessage(req);

    clearSessionErrorMessages(req);

    try {
      const { exportDeclarations } = req.query;
      const { backPath, queryParams, translation } = res.locals;
      const isEdit = req.query.isEdit === 'true';
      const isExportUserTypeTraderbackPath = String(backPath).includes(Route.exportUserTypeTrader);
      const previousPage = `${journey.export.exportDeclarations.previousPage(isEdit, isExportUserTypeTraderbackPath)}?${queryParams}&isEdit=${isEdit}`;

      res.render('export/declarations/view.njk', {
        previousPage,
        exportDeclarations,
        isEdit,
        errors: showErrorMessage ? { text: showErrorMessage, visuallyHiddenText: translation.common.errors.error } : null,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  };

  public exportDeclarationsSubmit: RequestHandler = (req, res, next) => {
    const { exportDeclarations, isEdit } = req.body;
    const { queryParams, translation } = res.locals;
    const updatedQueryParams = updateQueryParams(queryParams, { exportDeclarations });
    try {
      if (!exportDeclarations) {
        redirectRoute(
          Route.exportDeclarations,
          updateQueryParams(queryParams, { isEdit }),
          res,
          req,
          translation.page.exportDeclarations.error,
        );
      } else if (isEdit) {
        redirectRoute(
          Route.checkYourAnswers,
          updatedQueryParams,
          res,
        );
      } else {
        redirectRoute(
          journey.export.exportDeclarations.nextPage(),
          updatedQueryParams,
          res,
        );
      }
    } catch (e) {
      next(e);
    }
  };
}

export default ExportDeclarationsController;
