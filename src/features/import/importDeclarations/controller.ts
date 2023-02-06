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
import { ImportDeclarations } from '../../../interfaces/enums.interface';
import { Route } from '../../../interfaces/routes.interface';
import { redirectRoute } from '../../../utils/redirectRoute';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../../../utils/sessionHelpers';

import { journey } from '../../../utils/previousNextRoutes';
import { updateQueryParams } from '../../../utils/queryHelper';
import { removeParam } from '../../../utils/filters/removeParam';

class ImportDeclarationsController {
  public importDeclarations: RequestHandler = (req, res, next) => {
    setSessionCurrentPath(req);
    const showErrorMessage = getErrorMessage(req);

    clearSessionErrorMessages(req);

    try {
      const { importDeclarations } = req.query;
      const { translation } = res.locals;
      const isEdit = req.query.isEdit === 'true';
      const original = isEdit ? importDeclarations : req.query.original;
      const editCancelled = original === importDeclarations ? '&editCancelled=true' : '';
      const previousPage = `${journey.import.importDeclarations.previousPage(isEdit)}?${removeParam(res.locals.queryParams, ['editCancelled'])}${editCancelled}`;

      res.render('import/importDeclarations/view.njk', {
        original,
        previousPage,
        importDeclarations,
        ImportDeclarations,
        Route,
        isEdit,
        errors: showErrorMessage ? { text: showErrorMessage, visuallyHiddenText: translation.common.errors.error } : null,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  };

  public importDeclarationsSubmit: RequestHandler = (req, res, next) => {
    const {
      importDeclarations,
    } = req.body;

    const { queryParams, translation } = res.locals;
    const isEdit = req.body.isEdit === 'true';
    const nextPage = journey.import.importDeclarations.nextPage();
    const updatedQueryParams = updateQueryParams(queryParams, { importDeclarations });

    try {
      if (!importDeclarations) {
        redirectRoute(
          Route.importDeclarations,
          queryParams,
          res,
          req,
          translation.page.importDeclarations.error,
        );
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

export default ImportDeclarationsController;
