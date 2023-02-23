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

export interface Key {
  text: string;
  classes: string;
}
export interface Value {
  text: string;
}

export interface Attributes {
   id: string;
 }

export interface Items {
  href: string;
  text: string;
  visuallyHiddenText: string;
  attributes: Attributes;
}

export interface Actions {
  items?: (Items)[] | null;
}

export interface CheckYourAnswersRows {
  id?: string | null;
  key: Key;
  value: Value;
  actions: Actions;
}

export interface CheckYourAnswersData {
  rows?: (CheckYourAnswersRows)[] | null;
}

export interface StringsMappingItems {
  question: string;
  answer: string;
  route: string;
}

export interface StringsMapping {
  [index: string]: StringsMappingItems;
}

export interface CommodityData {
  id: string;
  description: string;
  sub?: (string)[] | null;
}
