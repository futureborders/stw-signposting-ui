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
import { journey } from '../../../utils/previousNextRoutes';
import { updateQueryParams } from '../../../utils/queryHelper';
import { redirectRoute } from '../../../utils/redirectRoute';
import { removeParam } from '../../../utils/filters';
import { ImportUserTypeTrader } from '../../../interfaces/enums.interface';

class IdentifyUserTypeController {
  public identifyUserType: RequestHandler = (req, res, next) => {
    const showErrorMessage = getErrorMessage(req);
    clearSessionErrorMessages(req);

    try {
      const {
        userTypeTrader,
        original,
      } = req.query;
      const { translation } = res.locals;
      const isEdit = req.query.isEdit === 'true';
      const editCancelled = isEdit ? '&editCancelled=true' : '';
      const previousPage = `${journey.import.identifyUserType.previousPage(isEdit)}?${removeParam(res.locals.queryParams, ['editCancelled'])}${editCancelled}`;

      setSessionCurrentPath(req);
      res.render('import/identifyUserType/view.njk', {
        userTypeTrader,
        previousPage,
        isEdit,
        original,
        errors: showErrorMessage ? { text: showErrorMessage, visuallyHiddenText: translation.common.errors.error } : null,
        Route,
        ImportUserTypeTrader,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  };

  public identifyUserTypeSubmit: RequestHandler = (req, res, next) => {
    const { importDeclarations } = req.query;
    const { userTypeTrader } = req.body;
    const { queryParams, translation } = res.locals;
    const isEdit = req.body.isEdit === 'true';
    const isUserTypeTrader = userTypeTrader !== ImportUserTypeTrader.no;
    const nextPage = journey.import.identifyUserType.nextPage(userTypeTrader);
    let updatedQueryParams = updateQueryParams(queryParams, { userTypeTrader });

    try {
      if (!userTypeTrader) {
        redirectRoute(
          Route.identifyUserType,
          queryParams,
          res,
          req,
          translation.page.identifyUserType.error,
        );
      } else if (isEdit && isUserTypeTrader && !importDeclarations) {
        redirectRoute(Route.importDeclarations, updateQueryParams(updatedQueryParams, { isEdit: true }), res);
      } else if (isEdit) {
        updatedQueryParams = (userTypeTrader === ImportUserTypeTrader.no) ? updateQueryParams(updatedQueryParams, { importDeclarations: '' }) : updatedQueryParams;
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

export default IdentifyUserTypeController;
