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

import {
  getTaxAndDutyMessages,
  getCheckLicencesAndRestrictionsRoute,
  getCheckWhatCustomsDeclarationsLink,
  getChegUrl,
  additionalQuestions,
  getSignUpToServicesRoute,
  getCheckInformationAndDocumentsRoute,
} from './model';
import { TaskStatus } from '../../../interfaces/enums.interface';
import { Params } from '../../../interfaces/params.interface';
import { Route } from '../../../interfaces/routes.interface';
import translation from '../../../translation/en';
import {
  mockedRestrictiveMeasures,
} from '../../../utils/mockedData';

const state: Params = {
  taskStatuses: {
    checkEligibility: TaskStatus.VIEWED,
    checkLicensesAndCertificates: TaskStatus.TO_VIEW,
    checkServicestoRegister: TaskStatus.CANNOT_VIEW_YET,
    checkInformationAndDocuments: TaskStatus.CANNOT_VIEW_YET,
    checkCustomsDeclarations: TaskStatus.CANNOT_VIEW_YET,
    checkCustomsDutyAndImportVat: TaskStatus.CANNOT_VIEW_YET,
  },
};

describe('Testing getTaxAndDutyMessages', () => {
  test('It should return the correct messages nothingToPay', () => {
    const mockedTariffAndTaxesData = {
      data: {
        tariffs: [
          {
            measureTypeId: '103',
            text: 'Third country duty',
            value: '0.00 %',
            additionalCode: null,
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
            quota: null,
          },
        ],
        taxes: [
          {
            measureTypeId: '305',
            text: 'Value added tax',
            value: '0.00 %',
            additionalCode: { code: 'VATZ', description: 'VAT zero rate' },
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
          },
        ],
      },
    };

    expect(getTaxAndDutyMessages(mockedTariffAndTaxesData, state)).toStrictEqual([{
      desc: 'checkHowMuchVatImportDutyAndExciseToPay',
      state: TaskStatus.NOT_REQUIRED,
    }]);
  });

  test('It should return the correct messages vatNormalToPay and hasVariableVat', () => {
    const mockedTariffAndTaxesData = {
      data: {
        tariffs: [
          {
            measureTypeId: '103',
            text: 'Third country duty',
            value: '0.00 %',
            additionalCode: null,
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
            quota: null,
          },
        ],
        taxes: [
          {
            measureTypeId: '305',
            text: 'Value added tax',
            value: '20.00 %',
            additionalCode: null,
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
          },
        ],
      },
    };

    expect(getTaxAndDutyMessages(mockedTariffAndTaxesData, state)).toStrictEqual([
      {
        desc: 'checkHowMuchVatTopay',
        href: Route.importCalculateCustomsDutyImportVat,
        state: TaskStatus.CANNOT_VIEW_YET,
      },
      {
        desc: 'checkHowMuchImportDutyToPay',
        state: TaskStatus.NOT_REQUIRED,
      },
      {
        desc: 'checkHowMuchExciseDutyToPay',
        state: TaskStatus.NOT_REQUIRED,
      },
    ]);
  });

  test('It should return the correct messages dutiesExciseVatToPay', () => {
    const mockedTariffAndTaxesData = {
      data: {
        tariffs: [
          {
            measureTypeId: '103',
            text: 'Third country duty',
            value: '1.00 %',
            additionalCode: null,
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
            quota: null,
          },
        ],
        taxes: [
          {
            measureTypeId: '305',
            text: 'Excises',
            value: '1.00 %',
            additionalCode: { code: 'VATE', description: 'VAT exempt' },
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
          },
          {
            measureTypeId: '305',
            text: 'Value added tax',
            value: '20.00 %',
            additionalCode: null,
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
          },
        ],
      },
    };

    expect(getTaxAndDutyMessages(mockedTariffAndTaxesData, state)).toStrictEqual([{
      desc: 'checkHowMuchVatImportDutyAndExciseToPay',
      href: Route.importCalculateCustomsDutyImportVat,
      state: TaskStatus.CANNOT_VIEW_YET,
    }]);
  });

  test('It should return the correct messages dutiesVatToPay', () => {
    const mockedTariffAndTaxesData = {
      data: {
        tariffs: [
          {
            measureTypeId: '103',
            text: 'Third country duty',
            value: '14.00 %',
            additionalCode: null,
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
            quota: null,
          },
          {
            measureTypeId: '115',
            text: 'Autonomous suspension under authorised use',
            value: '0.00 %',
            additionalCode: null,
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
            quota: null,
          },
          {
            measureTypeId: '117',
            text: 'Suspension - goods for certain categories of ships, boats and other vessels and for drilling or production platforms',
            value: '0.00 %',
            additionalCode: null,
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
            quota: null,
          },
          {
            measureTypeId: '119',
            text: 'Airworthiness tariff suspension',
            value: '0.00 %',
            additionalCode: null,
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
            quota: null,
          },
        ],
        taxes: [
          {
            measureTypeId: '305',
            text: 'Value added tax',
            value: '20.00 %',
            additionalCode: null,
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
          },
        ],

      },
    };

    expect(getTaxAndDutyMessages(mockedTariffAndTaxesData, state)).toStrictEqual([{
      desc: 'checkHowMuchVatAndImportDutyToPay',
      href: Route.importCalculateCustomsDutyImportVat,
      state: TaskStatus.CANNOT_VIEW_YET,
    },
    {
      desc: 'checkHowMuchExciseDutyToPay',
      state: TaskStatus.NOT_REQUIRED,
    }]);
  });

  test('It should return the correct messages vatExciseToPay', () => {
    const mockedTariffAndTaxesData = {
      data: {
        tariffs: [
          {
            measureTypeId: '103',
            text: 'Third country duty',
            value: '0.00 %',
            additionalCode: null,
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
            quota: null,
          },
        ],
        taxes: [
          {
            measureTypeId: '305',
            text: 'Value added tax',
            value: '20.00 %',
            additionalCode: null,
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
          },
          {
            measureTypeId: '306',
            text: 'Excises',
            value: '0.00 %',
            additionalCode: {
              code: 'X431',
              description: '431 - Alcoholic beverage with a strength not exceeding 1.2% ABV',
            },
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
          },

          {
            measureTypeId: '306',
            text: 'Excises',
            value: '9.54 GBP / % vol/hl',
            additionalCode: {
              code: 'X442',
              description: '442 - Beer made in UK – small brewery beer eligible to reduced rates (variable rate, that is, annual production no more than 5,000 hectolitres)',
            },
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
          },
        ],

      },
    };

    expect(getTaxAndDutyMessages(mockedTariffAndTaxesData, state)).toStrictEqual([{
      desc: 'checkHowMuchVatAndExciseDutyToPay',
      href: Route.importCalculateCustomsDutyImportVat,
      state: TaskStatus.CANNOT_VIEW_YET,
    },
    {
      desc: 'checkHowMuchImportDutyToPay',
      state: TaskStatus.NOT_REQUIRED,
    }]);
  });

  test('It should return the correct messages dutiesExciseToPay', () => {
    const mockedTariffAndTaxesData = {
      data: {
        tariffs: [
          {
            measureTypeId: '103',
            text: 'Third country duty',
            value: '1.00 %',
            additionalCode: null,
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
            quota: null,
          },
        ],
        taxes: [

          {
            measureTypeId: '306',
            text: 'Excises',
            value: '20.00 %',
            additionalCode: {
              code: 'X431',
              description: '431 - Alcoholic beverage with a strength not exceeding 1.2% ABV',
            },
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
          },
        ],

      },
    };

    expect(getTaxAndDutyMessages(mockedTariffAndTaxesData, state)).toStrictEqual([{
      desc: 'checkHowMuchImportDutyAndExciseDutyToPay',
      href: Route.importCalculateCustomsDutyImportVat,
      state: TaskStatus.CANNOT_VIEW_YET,
    },
    {
      desc: 'checkHowMuchVatTopay',
      state: TaskStatus.NOT_REQUIRED,
    }]);
  });

  test('It should return the correct messages dutiesToPay', () => {
    const mockedTariffAndTaxesData = {
      data: {
        tariffs: [
          {
            measureTypeId: '103',
            text: 'Third country duty',
            value: '1.00 %',
            additionalCode: null,
            geographicalArea: { id: '1011', description: 'ERGA OMNES' },
            quota: null,
          },
        ],
        taxes: [],

      },
    };

    expect(getTaxAndDutyMessages(mockedTariffAndTaxesData, state)).toStrictEqual([{
      desc: 'checkHowMuchImportDutyToPay',
      href: Route.importCalculateCustomsDutyImportVat,
      state: TaskStatus.CANNOT_VIEW_YET,
    },
    {
      desc: 'checkHowMuchVatTopay',
      state: TaskStatus.NOT_REQUIRED,
    },
    {
      desc: 'checkHowMuchExciseDutyToPay',
      state: TaskStatus.NOT_REQUIRED,
    }]);
  });

  test('It should return the correct messages exciseToPay', () => {
    const mockedTariffAndTaxesData = {
      data: {
        tariffs: [],
        taxes: [{
          measureTypeId: '306',
          text: 'Excises',
          value: '20.00 %',
          additionalCode: {
            code: 'X431',
            description: '431 - Alcoholic beverage with a strength not exceeding 1.2% ABV',
          },
          geographicalArea: { id: '1011', description: 'ERGA OMNES' },
        }],

      },
    };

    expect(getTaxAndDutyMessages(mockedTariffAndTaxesData, state)).toStrictEqual([{
      desc: 'checkHowMuchExciseDutyToPay',
      href: Route.importCalculateCustomsDutyImportVat,
      state: TaskStatus.CANNOT_VIEW_YET,
    },
    {
      desc: 'checkHowMuchImportDutyToPay',
      state: TaskStatus.NOT_REQUIRED,
    },
    {
      desc: 'checkHowMuchVatTopay',
      state: TaskStatus.NOT_REQUIRED,
    }]);
  });
});

