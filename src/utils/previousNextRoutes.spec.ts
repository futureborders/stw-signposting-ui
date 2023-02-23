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

import { Route } from '../interfaces/routes.interface';
import { journey } from './previousNextRoutes';
import { ExportUserTypeTrader } from '../interfaces/enums.interface';

describe('Journey previous/next routes', () => {
  test('It should return the correct paths', () => {
    expect(journey.export.exportDeclarations.previousPage(true, true)).toEqual(Route.exportUserTypeTrader);
    expect(journey.export.exportDeclarations.previousPage(true, false)).toEqual(Route.exportCheckYourAnswers);
    expect(journey.export.exportDeclarations.previousPage(false, true)).toEqual(Route.exportUserTypeTrader);
    expect(journey.export.exportDeclarations.previousPage(false, false)).toEqual(Route.exportUserTypeTrader);
    expect(journey.export.exportOriginCountry.previousPage(false, ExportUserTypeTrader.goodsExportedToBeSold)).toEqual(Route.exportDeclarations);
    expect(journey.export.exportOriginCountry.previousPage(false, ExportUserTypeTrader.actingOnBehalfOfSeller)).toEqual(Route.exportUserTypeTrader);
    expect(journey.export.exportOriginCountry.previousPage(false, ExportUserTypeTrader.neitherApply)).toEqual(Route.exportDeclarations);
    expect(journey.export.exportOriginCountry.previousPage(true, ExportUserTypeTrader.neitherApply)).toEqual(Route.exportCheckYourAnswers);
    expect(journey.export.exportCountryDestination.previousPage(true)).toEqual(Route.exportCheckYourAnswers);
    expect(journey.export.exportCountryDestination.previousPage(false)).toEqual(Route.exportOriginCountry);
    expect(journey.export.exportCommoditySearch.previousPage('someOriginal')).toEqual(Route.exportCheckYourAnswers);
    expect(journey.export.exportCommoditySearch.previousPage('')).toEqual(Route.exportCountryDestination);
    expect(journey.export.exportAdditionalCode.previousPage(true)).toEqual(Route.exportCheckYourAnswers);
    expect(journey.export.exportAdditionalCode.previousPage(false)).toEqual(Route.exportCommoditySearch);
    expect(journey.export.exportUserTypeTrader.previousPage(false)).toEqual(Route.exportGoodsArrivalDate);
    expect(journey.export.exportUserTypeTrader.previousPage(true)).toEqual(Route.exportCheckYourAnswers);
    expect(journey.export.exportGoodsIntent.previousPage(true)).toEqual(Route.exportCheckYourAnswers);
    expect(journey.export.exportGoodsIntent.previousPage(false)).toEqual(Route.typeOfTrade);
  });
});
