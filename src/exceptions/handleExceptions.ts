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
import { DestinationCountry, OriginCountry } from '../interfaces/enums.interface';

// todo: rename to handleExportExceptions
export const handleExceptions = (res: Response, req: Request, e: any, next: NextFunction): void => {
  const { queryParams, translation } = res.locals;

  if (e instanceof CommodityNotFoundException || e instanceof InvalidCommodityCode) {
    redirectRoute(Route.exportCommoditySearch, queryParams, res, req, translation.page.importGoods.errors.commodityNotFound);
  } else if (e instanceof InvalidDestinationCountry) {
    redirectRoute(Route.exportCountryDestination, queryParams, res, req, translation.page.exportCountryDestination.error);
  } else if (e instanceof InvalidOriginCountry) {
    redirectRoute(Route.exportOriginCountry, queryParams, res, req, translation.page.exportOriginCountry.error);
  } else if (e instanceof InvalidTradeType) {
    redirectRoute(Route.typeOfTrade, queryParams, res, req, translation.page.typeOfTrade.error);
  } else {
    next(e);
  }
};

export const handleImportExceptions = (res: Response, req: Request, e: any, next: NextFunction, previousPage: Route): void => {
  const { queryParams, translation } = res.locals;
  const { destinationCountry, originCountry } = req.query;
  if (e instanceof InvalidDestinationCountry
     && ![`${DestinationCountry.XI}`, `${DestinationCountry.GB}`].includes(`${destinationCountry}`)
     && [`${OriginCountry.XI}`, `${OriginCountry.GB}`].includes(`${originCountry}`)
  ) {
    redirectRoute(Route.destinationCountry, queryParams, res);
  } else if (e instanceof InvalidDestinationCountry) {
    redirectRoute(Route.destinationCountry, queryParams, res, req, translation.page.destinationCountry.error);
  } else if (e instanceof InvalidOriginCountry) {
    redirectRoute(Route.importCountryOrigin, queryParams, res, req, translation.page.importCountryOrigin.error);
  } else if (e instanceof CommodityNotFoundException || e instanceof InvalidCommodityCode) {
    redirectRoute(previousPage, queryParams, res, req, translation.page.importGoods.errors.commodityNotFound);
  } else if (e instanceof InvalidAdditionalCode && previousPage === Route.additionalCode) {
    redirectRoute(Route.additionalCode, queryParams, res, req, translation.page.additionalCode.error);
  } else if (e instanceof InvalidAdditionalCode && previousPage !== Route.additionalCode) {
    redirectRoute(Route.importGoods, queryParams, res, req, translation.page.additionalCode.error);
  } else if (e instanceof InvalidTradeType) {
    redirectRoute(Route.typeOfTrade, queryParams, res, req, translation.page.typeOfTrade.error);
  } else {
    next(e);
  }
};

export default handleExceptions;
