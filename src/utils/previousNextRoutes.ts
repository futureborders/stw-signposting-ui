/*
 * Copyright 2022 Crown Copyright (Single Trade Window)
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

/* eslint-disable no-nested-ternary */
import { Route } from '../interfaces/routes.interface';
import { ExportUserTypeTrader } from '../interfaces/enums.interface';

export const journey = {
  export: {
    exportGoodsArrivalDate: {
      previousPage: (original: string): Route => (original !== 'undefined' ? Route.exportCheckYourAnswers : Route.exportGoodsIntent),
      nextPage: (): Route => Route.exportUserTypeTrader,
    },
    exportDeclarations: {
      previousPage: (isEdit: boolean, isExportUserTypeTraderbackPath: boolean): Route => (isExportUserTypeTraderbackPath ? Route.exportUserTypeTrader : (isEdit ? Route.exportCheckYourAnswers : Route.exportUserTypeTrader)),
      nextPage: (): Route => Route.exportOriginCountry,
    },
    exportOriginCountry: {
      previousPage: (isEdit: boolean, userTypeTrader: ExportUserTypeTrader): Route => (isEdit ? Route.exportCheckYourAnswers : (userTypeTrader === ExportUserTypeTrader.actingOnBehalfOfSeller ? Route.exportUserTypeTrader : Route.exportDeclarations)),
      nextPage: (): Route => Route.exportCountryDestination,
    },
    exportCountryDestination: {
      previousPage: (isEdit: boolean): Route => (isEdit ? Route.exportCheckYourAnswers : Route.exportOriginCountry),
      nextPage: (): Route => Route.exportCommoditySearch,
    },
    exportCommoditySearch: {
      previousPage: (original: string): Route => (original ? Route.exportCheckYourAnswers : Route.exportCountryDestination),
    },
    exportTaskList: {
      previousPage: (): Route => Route.exportCheckYourAnswers,
    },
    exportCheckLicencesAndRestrictions: {
      previousPage: (): Route => Route.exportTaskList,
    },
    checkYourAnswers: {
      previousPage: (): Route => Route.exportCommoditySearch,
      nextPage: (): Route => Route.exportTaskList,
    },
    checkWhatServicesYouNeedToRegister: {
      previousPage: (): Route => Route.exportTaskList,
    },
    movingGoodsFromNorthernIrelandToAnEUCountry: {
      previousPage: (): Route => Route.exportCountryDestination,
    },
    exportAdditionalCode: {
      previousPage: (isEdit: boolean): Route => (isEdit ? Route.exportCheckYourAnswers : Route.exportCommoditySearch),
      nextPage: (): Route => Route.exportCheckYourAnswers,
    },
    exportUserTypeTrader: {
      previousPage: (isEdit: boolean): Route => (isEdit ? Route.exportCheckYourAnswers : Route.exportGoodsArrivalDate),
    },
    exportGoodsIntent: {
      previousPage: (isEdit: boolean): Route => (isEdit ? Route.exportCheckYourAnswers : Route.typeOfTrade),
      nextPage: (): Route => Route.exportGoodsArrivalDate,
    },
    exportProhibitionsAndRestrictions: {
      previousPage: (): Route => Route.exportCheckYourAnswers,
    },
    checkInformationAndDocuments: {
      previousPage: (): Route => Route.exportTaskList,
    },
    exportCheckDeclarations: {
      previousPage: (): Route => Route.exportTaskList,
    },
  },
};

export default journey;
