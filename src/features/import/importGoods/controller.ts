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

import { journey } from '../../../utils/previousNextRoutes';
import { redirectRoute } from '../../../utils/redirectRoute';
import {
  commodityCodeIsEmpty,
} from '../../../utils/validateCommodityCode';

import { ImportUserTypeTrader } from '../../../interfaces/enums.interface';

class ImportGoodsController {
  public importGoods: RequestHandler = (req, res, next) => {
    setSessionCurrentPath(req);
    const showErrorMessage = getErrorMessage(req);
    clearSessionErrorMessages(req);

    try {
      const { commodity, userTypeTrader, importDeclarations } = req.query;
      const { queryParams, translation } = res.locals;
      const isUserTypeTrader = userTypeTrader !== ImportUserTypeTrader.no;
      const isEdit = req.query.isEdit === 'true';
      const original = req.query.commodity || req.query.original || '';
      const getQueryParams = updateQueryParams(queryParams, { commodity: original });
      const previousPage = `${journey.import.importGoods.previousPage(isEdit, String(userTypeTrader))}?${getQueryParams}`;

      if (isUserTypeTrader && !importDeclarations) {
        redirectRoute(
          Route.importDeclarations,
          queryParams,
          res,
          req,
          translation.page.importDeclarations.error,
        );
      } else {
        res.render('import/importGoods/view.njk', {
          commodity,
          previousPage,
          isEdit,
          original,
          Route,
          errors: showErrorMessage ? { text: showErrorMessage } : null,
          csrfToken: req.csrfToken(),
        });
      }
    } catch (e) {
      next(e);
    }
  };

  public importGoodsSubmit: RequestHandler = (req, res, next) => {
    const isEdit = req.body.isEdit === 'true';
    const commodity = req.body.commodity.trim();
    const { queryParams, translation } = res.locals;
    const { original } = req.body;
    const importDeclarations = req.query.importDeclarations || '';
    const updatedQueryParams = decodeURIComponent(updateQueryParams(queryParams, { commodity, importDeclarations }));

    try {
      if (commodityCodeIsEmpty(commodity)) {
        redirectRoute(
          Route.importGoods,
          isEdit
            ? updateQueryParams(updatedQueryParams, { original, isEdit })
            : queryParams, res, req, translation.page.importGoods.errors.required,
        );
      } else {
        redirectRoute(
          Route.search,
          updatedQueryParams,
          res,
        );
      }
    } catch (e) {
      next(e);
    }
  };
}

export default ImportGoodsController;
