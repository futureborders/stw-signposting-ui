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

import { RequestHandler, Request, Response } from 'express';
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import { OriginCountry, DestinationCountry, ExportUserTypeTrader } from '../../../interfaces/enums.interface';
import { ImportDate } from '../../../interfaces/importDate.interface';
import { Route } from '../../../interfaces/routes.interface';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../../../utils/sessionHelpers';

import {
  cleanCommodity,
} from '../../../utils/validateCommodityCode';

import { updateQueryParams, getImportDateFromQuery } from '../../../utils/queryHelper';
import { removeParam } from '../../../utils/filters/removeParam';
import { redirectRoute } from '../../../utils/redirectRoute';
import { journey } from '../../../utils/previousNextRoutes';
import { isImportFromNorthernIrelandIntoEU } from '../../../utils/isImportFromNorthernIrelandIntoEU';

class ExportOriginCountryController {
  private stwTradeTariffApi: StwTradeTariffApi;

  constructor(stwTradeTariffApi: StwTradeTariffApi) {
    this.stwTradeTariffApi = stwTradeTariffApi;
  }

  public exportOriginCountry: RequestHandler = (req, res, next) => {
    setSessionCurrentPath(req);

    const showErrorMessage = getErrorMessage(req);

    clearSessionErrorMessages(req);

    try {
      const {
        originCountry, exportUserTypeTrader, tradeDetails,
      } = req.query;
      const { translation } = res.locals;
      const isEdit = req.query.isEdit === 'true';
      const original = originCountry;
      const previousPage = `${journey.export.exportOriginCountry.previousPage(isEdit, exportUserTypeTrader as ExportUserTypeTrader)}?${res.locals.queryParams}`;
      const jsBackButton = !!tradeDetails;

      res.render('export/originCountry/view.njk', {
        jsBackButton,
        previousPage,
        isEdit,
        original,
        OriginCountry,
        originCountry,
        Route,
        tradeDetails,
        errors: showErrorMessage ? { text: showErrorMessage, visuallyHiddenText: translation.common.errors.error } : null,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  };

  public exportOriginCountrySubmit: RequestHandler = (req, res, next) => {
    const { originCountry, isEdit, original } = req.body;
    const { queryParams, translation } = res.locals;
    const updatedQueryParams = updateQueryParams(queryParams, { originCountry });
    const { destinationCountry } = req.query;
    const importFromXIToEU = isImportFromNorthernIrelandIntoEU(originCountry as OriginCountry, destinationCountry as string);
    const originCountryHasChanged = original !== originCountry;

    try {
      if (!originCountry) {
        redirectRoute(Route.exportOriginCountry, queryParams, res, req, translation.page.exportOriginCountry.error);
      } else if (importFromXIToEU) {
        redirectRoute(Route.exportMovingGoodsFromNorthernIrelandToAnEUCountry, updatedQueryParams, res);
      } else if (isEdit && originCountryHasChanged) {
        this.checkAdditionalCodes(req, res, updatedQueryParams);
      } else if (isEdit && !originCountryHasChanged) {
        redirectRoute(Route.checkYourAnswers, updatedQueryParams, res);
      } else {
        redirectRoute(journey.export.exportOriginCountry.nextPage(), updatedQueryParams, res);
      }
    } catch (e) {
      next(e);
    }
  };

  private checkAdditionalCodes = async (req: Request, res: Response, updatedQueryParams: string) => {
    const { tradeType, destinationCountry } = req.query;
    const { originCountry } = req.body;
    const commodityCode = cleanCommodity(`${req.query.commodity}`);
    const tradeDate = getImportDateFromQuery(req);

    const hasAddionalCode = await this.stwTradeTariffApi.getAdditionalCode(
      `${commodityCode}`,
      `${tradeType}`,
      `${originCountry}`,
      destinationCountry as DestinationCountry,
      tradeDate as ImportDate,
    );

    if (hasAddionalCode && Object.values(hasAddionalCode.data.data).length) {
      redirectRoute(Route.additionalCode, updatedQueryParams, res);
    } else {
      redirectRoute(Route.checkYourAnswers, removeParam(updatedQueryParams, ['additionalCode']), res);
    }
  }
}

export default ExportOriginCountryController;
