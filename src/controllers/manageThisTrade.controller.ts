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

import { RequestHandler, Response } from 'express';
import StwTradeTariffApi from '../services/StwTradeTariffApi.service';
import { getAdditionalQuestions } from '../models/additionalQuestions.models';
import {
  getUserType, has999l, getMeasuresAsHtml,
} from '../models/manageThisTrade.models';
import {
  getTariffAndTaxesData,
} from '../features/import/calculateCustomsDutyImportVat/model';
import 'dotenv/config';
import { Route } from '../interfaces/routes.interface';
import { redirectRoute } from '../utils/redirectRoute';
import {
  DestinationCountry, NoDutiesContentKey, RelatedToEnum, OriginCountry, TypeOfTrade, UserType,
} from '../interfaces/enums.interface';
import { isInvalidAdditionalCode } from '../utils/validateAdditionalCode';
import { setSessionCurrentPath } from '../utils/sessionHelpers';
import { AdditionalCodeEntity } from '../interfaces/additionalCode.interface';
import { Countries } from '../interfaces/countries.interface';
import { getImportDateFromQuery } from '../utils/queryHelper';
import { ImportDate } from '../interfaces/importDate.interface';
import { handleMissingQueryParams } from '../utils/handleMissingQueryParams';
import validateImportDate from '../utils/validateImportDate';
import getNoDutiesContentKey from '../utils/getNoDutiesContentKey';
import { findCode } from '../utils/findCode';
import logger from '../utils/logger';
import { isImportFromEUIntoNorthernIreland, countriesFromEU } from '../utils/isImportFromEUIntoNorthernIreland';
import validateAdditionalQuestion from '../utils/validateAdditionalQuestion';
import { hierarchy } from '../features/export/checkYourAnswers/model';
import { handleImportExceptions } from '../exceptions/handleExceptions';

import {
  cleanCommodity,
} from '../utils/validateCommodityCode';

const countries = require('../countries.json');

class ManageThisTrade {
  private stwTradeTariffApi: StwTradeTariffApi;

  constructor(stwTradeTariffApi: StwTradeTariffApi) {
    this.stwTradeTariffApi = stwTradeTariffApi;
  }

