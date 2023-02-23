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
import { OriginCountry } from '../../../interfaces/enums.interface';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import 'dotenv/config';
import { getCountryDropdown } from '../../../models/countries.models';

import { Route } from '../../../interfaces/routes.interface';
import { redirectRoute } from '../../../utils/redirectRoute';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../../../utils/sessionHelpers';

import { getImportDateFromQuery, updateQueryParams } from '../../../utils/queryHelper';
import { journey } from '../../../utils/previousNextRoutes';
import { isImportFromNorthernIrelandIntoEU } from '../../../utils/isImportFromNorthernIrelandIntoEU';

class ExportCountryDestinationController {
  private tradeTariffApi: TradeTariffApi;

  constructor(tradeTariffApi: TradeTariffApi) {
    this.tradeTariffApi = tradeTariffApi;
  }

  public exportCountryDestination: RequestHandler = async (req, res, next) => {
    setSessionCurrentPath(req);
    const { translation } = res.locals;
    const excludeCountry = req.query.originCountry === OriginCountry.GB ? 'GB' : 'XI';
    const countryDropdown = getCountryDropdown(
      req,
      res.locals.language,
      translation.common.accessibility.defaultCountrySelectLabel,
    ).filter((items: any) => ![excludeCountry].includes(items.value));

    const showErrorMessage = getErrorMessage(req);

    clearSessionErrorMessages(req);

    try {
      const title = translation.page.exportCountryDestination.questionExporting;
      const { destinationCountry, tradeDetails } = req.query;
      const isEdit = req.query.isEdit === 'true';
      const previousPage = journey.export.exportCountryDestination.previousPage(isEdit);

      const importDate = getImportDateFromQuery(req);

      res.render('export/countryDestination/view.njk', {
        countryDropdown,
        destinationCountry,
        title,
        importDate,
        previousPage,
        isEdit,
        tradeDetails,
        errors: showErrorMessage ? { text: showErrorMessage } : null,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  };

  public exportCountryDestinationSubmit: RequestHandler = (req, res, next) => {
    const { destinationCountry, isEdit } = req.body;
    const { queryParams } = res.locals;
    const { translation } = res.locals;
    const { originCountry } = req.query;

    const updatedQueryParams = updateQueryParams(queryParams, { destinationCountry });
    const importFromXIToEU = isImportFromNorthernIrelandIntoEU(originCountry as OriginCountry, destinationCountry as string);
    const nextPage = journey.export.exportCountryDestination.nextPage();

    try {
      if (!destinationCountry) {
        redirectRoute(Route.exportCountryDestination, queryParams, res, req, translation.page.exportCountryDestination.error);
      } else if (importFromXIToEU) {
        redirectRoute(
          Route.exportMovingGoodsFromNorthernIrelandToAnEUCountry,
          updatedQueryParams,
          res,
        );
      } else if (isEdit) {
        redirectRoute(
          Route.exportCheckYourAnswers,
          updatedQueryParams,
          res,
        );
      } else {
        redirectRoute(nextPage, updatedQueryParams, res);
      }
    } catch (e) {
      next(e);
    }
  };
}

export default ExportCountryDestinationController;
