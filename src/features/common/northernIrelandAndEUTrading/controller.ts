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
import { setSessionCurrentPath } from '../../../utils/sessionHelpers';
import { journey } from '../../../utils/previousNextRoutes';

class NorthernIrelandAndEUTradingController {
  public northernIrelandAndEUTrading: RequestHandler = (req, res, next) => {
    setSessionCurrentPath(req);

    const previousPage = `${journey.common.northernIrelandAndEUTrading.previousPage()}?${res.locals.queryParams}`;
    const jsBackButton = true;

    try {
      res.render('common/northernIrelandAndEUTrading/view.njk', {
        jsBackButton,
        previousPage,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  }
}

export default NorthernIrelandAndEUTradingController;
