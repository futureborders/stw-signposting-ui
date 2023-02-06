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
import 'dotenv/config';

import { Route } from '../../../interfaces/routes.interface';
import { redirectRoute } from '../../../utils/redirectRoute';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../../../utils/sessionHelpers';

import { updateQueryParams } from '../../../utils/queryHelper';
import { journey } from '../../../utils/previousNextRoutes';
import { ExportGoodsIntent } from '../../../interfaces/enums.interface';

class ExportGoodsIntentController {
  public exportGoodsIntent: RequestHandler = async (req, res, next) => {
    setSessionCurrentPath(req);
    const showErrorMessage = getErrorMessage(req);

    clearSessionErrorMessages(req);

    try {
      const { exportGoodsIntent } = req.query;
      const { translation } = res.locals;
      const isEdit = req.query.isEdit === 'true';
      const previousPage = `${journey.export.exportGoodsIntent.previousPage(isEdit)}?${res.locals.queryParams}`;

      res.render('export/goodsIntent/view.njk', {
        exportGoodsIntent,
        ExportGoodsIntent,
        previousPage,
        isEdit,
        Route,
        errors: showErrorMessage ? { text: showErrorMessage, visuallyHiddenText: translation.common.errors.error } : null,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  };

  public exportGoodsIntentSubmit: RequestHandler = (req, res, next) => {
    const { exportGoodsIntent, isEdit } = req.body;
    const { queryParams, translation } = res.locals;

    const updatedQueryParams = updateQueryParams(queryParams, { exportGoodsIntent });
    const nextPage = journey.export.exportGoodsIntent.nextPage();

    try {
      if (!exportGoodsIntent) {
        redirectRoute(Route.exportGoodsIntent, queryParams, res, req, translation.page.exportGoodsIntent.error);
      } else if (exportGoodsIntent === ExportGoodsIntent.goodsExportedTemporarilyForBusiness) {
        res.redirect(
          'https://www.gov.uk/taking-goods-out-uk-temporarily?step-by-step-nav=b9347000-c726-4c3c-b76a-e52b6cebb3eb',
        );
      } else if (exportGoodsIntent === ExportGoodsIntent.goodsSoldInLuggageForBusiness) {
        res.redirect(
          'https://www.gov.uk/take-goods-sell-abroad?step-by-step-nav=b9347000-c726-4c3c-b76a-e52b6cebb3eb',
        );
      } else if (exportGoodsIntent === ExportGoodsIntent.goodsPostedForPersonal) {
        res.redirect(
          'https://personal.help.royalmail.com/app/answers/detail/a_id/106',
        );
      } else if (isEdit) {
        redirectRoute(
          Route.checkYourAnswers,
          updatedQueryParams,
          res,
        );
      } else {
        redirectRoute(nextPage, updatedQueryParams, res);
      }
    } catch (e) {
      next(e);
    }
  };
}

export default ExportGoodsIntentController;
