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
import { Request } from 'express';
import { Route } from '../../../interfaces/routes.interface';
import { TaskStatus } from '../../../interfaces/enums.interface';
import { TaskStatuses, TaskListItemLinks, TaskListItems } from './interface';
import { getAdditionalQuestions } from '../../../models/additionalQuestions.models';
import { Params } from '../../../interfaces/params.interface';

export const getCheckLicencesAndRestrictionsRoute = (isExports: boolean, hasAdditionalQuestions: boolean): Route => {
  if (isExports) {
    return Route.exportCheckLicencesAndRestrictions;
  } if (hasAdditionalQuestions) {
    return Route.importAdditionalQuestions;
  }
  return Route.importCheckLicencesAndRestrictions;
};

export const getCheckWhatCustomsDeclarationsLink = (importDeclarationsNotRequired: boolean, state: Params, isImports: boolean): TaskListItemLinks => {
  if (isImports && !importDeclarationsNotRequired) {
    return {
      route: Route.importCheckDeclarations,
      state: state?.taskStatuses?.checkCustomsDeclarations as TaskStatus,
    };
  } if (!isImports) {
    return {
      route: Route.exportCheckDeclarations,
      state: state?.taskStatuses?.checkCustomsDeclarations as TaskStatus,
    };
  }
  return {
    route: '',
    state: TaskStatus.NOT_REQUIRED,
  };
};

export const getSignUpToServicesRoute = (isImports: boolean): Route => (isImports ? Route.importRegisterToBringGoods : Route.exportCheckWhatServicesYouNeedToRegister);
export const getCheckInformationAndDocumentsRoute = (isImports: boolean):Route => (isImports ? Route.importCheckInformationAndDocuments : Route.exportCheckInformationAndDocuments);

