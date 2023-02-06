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

export enum MeasureOptionType {
  CERTIFICATE = 'CERTIFICATE',
  MULTI_CERTIFICATE = 'MULTI_CERTIFICATE',
  EXCEPTION = 'EXCEPTION',
  THRESHOLD = 'THRESHOLD',
  THRESHOLD_CERTIFICATE = 'THRESHOLD_CERTIFICATE',
}

export enum MeasureOptionSubtype {
  PRICE_BASED = 'PRICE_BASED',
  VOLUME_BASED = 'VOLUME_BASED',
  UNIT_BASED = 'UNIT_BASED',
  WEIGHT_BASED = 'WEIGHT_BASED',
  PRICE_PER_UNIT_BASED = 'PRICE_PER_UNIT_BASED',
}

export const measureOptionTypeOrder = [
  MeasureOptionType.CERTIFICATE,
  MeasureOptionType.MULTI_CERTIFICATE,
  MeasureOptionType.EXCEPTION,
  MeasureOptionType.THRESHOLD,
  MeasureOptionType.THRESHOLD_CERTIFICATE,
];

export interface OptionsEntity {
  certificateCode?: string | null;
  type: MeasureOptionType;
  descriptionOverlay: string;
  subtype?: MeasureOptionSubtype | null;
  unit?: string | null;
  conditionCode?: string | null;
}

export interface MeasureOptionsEntity {
  options?: (OptionsEntity)[] | null;
}

export interface MeasuresEntity {
  id: string;
  measureTypeSeries: string;
  descriptionOverlay: string;
  description: string;
  measureOptions?: (MeasureOptionsEntity)[] | null;
  measureType: string;
}

export interface Measures {
  measures?: (MeasuresEntity)[] | null;
}
