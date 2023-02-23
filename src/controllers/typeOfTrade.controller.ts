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
import { TypeOfTrade } from '../interfaces/enums.interface';
import { Route } from '../interfaces/routes.interface';
import { setSessionCurrentPath, getErrorMessage, clearSessionErrorMessages } from '../utils/sessionHelpers';

class TypeOfTradeController {
  public typeOfTrade: RequestHandler = (req, res, next) => {
    setSessionCurrentPath(req);
    const showErrorMessage = getErrorMessage(req);
    clearSessionErrorMessages(req);

    try {
      const {
        tradeType,
        isEdit,
        commodity,
        exportDeclarations,
        destinationCountry,
        tradeDateDay,
        tradeDateMonth,
        tradeDateYear,
        originCountry,
        exportGoodsIntent,
        exportUserTypeTrader,
      } = req.query;
      const { queryParams } = res.locals;
      let previousPage;
      let original;

      if (isEdit) {
        previousPage = `${Route.exportCheckYourAnswers}?${queryParams}`;
        original = tradeType;
      } else if (process.env.STARTPAGE_ENABLED === 'true') {
        previousPage = Route.index;
      } else {
        previousPage = process.env.STARTPAGE_URL;
      }

      res.render('type-of-trade', {
        TypeOfTrade,
        tradeType,
        isEdit,
        exportDeclarations,
        destinationCountry,
        previousPage,
        commodity,
        original,
        tradeDateDay,
        tradeDateMonth,
        tradeDateYear,
        originCountry,
        exportGoodsIntent,
        exportUserTypeTrader,
        errors: showErrorMessage ? { text: showErrorMessage } : null,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  }
}

export default TypeOfTradeController;
