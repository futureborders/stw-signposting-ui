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
import { GoodsIntent } from '../../../interfaces/enums.interface';
import { Route } from '../../../interfaces/routes.interface';
import { redirectRoute } from '../../../utils/redirectRoute';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../../../utils/sessionHelpers';
import { journey } from '../../../utils/previousNextRoutes';
import { updateQueryParams } from '../../../utils/queryHelper';

class GoodsIntentController {
  public goodsIntent: RequestHandler = (req, res, next) => {
    setSessionCurrentPath(req);
    const showErrorMessage = getErrorMessage(req);
    clearSessionErrorMessages(req);

    try {
      const { tradeType, goodsIntent } = req.query;
      const { translation } = res.locals;
      const isEdit = req.query.isEdit === 'true';
      const previousPage = `${journey.import.goodsIntent.previousPage(isEdit)}?${res.locals.queryParams}`;

      res.render('import/goodsIntent/view.njk', {
        tradeType,
        goodsIntent,
        previousPage,
        GoodsIntent,
        Route,
        isEdit,
        errors: showErrorMessage ? { text: showErrorMessage, visuallyHiddenText: translation.common.errors.error } : null,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  };

  public goodsIntentSubmit: RequestHandler = (req, res, next) => {
    const { goodsIntent, isEdit } = req.body;
    const { queryParams, translation } = res.locals;

    const updatedQueryParams = updateQueryParams(queryParams, { goodsIntent });
    const nextPage = journey.import.goodsIntent.nextPage();

    try {
      if (!goodsIntent) {
        redirectRoute(Route.goodsIntent, queryParams, res, req, translation.page.goodsIntent.error);
      } else if (goodsIntent === GoodsIntent.bringGoodsThroughPost) {
        res.redirect(
          'https://www.gov.uk/goods-sent-from-abroad?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5',
        );
      } else if (goodsIntent === GoodsIntent.bringGoodsInLuggage) {
        res.redirect(
          'https://www.gov.uk/duty-free-goods?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5',
        );
      } else if (goodsIntent === GoodsIntent.bringGoodsInLuggageForBusiness) {
        res.redirect(
          'https://www.gov.uk/guidance/bringing-commercial-goods-into-great-britainin-your-baggage',
        );
      } else if (goodsIntent === GoodsIntent.bringGoodsTemporarily) {
        res.redirect(
          'https://www.gov.uk/guidance/apply-to-import-goods-temporarily-to-the-uk-or-eu',
        );
      } else if (goodsIntent === GoodsIntent.movingToUkWithBelongings) {
        res.redirect(
          'https://www.gov.uk/moving-to-uk?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5',
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

export default GoodsIntentController;
