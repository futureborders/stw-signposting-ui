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
import { ImportDeclarations } from '../interfaces/enums.interface';
import { Route } from '../interfaces/routes.interface';
import { redirectRoute } from '../utils/redirectRoute';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../utils/sessionHelpers';

class ImportDeclarationsController {
  public importDeclarations: RequestHandler = (req, res, next) => {
    setSessionCurrentPath(req);
    const { translation } = res.locals;
    const showErrorMessage = getErrorMessage(req);

    clearSessionErrorMessages(req);

    try {
      const { userTypeTrader } = req.query;
      const { goodsIntent } = req.query;
      const { tradeType } = req.query;
      const { importDeclarations } = req.query;
      const { queryParams } = res.locals;
      const previousPage = Route.identifyUserType;

      if (!userTypeTrader) {
        redirectRoute(
          Route.identifyUserType,
          queryParams,
          res,
          req,
          translation.page.identifyUserType.error,
        );
      } else if (userTypeTrader === 'false') {
        redirectRoute(Route.importCountryOrigin, queryParams, res);
      } else {
        res.render('import-declarations', {
          tradeType,
          queryParams,
          goodsIntent,
          userTypeTrader,
          previousPage,
          importDeclarations,
          ImportDeclarations,
          errors: showErrorMessage ? { text: showErrorMessage } : null,
          csrfToken: req.csrfToken(),
        });
      }
    } catch (e) {
      next(e);
    }
  };
}

export default ImportDeclarationsController;
