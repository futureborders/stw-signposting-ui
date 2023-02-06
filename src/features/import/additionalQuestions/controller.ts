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

import 'dotenv/config';
import { handleExceptions } from '../../../exceptions/handleExceptions';

import { Route } from '../../../interfaces/routes.interface';
import { redirectRoute } from '../../../utils/redirectRoute';
import {
  DestinationCountry,
} from '../../../interfaces/enums.interface';
import { setSessionCurrentPath } from '../../../utils/sessionHelpers';
import { getImportDateFromQuery } from '../../../utils/queryHelper';
import { ImportDate } from '../../../interfaces/importDate.interface';
import { handleMissingQueryParams } from '../../../utils/handleMissingQueryParams';
import validateImportDate from '../../../utils/validateImportDate';
import { findCode } from '../../../utils/findCode';
import logger from '../../../utils/logger';
import validateAdditionalQuestion from '../../../utils/validateAdditionalQuestion';
import { journey } from '../../../utils/previousNextRoutes';

import {
  cleanCommodity,
} from '../../../utils/validateCommodityCode';

class ImportAdditionalQuestionsController {
  private stwTradeTariffApi: StwTradeTariffApi;

  constructor(stwTradeTariffApi: StwTradeTariffApi) {
    this.stwTradeTariffApi = stwTradeTariffApi;
  }

  public importAdditionalQuestions: RequestHandler = async (req, res, next) => {
    setSessionCurrentPath(req);
    const additionalCode = String(req.query.additionalCode);
    const commodityCode = cleanCommodity(`${req.query.commodity}`);
    const originCountry = String(req.query.originCountry);
    const tradeType = String(req.query.tradeType);
    const destinationCountry = String(req.query.destinationCountry);
    const { queryParams, language, translation } = res.locals;
    const previousPage = `${journey.import.importAdditionalQuestions.previousPage()}?${queryParams}`;
    const importDate = getImportDateFromQuery(req);
    const invalidDate = validateImportDate(importDate, translation, tradeType, language);
    const jsBackButton = true;

    try {
      if (handleMissingQueryParams(req)) {
        redirectRoute(Route.typeOfTrade, '', res, req);
        return null;
      }

      if (invalidDate) {
        redirectRoute(Route.importDate, queryParams, res, req, invalidDate);
        return null;
      }

      if (!findCode(commodityCode)) {
        logger.info(`Commodity code: ${commodityCode} missing from codes.json`);
        redirectRoute(Route.importGoods, queryParams, res, req, translation.page.importGoods.errors.commodityNotFound);
        return null;
      }

      const { data } = await this.stwTradeTariffApi.getRestrictiveMeasures(
        `${commodityCode}`,
        `${tradeType}`,
        `${originCountry}`,
          destinationCountry as DestinationCountry,
          importDate as ImportDate,
          additionalCode,
      );

      const { questions, questionsId } = getAdditionalQuestions(data, translation);

      const notAnsweredQuestions = questions.filter((question: any) => question && !req.query[question.questionId]);

      const errors = validateAdditionalQuestion(queryParams, translation, req, res, questions[0]?.errorMessageId);

      if (!notAnsweredQuestions.length) {
        redirectRoute(Route.importCheckLicencesAndRestrictions, queryParams, res);
      } else {
        res.render('import/additionalQuestions/view.njk', {
          notAnsweredQuestions,
          questionsId,
          hasAdditionalQuestions: notAnsweredQuestions.length > 0,
          jsBackButton,
          previousPage,
          csrfToken: req.csrfToken(),
          query: req.query,
          Route,
          errors,
        });
      }
    } catch (e) {
      handleExceptions(res, req, e, next);
    }
    return null;
  }
}

export default ImportAdditionalQuestionsController;