export const getTaxAndDutyMessages = (tariffAndTaxesResponse: any, state: Params): TaskListItems[] => {
  const taskStatuses = state.taskStatuses as TaskStatuses;
  const vat = tariffAndTaxesResponse.data.taxes.filter((tax: any) => tax.text === 'Value added tax');
  const hasDuty = tariffAndTaxesResponse.data.tariffs.some((tariff: any) => tariff.value !== '0.00 %');
  const hasExcise = tariffAndTaxesResponse.data.taxes.some((tax: any) => tax.text === 'Excises');
  const hasAnyVat = vat.some((tax: any) => parseFloat(tax.value) > 0);
  const hasNormalVat = vat.some((tax: any) => tax.value === '20.00 %') && vat.length === 1;
  const hasReducedVat = vat.some((tax: any) => tax.value === '5.00 %');
  const hasVariableVat = vat.reduce((sum: any, tax: any) => sum + parseFloat(tax.value), 0) >= 20 && vat.length > 1;

  const nothingToPay = (!hasDuty && !hasExcise && !hasAnyVat && !hasNormalVat && !hasReducedVat && !hasVariableVat);
  const vatNormalToPay = (!hasDuty && !hasExcise && hasAnyVat && hasNormalVat);
  const vatVariableToPay = (!hasDuty && !hasExcise && hasAnyVat && hasVariableVat);
  const dutiesExciseVatToPay = (hasDuty && hasExcise && hasAnyVat);
  const dutiesVatToPay = (hasDuty && !hasExcise && hasAnyVat);
  const vatExciseToPay = (!hasDuty && hasExcise && hasAnyVat);
  const dutiesExciseToPay = (hasDuty && hasExcise && !hasAnyVat);
  const dutiesToPay = (hasDuty && !hasExcise && !hasAnyVat);
  const exciseToPay = (!hasDuty && hasExcise && !hasAnyVat);

  switch (true) {
    case vatNormalToPay:
    case vatVariableToPay:
      return [{
        desc: 'checkHowMuchVatTopay',
        href: Route.importCalculateCustomsDutyImportVat,
        state: taskStatuses.checkCustomsDutyAndImportVat,
      },
      {
        desc: 'checkHowMuchImportDutyToPay',
        state: TaskStatus.NOT_REQUIRED,
      },
      {
        desc: 'checkHowMuchExciseDutyToPay',
        state: TaskStatus.NOT_REQUIRED,
      }];
    case dutiesExciseVatToPay:
      return [{
        desc: 'checkHowMuchVatImportDutyAndExciseToPay',
        href: Route.importCalculateCustomsDutyImportVat,
        state: taskStatuses.checkCustomsDutyAndImportVat,
      }];
    case dutiesVatToPay:
      return [{
        desc: 'checkHowMuchVatAndImportDutyToPay',
        href: Route.importCalculateCustomsDutyImportVat,
        state: taskStatuses.checkCustomsDutyAndImportVat,
      },
      {
        desc: 'checkHowMuchExciseDutyToPay',
        state: TaskStatus.NOT_REQUIRED,
      }];
    case vatExciseToPay:
      return [{
        desc: 'checkHowMuchVatAndExciseDutyToPay',
        href: Route.importCalculateCustomsDutyImportVat,
        state: taskStatuses.checkCustomsDutyAndImportVat,
      },
      {
        desc: 'checkHowMuchImportDutyToPay',
        state: TaskStatus.NOT_REQUIRED,
      }];
    case dutiesExciseToPay:
      return [{
        desc: 'checkHowMuchImportDutyAndExciseDutyToPay',
        href: Route.importCalculateCustomsDutyImportVat,
        state: taskStatuses.checkCustomsDutyAndImportVat,
      },
      {
        desc: 'checkHowMuchVatTopay',
        state: TaskStatus.NOT_REQUIRED,
      }];
    case dutiesToPay:
      return [{
        desc: 'checkHowMuchImportDutyToPay',
        href: Route.importCalculateCustomsDutyImportVat,
        state: taskStatuses.checkCustomsDutyAndImportVat,
      },
      {
        desc: 'checkHowMuchVatTopay',
        state: TaskStatus.NOT_REQUIRED,
      },
      {
        desc: 'checkHowMuchExciseDutyToPay',
        state: TaskStatus.NOT_REQUIRED,
      }];
    case exciseToPay:
      return [{
        desc: 'checkHowMuchExciseDutyToPay',
        href: Route.importCalculateCustomsDutyImportVat,
        state: taskStatuses.checkCustomsDutyAndImportVat,
      },
      {
        desc: 'checkHowMuchImportDutyToPay',
        state: TaskStatus.NOT_REQUIRED,
      },
      {
        desc: 'checkHowMuchVatTopay',
        state: TaskStatus.NOT_REQUIRED,
      }];
    case nothingToPay:
    default:
      return [{
        desc: 'checkHowMuchVatImportDutyAndExciseToPay',
        state: TaskStatus.NOT_REQUIRED,
      }];
  }
};

export const getChegUrl = (originCountry: string, destinationCountry: string, commodity: string): string => {
  let chegUrl = process.env.CHEG_SERVICE_BASE_URL;
  const countryPattern = /^[a-z]{2}$/i;
  const commodityPattern = /^[0-9]{2,10}$/;

  if (
    countryPattern.test(originCountry)
    && countryPattern.test(destinationCountry)
    && commodityPattern.test(commodity)
  ) {
    chegUrl += (chegUrl && chegUrl.endsWith('/')) ? '' : '/'; // Add a slash if needed
    chegUrl += `prodmap?oc=${encodeURIComponent(originCountry)}&dc=${encodeURIComponent(destinationCountry)}&code=${encodeURIComponent(commodity)}&utm_source=stwgs&utm_medium=referral&utm_term=task_list`;
  }

  return String(chegUrl);
};

export const additionalQuestions = (restrictiveMeasuresData: any, translation: any, req: Request) => {
  const { questions } = getAdditionalQuestions(restrictiveMeasuresData, translation);
  const notAnswered = questions.filter((question: any) => question && !req.query[question.questionId]);
  return notAnswered.length > 0;
};

export default getTaxAndDutyMessages;
