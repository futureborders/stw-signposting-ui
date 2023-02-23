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

import {
  isLeapYear, isAfter, add, isPast, format, parse, isValid,
} from 'date-fns';

import { ImportDateError, DateErrors } from '../interfaces/importDate.interface';

const regExp = /^\d+$/;

export const handleYear = (year: string): string => {
  const yearIsTwoDigits = String(year).length === 2 && year.match(regExp);
  if (!yearIsTwoDigits) {
    return year;
  }
  return `${String((new Date()).getFullYear()).substring(0, 2)}${year}`;
};

const parseDate = (day: string, month: string, year: string) => parse(`${handleYear(year)}-${month}-${day}`, 'yyyy-MM-dd', new Date());

const checkDayValidity = (day: string, month: string, year: string) => {
  const isFeb = Number(month) === 2;
  const leapYear = isLeapYear(parseDate(day, month, year));

  if (
    !day.match(regExp)
    || (isFeb
    && Number(day) > 29
    && leapYear)
    || (isFeb
    && Number(day) > 28
    && !leapYear)
  ) {
    return false;
  }
  const isValidDate: number = new Date(
    Date.parse(`${month}/${day}/${year}`),
  ).getTime();
  return Number.isFinite(isValidDate);
};

const isInThePast = (dateToCompare: Date): boolean => isPast(add(dateToCompare, { days: 1 }));

const isWithinYear = (dateToCompare: Date): boolean => isAfter(dateToCompare, add(new Date(), { years: 1 }));

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const validateImportDate = (importDate: any, translation: any, tradeType?: string): any => {
  const isExportJourney = tradeType === 'export';
  const { day, month, year } = importDate;
  const dateToValidate = parseDate(day, month, year);
  const isDay = day <= 31;
  const isValidMonth = month <= 12;
  const isValidYear = year.length !== 3;
  const isValidDay = checkDayValidity(day, month, year);
  const isValidDate = isValid(dateToValidate);
  const dayNotNumber = !day.match(regExp);
  const monthNotNumber = !month.match(regExp);
  const yearNotNumber = !year.match(regExp);

  const importsTranslation = translation.page.importDate;
  const exportsTranslation = translation.page.exportGoodsArrivalDate;

  let { errorInvalidDate } = importsTranslation;
  let { errorMissingDate } = importsTranslation;
  let { errorMissingDay } = importsTranslation;
  let { errorMissingMonth } = importsTranslation;
  let { errorMissingYear } = importsTranslation;
  let { errorMissingDayMonth } = importsTranslation;
  let { errorMissingDayYear } = importsTranslation;
  let { errorMissingMonthYear } = importsTranslation;
  let { errorInvalidDay } = importsTranslation;
  let { errorInvalidMonth } = importsTranslation;
  let { errorInvalidYear } = importsTranslation;
  let { errorDayNotNumber } = importsTranslation;
  let { errorMonthNotNumber } = importsTranslation;
  let { errorYearNotNumber } = importsTranslation;

  if (isExportJourney) {
    errorInvalidDate = exportsTranslation.errorInvalidDate;
    errorMissingDate = exportsTranslation.errorMissingDate;
    errorMissingDay = exportsTranslation.errorMissingDay;
    errorMissingMonth = exportsTranslation.errorMissingMonth;
    errorMissingYear = exportsTranslation.errorMissingYear;
    errorMissingDayMonth = exportsTranslation.errorMissingDayMonth;
    errorMissingDayYear = exportsTranslation.errorMissingDayYear;
    errorMissingMonthYear = exportsTranslation.errorMissingMonthYear;
    errorInvalidDay = exportsTranslation.errorInvalidDay;
    errorInvalidMonth = exportsTranslation.errorInvalidMonth;
    errorInvalidYear = exportsTranslation.errorInvalidYear;
    errorDayNotNumber = exportsTranslation.errorDayNotNumber;
    errorMonthNotNumber = exportsTranslation.errorMonthNotNumber;
    errorYearNotNumber = exportsTranslation.errorYearNotNumber;
  }

  const importDateErrorMessage: ImportDateError = {
    missingDay: { id: 'missingDay', message: errorMissingDay },
    missingMonth: { id: 'missingMonth', message: errorMissingMonth },
    missingYear: { id: 'missingYear', message: errorMissingYear },
    missingDate: { id: 'missingDate', message: errorMissingDate },
    missingDayMonth: { id: 'missingDayMonth', message: errorMissingDayMonth },
    missingDayYear: { id: 'missingDayYear', message: errorMissingDayYear },
    missingMonthYear: { id: 'missingMonthYear', message: errorMissingMonthYear },
    invalidDate: { id: 'invalidDate', message: errorInvalidDate },
    invalidDay: { id: 'invalidDay', message: errorInvalidDay },
    invalidMonth: { id: 'invalidMonth', message: errorInvalidMonth },
    invalidYear: { id: 'invalidYear', message: errorInvalidYear },
    dateInThePast: { id: 'dateInThePast', message: translation.page.importDate.errorDateInThePast },
    dateWithinYear: { id: 'dateWithinYear', message: translation.page.importDate.errorDateWithinYear(`${format(add(new Date(), { years: 1 }), 'd LLLL yyyy')}`) },
    dayNotNumber: { id: 'invalidDay', message: errorDayNotNumber },
    monthNotNumber: { id: 'invalidMonth', message: errorMonthNotNumber },
    yearNotNumber: { id: 'invalidYear', message: errorYearNotNumber },
  };

  switch (true) {
    case (!day && !month && !year):
      return importDateErrorMessage.missingDate;
    case (!day && !month):
      return importDateErrorMessage.missingDayMonth;
    case (!day && !year):
      return importDateErrorMessage.missingDayYear;
    case (!month && !year):
      return importDateErrorMessage.missingMonthYear;
    case !day:
      return importDateErrorMessage.missingDay;
    case !month:
      return importDateErrorMessage.missingMonth;
    case !year:
      return importDateErrorMessage.missingYear;
    case dayNotNumber:
      return importDateErrorMessage.dayNotNumber;
    case monthNotNumber:
      return importDateErrorMessage.monthNotNumber;
    case yearNotNumber:
      return importDateErrorMessage.yearNotNumber;
    case (!isDay && !isValidMonth):
      return importDateErrorMessage.invalidDate;
    case !isDay:
      return importDateErrorMessage.invalidDay;
    case !isValidMonth:
      return importDateErrorMessage.invalidMonth;
    case !isValidDay:
      return importDateErrorMessage.invalidDay;
    case !isValidYear:
      return importDateErrorMessage.invalidYear;
    case !isValidDate:
      return importDateErrorMessage.invalidDate;
    case isInThePast(dateToValidate):
      return importDateErrorMessage.dateInThePast;
    case isWithinYear(dateToValidate):
      return importDateErrorMessage.dateWithinYear;
    default:
      return '';
  }
};

export const hasDateErrors = (errorsId: string): DateErrors => {
  const common = ['invalidDate', 'dateWithinYear', 'dateInThePast', 'missingDate'];
  return {
    day: ['invalidDay', 'missingDay', 'missingDayMonth', 'missingDayYear', ...common].includes(errorsId),
    month: ['invalidMonth', 'missingMonth', 'missingMonthYear', 'missingDayMonth', ...common].includes(errorsId),
    year: ['invalidYear', 'missingYear', 'missingDayYear', 'missingMonthYear', ...common].includes(errorsId),
  };
};

export default validateImportDate;
