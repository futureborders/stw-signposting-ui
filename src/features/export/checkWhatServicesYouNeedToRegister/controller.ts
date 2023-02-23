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
import { TaskStatus } from '../../../interfaces/enums.interface';
import { ExportsTasks } from '../../../interfaces/exports.interface';
import { Route } from '../../../interfaces/routes.interface';
import { calculateNewTaskStatuses } from '../../../utils/exportHelpers';
import { setSessionExport, getSessionExport } from '../../../utils/sessionHelpers';
import { getCountryNameByCode } from '../../../utils/filters/getCountryNameByCode';
import { hierarchy } from '../checkYourAnswers/model';
import { findCode } from '../../../utils/findCode';
import { getImportDateFromQuery } from '../../../utils/queryHelper';

class ExportCheckWhatServicesYouNeedToRegisterController {
  public checkWhatServicesYouNeedToRegister: RequestHandler = (req, res, next) => {
    const {
      commodity,
      destinationCountry,
      originCountry,
      additionalCode,
    } = req.query;

    const commodityCode = `${commodity}`;
    const tradeDate = getImportDateFromQuery(req);

    try {
      setSessionExport(req, calculateNewTaskStatuses(getSessionExport(req), ExportsTasks.checkServicestoRegister, TaskStatus.VIEWED));

      const previousPage = journey.export.checkWhatServicesYouNeedToRegister.previousPage();

      const destinationCountryName = getCountryNameByCode(`${destinationCountry}`, res.locals.language);

      const commodityClassification = hierarchy(findCode(commodityCode));

      res.render('export/checkWhatServicesYouNeedToRegister/view.njk', {
        previousPage,
        tradeDate,
        commodityCode,
        additionalCode,
        destinationCountryName,
        originCountry,
        commodityClassification,
        Route,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  };
}

export default ExportCheckWhatServicesYouNeedToRegisterController;
