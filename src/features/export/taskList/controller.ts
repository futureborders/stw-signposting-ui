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
import { ExportsParams } from '../../../interfaces/exports.interface';
import { calcExportStatus } from '../../../utils/exportHelpers';
import { getCountryNameByCode } from '../../../utils/filters/getCountryNameByCode';
import {
  setSessionCurrentPath,
  setSessionExport,
  getSessionExport,
} from '../../../utils/sessionHelpers';
import { journey } from '../../../utils/previousNextRoutes';
import { Route } from '../../../interfaces/routes.interface';
import { getImportDateFromQuery } from '../../../utils/queryHelper';
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import { ImportDate } from '../../../interfaces/importDate.interface';
import { DestinationCountry } from '../../../interfaces/enums.interface';
import { handleMissingQueryParams } from '../../../utils/handleMissingQueryParams';
import { redirectRoute } from '../../../utils/redirectRoute';
import validateImportDate from '../../../utils/validateImportDate';
import { handleExceptions } from '../../../exceptions/handleExceptions';
import { hierarchy } from '../checkYourAnswers/model';
import { findCode } from '../../../utils/findCode';

const countryPattern = /^[a-z]{2}$/i;
const commodityPattern = /^[0-9]{2,10}$/;

class ExportTaskListController {
  private stwTradeTariffApi: StwTradeTariffApi;

  constructor(stwTradeTariffApi: StwTradeTariffApi) {
    this.stwTradeTariffApi = stwTradeTariffApi;
  }

  public exportTaskList: RequestHandler = async (req, res, next) => {
    setSessionCurrentPath(req);
    const {
      checkRestrictions,
      commodity,
      tradeType,
      exportDeclarations,
      exportUserTypeTrader,
      additionalCode,
      exportGoodsIntent,
    } = req.query;

    const { queryParams, translation } = res.locals;

    const commodityCode = String(commodity);
    const originCountry = String(req.query.originCountry);
    const destinationCountry = String(req.query.destinationCountry);

    const tradeDate = getImportDateFromQuery(req);

    const invalidDate = validateImportDate(tradeDate, translation, String(req.query.tradeType));

    let chegUrl = process.env.CHEG_SERVICE_BASE_URL;

    const previousPage = journey.export.exportTaskList.previousPage();
    try {
      if (handleMissingQueryParams(req)) {
        redirectRoute(Route.typeOfTrade, '', res);
        return null;
      }
      if (invalidDate) {
        redirectRoute(Route.exportGoodsArrivalDate, queryParams, res, req, invalidDate);
        return null;
      }

      let exportState: ExportsParams = {
        commodity: commodityCode,
        destinationCountry: String(destinationCountry),
        originCountry,
        checkRestrictions: String(checkRestrictions),
        tradeType: String(tradeType),
        exportGoodsIntent: String(exportGoodsIntent),
        exportDeclarations: String(exportDeclarations),
        exportUserTypeTrader: String(exportUserTypeTrader),
        tradeDateDay: String(tradeDate.day),
        tradeDateMonth: String(tradeDate.month),
        tradeDateYear: String(tradeDate.year),
        destinationCountryName: getCountryNameByCode(destinationCountry, res.locals.language),
        originCountryName: getCountryNameByCode(originCountry, res.locals.language),
      };

      const { data } = await this.stwTradeTariffApi.getRestrictiveMeasures(
        commodityCode,
        `${tradeType}`,
        originCountry,
        destinationCountry as DestinationCountry,
        tradeDate as ImportDate,
      );

      const restrictions = data.measures.find((item: any) => item.measureType === 'PROHIBITIVE');

      if (restrictions) {
        redirectRoute(Route.exportProhibitionsAndRestrictions, queryParams, res);
        return null;
      }

      const hasNoMeasures = data.measures.length === 0;

      exportState = setSessionExport(req, calcExportStatus(exportState, getSessionExport(req), hasNoMeasures));

      const destinationCountryName = getCountryNameByCode(destinationCountry, res.locals.language);

      const commodityClassification = hierarchy(findCode(commodityCode));

      if (
        countryPattern.test(originCountry)
        && countryPattern.test(destinationCountry)
        && commodityPattern.test(commodityCode)
      ) {
        chegUrl += (chegUrl && chegUrl.endsWith('/')) ? '' : '/'; // Add a slash if needed
        chegUrl += `prodmap?oc=${encodeURIComponent(originCountry)}&dc=${encodeURIComponent(destinationCountry)}&code=${encodeURIComponent(commodityCode)}&utm_source=stwgs&utm_medium=referral&utm_term=task_list`;
      }

      res.render('export/taskList/view.njk', {
        exportState,
        previousPage,
        Route,
        hasNoMeasures,
        tradeDate,
        commodityCode,
        additionalCode,
        destinationCountryName,
        originCountry,
        commodityClassification,
        chegUrl,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      handleExceptions(res, req, e, next);
    }
    return null;
  };
}

export default ExportTaskListController;
