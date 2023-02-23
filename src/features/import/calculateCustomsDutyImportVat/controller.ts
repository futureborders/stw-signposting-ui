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
import { getCountryNameByCode } from '../../../utils/filters/getCountryNameByCode';
import { Route } from '../../../interfaces/routes.interface';
import { hierarchy } from '../../export/checkYourAnswers/model';
import { findCode } from '../../../utils/findCode';
import { getImportDateFromQuery } from '../../../utils/queryHelper';
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import { DestinationCountry, OriginCountry } from '../../../interfaces/enums.interface';
import { ImportDate } from '../../../interfaces/importDate.interface';
import { handleImportExceptions } from '../../../exceptions/handleExceptions';
import { Countries } from '../../../interfaces/countries.interface';
import {
  getTariffAndTaxesData,
} from './model';
import { getUserType } from '../../../models/manageThisTrade.models';

const countries = require('../../../countries.json');

class ImportCalculateCustomsDutyImportVatController {
  private stwTradeTariffApi: StwTradeTariffApi;

  constructor(stwTradeTariffApi: StwTradeTariffApi) {
    this.stwTradeTariffApi = stwTradeTariffApi;
  }

  public importCalculateCustomsDutyImportVat: RequestHandler = async (req, res, next) => {
    const commodityCode = String(req.query.commodity);
    const destinationCountry = String(req.query.destinationCountry);
    const originCountry = String(req.query.originCountry);
    const additionalCode = String(req.query.additionalCode);
    const tradeType = String(req.query.tradeType);
    const userTypeTrader = String(req.query.userTypeTrader);
    const { goodsIntent } = req.query;
    const importDate = getImportDateFromQuery(req);
    const { translation } = res.locals;
    const importDeclarations = String(req.query.importDeclarations);
    const userType = getUserType(userTypeTrader, importDeclarations);
    const previousPage = Route.manageThisTrade;
    try {
      const destinationCountryName = getCountryNameByCode(destinationCountry, res.locals.language);

      const commodityClassification = hierarchy(findCode(commodityCode));

      const country = countries.data.filter(
        (countryItem: Countries) => countryItem.id === originCountry,
      )[0].attributes.description;

      const tariffAndTaxesResponse = await this.stwTradeTariffApi.getTariffAndTaxesData(
        `${commodityCode}`,
        `${tradeType}`,
        `${originCountry}`,
          destinationCountry as DestinationCountry,
          importDate as ImportDate,
      );

      const tariffAndTaxesData = getTariffAndTaxesData(tariffAndTaxesResponse, translation);

      res.render('import/calculateCustomsDutyImportVat/view.njk', {
        previousPage,
        tariffAndTaxesData,
        destinationCountryName,
        importDate,
        commodityCode,
        additionalCode,
        originCountry,
        commodityClassification,
        Route,
        importDeclarations,
        country,
        goodsIntent,
        userTypeTrader,
        tradeType,
        destinationCountry,
        OriginCountry,
        DestinationCountry,
        userType,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      handleImportExceptions(res, req, e, next, previousPage);
    }
  };
}

export default ImportCalculateCustomsDutyImportVatController;
