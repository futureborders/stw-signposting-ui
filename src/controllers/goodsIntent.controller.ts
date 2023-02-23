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
import { TypeOfTrade, GoodsIntent } from '../interfaces/enums.interface';
import { Route } from '../interfaces/routes.interface';
import { redirectRoute } from '../utils/redirectRoute';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../utils/sessionHelpers';

class goodsIntentController {
  public goodsIntent: RequestHandler = (req, res, next) => {
    setSessionCurrentPath(req);
    const { translation } = res.locals;
    const showErrorMessage = getErrorMessage(req);

    clearSessionErrorMessages(req);

    try {
      const { tradeType, goodsIntent, original } = req.query;
      const { queryParams } = res.locals;
      const previousPage = Route.typeOfTrade;
      const exportsEnabled = process.env.EXPORTS_ENABLED === 'true';

      if (!tradeType) {
        redirectRoute(
          Route.typeOfTrade,
          queryParams,
          res,
          req,
          translation.page.typeOfTrade.error,
        );
      } else if (tradeType === TypeOfTrade.export && !exportsEnabled) {
        res.redirect(
          'https://www.check-duties-customs-exporting-goods.service.gov.uk/selectdest',
        );
      } else if (tradeType === TypeOfTrade.export && exportsEnabled && tradeType === original) {
        redirectRoute(
          Route.exportCheckYourAnswers,
          queryParams,
          res,
        );
      } else if (tradeType === TypeOfTrade.export && exportsEnabled) {
        redirectRoute(
          Route.exportGoodsIntent,
          queryParams,
          res,
        );
      } else {
        res.render('goods-intent', {
          tradeType,
          goodsIntent,
          previousPage,
          GoodsIntent,
          errors: showErrorMessage ? { text: showErrorMessage } : null,
          csrfToken: req.csrfToken(),
        });
      }
    } catch (e) {
      next(e);
    }
  };
}

export default goodsIntentController;
