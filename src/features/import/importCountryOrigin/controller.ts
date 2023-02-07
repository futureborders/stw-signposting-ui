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

import { RequestHandler, Request } from 'express';
import 'dotenv/config';
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import { getCountryDropdown } from '../../../models/countries.models';
import { journey } from '../../../utils/previousNextRoutes';
import { Route } from '../../../interfaces/routes.interface';
import { redirectRoute } from '../../../utils/redirectRoute';
import { DestinationCountry } from '../../../interfaces/enums.interface';
import { ImportDate } from '../../../interfaces/importDate.interface';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
} from '../../../utils/sessionHelpers';
import {
  cleanCommodity,
} from '../../../utils/validateCommodityCode';

import { getImportDateFromQuery, updateQueryParams } from '../../../utils/queryHelper';
import { removeParam } from '../../../utils/filters/removeParam';

class ImportCountryOriginController {
  private stwTradeTariffApi: StwTradeTariffApi;

  constructor(stwTradeTariffApi: StwTradeTariffApi) {
    this.stwTradeTariffApi = stwTradeTariffApi;
  }

  public importCountryOrigin: RequestHandler = async (req, res, next) => {
    setSessionCurrentPath(req);
    const showErrorMessage = getErrorMessage(req);
    clearSessionErrorMessages(req);

    try {
      const { queryParams, backPath, translation } = res.locals;

      const {
        userTypeTrader,
        importDeclarations,
        originCountry,
      } = req.query;

      const original = originCountry || req.query.original;
      const isEdit = req.query.isEdit === 'true';
      const importDate = getImportDateFromQuery(req);
      const getQueryParams = updateQueryParams(queryParams, { originCountry: original });
      const previousPage = `${journey.import.importCountryOrigin.previousPage(isEdit)}?${getQueryParams}`;
      const countryDropdown = getCountryDropdown(
        req,
        res.locals.language,
        translation.common.accessibility.defaultCountrySelectLabel,
      );

      if (
        isEdit
        && backPath.includes(Route.importDeclarations)
        && !backPath.includes('editCancelled')
        && original !== userTypeTrader
      ) {
        redirectRoute(
          Route.checkYourAnswers,
          updateQueryParams(queryParams, { importDeclarations }),
          res,
        );
      } else {
        res.render('import/importCountryOrigin/view.njk', {
          countryDropdown,
          isEdit,
          previousPage,
          importDate,
          original,
          errors: showErrorMessage ? { text: showErrorMessage, visuallyHiddenText: translation.common.errors.error } : null,
          Route,
          csrfToken: req.csrfToken(),
        });
      }
    } catch (e) {
      next(e);
    }
  };

  public importCountryOriginSubmit: RequestHandler = async (req, res, next) => {
    const {
      originCountry,
      original,
    } = req.body;

    const { destinationCountry } = req.query;
    const isEdit = req.body.isEdit === 'true';

    const { queryParams, translation } = res.locals;
    const originCountryHasChanged = original !== originCountry;
    let updatedQueryParams = updateQueryParams(queryParams, { originCountry });
    const nextPage = journey.import.importCountryOrigin.nextPage();

    try {
      const hasAddionalCode = isEdit && originCountryHasChanged ? await this.checkAdditionalCodes(req) : false;
      if (!originCountry) {
        redirectRoute(
          Route.importCountryOrigin,
          queryParams,
          res,
          req,
          translation.page.importCountryOrigin.error,
        );
      } else if (hasAddionalCode) {
        redirectRoute(Route.additionalCode, updatedQueryParams, res);
      } else if (isEdit && original && destinationCountry !== originCountry) {
        redirectRoute(Route.checkYourAnswers, removeParam(updatedQueryParams, ['additionalCode', 'original']), res);
      } else {
        updatedQueryParams = isEdit ? updateQueryParams(updatedQueryParams, { isEdit, original }) : updatedQueryParams;
        redirectRoute(
          nextPage,
          updatedQueryParams,
          res,
        );
      }
    } catch (e) {
      next(e);
    }
  };

  private checkAdditionalCodes = async (req: Request): Promise<boolean> => {
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
      return true;
    }

    return false;
  }
}

export default ImportCountryOriginController;
