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
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import { ImportDate } from '../../../interfaces/importDate.interface';
import { AdditionalCodeEntity } from '../../../interfaces/additionalCode.interface';

import {
  DestinationCountry, TaskStatus, TypeOfTrade, UserType, ImportUserTypeTrader,
} from '../../../interfaces/enums.interface';

import { getUserType, getMeasuresAsHtml, has999l } from '../../../models/measures.models';

import { redirectRoute } from '../../../utils/redirectRoute';

import { journey } from '../../../utils/previousNextRoutes';
import { getSessionStatus, setSessionStatus } from '../../../utils/sessionHelpers';
import { calculateNewTaskStatuses } from '../../../utils/taskListStatus';
import { Tasks } from '../../common/taskList/interface';
import { handleMissingQueryParams } from '../../../utils/handleMissingQueryParams';
import { getImportDateFromQuery } from '../../../utils/queryHelper';
import { isInvalidAdditionalCode } from '../../../utils/validateAdditionalCode';
import { handleExceptions } from '../../../exceptions/handleExceptions';
import { hierarchy } from '../../common/checkYourAnswers/model';
import { findCode } from '../../../utils/findCode';

class ExportCheckLicencesAndRestrictionsController {
  private stwTradeTariffApi: StwTradeTariffApi;

  constructor(stwTradeTariffApi: StwTradeTariffApi) {
    this.stwTradeTariffApi = stwTradeTariffApi;
  }

  public exportCheckLicencesAndRestrictions: RequestHandler = async (req, res, next) => {
    const { translation, queryParams } = res.locals;
    const tradeType = String(req.query.tradeType);
    const destinationCountry = String(req.query.destinationCountry);
    const originCountry = String(req.query.originCountry);
    const additionalCode = String(req.query.additionalCode);
    const commodity = String(req.query.commodity);
    const exportDeclarations = String(req.query.exportDeclarations);
    const tradeDate = getImportDateFromQuery(req);
    const previousPage = `${journey.export.exportCheckLicencesAndRestrictions.previousPage()}?${queryParams}`;
    const userType = getUserType(ImportUserTypeTrader.yes, exportDeclarations); // hardcoded userTypeTrader to true for exports

    try {
      if (handleMissingQueryParams(req)) {
        redirectRoute(Route.typeOfTrade, '', res);
        return null;
      }

      setSessionStatus(req, calculateNewTaskStatuses(getSessionStatus(req), Tasks.checkLicensesAndCertificates, TaskStatus.VIEWED));

      const [restrictiveMeasuresResponse, additionalCodeResponse] = await Promise.all([
        this.stwTradeTariffApi.getRestrictiveMeasures(
          `${commodity}`,
          `${tradeType}`,
          `${originCountry}`,
          destinationCountry as DestinationCountry,
          tradeDate as ImportDate,
        ),
        this.stwTradeTariffApi.getAdditionalCode(
          `${commodity}`,
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

      const commodityClassification = hierarchy(findCode(commodity));

      const cdsContent = `#### ${translation.common.measures['999L'].header}\n\n${translation.common.measures['999L'].body}`;
      const showCdsContent = has999l(restrictiveMeasuresData.measures) ? cdsContent : '';

      if (invalidAdditionalCode) {
        redirectRoute(Route.additionalCode, queryParams, res, req, translation.common.additionalCode.error);
      } else {
        res.render('export/checkLicencesAndRestrictions/view.njk', {
          complexMeasuresAsHtml,
          previousPage,
          userType,
          UserType,
          tradeDate,
          commodity,
          additionalCode,
          destinationCountry,
          originCountry,
          commodityClassification,
          tradeType,
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
