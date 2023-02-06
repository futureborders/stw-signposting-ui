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
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Response, Request, NextFunction,
} from 'express';
import InvalidCommodityCode from './invalidCommodityCode';
import InvalidDestinationCountry from './invalidDestinationCountry';
import InvalidOriginCountry from './invalidOriginCountry';
import InvalidTradeType from './invalidTradeType';
import CommodityNotFoundException from './commodityNotFoundException';
import InvalidAdditionalCode from './invalidAdditionalCode';
import { redirectRoute } from '../utils/redirectRoute';
import { Route } from '../interfaces/routes.interface';
import { TypeOfTrade } from '../interfaces/enums.interface';

export const handleExceptions = (res: Response, req: Request, e: any, next: NextFunction): void => {
  const { queryParams, translation } = res.locals;
  const { tradeType } = req.query;
  const isExports = tradeType === TypeOfTrade.export;
  const isImports = tradeType === TypeOfTrade.import;

  if (e instanceof InvalidDestinationCountry && isExports) {
    redirectRoute(Route.exportCountryDestination, queryParams, res, req, translation.page.exportCountryDestination.error);
  } else if (e instanceof InvalidDestinationCountry && isImports) {
    redirectRoute(Route.destinationCountry, queryParams, res, req, translation.page.destinationCountry.error);
  } else if (e instanceof InvalidOriginCountry && isExports) {
    redirectRoute(Route.exportOriginCountry, queryParams, res, req, translation.page.exportOriginCountry.error);
  } else if (e instanceof InvalidOriginCountry && isImports) {
    redirectRoute(Route.importCountryOrigin, queryParams, res, req, translation.page.importCountryOrigin.error);
  } else if (e instanceof CommodityNotFoundException || e instanceof InvalidCommodityCode) {
    redirectRoute((isExports ? Route.exportCommoditySearch : Route.importGoods), queryParams, res, req, translation.page.importGoods.errors.commodityNotFound);
  } else if (e instanceof InvalidAdditionalCode) {
    redirectRoute(Route.additionalCode, queryParams, res, req, translation.common.additionalCode.error);
  } else if (e instanceof InvalidTradeType) {
    redirectRoute(Route.typeOfTrade, queryParams, res, req, translation.page.typeOfTrade.error);
  } else {
    next(e);
  }
};

export default handleExceptions;
