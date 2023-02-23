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
import StwTradeTariffApi from '../services/StwTradeTariffApi.service';
import 'dotenv/config';
import InvalidDestinationCountry from '../exceptions/invalidDestinationCountry';
import InvalidOriginCountry from '../exceptions/invalidOriginCountry';
import InvalidCommodityCode from '../exceptions/invalidCommodityCode';
import CommodityNotFoundException from '../exceptions/commodityNotFoundException';
import InvalidTradeType from '../exceptions/invalidTradeType';

import { Route } from '../interfaces/routes.interface';
import { redirectRoute } from '../utils/redirectRoute';
import { DestinationCountry } from '../interfaces/enums.interface';
import { getAdditionalCodeRadiosInputs } from '../models/additionalCode.models';
import {
  commodityCodeIsEmpty,
  commodityCodeNotNumber,
  commodityCodeNotCorrectDigits,
  hasNoAdditionalCodes,
  cleanCommodity,
} from '../utils/validateCommodityCode';
import { setSessionCurrentPath, getErrorMessage, clearSessionErrorMessages } from '../utils/sessionHelpers';
import { ImportDate } from '../interfaces/importDate.interface';
import { getImportDateFromQuery } from '../utils/queryHelper';
import { handleMissingQueryParams } from '../utils/handleMissingQueryParams';
import validateImportDate from '../utils/validateImportDate';

class AdditionalCode {
  private stwTradeTariffApi: StwTradeTariffApi;

  constructor(stwTradeTariffApi: StwTradeTariffApi) {
    this.stwTradeTariffApi = stwTradeTariffApi;
  }

  public additionalCode: RequestHandler = async (req, res, next) => {
    setSessionCurrentPath(req);
    const { translation } = res.locals;
    const commodityCode = cleanCommodity(String(req.query.commodity));
    const { originCountry } = req.query;
    const { goodsIntent } = req.query;
    const { userTypeTrader } = req.query;
    const { tradeType } = req.query;
    const { destinationCountry } = req.query;
    const { importDeclarations } = req.query;
    const additionalCode = String(req.query.additionalCode);
    const { queryParams } = res.locals;
    const previousPage = Route.importGoods;
    const showErrorMessage = getErrorMessage(req);
    const importDate = getImportDateFromQuery(req);
    const invalidDate = validateImportDate(importDate, translation);

    clearSessionErrorMessages(req);

    try {
      switch (true) {
        case commodityCodeIsEmpty(commodityCode):
          redirectRoute(previousPage, queryParams, res, req, translation.page.importGoods.errors.required);
          break;
        case commodityCodeNotNumber(commodityCode):
          redirectRoute(previousPage, queryParams, res, req, translation.page.importGoods.errors.mustBeNumber);
          break;
        case commodityCodeNotCorrectDigits(commodityCode):
          redirectRoute(previousPage, queryParams, res, req, translation.page.importGoods.errors.digits);
          break;
        case handleMissingQueryParams(req):
          redirectRoute(Route.typeOfTrade, '', res, req);
          break;
        case Boolean(Object.keys(invalidDate).length):
          redirectRoute(Route.importDate, queryParams, res, req, invalidDate);
          break;
        default: {
          const { data } = await this.stwTradeTariffApi.getAdditionalCode(
            `${commodityCode}`,
            `${tradeType}`,
            `${originCountry}`,
            destinationCountry as DestinationCountry,
            importDate as ImportDate,
          );

          const additionalCodeRadios = await getAdditionalCodeRadiosInputs(data, additionalCode);

          if (hasNoAdditionalCodes(additionalCodeRadios) && previousPage === Route.importGoods) {
            redirectRoute(Route.manageThisTrade, `${queryParams}&additionalCode=false`, res);
          } else {
            res.render('additional-code', {
              originCountry,
              goodsIntent,
              userTypeTrader,
              tradeType,
              commodityCode,
              destinationCountry,
              previousPage,
              additionalCodeRadios,
              importDeclarations,
              importDate,
              csrfToken: req.csrfToken(),
              errors: showErrorMessage ? { text: showErrorMessage } : null,
            });
          }
        }
      }
    } catch (e) {
      if (e instanceof InvalidDestinationCountry) {
        redirectRoute(Route.destinationCountry, queryParams, res, req, translation.page.destinationCountry.error);
      } else if (e instanceof InvalidOriginCountry) {
        redirectRoute(Route.importCountryOrigin, queryParams, res, req, translation.page.importCountryOrigin.error);
      } else if (e instanceof CommodityNotFoundException || e instanceof InvalidCommodityCode) {
        redirectRoute(previousPage, queryParams, res, req, translation.page.importGoods.errors.commodityNotFound);
      } else if (e instanceof InvalidTradeType) {
        redirectRoute(Route.typeOfTrade, queryParams, res, req, translation.page.typeOfTrade.error);
      } else {
        next(e);
      }
    }
    return null;
  }
}

export default AdditionalCode;
