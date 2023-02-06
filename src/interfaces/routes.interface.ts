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

import { Router } from 'express';

interface Routes {
  path?: string;
  router: Router;
}

export enum Route {
  index = '/',
  typeOfTrade = '/type-of-trade',
  goodsIntent = '/goods-intent',
  identifyUserType = '/identify-user-type',
  importDate = '/import-date',
  importDeclarations = '/import-declarations',
  importGoods = '/import-goods',
  destinationCountry = '/destination-country',
  importCountryOrigin = '/import-country-origin',
  search = '/search',
  searchHeadings = '/search/:itemId/:sid',
  additionalCode = '/additional-code',
  importCheckLicencesAndRestrictions = '/import/check-licences-certificates-and-other-restrictions',
  importProhibitionsAndRestrictions = '/import/prohibitions-and-restrictions',
  importAdditionalQuestions = '/import/additional-question',
  importCalculateCustomsDutyImportVat = '/import/calculate-the-customs-duty-and-import-vat',
  importRegisterToBringGoods = '/import/check-which-services-you-need-to-register-with',
  importCheckInformationAndDocuments = '/import/check-what-information-and-documents-you-may-need',
  importCheckDeclarations = '/import/check-which-declarations-you-need-to-submit',
  northernIrelandAndEUTrading = '/northern-ireland-and-eu-trading',
  accessibility = '/accessibility-statement',
  manageCookies = '/cookies',
  saveCookieSettings = '/save-cookie-settings',
  privacyNotice = '/privacy-notice',
  tariffAndTaxes = '/tariff-and-taxes',
  taskList = '/task-list',
  exportDeclarations = '/export/export-declarations',
  exportCommoditySearch = '/export/export-commodity-search',
  exportCountryDestination = '/export/country-destination',
  exportCheckLicencesAndRestrictions = '/export/export-check-licences-and-restrictions',
  checkYourAnswers = '/check-your-answers',
  exportOriginCountry = '/export/export-origin-country',
  exportCheckWhatServicesYouNeedToRegister = '/export/check-which-services-you-need-to-register',
  exportGoodsArrivalDate = '/export/export-goods-arrival-date',
  exportMovingGoodsFromNorthernIrelandToAnEUCountry = '/export/moving-goods-from-northern-ireland-to-an-eu-country',
  exportUserTypeTrader = '/export/what-are-you-responsible-for',
  exportGoodsIntent = '/export/goods-intent',
  exportProhibitionsAndRestrictions = '/export/prohibitions-and-restrictions',
  exportCheckInformationAndDocuments = '/export/check-information-and-documents',
  exportCheckDeclarations = '/export/export-check-declarations',
}

export default Routes;
