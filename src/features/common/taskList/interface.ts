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

import { TaskStatus } from '../../../interfaces/enums.interface';
import { Route } from '../../../interfaces/routes.interface';

export enum Tasks {
  checkEligibility = 'checkEligibility',
  checkLicensesAndCertificates = 'checkLicensesAndCertificates',
  checkServicestoRegister = 'checkServicestoRegister',
  checkInformationAndDocuments = 'checkInformationAndDocuments',
  checkCustomsDeclarations = 'checkCustomsDeclarations',
  checkClearSecondBorder = 'checkClearSecondBorder',
  checkCustomsDutyAndImportVat = 'checkCustomsDutyAndImportVat',
}
export type TaskStatuses = {
  [key in Tasks]?: TaskStatus;
}

export interface TaskListItemLinks {
  route: string;
  state: TaskStatus;
}

export interface TaskListItems {
  desc: string;
  href?: Route | string;
  state: TaskStatus | undefined;
}

export default TaskStatuses;
