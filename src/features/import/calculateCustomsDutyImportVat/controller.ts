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
import { Route } from '../../../interfaces/routes.interface';
import { hierarchy } from '../../common/checkYourAnswers/model';
import { findCode } from '../../../utils/findCode';
import { getImportDateFromQuery } from '../../../utils/queryHelper';
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import { DestinationCountry, OriginCountry, TaskStatus } from '../../../interfaces/enums.interface';
import { ImportDate } from '../../../interfaces/importDate.interface';
import { handleExceptions } from '../../../exceptions/handleExceptions';
import { getTariffAndTaxesData } from './model';
import { getSessionStatus, setSessionStatus } from '../../../utils/sessionHelpers';
import { calculateNewTaskStatuses } from '../../../utils/taskListStatus';
import { Tasks } from '../../common/taskList/interface';
import { getUserType } from '../../../models/measures.models';
import { journey } from '../../../utils/previousNextRoutes';

class ImportCalculateCustomsDutyImportVatController {
  private stwTradeTariffApi: StwTradeTariffApi;

  constructor(stwTradeTariffApi: StwTradeTariffApi) {
    this.stwTradeTariffApi = stwTradeTariffApi;
  }

  public importCalculateCustomsDutyImportVat: RequestHandler = async (req, res, next) => {
    setSessionStatus(req, calculateNewTaskStatuses(getSessionStatus(req), Tasks.checkCustomsDutyAndImportVat, TaskStatus.VIEWED));

    const commodity = String(req.query.commodity);
    const destinationCountry = String(req.query.destinationCountry);
    const originCountry = String(req.query.originCountry);
    const additionalCode = String(req.query.additionalCode);
    const tradeType = String(req.query.tradeType);
    const userTypeTrader = String(req.query.userTypeTrader);
    const { goodsIntent } = req.query;
    const tradeDate = getImportDateFromQuery(req);
    const { translation } = res.locals;
    const importDeclarations = String(req.query.importDeclarations);
    const userType = getUserType(userTypeTrader, importDeclarations);
    const previousPage = `${journey.import.importCalculateCustomsDutyImportVat.previousPage()}?${res.locals.queryParams}`;

    try {
      const commodityClassification = hierarchy(findCode(commodity));

      const tariffAndTaxesResponse = await this.stwTradeTariffApi.getTariffAndTaxesData(
        commodity,
        tradeType,
        originCountry,
        destinationCountry as DestinationCountry,
        tradeDate as ImportDate,
      );

      const tariffAndTaxesData = getTariffAndTaxesData(tariffAndTaxesResponse, translation);

      res.render('import/calculateCustomsDutyImportVat/view.njk', {
        previousPage,
        tariffAndTaxesData,
        destinationCountry,
        tradeDate,
        commodity,
        additionalCode,
        originCountry,
        commodityClassification,
        Route,
        importDeclarations,
        goodsIntent,
        userTypeTrader,
        tradeType,
        OriginCountry,
        DestinationCountry,
        userType,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      handleExceptions(res, req, e, next);
    }
  };
}

export default ImportCalculateCustomsDutyImportVatController;
