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
import { calculateNewTaskStatuses } from '../../../utils/exportHelpers';
import { setSessionExport, getSessionExport } from '../../../utils/sessionHelpers';

class ExportMovingGoodsFromNorthernIrelandToAnEUCountryController {
  public movingGoodsFromNorthernIrelandToAnEUCountry: RequestHandler = (req, res, next) => {
    try {
      setSessionExport(req, calculateNewTaskStatuses(getSessionExport(req), ExportsTasks.checkServicestoRegister, TaskStatus.VIEWED));

      const previousPage = journey.export.movingGoodsFromNorthernIrelandToAnEUCountry.previousPage();

      res.render('export/movingGoodsFromNorthernIrelandToAnEUCountry/view.njk', {
        previousPage,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  };
}

export default ExportMovingGoodsFromNorthernIrelandToAnEUCountryController;
