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
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../../../utils/sessionHelpers';

import {
  updateQueryParams,
} from '../../../utils/queryHelper';

import { journey } from '../../../utils/previousNextRoutes';

class ExportCommoditySearchController {
  public exportCommoditySearch: RequestHandler = (req, res, next) => {
    setSessionCurrentPath(req);
    const showErrorMessage = getErrorMessage(req);
    clearSessionErrorMessages(req);

    try {
      const {
        tradeType,
        exportGoodsIntent,
        goodsIntent,
        exportDeclarations,
        exportCommoditySearch,
        commodity,
        destinationCountry,
        originCountry,
        tradeDateDay,
        tradeDateMonth,
        tradeDateYear,
        additionalCode,
        exportUserTypeTrader,
        tradeDetails,
      } = req.query;

      const { queryParams, backPath } = res.locals;

      const isEdit = req.query.isEdit === 'true';

      const originalValues = this.persistOriginalValues(isEdit, `${commodity}`, `${req.query.original}`, `${queryParams}`);

      const { original } = originalValues;
      const { originalQueryParams } = originalValues;
      const previousPage = journey.export.exportCommoditySearch.previousPage(original);

      res.render('export/commoditySearch/view.njk', {
        tradeType,
        exportGoodsIntent,
        goodsIntent,
        previousPage,
        exportDeclarations,
        exportCommoditySearch,
        commodity,
        destinationCountry,
        originCountry,
        isEdit,
        original,
        originalQueryParams,
        tradeDateDay,
        tradeDateMonth,
        tradeDateYear,
        additionalCode,
        exportUserTypeTrader,
        backPath,
        tradeDetails,
        errors: showErrorMessage ? { text: showErrorMessage } : null,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  };

  private persistOriginalValues = (
    isEdit: boolean,
    commodity: string,
    originalCommodity: string,
    queryParams: string,
  ) => {
    let original;
    let originalQueryParams;
    if (isEdit) {
      original = commodity;
    } else {
      original = originalCommodity !== 'undefined' ? originalCommodity : '';
      originalQueryParams = updateQueryParams(queryParams, { commodity: `${original}` });
    }
    return {
      original,
      originalQueryParams,
    };
  }
}

export default ExportCommoditySearchController;
