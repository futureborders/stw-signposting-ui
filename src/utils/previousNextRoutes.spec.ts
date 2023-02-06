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

import { Route } from '../interfaces/routes.interface';
import { journey } from './previousNextRoutes';
import { ExportUserTypeTrader, TypeOfTrade, ImportUserTypeTrader } from '../interfaces/enums.interface';

describe('Journey previous/next routes', () => {
  process.env.STARTPAGE_URL = 'some-startpage-url';

  test('It should return the correct common paths', () => {
    expect(journey.common.typeOfTrade.nextPage(false, TypeOfTrade.import, true)).toEqual(Route.goodsIntent);
    expect(journey.common.typeOfTrade.nextPage(false, TypeOfTrade.export, true)).toEqual(Route.exportGoodsIntent);
    expect(journey.common.typeOfTrade.nextPage(true, TypeOfTrade.export, false)).toEqual(Route.checkYourAnswers);
    expect(journey.common.typeOfTrade.previousPage(true, true, 'some-startpage-url', 'foo=bar')).toEqual(`${Route.checkYourAnswers}?foo=bar`);
    expect(journey.common.typeOfTrade.previousPage(false, true, 'some-startpage-url', 'foo=bar')).toEqual(Route.index);
    expect(journey.common.typeOfTrade.previousPage(false, false, 'some-startpage-url', 'foo=bar')).toEqual('some-startpage-url');
    expect(journey.common.taskList.previousPage()).toEqual(Route.checkYourAnswers);
    expect(journey.common.northernIrelandAndEUTrading.previousPage()).toEqual(Route.destinationCountry);
    expect(journey.common.checkYourAnswers.previousPage(true)).toEqual(Route.exportCommoditySearch);
    expect(journey.common.checkYourAnswers.previousPage(false)).toEqual(Route.importGoods);
    expect(journey.common.checkYourAnswers.nextPage()).toEqual(Route.taskList);
    expect(journey.common.additionalCode.previousPage(true, true)).toEqual(Route.checkYourAnswers);
    expect(journey.common.additionalCode.previousPage(false, true)).toEqual(Route.exportCommoditySearch);
    expect(journey.common.additionalCode.previousPage(false, false)).toEqual(Route.importGoods);
    expect(journey.common.additionalCode.nextPage()).toEqual(Route.checkYourAnswers);
  });
  test('It should return the correct import paths', () => {
    expect(journey.import.goodsIntent.previousPage(true)).toEqual(Route.checkYourAnswers);
    expect(journey.import.goodsIntent.previousPage(false)).toEqual(Route.typeOfTrade);
    expect(journey.import.goodsIntent.nextPage()).toEqual(Route.importDate);
    expect(journey.import.identifyUserType.previousPage(true)).toEqual(Route.checkYourAnswers);
    expect(journey.import.identifyUserType.previousPage(false)).toEqual(Route.destinationCountry);
    expect(journey.import.identifyUserType.nextPage(ImportUserTypeTrader.yes)).toEqual(Route.importDeclarations);
    expect(journey.import.identifyUserType.nextPage(ImportUserTypeTrader.no)).toEqual(Route.importGoods);
    expect(journey.import.identifyUserType.nextPage(ImportUserTypeTrader.neither)).toEqual(Route.importDeclarations);
    expect(journey.import.importDeclarations.previousPage(true)).toEqual(Route.checkYourAnswers);
    expect(journey.import.importDeclarations.previousPage(false)).toEqual(Route.identifyUserType);
    expect(journey.import.importDeclarations.nextPage()).toEqual(Route.importGoods);
    expect(journey.import.importCountryOrigin.previousPage(true)).toEqual(Route.checkYourAnswers);
    expect(journey.import.importCountryOrigin.previousPage(false)).toEqual(Route.importDate);
    expect(journey.import.importCountryOrigin.nextPage()).toEqual(Route.destinationCountry);
    expect(journey.import.destinationCountry.previousPage(true)).toEqual(Route.checkYourAnswers);
    expect(journey.import.destinationCountry.previousPage(false)).toEqual(Route.importCountryOrigin);
    expect(journey.import.destinationCountry.nextPage()).toEqual(Route.identifyUserType);
    expect(journey.import.importDate.previousPage(true)).toEqual(Route.checkYourAnswers);
    expect(journey.import.importDate.previousPage(false)).toEqual(Route.goodsIntent);
    expect(journey.import.importDate.nextPage()).toEqual(Route.importCountryOrigin);
    expect(journey.import.importGoods.previousPage(true, ImportUserTypeTrader.yes)).toEqual(Route.checkYourAnswers);
    expect(journey.import.importGoods.previousPage(false, ImportUserTypeTrader.yes)).toEqual(Route.importDeclarations);
    expect(journey.import.importGoods.previousPage(false, ImportUserTypeTrader.no)).toEqual(Route.identifyUserType);
    expect(journey.import.importGoods.previousPage(false, ImportUserTypeTrader.neither)).toEqual(Route.importDeclarations);
    expect(journey.import.importCheckLicencesAndRestrictions.previousPage()).toEqual(Route.taskList);
    expect(journey.import.importCheckInformationAndDocuments.previousPage()).toEqual(Route.taskList);
    expect(journey.import.importRegisterToBringGoods.previousPage()).toEqual(Route.taskList);
    expect(journey.import.importProhibitionsAndRestrictions.previousPage()).toEqual(Route.importGoods);
    expect(journey.import.importCheckDeclarations.previousPage()).toEqual(Route.taskList);
    expect(journey.import.importAdditionalQuestions.previousPage()).toEqual(Route.taskList);
    expect(journey.import.importCalculateCustomsDutyImportVat.previousPage()).toEqual(Route.taskList);
  });
  test('It should return the correct export paths', () => {
    expect(journey.export.exportDeclarations.previousPage(true, true)).toEqual(Route.checkYourAnswers);
    expect(journey.export.exportDeclarations.previousPage(true, false)).toEqual(Route.checkYourAnswers);
    expect(journey.export.exportDeclarations.previousPage(false, true)).toEqual(Route.exportUserTypeTrader);
    expect(journey.export.exportDeclarations.previousPage(false, false)).toEqual(Route.exportUserTypeTrader);
    expect(journey.export.exportOriginCountry.previousPage(false, ExportUserTypeTrader.goodsExportedToBeSold)).toEqual(Route.exportDeclarations);
    expect(journey.export.exportOriginCountry.previousPage(false, ExportUserTypeTrader.actingOnBehalfOfSeller)).toEqual(Route.exportUserTypeTrader);
    expect(journey.export.exportOriginCountry.previousPage(false, ExportUserTypeTrader.neitherApply)).toEqual(Route.exportDeclarations);
    expect(journey.export.exportOriginCountry.previousPage(true, ExportUserTypeTrader.neitherApply)).toEqual(Route.checkYourAnswers);
    expect(journey.export.exportCountryDestination.previousPage(true)).toEqual(Route.checkYourAnswers);
    expect(journey.export.exportCountryDestination.previousPage(false)).toEqual(Route.exportOriginCountry);
    expect(journey.export.exportCommoditySearch.previousPage(true)).toEqual(Route.checkYourAnswers);
    expect(journey.export.exportCommoditySearch.previousPage(false)).toEqual(Route.exportCountryDestination);
    expect(journey.export.exportUserTypeTrader.previousPage(false)).toEqual(Route.exportGoodsArrivalDate);
    expect(journey.export.exportUserTypeTrader.previousPage(true)).toEqual(Route.checkYourAnswers);
    expect(journey.export.exportGoodsIntent.previousPage(true)).toEqual(Route.checkYourAnswers);
    expect(journey.export.exportGoodsIntent.previousPage(false)).toEqual(Route.typeOfTrade);
    expect(journey.export.exportGoodsArrivalDate.previousPage(true)).toEqual(Route.checkYourAnswers);
    expect(journey.export.exportGoodsArrivalDate.previousPage(false)).toEqual(Route.exportGoodsIntent);
    expect(journey.export.exportGoodsArrivalDate.nextPage()).toEqual(Route.exportUserTypeTrader);
  });
});
