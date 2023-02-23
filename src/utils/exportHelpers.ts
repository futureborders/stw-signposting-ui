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

import { TaskStatus } from '../interfaces/enums.interface';
import { ExportsParams, ExportsTasks } from '../interfaces/exports.interface';

export const getDefaultTaskStatuses = (hasNoMeasures?: boolean): any => {
  if (hasNoMeasures) {
    return {
      checkEligibility: TaskStatus.VIEWED,
      checkLicensesAndCertificates: TaskStatus.NOT_REQUIRED,
      checkServicestoRegister: TaskStatus.TO_VIEW,
      checkInformationAndDocuments: TaskStatus.TO_VIEW,
      checkCustomsDeclarations: TaskStatus.TO_VIEW,
    };
  }
  return {
    checkEligibility: TaskStatus.VIEWED,
    checkLicensesAndCertificates: TaskStatus.TO_VIEW,
    checkServicestoRegister: TaskStatus.CANNOT_VIEW_YET,
    checkInformationAndDocuments: TaskStatus.CANNOT_VIEW_YET,
    checkCustomsDeclarations: TaskStatus.CANNOT_VIEW_YET,
  };
};

export const calculateNewTaskStatuses = (state: ExportsParams | undefined, taskToUpdate: ExportsTasks, newStatus: TaskStatus): ExportsParams => {
  const taskStatuses = state?.exportTaskStatuses || getDefaultTaskStatuses();

  const newTaskStatuses = { ...taskStatuses };

  newTaskStatuses[taskToUpdate] = newStatus;

  if (taskStatuses.checkLicensesAndCertificates !== TaskStatus.VIEWED && newTaskStatuses.checkLicensesAndCertificates === TaskStatus.VIEWED) {
    newTaskStatuses.checkServicestoRegister = TaskStatus.TO_VIEW;
    newTaskStatuses.checkInformationAndDocuments = TaskStatus.TO_VIEW;
    newTaskStatuses.checkCustomsDeclarations = TaskStatus.TO_VIEW;
  }

  return { ...state, exportTaskStatuses: newTaskStatuses };
};

export const checkSessionStateMatchesCurrentState = (state: ExportsParams, sessionState: ExportsParams): boolean => {
  // check user has not started a new import, invalidating a previous session
  if (sessionState !== undefined && state.commodity === sessionState.commodity && state.destinationCountry === sessionState.destinationCountry && state.originCountry === sessionState.originCountry) { return true; }
  return false;
};

export const calcExportStatus = (state: ExportsParams, sessionState: ExportsParams, hasNoMeasures: boolean): ExportsParams => {
  const newState: ExportsParams = { ...state };

  if (sessionState?.exportTaskStatuses && checkSessionStateMatchesCurrentState(newState, sessionState)) {
    newState.exportTaskStatuses = sessionState.exportTaskStatuses;
  } else {
    newState.exportTaskStatuses = getDefaultTaskStatuses(hasNoMeasures);
  }

  return newState;
};
