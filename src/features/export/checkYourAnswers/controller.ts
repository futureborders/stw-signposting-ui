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
import { journey } from '../../../utils/previousNextRoutes';
import { getCountryNameByCode } from '../../../utils/filters/getCountryNameByCode';
import { Route } from '../../../interfaces/routes.interface';
import { checkYourAnswersRows } from './model';
import { findCode } from '../../../utils/findCode';
import { handleMissingQueryParams } from '../../../utils/handleMissingQueryParams';
import { redirectRoute } from '../../../utils/redirectRoute';

class ExportCheckYourAnswersController {
  public checkYourAnswers: RequestHandler = (req, res, next) => {
    const { commodity } = req.query;
    const { destinationCountry } = req.query;
    const destinationCountryName = getCountryNameByCode(`${destinationCountry}`, res.locals.language);
    const commodityData = findCode(`${commodity}`);
    const checkYourAnswersRowsHtml = checkYourAnswersRows(req, res, commodityData);
    const nextPage = journey.export.checkYourAnswers.nextPage();
    const previousPage = journey.export.checkYourAnswers.previousPage();

    try {
      if (handleMissingQueryParams(req)) {
        redirectRoute(Route.typeOfTrade, '', res);
        return null;
      }
      res.render('export/checkYourAnswers/view.njk', {
        previousPage,
        nextPage,
        destinationCountryName,
        commodity,
        Route,
        checkYourAnswersRowsHtml,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
    return null;
  };
}

export default ExportCheckYourAnswersController;
