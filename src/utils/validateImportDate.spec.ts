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

import { add, format } from 'date-fns';
import validateImportDate, { handleYear } from './validateImportDate';
import { handleDoubleDigits } from './queryHelper';
import getTodaysDate from './tests/getTodaysDate';
import { formatDate } from './filters/formatDate';

const translation = {
  page: {
    importDate: {
      errorInvalidDate: 'errorInvalidDate',
      errorDateInThePast: 'errorDateInThePast',
      errorDateWithinYear: (datePlusOneYear: string): string => `Must be before ${datePlusOneYear}`,
      errorMissingDate: 'errorMissingDate',
      errorMissingDay: 'errorMissingDay',
      errorMissingMonth: 'errorMissingMonth',
      errorMissingYear: 'errorMissingYear',
      errorInvalidDay: 'errorInvalidDay',
      errorInvalidMonth: 'errorInvalidMonth',
      errorInvalidYear: 'errorInvalidYear',
      errorDayNotNumber: 'errorDayNotNumber',
      errorMonthNotNumber: 'errorMonthNotNumber',
      errorYearNotNumber: 'errorYearNotNumber',
      errorMissingDayMonth: 'errorMissingDayMonth',
      errorMissingDayYear: 'errorMissingDayYear',
      errorMissingMonthYear: 'errorMissingMonthYear',
    },
    exportGoodsArrivalDate: {
      errorInvalidDate: 'export errorInvalidDate',
      errorDateInThePast: 'export errorDateInThePast',
      errorDateWithinYear: (datePlusOneYear: string): string => `Must be before ${datePlusOneYear}`,
      errorMissingDate: 'export errorMissingDate',
      errorMissingDay: 'export errorMissingDay',
      errorMissingMonth: 'export errorMissingMonth',
      errorMissingYear: 'export errorMissingYear',
      errorInvalidDay: 'export errorInvalidDay',
      errorInvalidMonth: 'export errorInvalidMonth',
      errorInvalidYear: 'export errorInvalidYear',
      errorDayNotNumber: 'export errorDayNotNumber',
      errorMonthNotNumber: 'export errorMonthNotNumber',
      errorYearNotNumber: 'export errorYearNotNumber',
      errorMissingDayMonth: 'export errorMissingDayMonth',
      errorMissingDayYear: 'export errorMissingDayYear',
      errorMissingMonthYear: 'export errorMissingMonthYear',
    },
  },
};

