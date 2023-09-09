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
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../../../utils/sessionHelpers';
import { Route } from '../../../interfaces/routes.interface';
import { ExportDeclarations } from '../../../interfaces/enums.interface';
import {
  updateQueryParams,
} from '../../../utils/queryHelper';
import { redirectRoute } from '../../../utils/redirectRoute';

import { journey } from '../../../utils/previousNextRoutes';
import {
  commodityCodeIsEmpty,
} from '../../../utils/validateCommodityCode';

class ExportCommoditySearchController {
  public exportCommoditySearch: RequestHandler = (req, res, next) => {
    setSessionCurrentPath(req);
    const showErrorMessage = getErrorMessage(req);
    clearSessionErrorMessages(req);

    try {
      const { commodity, tradeDetails, exportDeclarations } = req.query;
      const { queryParams, translation } = res.locals;
      const isEdit = req.query.isEdit === 'true';
      const isAgent = exportDeclarations === ExportDeclarations.no;
      const original = req.query.commodity || req.query.original || '';
      const getQueryParams = updateQueryParams(queryParams, { commodity: original });
      const jsBackButton = !!tradeDetails;
      const previousPage = `${journey.export.exportCommoditySearch.previousPage(isEdit, isAgent)}?${getQueryParams}`;

      res.render('export/commoditySearch/view.njk', {
        jsBackButton,
        previousPage,
        commodity,
        isEdit,
        original,
        tradeDetails,
        Route,
        errors: showErrorMessage ? { text: showErrorMessage, visuallyHiddenText: translation.common.errors.error } : null,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  };

  public exportCommoditySearchSubmit: RequestHandler = (req, res, next) => {
    const isEdit = req.body.isEdit === 'true';
    const commodity = req.body.commodity.trim();
    const { queryParams, translation } = res.locals;
    const { original } = req.body;
    const updatedQueryParams = decodeURIComponent(updateQueryParams(queryParams, { commodity }));

    try {
      if (commodityCodeIsEmpty(commodity)) {
        redirectRoute(
          Route.exportCommoditySearch,
          isEdit
            ? updateQueryParams(updatedQueryParams, { original, isEdit })
            : queryParams,
          res,
          req,
          translation.page.exportCommoditySearch.error,
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

export default ExportCommoditySearchController;
