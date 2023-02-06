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
import 'dotenv/config';
import { handleExceptions } from '../../../exceptions/handleExceptions';

import { Route } from '../../../interfaces/routes.interface';
import { redirectRoute } from '../../../utils/redirectRoute';
import { DestinationCountry, TypeOfTrade } from '../../../interfaces/enums.interface';
import { getAdditionalCodeRadiosInputs } from '../../../models/additionalCode.models';
import { journey } from '../../../utils/previousNextRoutes';
import {
  cleanCommodity,
} from '../../../utils/validateCommodityCode';
import { setSessionCurrentPath, getErrorMessage, clearSessionErrorMessages } from '../../../utils/sessionHelpers';
import { ImportDate } from '../../../interfaces/importDate.interface';
import { getImportDateFromQuery, updateQueryParams } from '../../../utils/queryHelper';

class AdditionalCodeController {
  private stwTradeTariffApi: StwTradeTariffApi;

  constructor(stwTradeTariffApi: StwTradeTariffApi) {
    this.stwTradeTariffApi = stwTradeTariffApi;
  }

  public additionalCode: RequestHandler = async (req, res, next) => {
    setSessionCurrentPath(req);
    const commodityCode = cleanCommodity(String(req.query.commodity));
    const {
      tradeType,
      destinationCountry,
      exportDeclarations,
      originCountry,
    } = req.query;
    const { translation, language } = res.locals;
    const additionalCode = String(req.query.additionalCode);
    const isEdit = req.query.isEdit === 'true';
    const isExports = tradeType === TypeOfTrade.export;
    const previousPage = `${journey.common.additionalCode.previousPage(isEdit, isExports)}?${res.locals.queryParams}`;
    const jsBackButton = true;
    const showErrorMessage = getErrorMessage(req);
    const tradeDate = getImportDateFromQuery(req);

    clearSessionErrorMessages(req);

    try {
      const { data } = await this.stwTradeTariffApi.getAdditionalCode(
        `${commodityCode}`,
        `${tradeType}`,
        `${originCountry}`,
        destinationCountry as DestinationCountry,
        tradeDate as ImportDate,
      );

      const additionalCodeRadios = await getAdditionalCodeRadiosInputs(data, additionalCode, language);

      res.render('common/additionalCode/view.njk', {
        originCountry,
        tradeType,
        commodityCode,
        destinationCountry,
        jsBackButton,
        previousPage,
        additionalCodeRadios,
        exportDeclarations,
        tradeDate,
        Route,
        isExports,
        csrfToken: req.csrfToken(),
        errors: showErrorMessage ? { text: showErrorMessage, visuallyHiddenText: translation.common.errors.error } : null,
      });
    } catch (e) {
      handleExceptions(res, req, e, next);
    }
    return null;
  }

  public additionalCodeSubmit: RequestHandler = (req, res, next) => {
    const { additionalCode } = req.body;
    const { queryParams, translation } = res.locals;
    const updatedQueryParams = updateQueryParams(queryParams, { additionalCode });
    try {
      if (!additionalCode) {
        redirectRoute(Route.additionalCode, queryParams, res, req, translation.common.additionalCode.error);
      } else {
        redirectRoute(journey.common.additionalCode.nextPage(), updatedQueryParams, res);
      }
    } catch (e) {
      next(e);
    }
  };
}

export default AdditionalCodeController;