describe('validateImportDate', () => {
  test('It should return errorInvalidDate', () => {
    const importDate = { day: '', month: '', year: '' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorMissingDate);
  });

  test('It should return errorInvalidDate missing day', () => {
    const importDate = { day: '', month: '2', year: '2020' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorMissingDay);
  });

  test('It should return errorInvalidDate missing month', () => {
    const importDate = { day: '1', month: '', year: '2020' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorMissingMonth);
  });

  test('It should return errorInvalidDate missing year', () => {
    const importDate = { day: '1', month: '2', year: '' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorMissingYear);
  });

  test('It should return errorInvalidDate missing day and month', () => {
    const importDate = { day: '', month: '', year: '2020' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorMissingDayMonth);
  });

  test('It should return errorInvalidDate missing day and year', () => {
    const importDate = { day: '', month: '2', year: '' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorMissingDayYear);
  });

  test('It should return errorInvalidDate missing month and year', () => {
    const importDate = { day: '1', month: '', year: '' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorMissingMonthYear);
  });

  test('It should return errorDateInThePast', () => {
    const importDate = { day: '1', month: '1', year: '1999' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorDateInThePast);
  });

  test('It should return errorDateWithinYear in english', () => {
    const importDate = { day: '1', month: '1', year: '2030' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorDateWithinYear(`${format(add(new Date(), { years: 1 }), 'd LLLL yyyy')}`));
  });

  test('It should return errorDateWithinYear in welsh', () => {
    const importDate = { day: '1', month: '1', year: '2030' };
    const error = validateImportDate(importDate, translation, 'import', 'cy');
    const date = add(new Date(), { years: 1 });
    const oneYearFromToday = {
      day: String(date.getDate()),
      month: String(date.getMonth() + 1),
      year: String(date.getFullYear()),
    };
    expect(error.message).toEqual(translation.page.importDate.errorDateWithinYear(formatDate(oneYearFromToday, 'cy')));
  });

  test('It should return errorInvalidMonth', () => {
    const importDate = { day: '2', month: '28', year: '2021' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorInvalidMonth);
  });

  test('It should return errorInvalidDay', () => {
    const importDate = { day: '29', month: '02', year: '2022' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorInvalidDay);
  });

  test('It should return errorDayNotNumber', () => {
    const importDate = { day: '1,', month: '2,', year: '2022' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorDayNotNumber);
  });

  test('It should return errorDayNotNumber', () => {
    const importDate = { day: '1.', month: '2.', year: '2022' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorDayNotNumber);
  });

  test('It should return errorMonthNotNumber', () => {
    const importDate = { day: '1', month: 'xx', year: '2022' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorMonthNotNumber);
  });

  test('It should return errorYearNotNumber', () => {
    const importDate = { day: '1', month: '2', year: 'xx' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorYearNotNumber);
  });

  test('It should return errorYearNotNumber for export', () => {
    const importDate = { day: '1', month: '2', year: 'xx' };
    const error = validateImportDate(importDate, translation, 'export');
    expect(error.message).toEqual(translation.page.exportGoodsArrivalDate.errorYearNotNumber);
  });

  test('It should return errorInvalidDate on an invalid date', () => {
    const importDate = { day: '31', month: '11', year: '2022' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorInvalidDate);
  });

  test('It should return errorInvalidDate on an invalid day and month', () => {
    const importDate = { day: '40', month: '14', year: '2022' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorInvalidDate);
  });

  test('It should return errorInvalidDate on an invalid day', () => {
    const importDate = { day: '100', month: '2', year: '2022' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorInvalidDay);
  });

  test('It should return errorInvalidMonth on an invalid month', () => {
    const importDate = { day: '1', month: '100', year: '2022' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorInvalidMonth);
  });

  test('It should return errorInvalidDate on an invalid year', () => {
    const importDate = { day: '1', month: '2', year: '300' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorInvalidYear);
  });

  test('It should return undefined on an valid date', () => {
    const importDate = { day: getTodaysDate.day, month: getTodaysDate.month, year: getTodaysDate.year };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(undefined);
  });

  test('It should return errorInvalidDate on an invalid year', () => {
    const importDate = { day: '1', month: '2', year: '0' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorInvalidYear);
  });

  test('It should return errorInvalidDate on an invalid year', () => {
    const importDate = { day: '1', month: '2', year: '20222' };
    const error = validateImportDate(importDate, translation, 'import');
    expect(error.message).toEqual(translation.page.importDate.errorInvalidYear);
  });
});

describe('handleYear', () => {
  test('It should return year 2022', () => {
    expect(handleYear('22')).toEqual('2022');
  });
  test('It should return year 2001', () => {
    expect(handleYear('01')).toEqual('2001');
  });
  test('It should return year 1999', () => {
    expect(handleYear('1999')).toEqual('1999');
  });
  test('It should return year 1', () => {
    expect(handleYear('1')).toEqual('1');
  });
});

describe('handleDoubleDigits', () => {
  test('It should return 01', () => {
    expect(handleDoubleDigits('1')).toEqual('01');
  });
  test('It should return 10', () => {
    expect(handleDoubleDigits('10')).toEqual('10');
  });
  test('It should return ""', () => {
    expect(handleDoubleDigits('')).toEqual('');
  });
  test('It should return a', () => {
    expect(handleDoubleDigits('a')).toEqual('a');
  });
  test('It should return 1,', () => {
    expect(handleDoubleDigits('1,')).toEqual('1,');
  });
  test('It should return an empty string', () => {
    expect(handleDoubleDigits('')).toEqual('');
  });
});
