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
import { journey } from '../../../utils/previousNextRoutes';
import { TaskStatus } from '../../../interfaces/enums.interface';
import { Tasks } from '../../common/taskList/interface';
import { Route } from '../../../interfaces/routes.interface';
import { calculateNewTaskStatuses } from '../../../utils/taskListStatus';
import { setSessionStatus, getSessionStatus } from '../../../utils/sessionHelpers';
import { hierarchy } from '../../common/checkYourAnswers/model';
import { findCode } from '../../../utils/findCode';
import { getImportDateFromQuery } from '../../../utils/queryHelper';

class ExportCheckDeclarationsController {
   public exportCheckDeclarations: RequestHandler = (req, res, next) => {
     setSessionStatus(req, calculateNewTaskStatuses(getSessionStatus(req), Tasks.checkCustomsDeclarations, TaskStatus.VIEWED));

     const commodity = String(req.query.commodity);
     const destinationCountry = String(req.query.destinationCountry);
     const originCountry = String(req.query.originCountry);
     const additionalCode = String(req.query.additionalCode);
     const tradeType = String(req.query.tradeType);
     const tradeDate = getImportDateFromQuery(req);
     const previousPage = `${journey.export.exportCheckDeclarations.previousPage()}?${res.locals.queryParams}`;
     const commodityClassification = hierarchy(findCode(commodity));

     try {
       res.render('export/checkDeclarations/view.njk', {
         previousPage,
         tradeDate,
         commodity,
         additionalCode,
         destinationCountry,
         originCountry,
         commodityClassification,
         tradeType,
         Route,
         csrfToken: req.csrfToken(),
       });
     } catch (e) {
       next(e);
     }
   };
}

export default ExportCheckDeclarationsController;
