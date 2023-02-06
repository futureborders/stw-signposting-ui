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

export interface ImportDate {
  day: string;
  month: string;
  year: string;
}

export interface ImportDateErrorEntity {
 id: string;
 message: string;
}

export interface ImportDateError {
  missingDay?: ImportDateErrorEntity;
  missingMonth?: ImportDateErrorEntity;
  missingYear?: ImportDateErrorEntity;
  missingDate?: ImportDateErrorEntity;
  invalidDate?: ImportDateErrorEntity;
  invalidDay?: ImportDateErrorEntity;
  invalidMonth?: ImportDateErrorEntity;
  invalidYear?: ImportDateErrorEntity;
  dateInThePast?: ImportDateErrorEntity;
  dateWithinYear?: ImportDateErrorEntity;
  dayNotNumber?: ImportDateErrorEntity;
  monthNotNumber?: ImportDateErrorEntity;
  yearNotNumber?: ImportDateErrorEntity;
  missingDayMonth?: ImportDateErrorEntity;
  missingDayYear?: ImportDateErrorEntity;
  missingMonthYear?: ImportDateErrorEntity;
}

export interface DateErrors {
  day: boolean;
  month: boolean;
  year: boolean;
}
