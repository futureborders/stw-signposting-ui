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

import { TaskStatus } from '../interfaces/enums.interface';
import { Tasks } from '../features/common/taskList/interface';
import { Params } from '../interfaces/params.interface';

export const getDefaultTaskStatuses = (hasNoMeasures?: boolean): any => {
  if (hasNoMeasures) {
    return {
      checkEligibility: TaskStatus.VIEWED,
      checkLicensesAndCertificates: TaskStatus.NOT_REQUIRED,
      checkServicestoRegister: TaskStatus.TO_VIEW,
      checkInformationAndDocuments: TaskStatus.TO_VIEW,
      checkCustomsDeclarations: TaskStatus.TO_VIEW,
      checkCustomsDutyAndImportVat: TaskStatus.TO_VIEW,
      exportResponsibleForDeclaringGoods: TaskStatus.TO_VIEW,
    };
  }
  return {
    checkEligibility: TaskStatus.VIEWED,
    checkLicensesAndCertificates: TaskStatus.TO_VIEW,
    checkServicestoRegister: TaskStatus.CANNOT_VIEW_YET,
    checkInformationAndDocuments: TaskStatus.CANNOT_VIEW_YET,
    checkCustomsDeclarations: TaskStatus.CANNOT_VIEW_YET,
    checkCustomsDutyAndImportVat: TaskStatus.CANNOT_VIEW_YET,
    exportResponsibleForDeclaringGoods: TaskStatus.CANNOT_VIEW_YET,
  };
};

export const calculateNewTaskStatuses = (state: Params | undefined, taskToUpdate: Tasks, newStatus: TaskStatus): Params => {
  const taskStatuses = state?.taskStatuses || getDefaultTaskStatuses();

  const newTaskStatuses = { ...taskStatuses };

  newTaskStatuses[taskToUpdate] = newStatus;

  if (taskStatuses.checkLicensesAndCertificates !== TaskStatus.VIEWED && newTaskStatuses.checkLicensesAndCertificates === TaskStatus.VIEWED) {
    newTaskStatuses.checkServicestoRegister = TaskStatus.TO_VIEW;
    newTaskStatuses.checkInformationAndDocuments = TaskStatus.TO_VIEW;
    newTaskStatuses.checkCustomsDeclarations = TaskStatus.TO_VIEW;
    newTaskStatuses.checkCustomsDutyAndImportVat = TaskStatus.TO_VIEW;
    newTaskStatuses.exportResponsibleForDeclaringGoods = TaskStatus.TO_VIEW;
  }

  return { ...state, taskStatuses: newTaskStatuses };
};

export const checkSessionStateMatchesCurrentState = (state: Params, sessionState: Params): boolean => {
  // check user has not started a new import, invalidating a previous session
  if (
    sessionState !== undefined
    && state.commodity === sessionState.commodity
    && state.destinationCountry === sessionState.destinationCountry
    && state.originCountry === sessionState.originCountry
    && state.additionalCode === sessionState.additionalCode
  ) { return true; }
  return false;
};

export const calcStatus = (state: Params, sessionState: Params, hasNoMeasures: boolean): Params => {
  const newState: Params = { ...state };

  if (sessionState?.taskStatuses && checkSessionStateMatchesCurrentState(newState, sessionState)) {
    newState.taskStatuses = sessionState.taskStatuses;
  } else {
    newState.taskStatuses = getDefaultTaskStatuses(hasNoMeasures);
  }

  return newState;
};
