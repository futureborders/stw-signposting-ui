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
import { setSessionCurrentPath } from '../utils/sessionHelpers';

class NorthernIrelandAndEUTradingController {
  public northernIrelandAndEUTrading: RequestHandler = (req, res, next) => {
    setSessionCurrentPath(req);
    const { tradeType } = req.query;
    const { userTypeTrader } = req.query;
    const { destinationCountry } = req.query;
    const { goodsIntent } = req.query;
    const { importDeclarations } = req.query;
    const previousPage = Route.destinationCountry;

    try {
      res.render('northern-ireland-and-eu-trading', {
        tradeType,
        userTypeTrader,
        goodsIntent,
        destinationCountry,
        importDeclarations,
        previousPage,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  }
}

export default NorthernIrelandAndEUTradingController;
