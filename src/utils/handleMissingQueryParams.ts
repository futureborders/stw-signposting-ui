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

import { Request } from 'express';
import { Route } from '../interfaces/routes.interface';
import { TypeOfTrade } from '../interfaces/enums.interface';

const isMissing = (param: any) => typeof param === 'undefined';

export const handleMissingQueryParams = (req: Request): boolean => {
  const {
    commodity,
    originCountry,
    userTypeTrader,
    tradeType,
    goodsIntent,
    destinationCountry,
    importDeclarations,
    importDateDay,
    importDateMonth,
    importDateYear,
    tradeDateDay,
    tradeDateMonth,
    tradeDateYear,
    exportDeclarations,
    exportGoodsIntent,
  } = req.query;
  const isExportJourney = tradeType === TypeOfTrade.export;

  let params;

  if (isExportJourney) {
    params = (
      isMissing(commodity)
        || isMissing(tradeType)
        || isMissing(tradeDateDay)
        || isMissing(tradeDateMonth)
        || isMissing(tradeDateYear)
        || isMissing(exportDeclarations)
        || isMissing(destinationCountry)
        || isMissing(originCountry)
        || isMissing(exportGoodsIntent)
    );
  } else {
    params = (
      isMissing(commodity)
        || isMissing(tradeType)
        || isMissing(goodsIntent)
        || isMissing(userTypeTrader)
        || isMissing(importDeclarations)
        || isMissing(originCountry)
        || isMissing(destinationCountry)
        || isMissing(importDateDay)
        || isMissing(importDateMonth)
        || isMissing(importDateYear)
    );
  }

  if ((req.route.path === Route.search
    || req.route.path === Route.additionalCode
    || req.route.path === Route.importAdditionalQuestions
    || req.route.path === Route.importCheckLicencesAndRestrictions
    || req.route.path === Route.importProhibitionsAndRestrictions
    || req.route.path === Route.exportCheckLicencesAndRestrictions
    || req.route.path === Route.taskList
    || req.route.path === Route.checkYourAnswers
  ) && params) {
    return true;
  }

  return false;
};

export default handleMissingQueryParams;
