/*
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

/* eslint-disable no-nested-ternary */
import { Route } from '../interfaces/routes.interface';
import { ExportUserTypeTrader, TypeOfTrade, ImportUserTypeTrader } from '../interfaces/enums.interface';

export const journey = {
  common: {
    typeOfTrade: {
      nextPage: (isEdit: boolean, typeOfTrade: TypeOfTrade, hasChanged: boolean): Route => (isEdit && !hasChanged ? Route.checkYourAnswers : (typeOfTrade === TypeOfTrade.import ? Route.goodsIntent : Route.exportGoodsIntent)),
      previousPage: (isEdit: boolean, startPageEnabled: boolean, startPageUrl: string, queryParams: string): Route => (isEdit ? `${Route.checkYourAnswers}?${queryParams}` as Route : startPageEnabled ? Route.index : process.env.STARTPAGE_URL as Route),
    },
    checkYourAnswers: {
      previousPage: (isExport: boolean): Route => (isExport ? Route.exportCommoditySearch : Route.importGoods),
      nextPage: (): Route => Route.taskList,
    },
    northernIrelandAndEUTrading: {
      previousPage: (): Route => Route.destinationCountry,
    },
    taskList: {
      previousPage: (): Route => Route.checkYourAnswers,
    },
    additionalCode: {
      previousPage: (isEdit: boolean, isExport: boolean): Route => (isEdit ? Route.checkYourAnswers : isExport ? Route.exportCommoditySearch : Route.importGoods),
      nextPage: (): Route => Route.checkYourAnswers,
    },
  },
  import: {
    goodsIntent: {
      previousPage: (isEdit: boolean): Route => (isEdit ? Route.checkYourAnswers : Route.typeOfTrade),
      nextPage: (): Route => Route.importDate,
    },
    identifyUserType: {
      previousPage: (isEdit: boolean): Route => (isEdit ? Route.checkYourAnswers : Route.destinationCountry),
      nextPage: (userTypeTrader: string): Route => (userTypeTrader === ImportUserTypeTrader.no ? Route.importGoods : Route.importDeclarations),
    },
    importDeclarations: {
      previousPage: (isEdit: boolean): Route => (isEdit ? Route.checkYourAnswers : Route.identifyUserType),
      nextPage: (): Route => Route.importGoods,
    },
    importCountryOrigin: {
      previousPage: (isEdit: boolean): Route => (isEdit ? Route.checkYourAnswers : Route.importDate),
      nextPage: (): Route => Route.destinationCountry,
    },
    destinationCountry: {
      previousPage: (isEdit: boolean): Route => (isEdit ? Route.checkYourAnswers : Route.importCountryOrigin),
      nextPage: (): Route => Route.identifyUserType,
    },
    importDate: {
      previousPage: (isEdit: boolean): Route => (isEdit ? Route.checkYourAnswers : Route.goodsIntent),
      nextPage: (): Route => Route.importCountryOrigin,
    },
    importGoods: {
      previousPage: (isEdit: boolean, userTypeTrader: string): Route => (isEdit ? Route.checkYourAnswers : (userTypeTrader === ImportUserTypeTrader.no ? Route.identifyUserType : Route.importDeclarations)),
    },
    importCheckDeclarations: {
      previousPage: (): Route => Route.taskList,
    },
    importCheckLicencesAndRestrictions: {
      previousPage: (): Route => Route.taskList,
    },
    importCheckInformationAndDocuments: {
      previousPage: (): Route => Route.taskList,
    },
    importProhibitionsAndRestrictions: {
      previousPage: (): Route => Route.importGoods,
    },
    importRegisterToBringGoods: {
      previousPage: (): Route => Route.taskList,
    },
    importAdditionalQuestions: {
      previousPage: (): Route => Route.taskList,
    },
    importCalculateCustomsDutyImportVat: {
      previousPage: (): Route => Route.taskList,
    },
  },
  export: {
    exportGoodsArrivalDate: {
      previousPage: (isEdit: boolean): Route => (isEdit ? Route.checkYourAnswers : Route.exportGoodsIntent),
      nextPage: (): Route => Route.exportUserTypeTrader,
    },
    exportDeclarations: {
      previousPage: (isEdit: boolean, isExportUserTypeTraderbackPath: boolean): Route => (isExportUserTypeTraderbackPath && !isEdit ? Route.exportUserTypeTrader : (isEdit ? Route.checkYourAnswers : Route.exportUserTypeTrader)),
      nextPage: (): Route => Route.exportOriginCountry,
    },
    exportOriginCountry: {
      previousPage: (isEdit: boolean, userTypeTrader: ExportUserTypeTrader): Route => (isEdit ? Route.checkYourAnswers : (userTypeTrader === ExportUserTypeTrader.actingOnBehalfOfSeller ? Route.exportUserTypeTrader : Route.exportDeclarations)),
      nextPage: (): Route => Route.exportCountryDestination,
    },
    exportCountryDestination: {
      previousPage: (isEdit: boolean): Route => (isEdit ? Route.checkYourAnswers : Route.exportOriginCountry),
      nextPage: (): Route => Route.exportCommoditySearch,
    },
    exportCommoditySearch: {
      previousPage: (isEdit: boolean): Route => (isEdit ? Route.checkYourAnswers : Route.exportCountryDestination),
    },
    exportCheckLicencesAndRestrictions: {
      previousPage: (): Route => Route.taskList,
    },
    checkWhatServicesYouNeedToRegister: {
      previousPage: (): Route => Route.taskList,
    },
    movingGoodsFromNorthernIrelandToAnEUCountry: {
      previousPage: (): Route => Route.exportCountryDestination,
    },
    exportUserTypeTrader: {
      previousPage: (isEdit: boolean): Route => (isEdit ? Route.checkYourAnswers : Route.exportGoodsArrivalDate),
    },
    exportGoodsIntent: {
      previousPage: (isEdit: boolean): Route => (isEdit ? Route.checkYourAnswers : Route.typeOfTrade),
      nextPage: (): Route => Route.exportGoodsArrivalDate,
    },
    exportProhibitionsAndRestrictions: {
      previousPage: (): Route => Route.checkYourAnswers,
    },
    checkInformationAndDocuments: {
      previousPage: (): Route => Route.taskList,
    },
    exportCheckDeclarations: {
      previousPage: (): Route => Route.taskList,
    },
  },
};

export default journey;
