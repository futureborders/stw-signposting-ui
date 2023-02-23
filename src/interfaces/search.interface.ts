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

export interface HeaderRowsEntity {
  html: string;
  type: string;
  ['parent_sid']: number | null;
  sid: number;
  level: number;
}

export type HeaderRows = (HeaderRowsEntity)[] | null;

export interface ResultsRows {
  heading?: HeaderRows;
  commodity?: HeaderRows;
}

export interface SearchResultsRowsEntity {
  html: string;
  classes?: string | null;
}

export type SearchResultsRows = (SearchResultsRowsEntity)[] | null;

export interface Breadcrumbs {
  sid?: number | null;
  text?: string | null;
  href?: string | null;
}

export default ResultsRows;