describe('Testing getCheckLicencesAndRestrictionsRoute', () => {
  expect(getCheckLicencesAndRestrictionsRoute(true, false)).toStrictEqual(Route.exportCheckLicencesAndRestrictions);
  expect(getCheckLicencesAndRestrictionsRoute(false, true)).toStrictEqual(Route.importAdditionalQuestions);
  expect(getCheckLicencesAndRestrictionsRoute(false, false)).toStrictEqual(Route.importCheckLicencesAndRestrictions);
});

describe('Testing getCheckWhatCustomsDeclarationsLink', () => {
  expect(getCheckWhatCustomsDeclarationsLink(false, state, true)).toStrictEqual({
    route: Route.importCheckDeclarations,
    state: TaskStatus.CANNOT_VIEW_YET,
  });
  expect(getCheckWhatCustomsDeclarationsLink(false, state, false)).toStrictEqual({
    route: Route.exportCheckDeclarations,
    state: TaskStatus.CANNOT_VIEW_YET,
  });
  expect(getCheckWhatCustomsDeclarationsLink(true, state, true)).toStrictEqual({
    route: '',
    state: TaskStatus.NOT_REQUIRED,
  });
});

describe('Testing getChegUrl without slash', () => {
  process.env.CHEG_SERVICE_BASE_URL = 'https://www.check-duties-customs-exporting-goods.service.gov.uk/';
  expect(getChegUrl('CN', 'GB', '0000000000')).toStrictEqual('https://www.check-duties-customs-exporting-goods.service.gov.uk/prodmap?oc=CN&dc=GB&code=0000000000&utm_source=stwgs&utm_medium=referral&utm_term=task_list');
});

describe('Testing getChegUrl with slash', () => {
  process.env.CHEG_SERVICE_BASE_URL = 'https://www.check-duties-customs-exporting-goods.service.gov.uk';
  expect(getChegUrl('CN', 'GB', '0000000000')).toStrictEqual('https://www.check-duties-customs-exporting-goods.service.gov.uk/prodmap?oc=CN&dc=GB&code=0000000000&utm_source=stwgs&utm_medium=referral&utm_term=task_list');
});

describe('Testing additionalQuestions', () => {
  expect(additionalQuestions(mockedRestrictiveMeasures, translation, {} as any)).toStrictEqual(false);
});

describe('Testing getSignUpToServicesRoute', () => {
  expect(getSignUpToServicesRoute(true)).toStrictEqual(Route.importRegisterToBringGoods);
  expect(getSignUpToServicesRoute(false)).toStrictEqual(Route.exportCheckWhatServicesYouNeedToRegister);
});

describe('Testing getCheckInformationAndDocumentsRoute', () => {
  expect(getCheckInformationAndDocumentsRoute(true)).toStrictEqual(Route.importCheckInformationAndDocuments);
  expect(getCheckInformationAndDocumentsRoute(false)).toStrictEqual(Route.exportCheckInformationAndDocuments);
});
