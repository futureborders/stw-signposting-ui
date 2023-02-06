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
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import { getAdditionalQuestions } from '../../../models/additionalQuestions.models';
import {
  getUserType,
  has999l,
  getMeasuresAsHtml,
} from '../../../models/measures.models';

import { getSessionStatus, setSessionStatus, setSessionCurrentPath } from '../../../utils/sessionHelpers';
import { calculateNewTaskStatuses } from '../../../utils/taskListStatus';
import { Tasks } from '../../common/taskList/interface';

import 'dotenv/config';

import { Route } from '../../../interfaces/routes.interface';
import { redirectRoute } from '../../../utils/redirectRoute';
import {
  DestinationCountry,
  OriginCountry,
  TypeOfTrade,
  TaskStatus,
} from '../../../interfaces/enums.interface';
import { getImportDateFromQuery } from '../../../utils/queryHelper';
import { ImportDate } from '../../../interfaces/importDate.interface';
import { handleMissingQueryParams } from '../../../utils/handleMissingQueryParams';
import validateImportDate from '../../../utils/validateImportDate';
import { findCode } from '../../../utils/findCode';
import logger from '../../../utils/logger';
import { hierarchy } from '../../common/checkYourAnswers/model';
import { handleExceptions } from '../../../exceptions/handleExceptions';
import { journey } from '../../../utils/previousNextRoutes';
import { clearAdditionalQuestions } from '../../../utils/filters/clearAdditionalQuestions';

import {
  cleanCommodity,
} from '../../../utils/validateCommodityCode';

class ImportCheckLicencesAndRestrictionsController {
  private stwTradeTariffApi: StwTradeTariffApi;

  constructor(stwTradeTariffApi: StwTradeTariffApi) {
    this.stwTradeTariffApi = stwTradeTariffApi;
  }

  public importCheckLicencesAndRestrictions: RequestHandler = async (req, res, next) => {
    setSessionCurrentPath(req);
    setSessionStatus(req, calculateNewTaskStatuses(getSessionStatus(req), Tasks.checkLicensesAndCertificates, TaskStatus.VIEWED));

    const additionalCode = String(req.query.additionalCode);
    const { translation, language, queryParams } = res.locals;
    const commodity = cleanCommodity(String(req.query.commodity));
    const originCountry = String(req.query.originCountry);
    const goodsIntent = String(req.query.goodsIntent);
    const userTypeTrader = String(req.query.userTypeTrader);
    const tradeType = String(req.query.tradeType);
    const destinationCountry = String(req.query.destinationCountry);
    const importDeclarations = String(req.query.importDeclarations);
    const userType = getUserType(userTypeTrader, importDeclarations);
    const tradeDate = getImportDateFromQuery(req);
    const invalidDate = validateImportDate(tradeDate, translation, String(tradeType), language);

    try {
      if (handleMissingQueryParams(req)) {
        redirectRoute(Route.typeOfTrade, '', res, req);
        return null;
      }

      if (invalidDate) {
        redirectRoute(Route.importDate, queryParams, res, req, invalidDate);
        return null;
      }

      if (!findCode(commodity)) {
        logger.info(`Commodity code: ${commodity} missing from codes.json`);
        redirectRoute(Route.importGoods, queryParams, res, req, translation.page.importGoods.errors.commodityNotFound);
        return null;
      }

      const { data } = await this.stwTradeTariffApi.getRestrictiveMeasures(
        commodity,
        tradeType,
        originCountry,
        destinationCountry as DestinationCountry,
        tradeDate as ImportDate,
        additionalCode,
      );

      const { questionsId } = getAdditionalQuestions(data, translation);

      const commodityClassification = hierarchy(findCode(commodity));

      const complexMeasuresAsHtml = getMeasuresAsHtml(data, translation, userType, req, tradeType as TypeOfTrade);

      const show999l = has999l(data.measures);

      const previousPage = `${journey.import.importCheckLicencesAndRestrictions.previousPage()}?${clearAdditionalQuestions(queryParams, questionsId)}`;

      res.render('import/checkLicencesAndRestrictions/view.njk', {
        complexMeasuresAsHtml,
        questionsId,
        importDeclarations,
        originCountry,
        goodsIntent,
        userTypeTrader,
        tradeType,
        commodity,
        commodityClassification,
        destinationCountry,
        additionalCode,
        previousPage,
        tradeDate,
        show999l,
        OriginCountry,
        DestinationCountry,
        userType,
        Route,
        csrfToken: req.csrfToken(),
        query: req.query,
      });
    } catch (e) {
      handleExceptions(res, req, e, next);
    }
    return null;
  }
}

export default ImportCheckLicencesAndRestrictionsController;
