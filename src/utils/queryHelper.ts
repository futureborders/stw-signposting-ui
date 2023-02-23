/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
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

/* eslint-disable no-restricted-globals */

import { Request } from 'express';
import { handleYear } from './validateImportDate';
import { ImportDate } from '../interfaces/importDate.interface';
import { decode } from './decode';

export const handleDoubleDigits = (digit: any): string => {
  if (isNaN(digit)) {
    return digit;
  } if (digit) {
    return digit.padStart(2, '0');
  }
  return '';
};

export const trimDateInput = (input: string): string => decode(input).replace(/\W/g, '');

export const getImportDateFromQuery = (req: Request, isPost?: true): ImportDate => {
  // TODO: refactor imports date to use tradeDate

  let dateDay; let dateMonth; let
    dateYear;
  let tradeDateDay; let tradeDateMonth; let
    tradeDateYear;

  if (req.query.tradeType === 'export') {
    if (isPost) {
      tradeDateDay = req.body.tradeDateDay;
      tradeDateMonth = req.body.tradeDateMonth;
      tradeDateYear = req.body.tradeDateYear;
    } else {
      tradeDateDay = req.query.tradeDateDay;
      tradeDateMonth = req.query.tradeDateMonth;
      tradeDateYear = req.query.tradeDateYear;
    }
    dateDay = tradeDateDay;
    dateMonth = tradeDateMonth;
    dateYear = tradeDateYear;
  } else {
    const { importDateDay, importDateMonth, importDateYear } = req.query;
    dateDay = importDateDay;
    dateMonth = importDateMonth;
    dateYear = importDateYear;
  }

  return {
    day: handleDoubleDigits(trimDateInput(dateDay)),
    month: handleDoubleDigits(trimDateInput(dateMonth)),
    year: handleYear(trimDateInput(dateYear)),
  };
};

export const updateQueryParams = (queryParams: string, newParams: any): string => {
  const params = new URLSearchParams(queryParams);
  Object.keys(newParams).forEach((key:any) => {
    params.set(String(key), `${encodeURIComponent(newParams[key])}`);
  });
  return params.toString();
};

export const getParams = (params: any) => `?${new URLSearchParams(params).toString()}`;
