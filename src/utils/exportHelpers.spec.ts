/**
 * Copyright 2021 Crown Copyright (Single Trade Window)
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ExportGoodsIntent, TaskStatus } from '../interfaces/enums.interface';
import { ExportsParams, ExportsTasks } from '../interfaces/exports.interface';
import { calcExportStatus, calculateNewTaskStatuses } from './exportHelpers';

let state: ExportsParams = {};
let sessionState: ExportsParams = {};

beforeEach(() => {
  jest.clearAllMocks();
  process.env.EXPORTS_ENABLED = 'true';
  state = {
    commodity: '0208907000',
    destinationCountry: 'BR',
    originCountry: 'GB',
    checkRestrictions: 'undefined',
    tradeType: 'export',
    exportDeclarations: 'undefined',
    exportGoodsIntent: ExportGoodsIntent.goodsExportedToBeSoldForBusiness,
    exportUserTypeTrader: 'NE',
    tradeDateDay: '01',
    tradeDateMonth: '01',
    tradeDateYear: '2022',
    destinationCountryName: 'Brazil',
    originCountryName: 'England, Scotland and Wales',
    exportTaskStatuses: {
      checkEligibility: TaskStatus.VIEWED,
      checkLicensesAndCertificates: TaskStatus.TO_VIEW,
      checkServicestoRegister: TaskStatus.CANNOT_VIEW_YET,
      checkInformationAndDocuments: TaskStatus.CANNOT_VIEW_YET,
      checkCustomsDeclarations: TaskStatus.CANNOT_VIEW_YET,
    },
  };
  sessionState = {
    commodity: '0208907000',
    destinationCountry: 'BR',
    originCountry: 'GB',
    checkRestrictions: 'undefined',
    tradeType: 'export',
    exportDeclarations: 'notSure',
    exportGoodsIntent: ExportGoodsIntent.goodsExportedToBeSoldForBusiness,
    exportUserTypeTrader: 'NE',
    tradeDateDay: '01',
    tradeDateMonth: '01',
    tradeDateYear: '2022',
    destinationCountryName: 'Brazil',
    originCountryName: 'England, Scotland and Wales',
    exportTaskStatuses: {
      checkEligibility: TaskStatus.VIEWED,
      checkLicensesAndCertificates: TaskStatus.TO_VIEW,
      checkServicestoRegister: TaskStatus.CANNOT_VIEW_YET,
      checkInformationAndDocuments: TaskStatus.CANNOT_VIEW_YET,
      checkCustomsDeclarations: TaskStatus.CANNOT_VIEW_YET,
    },
  };
});

describe('Testing calcExportStatus', () => {
  test('It should calculate status based on a new session when commodity from params does not match commodity in session', () => {
    state.commodity = '0208908000';
    if (sessionState.exportTaskStatuses) {
      sessionState.exportTaskStatuses.checkLicensesAndCertificates = TaskStatus.VIEWED;
      sessionState.exportTaskStatuses.checkInformationAndDocuments = TaskStatus.VIEWED;
    }

    expect(calcExportStatus(state, sessionState, false)).toEqual({
      commodity: '0208908000',
      destinationCountry: 'BR',
      originCountry: 'GB',
      checkRestrictions: 'undefined',
      tradeType: 'export',
      exportDeclarations: 'undefined',
      exportGoodsIntent: ExportGoodsIntent.goodsExportedToBeSoldForBusiness,
      exportUserTypeTrader: 'NE',
      tradeDateDay: '01',
      tradeDateMonth: '01',
      tradeDateYear: '2022',
      destinationCountryName: 'Brazil',
      originCountryName: 'England, Scotland and Wales',
      exportTaskStatuses: {
        checkEligibility: TaskStatus.VIEWED,
        checkLicensesAndCertificates: TaskStatus.TO_VIEW,
        checkServicestoRegister: TaskStatus.CANNOT_VIEW_YET,
        checkInformationAndDocuments: TaskStatus.CANNOT_VIEW_YET,
        checkCustomsDeclarations: TaskStatus.CANNOT_VIEW_YET,
      },
    });
  });

  test('It should calculate status based on a new session when destinationCountry from params does not match destinationCountry in session', () => {
    state.destinationCountry = 'CN';
    state.destinationCountryName = 'China';
    if (sessionState.exportTaskStatuses) {
      sessionState.exportTaskStatuses.checkLicensesAndCertificates = TaskStatus.VIEWED;
    }

    expect(calcExportStatus(state, sessionState, false)).toEqual({
      commodity: '0208907000',
      destinationCountry: 'CN',
      originCountry: 'GB',
      checkRestrictions: 'undefined',
      tradeType: 'export',
      exportDeclarations: 'undefined',
      exportGoodsIntent: ExportGoodsIntent.goodsExportedToBeSoldForBusiness,
      exportUserTypeTrader: 'NE',
      tradeDateDay: '01',
      tradeDateMonth: '01',
      tradeDateYear: '2022',
      destinationCountryName: 'China',
      originCountryName: 'England, Scotland and Wales',
      exportTaskStatuses: {
        checkEligibility: TaskStatus.VIEWED,
        checkLicensesAndCertificates: TaskStatus.TO_VIEW,
        checkServicestoRegister: TaskStatus.CANNOT_VIEW_YET,
        checkInformationAndDocuments: TaskStatus.CANNOT_VIEW_YET,
        checkCustomsDeclarations: TaskStatus.CANNOT_VIEW_YET,
      },
    });
  });

  test('It should calculate status based on current session', () => {
    state.exportDeclarations = 'yes';
    expect(calcExportStatus(state, sessionState, false)).toEqual({
      commodity: '0208907000',
      destinationCountry: 'BR',
      originCountry: 'GB',
      checkRestrictions: 'undefined',
      tradeType: 'export',
      exportDeclarations: 'yes',
      exportGoodsIntent: ExportGoodsIntent.goodsExportedToBeSoldForBusiness,
      exportUserTypeTrader: 'NE',
      tradeDateDay: '01',
      tradeDateMonth: '01',
      tradeDateYear: '2022',
      destinationCountryName: 'Brazil',
      originCountryName: 'England, Scotland and Wales',
      exportTaskStatuses: {
        checkEligibility: TaskStatus.VIEWED,
        checkLicensesAndCertificates: TaskStatus.TO_VIEW,
        checkServicestoRegister: TaskStatus.CANNOT_VIEW_YET,
        checkInformationAndDocuments: TaskStatus.CANNOT_VIEW_YET,
        checkCustomsDeclarations: TaskStatus.CANNOT_VIEW_YET,
      },
    });
  });

  describe('Testing calculateNewTaskStatuses', () => {
    test('It should default the task statuses if it\'s undefined', () => {
      const newStatuses = calculateNewTaskStatuses(undefined, ExportsTasks.checkServicestoRegister, TaskStatus.VIEWED);

      expect(newStatuses.exportTaskStatuses).toEqual({
        checkEligibility: TaskStatus.VIEWED,
        checkLicensesAndCertificates: TaskStatus.TO_VIEW,
        checkServicestoRegister: TaskStatus.VIEWED,
        checkInformationAndDocuments: TaskStatus.CANNOT_VIEW_YET,
        checkCustomsDeclarations: TaskStatus.CANNOT_VIEW_YET,
      });
    });

    test('It should update status without affecting others', () => {
      const newStatuses = calculateNewTaskStatuses(state, ExportsTasks.checkServicestoRegister, TaskStatus.VIEWED);

      expect(newStatuses.exportTaskStatuses).toEqual({
        checkEligibility: TaskStatus.VIEWED,
        checkLicensesAndCertificates: TaskStatus.TO_VIEW,
        checkServicestoRegister: TaskStatus.VIEWED,
        checkInformationAndDocuments: TaskStatus.CANNOT_VIEW_YET,
        checkCustomsDeclarations: TaskStatus.CANNOT_VIEW_YET,
      });
    });

    test('It should set all the subsequent tasks to TO_VIEW when licenses are viewed', () => {
      const newStatuses = calculateNewTaskStatuses(state, ExportsTasks.checkLicensesAndCertificates, TaskStatus.VIEWED);

      expect(newStatuses.exportTaskStatuses).toEqual({
        checkEligibility: TaskStatus.VIEWED,
        checkLicensesAndCertificates: TaskStatus.VIEWED,
        checkServicestoRegister: TaskStatus.TO_VIEW,
        checkInformationAndDocuments: TaskStatus.TO_VIEW,
        checkCustomsDeclarations: TaskStatus.TO_VIEW,
      });
    });
  });
});

export default calcExportStatus;
