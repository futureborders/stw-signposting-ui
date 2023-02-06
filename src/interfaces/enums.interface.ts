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

export enum UserType {
  nonDeclaringTrader = 'non_declaring_trader',
  declaringTrader = 'declaring_trader',
  agent = 'intermediary'
}

export enum TypeOfTrade {
  import = 'import',
  export = 'export'
}

export enum DestinationCountry {
  GB = 'GB',
  XI = 'XI'
}

export enum OriginCountry {
  XI = 'XI',
  GB = 'GB',
}

export enum GoodsIntent {
  bringGoodsToSell = 'bringGoodsToSell',
  bringGoodsThroughPost = 'bringGoodsThroughPost',
  bringGoodsInLuggage = 'bringGoodsInLuggage',
  bringGoodsInLuggageForBusiness = 'bringGoodsInLuggageForBusiness',
  bringGoodsTemporarily = 'bringGoodsTemporarily',
  movingToUkWithBelongings = 'movingToUkWithBelongings'
}

export enum ImportDeclarations {
  yes = 'yes',
  no = 'no',
  notSure = 'notSure'
}

export enum CookiesBannerDecision {
  acceptedCookies = 'acceptedCookies',
  rejectedCookies = 'rejectedCookies'
}

export enum SearchType {
  HEADING = 'heading',
  SUBHEADING = 'subheading',
  COMMODITY = 'commodity',
  CHAPTER = 'chapter',
  FREE = 'free'
}

export enum NoDutiesContentKey {
  IMPORT_INTO_XI_FROM_EU = 'IMPORT_INTO_XI_FROM_EU',
  IMPORT_INTO_GB_FROM_XI = 'IMPORT_INTO_GB_FROM_XI',
  IMPORT_INTO_GB_FROM_ROW = 'IMPORT_INTO_GB_FROM_ROW',
  IMPORT_INTO_XI_FROM_GB = 'IMPORT_INTO_XI_FROM_GB'
}

export enum RelatedToEnum {
  IMPORT_CONTROLS = 'IMPORT_CONTROLS',
  CALCULATE_DUTY = 'CALCULATE_DUTY',
  IMPORT_REGISTRATION = 'IMPORT_REGISTRATION',
  IMPORT_DOCUMENTATION = 'IMPORT_DOCUMENTATION',
  ENS_DECLARATION = 'ENS_DECLARATION',
  IMPORT_DECLARATION = 'IMPORT_DECLARATION',
  CLAIMING_BACK_DUTY = 'CLAIMING_BACK_DUTY',
  DELAY_DUTY = 'DELAY_DUTY',
  IMPORT_RECORD_KEEPING = 'IMPORT_RECORD_KEEPING',
}

// TODO: rename to MeasureTypeIds
export enum MeasureType {
  CITES = '710',
  ORGANICS = '750',
  PHYTOSANITARY = '360',
  IAS = '712',
}
// TODO: rename to MeasureType
export enum MeasureTypes {
  PROHIBITIVE = 'PROHIBITIVE',
}

export const AdditionalQuestionsOrder = [
  MeasureType.CITES,
  MeasureType.PHYTOSANITARY,
  MeasureType.ORGANICS,
  MeasureType.IAS,
];

export enum DocumentCode {
  C400 = 'C400',
  Y900 = 'Y900',
  C644 = 'C644',
  Y929 = 'Y929',
  '999L' = '999L',
  N851 = 'N851',
  Y251 = 'Y251',
  Y252 = 'Y252',
  Y253 = 'Y253',
  Y256 = 'Y256',
  Y257 = 'Y257',
  Y501 = 'Y501',
  Y067 = 'Y067',
  Y250 = 'Y250',
  Y942 = 'Y942',
  C065 = 'C065',
}

export enum TaskStatus {
  CANNOT_VIEW_YET = 'CANNOT_VIEW_YET',
  TO_VIEW = 'TO_VIEW',
  VIEWED = 'VIEWED',
  NOT_REQUIRED = 'NOT_REQUIRED',
}

export enum ImportParamsOrder {
  tradeType = 'tradeType',
  goodsIntent = 'goodsIntent',
  importDateDay = 'importDateDay',
  originCountry = 'originCountry',
  destinationCountry = 'destinationCountry',
  userTypeTrader = 'userTypeTrader',
  importDeclarations = 'importDeclarations',
  commodity = 'commodity',
}

export enum ExportParamsOrder {
  tradeType = 'tradeType',
  exportGoodsIntent = 'exportGoodsIntent',
  tradeDateDay = 'tradeDateDay',
  exportUserTypeTrader = 'exportUserTypeTrader',
  exportDeclarations = 'exportDeclarations',
  originCountry = 'originCountry',
  destinationCountry = 'destinationCountry',
  commodity = 'commodity',
}

export enum ExportGoodsIntent {
  goodsExportedToBeSoldForBusiness = 'goodsExportedToBeSoldForBusiness',
  goodsExportedTemporarilyForBusiness = ' goodsExportedTemporarilyForBusiness',
  goodsSoldInLuggageForBusiness = ' goodsSoldInLuggageForBusiness',
  goodsPostedForPersonal = ' goodsPostedForPersonal',
}

export enum ExportUserTypeTrader {
  goodsExportedToBeSold = 'goodsExportedToBeSold',
  actingOnBehalfOfSeller = 'actingOnBehalfOfSeller',
  neitherApply = 'neitherApply',
}

export enum ImportUserTypeTrader {
  yes = 'yes',
  no = 'no',
  neither = 'neither'
}

export enum LANGUAGE {
  en = 'en',
  cy = 'cy',
}

export default UserType;
