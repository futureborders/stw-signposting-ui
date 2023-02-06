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
import { Route } from '../../../interfaces/routes.interface';
import { hierarchy } from '../../common/checkYourAnswers/model';
import { findCode } from '../../../utils/findCode';
import { getImportDateFromQuery } from '../../../utils/queryHelper';
import { markdown } from '../../../utils/markdown';
import { decode } from '../../../utils/decode';
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import { DestinationCountry, OriginCountry } from '../../../interfaces/enums.interface';
import { ImportDate } from '../../../interfaces/importDate.interface';
import { handleExceptions } from '../../../exceptions/handleExceptions';
import { journey } from '../../../utils/previousNextRoutes';

class ImportProhibitionsAndRestrictionsController {
  private stwTradeTariffApi: StwTradeTariffApi;

  constructor(stwTradeTariffApi: StwTradeTariffApi) {
    this.stwTradeTariffApi = stwTradeTariffApi;
  }

  public importProhibitionsAndRestrictions: RequestHandler = async (req, res, next) => {
    const commodity = String(req.query.commodity);
    const destinationCountry = String(req.query.destinationCountry);
    const originCountry = String(req.query.originCountry);
    const additionalCode = String(req.query.additionalCode);
    const tradeType = String(req.query.tradeType);
    const userTypeTrader = String(req.query.userTypeTrader);
    const goodsIntent = String(req.query.goodsIntent);
    const tradeDate = getImportDateFromQuery(req);
    const importDeclarations = String(req.query.importDeclarations);
    const previousPage = `${journey.import.importProhibitionsAndRestrictions.previousPage()}?${res.locals.queryParams}`;
    const jsBackButton = true;

    try {
      const commodityClassification = hierarchy(findCode(commodity));
      const { data } = await this.stwTradeTariffApi.getRestrictiveMeasures(
        commodity,
        tradeType,
        originCountry,
        destinationCountry as DestinationCountry,
        tradeDate as ImportDate,
        additionalCode,
      );

      const prohibitionsAsHtml = markdown.render(decode(data.measures.find((item: any) => item.measureType === 'PROHIBITIVE')?.description), { translation: res.locals.translation });

      res.render('import/prohibitionsAndRestrictions/view.njk', {
        jsBackButton,
        previousPage,
        tradeDate,
        commodity,
        additionalCode,
        originCountry,
        commodityClassification,
        Route,
        prohibitionsAsHtml,
        importDeclarations,
        goodsIntent,
        userTypeTrader,
        tradeType,
        destinationCountry,
        OriginCountry,
        DestinationCountry,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      handleExceptions(res, req, e, next);
    }
  };
}

export default ImportProhibitionsAndRestrictionsController;
