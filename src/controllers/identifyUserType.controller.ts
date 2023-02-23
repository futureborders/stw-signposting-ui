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
import { Route } from '../interfaces/routes.interface';
import { redirectRoute } from '../utils/redirectRoute';
import { GoodsIntent } from '../interfaces/enums.interface';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../utils/sessionHelpers';

class IdentifyUserTypeController {
  public identifyUserType: RequestHandler = (req, res, next) => {
    const { translation } = res.locals;
    const showErrorMessage = getErrorMessage(req);

    clearSessionErrorMessages(req);

    try {
      const { tradeType } = req.query;
      const { goodsIntent } = req.query;
      const { userTypeTrader } = req.query;
      const { queryParams } = res.locals;
      const previousPage = Route.goodsIntent;

      if (!goodsIntent) {
        redirectRoute(
          Route.goodsIntent,
          queryParams,
          res,
          req,
          translation.page.goodsIntent.error,
        );
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
      } else {
        setSessionCurrentPath(req);
        res.render('identify-user-type', {
          tradeType,
          goodsIntent,
          userTypeTrader,
          previousPage,
          errors: showErrorMessage ? { text: showErrorMessage } : null,
          csrfToken: req.csrfToken(),
        });
      }
    } catch (e) {
      next(e);
    }
  };
}

export default IdentifyUserTypeController;
