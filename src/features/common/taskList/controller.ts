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

import { RequestHandler, Response } from 'express';
import { Params } from '../../../interfaces/params.interface';
import { calcStatus } from '../../../utils/taskListStatus';
import {
  setSessionCurrentPath,
  setSessionStatus,
  getSessionStatus,
} from '../../../utils/sessionHelpers';
import { journey } from '../../../utils/previousNextRoutes';
import { Route } from '../../../interfaces/routes.interface';
import { getImportDateFromQuery, updateQueryParams } from '../../../utils/queryHelper';
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import { ImportDate } from '../../../interfaces/importDate.interface';
import {
  DestinationCountry, TypeOfTrade, OriginCountry, UserType, ImportUserTypeTrader,
} from '../../../interfaces/enums.interface';
import { handleMissingQueryParams } from '../../../utils/handleMissingQueryParams';
import { redirectRoute } from '../../../utils/redirectRoute';
import validateImportDate from '../../../utils/validateImportDate';
import { handleExceptions } from '../../../exceptions/handleExceptions';
import { hierarchy } from '../checkYourAnswers/model';
import { findCode } from '../../../utils/findCode';
import logger from '../../../utils/logger';
import { isInvalidAdditionalCode } from '../../../utils/validateAdditionalCode';
import { AdditionalCodeEntity } from '../../../interfaces/additionalCode.interface';
import { isImportFromEUIntoNorthernIreland } from '../../../utils/isImportFromEUIntoNorthernIreland';

import {
  getTaxAndDutyMessages,
  getChegUrl,
  additionalQuestions,
  getCheckLicencesAndRestrictionsRoute,
  getSignUpToServicesRoute,
  getCheckInformationAndDocumentsRoute,
  getCheckWhatCustomsDeclarationsLink,
} from './model';
import { getUserType } from '../../../models/measures.models';

class TaskListController {
  private stwTradeTariffApi: StwTradeTariffApi;

  constructor(stwTradeTariffApi: StwTradeTariffApi) {
    this.stwTradeTariffApi = stwTradeTariffApi;
  }

