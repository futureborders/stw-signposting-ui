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
import { ResponsibleForDeclaringGoods } from '../../../interfaces/enums.interface';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../../../utils/sessionHelpers';

import { updateQueryParams } from '../../../utils/queryHelper';

import { redirectRoute } from '../../../utils/redirectRoute';

import { journey } from '../../../utils/previousNextRoutes';

class ExportResponsibleForDeclaringGoodsController {
  public exportResponsibleForDeclaringGoods: RequestHandler = (req, res, next) => {
    setSessionCurrentPath(req);

    const showErrorMessage = getErrorMessage(req);

    clearSessionErrorMessages(req);

    try {
      const { exportResponsibleForDeclaringGoods, destinationCountry } = req.query;
      const { queryParams } = res.locals;
      const isEdit = req.query.isEdit === 'true';
      const previousPage = `${journey.export.exportResponsibleForDeclaringGoods.previousPage(isEdit)}?${queryParams}&isEdit=${isEdit}`;

      res.render('export/responsibleForDeclaringGoods/view.njk', {
        previousPage,
        exportResponsibleForDeclaringGoods,
        ResponsibleForDeclaringGoods,
        destinationCountry,
        isEdit,
        errors: showErrorMessage ? { text: showErrorMessage } : null,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  };

  public exportResponsibleForDeclaringGoodsSubmit: RequestHandler = (req, res, next) => {
    const { exportResponsibleForDeclaringGoods, isEdit } = req.body;
    const { destinationCountry } = req.query;
    const { queryParams, translation } = res.locals;
    const updatedQueryParams = updateQueryParams(queryParams, { exportResponsibleForDeclaringGoods });
    const errorMessage = translation.page.exportResponsibleForDeclaringGoods.error(translation.common.countries[String(destinationCountry)]);
    try {
      if (!exportResponsibleForDeclaringGoods) {
        redirectRoute(
          Route.exportResponsibleForDeclaringGoods,
          updateQueryParams(queryParams, { isEdit }),
          res,
          req,
          errorMessage,
        );
      } else if (isEdit) {
        redirectRoute(
          Route.checkYourAnswers,
          updatedQueryParams,
          res,
        );
      } else {
        redirectRoute(
          journey.export.exportResponsibleForDeclaringGoods.nextPage(),
          updatedQueryParams,
          res,
        );
      }
    } catch (e) {
      next(e);
    }
  };
}

export default ExportResponsibleForDeclaringGoodsController;