  public manageThisTrade: RequestHandler = async (req, res, next) => {
    setSessionCurrentPath(req);
    let additionalCode = String(req.query.additionalCode);
    let { subsidarySlug } = req.params;
    const { translation } = res.locals;
    const commodityCode = cleanCommodity(`${req.query.commodity}`);
    const { originCountry } = req.query;
    const { goodsIntent } = req.query;
    const userTypeTrader = String(req.query.userTypeTrader);
    const { tradeType } = req.query;
    const { destinationCountry } = req.query;
    const { original } = req.query;
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

      const [restrictiveMeasuresResponse, additionalCodeResponse, tariffAndTaxesResponse] = await Promise.all([
        this.stwTradeTariffApi.getRestrictiveMeasures(
          `${commodityCode}`,
          `${tradeType}`,
          `${originCountry}`,
          destinationCountry as DestinationCountry,
          importDate as ImportDate,
          additionalCode,
        ),
        this.stwTradeTariffApi.getAdditionalCode(
          `${commodityCode}`,
          `${tradeType}`,
          `${originCountry}`,
          destinationCountry as DestinationCountry,
          importDate as ImportDate,
        ),
        this.stwTradeTariffApi.getTariffAndTaxesData(
          `${commodityCode}`,
          `${tradeType}`,
          `${originCountry}`,
          destinationCountry as DestinationCountry,
          importDate as ImportDate,
        ),
      ]);

      const additionalCodeData = additionalCodeResponse.data.data;

      additionalCode = String(additionalCodeData.find((element: AdditionalCodeEntity) => element?.code === additionalCode)?.code);

      this.removeOriginalQueryParams(queryParams, res, additionalCode);

      const country = countries.data.filter(
        (countryItem: Countries) => countryItem.id === originCountry,
      )[0]?.attributes.description;

      const { data } = restrictiveMeasuresResponse;

      const { questions, questionsId } = getAdditionalQuestions(data, translation);

      const notAnsweredQuestions = questions.filter((question: any) => question && !req.query[question.questionId]);
      if (subsidarySlug === 'additional-question' && notAnsweredQuestions.length === 0) subsidarySlug = 'check-licences-certificates-and-other-restrictions';

      const errors = validateAdditionalQuestion(queryParams, translation, req, res, questions[0]?.errorMessageId);

      const commodityClassification = hierarchy(findCode(commodityCode));

      const complexMeasuresAsHtml = getMeasuresAsHtml(data, translation, userType, req, tradeType as TypeOfTrade);

      const tariffAndTaxesData = getTariffAndTaxesData(tariffAndTaxesResponse, translation);

      const noDutiesContentKey: NoDutiesContentKey|null = getNoDutiesContentKey(
        `${originCountry}`,
        destinationCountry as DestinationCountry,
      );

      const importsIntoXIFromEU: boolean = isImportFromEUIntoNorthernIreland(destinationCountry as DestinationCountry, `${originCountry}`);

      const importsIntoXIFromROWorGB = (destinationCountry === DestinationCountry.XI && !countriesFromEU.includes(String(originCountry)));

      const hasDuty: boolean = tariffAndTaxesResponse.data.tariffs.some((tariff: any) => tariff.value !== '0.00 %');

      const hasVat: boolean = tariffAndTaxesResponse.data.taxes.some((tax: any) => tax.value !== '0.00 %');

      const show999l = has999l(data.measures);

      const importDeclarationsNotRequired: boolean = (
        (originCountry === OriginCountry.XI && destinationCountry === DestinationCountry.GB)
        || importsIntoXIFromEU
      );

      const restrictions = data.measures.find((item: any) => item.measureType === 'PROHIBITIVE');

      if (restrictions) {
        redirectRoute(Route.importProhibitionsAndRestrictions, queryParams, res);
      } else if (isInvalidAdditionalCode(additionalCodeData, additionalCode) && original) {
        redirectRoute(Route.additionalCode, queryParams, res);
      } else if (isInvalidAdditionalCode(additionalCodeData, additionalCode)) {
        redirectRoute(Route.additionalCode, queryParams, res, req, translation.page.additionalCode.error);
      } else if (destinationCountry === originCountry) {
        redirectRoute(Route.destinationCountry, queryParams, res);
      } else if (importsIntoXIFromEU) {
        redirectRoute(Route.northernIrelandAndEUTrading, queryParams, res);
      } else {
        res.render('manage-this-trade', {
          complexMeasuresAsHtml,
          notAnsweredQuestions,
          questionsId,
          importDeclarations,
          hasAdditionalQuestions: notAnsweredQuestions.length > 0,
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
          subsidarySlug,
          importDate,
          noDutiesContentKey,
          hasVat,
          hasDuty,
          show999l,
          importsIntoXIFromROWorGB,
          tariffAndTaxesData,
          RelatedToEnum,
          importDeclarationsNotRequired,
          OriginCountry,
          DestinationCountry,
          UserType,
          userType,
          csrfToken: req.csrfToken(),
          query: req.query,
          errors,
        });
      }
    } catch (e) {
      handleImportExceptions(res, req, e, next, previousPage);
    }
    return null;
  }

  private removeOriginalQueryParams = (queryParams: string, res: Response, additionalCode: string) => {
    const params = new URLSearchParams(queryParams);
    params.delete('original');
    params.delete('originalImportDateDay');
    params.delete('originalImportDateMonth');
    params.delete('originalImportDateYear');
    if (!additionalCode) {
      params.delete('additionalCode');
    }
    res.locals.queryParams = params.toString();
  }
}

export default ManageThisTrade;
