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

import { TaskStatus } from './enums.interface';

export enum ExportsTasks {
    checkEligibility = 'checkEligibility',
    checkLicensesAndCertificates = 'checkLicensesAndCertificates',
    checkServicestoRegister = 'checkServicestoRegister',
    checkInformationAndDocuments = 'checkInformationAndDocuments',
    checkCustomsDeclarations = 'checkCustomsDeclarations',
    checkClearSecondBorder = 'checkClearSecondBorder',
}
export type ExportTaskStatuses = {
    [key in ExportsTasks]?: TaskStatus;
}
export interface ExportsParams {
    tradeType?: string;
    goodsPurpose?: string; // screen 03
    exportGoodsIntent?: string; // screen 04
    tradeDateDay?: string; // screen 05
    tradeDateMonth?: string;
    tradeDateYear?: string;
    exportUserTypeTrader?: string; // screen 06
    exportDeclarations?: string; // screen 07
    originCountry?: string; // screen 08
    originCountryName?: string; // screen 08
    destinationCountry?: string; // screen 09
    destinationCountryName?: string; // screen 09
    commodity?: string; // screen 11
    additionalCode?: string;
    isEdit?: string;
    hasAddionalCode?: string;
    hasNoMeasures?: boolean;
    error?: string;
    checkRestrictions?: string;
    exportTaskStatuses? : ExportTaskStatuses;
}

export default ExportsParams;