  public taskList: RequestHandler = async (req, res, next) => {
    setSessionCurrentPath(req);
    const { queryParams, translation } = res.locals;
    const commodity = String(req.query.commodity);
    const importDeclarations = String(req.query.importDeclarations);
    const userTypeTrader = String(req.query.userTypeTrader);
    const goodsIntent = String(req.query.goodsIntent);
    const tradeType = String(req.query.tradeType);
    const exportGoodsIntent = String(req.query.exportGoodsIntent);
    const exportDeclarations = String(req.query.exportDeclarations);
    const exportUserTypeTrader = String(req.query.exportUserTypeTrader);
    const originCountry = String(req.query.originCountry);
    const destinationCountry = String(req.query.destinationCountry);
    const tradeDate = getImportDateFromQuery(req);
    const tradeDateDay = String(tradeDate.day);
    const tradeDateMonth = String(tradeDate.month);
    const tradeDateYear = String(tradeDate.year);
    const invalidDate = validateImportDate(tradeDate, translation, String(req.query.tradeType));
    const chegUrl = getChegUrl(originCountry, destinationCountry, commodity);
    const isExports = tradeType === TypeOfTrade.export;
    const isImports = tradeType === TypeOfTrade.import;
    const userType = getUserType(userTypeTrader, importDeclarations);
    const jsBackButton = true;
    const previousPage = `${journey.common.taskList.previousPage()}?${queryParams}`;

    let additionalCode = String(req.query.additionalCode);
    let state: Params = {};
    let hasAdditionalQuestions = false;
    let importDeclarationsNotRequired = false;
    let taxAndDutyMessages: any = [];
    let restrictiveMeasuresResponse: any = {};
    let additionalCodeResponse: any = {};
    let tariffAndTaxesResponse: any = {};

    try {
      if (handleMissingQueryParams(req)) {
        redirectRoute(Route.typeOfTrade, '', res);
        return null;
      }
      if (invalidDate) {
        redirectRoute((isExports ? Route.exportGoodsArrivalDate : Route.importDate), queryParams, res, req, invalidDate);
        return null;
      }

      if (!findCode(commodity)) {
        logger.info(`Commodity code: ${commodity} missing from codes.json`);
        redirectRoute((isExports ? Route.exportCommoditySearch : Route.importGoods), queryParams, res, req, translation.page.importGoods.errors.commodityNotFound);
        return null;
      }

      if (isImports && userTypeTrader !== ImportUserTypeTrader.no && !importDeclarations) {
        redirectRoute(
          Route.importDeclarations,
          updateQueryParams(queryParams, { isEdit: 'true' }),
          res,
          req,
          translation.page.importDeclarations.error,
        );
        return null;
      }

      if (isExports) {
        state = {
          commodity,
          destinationCountry,
          originCountry,
          tradeType,
          exportGoodsIntent,
          exportDeclarations,
          exportUserTypeTrader,
          tradeDateDay,
          tradeDateMonth,
          tradeDateYear,
        };
        [restrictiveMeasuresResponse, additionalCodeResponse] = await Promise.all([
          this.stwTradeTariffApi.getRestrictiveMeasures(commodity, tradeType, originCountry, destinationCountry as DestinationCountry, tradeDate as ImportDate, additionalCode),
          this.stwTradeTariffApi.getAdditionalCode(commodity, tradeType, originCountry, destinationCountry as DestinationCountry, tradeDate as ImportDate),
        ]);
      } else {
        state = {
          commodity,
          originCountry,
          goodsIntent,
          userTypeTrader,
          tradeType,
          destinationCountry,
          importDeclarations,
          tradeDateDay,
          tradeDateMonth,
          tradeDateYear,
        };

        [restrictiveMeasuresResponse, additionalCodeResponse, tariffAndTaxesResponse] = await Promise.all([
          this.stwTradeTariffApi.getRestrictiveMeasures(commodity, tradeType, originCountry, destinationCountry as DestinationCountry, tradeDate as ImportDate, additionalCode),
          this.stwTradeTariffApi.getAdditionalCode(commodity, tradeType, originCountry, destinationCountry as DestinationCountry, tradeDate as ImportDate),
          this.stwTradeTariffApi.getTariffAndTaxesData(commodity, tradeType, originCountry, destinationCountry as DestinationCountry, tradeDate as ImportDate),
        ]);
      }

      const restrictiveMeasuresData = restrictiveMeasuresResponse.data;

      const additionalCodeData = additionalCodeResponse.data.data;
      additionalCode = String(additionalCodeData.find((element: AdditionalCodeEntity) => element && element.code === additionalCode)?.code);

      this.removeOriginalQueryParams(queryParams, res, additionalCode);

      const restrictions = restrictiveMeasuresData.measures.find((item: any) => item.measureType === 'PROHIBITIVE');

      const hasNoMeasures = restrictiveMeasuresData.measures.length === 0;

      state = setSessionStatus(req, calcStatus(state, getSessionStatus(req), hasNoMeasures));

      const commodityClassification = hierarchy(findCode(commodity));

      const importsIntoXIFromEU: boolean = isImportFromEUIntoNorthernIreland(destinationCountry as DestinationCountry, `${originCountry}`);

      if (isImports) {
        taxAndDutyMessages = getTaxAndDutyMessages(tariffAndTaxesResponse, state);
        hasAdditionalQuestions = additionalQuestions(restrictiveMeasuresData, translation, req);
        importDeclarationsNotRequired = (
          (originCountry === OriginCountry.XI && destinationCountry === DestinationCountry.GB)
          || importsIntoXIFromEU
        );
      }

      const checkLicencesAndRestrictionsRoute = getCheckLicencesAndRestrictionsRoute(isExports, hasAdditionalQuestions);
      const signUpToServicesRoute = getSignUpToServicesRoute(isImports);
      const checkInformationAndDocumentsRoute = getCheckInformationAndDocumentsRoute(isImports);
      const checkWhatCustomsDeclarationsLink = getCheckWhatCustomsDeclarationsLink(importDeclarationsNotRequired, state, isImports);

      if (restrictions) {
        redirectRoute((isExports ? Route.exportProhibitionsAndRestrictions : Route.importProhibitionsAndRestrictions), queryParams, res);
      } else if (isInvalidAdditionalCode(additionalCodeData, additionalCode)) {
        redirectRoute(Route.additionalCode, queryParams, res, req, translation.common.additionalCode.error);
      } else if (!isExports && destinationCountry === originCountry) {
        redirectRoute(Route.destinationCountry, queryParams, res);
      } else if (importsIntoXIFromEU) {
        redirectRoute(Route.northernIrelandAndEUTrading, queryParams, res);
      } else {
        res.render('common/taskList/view.njk', {
          state,
          jsBackButton,
          previousPage,
          Route,
          hasNoMeasures,
          tradeDate,
          commodity,
          additionalCode,
          destinationCountry,
          originCountry,
          commodityClassification,
          chegUrl,
          tradeType,
          TypeOfTrade,
          taxAndDutyMessages,
          userType,
          UserType,
          checkLicencesAndRestrictionsRoute,
          signUpToServicesRoute,
          checkInformationAndDocumentsRoute,
          checkWhatCustomsDeclarationsLink,
          csrfToken: req.csrfToken(),
        });
      }
    } catch (e) {
      handleExceptions(res, req, e, next);
    }
    return null;
  };

  private removeOriginalQueryParams = (queryParams: string, res: Response, additionalCode: string) => {
    const params = new URLSearchParams(queryParams);
    params.delete('original');
    params.delete('originalImportDateDay');
    params.delete('originalImportDateMonth');
    params.delete('originalImportDateYear');
    if (additionalCode === 'undefined') {
      params.delete('additionalCode');
    }
    res.locals.queryParams = params.toString();
  }
}

export default TaskListController;
