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
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import { getAdditionalQuestions } from '../../../models/additionalQuestions.models';
import {
  getUserType,
  has999l,
  getMeasuresAsHtml,
} from '../../../models/manageThisTrade.models';

import 'dotenv/config';

import { Route } from '../../../interfaces/routes.interface';
import { redirectRoute } from '../../../utils/redirectRoute';
import {
  DestinationCountry,
  OriginCountry,
  TypeOfTrade,
} from '../../../interfaces/enums.interface';
import { setSessionCurrentPath } from '../../../utils/sessionHelpers';
import { Countries } from '../../../interfaces/countries.interface';
import { getImportDateFromQuery } from '../../../utils/queryHelper';
import { ImportDate } from '../../../interfaces/importDate.interface';
import { handleMissingQueryParams } from '../../../utils/handleMissingQueryParams';
import validateImportDate from '../../../utils/validateImportDate';
import { findCode } from '../../../utils/findCode';
import logger from '../../../utils/logger';
import { hierarchy } from '../../export/checkYourAnswers/model';
import { handleImportExceptions } from '../../../exceptions/handleExceptions';

import {
  cleanCommodity,
} from '../../../utils/validateCommodityCode';

const countries = require('../../../countries.json');

class ImportCheckLicencesAndRestrictionsController {
  private stwTradeTariffApi: StwTradeTariffApi;

  constructor(stwTradeTariffApi: StwTradeTariffApi) {
    this.stwTradeTariffApi = stwTradeTariffApi;
  }

  public importCheckLicencesAndRestrictions: RequestHandler = async (req, res, next) => {
    setSessionCurrentPath(req);
    const additionalCode = String(req.query.additionalCode);
    const { translation } = res.locals;
    const commodityCode = cleanCommodity(`${req.query.commodity}`);
    const { originCountry } = req.query;
    const { goodsIntent } = req.query;
    const userTypeTrader = String(req.query.userTypeTrader);
    const { tradeType } = req.query;
    const { destinationCountry } = req.query;
    const { queryParams } = res.locals;
    const importDeclarations = String(req.query.importDeclarations);
    const previousPage = `${additionalCode}`.includes('false') ? Route.importGoods : Route.additionalCode;
    const userType = getUserType(userTypeTrader, importDeclarations);
    const importDate = getImportDateFromQuery(req);
    const invalidDate = validateImportDate(importDate, translation);

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

      const country = countries.data.filter(
        (countryItem: Countries) => countryItem.id === originCountry,
      )[0].attributes.description;

      const { questionsId } = getAdditionalQuestions(data, translation);

      const commodityClassification = hierarchy(findCode(commodityCode));

      const complexMeasuresAsHtml = getMeasuresAsHtml(data, translation, userType, req, tradeType as TypeOfTrade);

      const show999l = has999l(data.measures);

      res.render('import/checkLicencesAndRestrictions/view.njk', {
        complexMeasuresAsHtml,
        questionsId,
        importDeclarations,
        country,
        originCountry,
        goodsIntent,
        userTypeTrader,
        tradeType,
        commodityCode,
        commodityClassification,
        destinationCountry,
        additionalCode,
        previousPage,
        importDate,
        show999l,
        OriginCountry,
        DestinationCountry,
        userType,
        csrfToken: req.csrfToken(),
        query: req.query,
      });
    } catch (e) {
      handleImportExceptions(res, req, e, next, previousPage);
    }
    return null;
  }
}

export default ImportCheckLicencesAndRestrictionsController;
