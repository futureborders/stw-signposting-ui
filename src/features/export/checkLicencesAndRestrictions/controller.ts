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
import { Route } from '../../../interfaces/routes.interface';
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import { ImportDate } from '../../../interfaces/importDate.interface';
import { AdditionalCodeEntity } from '../../../interfaces/additionalCode.interface';

import {
  DestinationCountry, TaskStatus, TypeOfTrade, UserType,
} from '../../../interfaces/enums.interface';

import { getUserType, getMeasuresAsHtml, has999l } from '../../../models/manageThisTrade.models';

import { redirectRoute } from '../../../utils/redirectRoute';

import { journey } from '../../../utils/previousNextRoutes';
import { getSessionExport, setSessionExport } from '../../../utils/sessionHelpers';
import { calculateNewTaskStatuses } from '../../../utils/exportHelpers';
import { ExportsTasks } from '../../../interfaces/exports.interface';
import { handleMissingQueryParams } from '../../../utils/handleMissingQueryParams';
import { getImportDateFromQuery } from '../../../utils/queryHelper';
import { isInvalidAdditionalCode } from '../../../utils/validateAdditionalCode';
import { handleExceptions } from '../../../exceptions/handleExceptions';
import { getCountryNameByCode } from '../../../utils/filters/getCountryNameByCode';
import { hierarchy } from '../checkYourAnswers/model';
import { findCode } from '../../../utils/findCode';

class ExportCheckLicencesAndRestrictionsController {
  private stwTradeTariffApi: StwTradeTariffApi;

  constructor(stwTradeTariffApi: StwTradeTariffApi) {
    this.stwTradeTariffApi = stwTradeTariffApi;
  }

  public exportCheckLicencesAndRestrictions: RequestHandler = async (req, res, next) => {
    const { translation } = res.locals;
    const { queryParams } = res.locals;
    const {
      commodity,
      tradeType,
      destinationCountry,
      originCountry,
      additionalCode,
    } = req.query;

    const exportDeclarations = `${req.query.exportDeclarations}`;
    const commodityCode = `${commodity}`;
    const tradeDate = getImportDateFromQuery(req);
    const previousPage = journey.export.exportCheckLicencesAndRestrictions.previousPage();
    const userType = getUserType('true', exportDeclarations); // hardcoded userTypeTrader to true for exports

    try {
      if (handleMissingQueryParams(req)) {
        redirectRoute(Route.typeOfTrade, '', res);
        return null;
      }

      setSessionExport(req, calculateNewTaskStatuses(getSessionExport(req), ExportsTasks.checkLicensesAndCertificates, TaskStatus.VIEWED));

      const [restrictiveMeasuresResponse, additionalCodeResponse] = await Promise.all([
        this.stwTradeTariffApi.getRestrictiveMeasures(
          `${commodityCode}`,
          `${tradeType}`,
          `${originCountry}`,
          destinationCountry as DestinationCountry,
          tradeDate as ImportDate,
        ),
        this.stwTradeTariffApi.getAdditionalCode(
          `${commodityCode}`,
          `${tradeType}`,
          `${originCountry}`,
          destinationCountry as DestinationCountry,
          tradeDate as ImportDate,
        ),
      ]);

      const restrictiveMeasuresData = restrictiveMeasuresResponse.data;

      const additionalCodeData = additionalCodeResponse.data.data;

      const getAdditionalCode = additionalCodeData.find((element: AdditionalCodeEntity) => element?.code === additionalCode)?.code;

      const invalidAdditionalCode = isInvalidAdditionalCode(additionalCodeData, getAdditionalCode);

      const complexMeasuresAsHtml = getMeasuresAsHtml(restrictiveMeasuresData, translation, userType, req, tradeType as TypeOfTrade);

      const destinationCountryName = getCountryNameByCode(`${destinationCountry}`, res.locals.language);

      const commodityClassification = hierarchy(findCode(commodityCode));

      const showCdsContent = has999l(restrictiveMeasuresData.measures) ? translation.page.exportCheckLicencesAndRestrictions.rulesThatApplyToYourGoods.cdsContent : '';

      if (invalidAdditionalCode) {
        redirectRoute(Route.exportAdditionalCode, queryParams, res, req, translation.page.exportAdditionalCode.error);
      } else {
        res.render('export/checkLicencesAndRestrictions/view.njk', {
          complexMeasuresAsHtml,
          previousPage,
          userType,
          UserType,
          tradeDate,
          commodityCode,
          additionalCode,
          destinationCountryName,
          originCountry,
          commodityClassification,
          Route,
          showCdsContent,
          csrfToken: req.csrfToken(),
        });
      }
    } catch (e) {
      handleExceptions(res, req, e, next);
    }
    return null;
  };
}

export default ExportCheckLicencesAndRestrictionsController;
