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

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request } from 'express';
import { additionalQuestions } from './additionalQuestions.models';
import { UserType, TypeOfTrade, ImportUserTypeTrader } from '../interfaces/enums.interface';

import {
  measureOptionTypeOrder,
  MeasureOptionType,
  MeasureOptionSubtype,
  Measures, MeasuresEntity, MeasureOptionsEntity, OptionsEntity,
} from '../interfaces/measure.interface';

import { markdown } from '../utils/markdown';
import { decode } from '../utils/decode';
import { convertHtmlLinkToMarkdown } from '../utils/convertHtmlLinkToMarkdown';

import { display999lHeader, display999lDescription, display999lNoMargin } from '../utils/display999lFragment';

const orderMeasureTypeOptions = (
  firstMeasureOption: OptionsEntity,
  secondMeasureOption: OptionsEntity,
): number => {
  if (
    firstMeasureOption.certificateCode
    && secondMeasureOption.certificateCode
    && measureOptionTypeOrder.indexOf(firstMeasureOption.type) === measureOptionTypeOrder.indexOf(secondMeasureOption.type)
  ) {
    return firstMeasureOption.certificateCode.localeCompare(secondMeasureOption.certificateCode);
  }
  return measureOptionTypeOrder.indexOf(firstMeasureOption.type) - measureOptionTypeOrder.indexOf(secondMeasureOption.type);
};

const order999Llast = (firstMeasureOption: OptionsEntity, secondMeasureOption: OptionsEntity): number => (secondMeasureOption.certificateCode === '999L' ? -1 : 0);

const shouldDisplayMeasureOptionHeading = (measureOptionsType: MeasureOptionType): boolean => measureOptionsType === MeasureOptionType.MULTI_CERTIFICATE
   || measureOptionsType === MeasureOptionType.THRESHOLD
   || measureOptionsType === MeasureOptionType.THRESHOLD_CERTIFICATE;

const getExceptionsHeadings = (translation: any, exceptionsOnlyLength: number, thresholdsLength: number): string => {
  if (exceptionsOnlyLength === 1 && thresholdsLength === 0) {
    return translation.common.measures.condition;
  } if (exceptionsOnlyLength > 1 && thresholdsLength === 0) {
    return translation.common.measures.multipleConditions(translation.common.numbers[exceptionsOnlyLength]);
  }
  return translation.common.measures.exceptions;
};

const getMeasureOptionHeadings = (
  measureOptionsType: MeasureOptionType,
  translation: any,
  exceptionsOnlyLength: number,
  thresholdsLength: number,
): string => `${measureOptionsType === MeasureOptionType.CERTIFICATE ? translation.common.measures.rules : getExceptionsHeadings(translation, exceptionsOnlyLength, thresholdsLength)}`;

const shouldDisplayExceptionHeadings = (
  measureOptionsType: MeasureOptionType,
  translation: any,
  array: OptionsEntity[],
  contentUserType: UserType,
  certificateCode?: string,
): string => {
  const certificates = array.filter((item: any) => item.type === MeasureOptionType.CERTIFICATE);
  const exceptions = array.filter((item: any) => item.type === MeasureOptionType.EXCEPTION);
  const thresholds = array.filter((item: any) => item.type === MeasureOptionType.THRESHOLD_CERTIFICATE || item.type === MeasureOptionType.THRESHOLD);
  const exceptionsOnly = array.filter((item: any) => item.type === MeasureOptionType.EXCEPTION && item.certificateCode !== '999L');
  const headingText = getMeasureOptionHeadings(measureOptionsType, translation, exceptionsOnly.length, thresholds.length);
  const hasOneException = exceptions.length === 1;
  const exceptionHeading = headingText === translation.common.measures.exceptions;
  const singleConditionHeading = headingText === translation.common.measures.condition;
  const has999L = certificateCode === '999L';

  return ((headingText === translation.common.measures.exceptions) && (contentUserType === UserType.nonDeclaringTrader) && has999L && hasOneException)
    || (measureOptionsType === MeasureOptionType.EXCEPTION && certificateCode !== exceptions[0].certificateCode)
    || (measureOptionsType === MeasureOptionType.CERTIFICATE && certificateCode !== certificates[0].certificateCode)
    || (hasOneException && exceptionHeading && has999L)
    || (hasOneException && singleConditionHeading && has999L)
    ? '' : `<h3 class="govuk-heading-m">${headingText}</h3>`;
};

const showMultiCertificatePrefix = (
  measureOptions: OptionsEntity,
  translation: any,
): string => (measureOptions.type === MeasureOptionType.MULTI_CERTIFICATE ? `<p class="govuk-body">${translation.common.measures.multiCertificatePrefix}</p>` : '');

export const displaySubtypeHeader = (
  translation: any,
  hasMultipleThresholds: boolean,
  thresholds: OptionsEntity[],
): string => {
  const { thresholdConditionsApply, measureOptionSubtype } = translation.common.measures;
  if (hasMultipleThresholds) {
    return thresholdConditionsApply;
  } if ((thresholds[0].subtype === MeasureOptionSubtype.PRICE_PER_UNIT_BASED) && thresholds[0].unit) {
    return measureOptionSubtype.PRICE_PER_UNIT_BASED(thresholds[0].unit);
  } if (thresholds[0].subtype) {
    return measureOptionSubtype[thresholds[0].subtype];
  }
  return '';
};

const displayMeasureOptionHeader = (
  measureOptions: OptionsEntity,
  array: OptionsEntity[],
  index: number,
  translation: any,
  contentUserType: UserType,
): string => (shouldDisplayMeasureOptionHeading(measureOptions.type)
  ? ''
  : shouldDisplayExceptionHeadings(measureOptions.type, translation, array, contentUserType, String(measureOptions.certificateCode)));

const displayMeasureOptions = (
  measureOptions: OptionsEntity,
  array: OptionsEntity[],
  index: number,
  translation: any,
  hasMultipleMeasureOptions: boolean,
  contentUserType: UserType,
): string => {
  const thresholds = array.filter((item: any) => item.type === MeasureOptionType.THRESHOLD);
  const exceptions = array.filter((item: any) => item.type === MeasureOptionType.EXCEPTION);
  const hasMultipleThresholds = thresholds.length > 1;
  const firstThreshold = array[index] === thresholds[0];
  const hasOnlyOne999l = exceptions.length === 1;
  const noMarginBottom = ():string => display999lNoMargin(String(measureOptions.certificateCode), 'govuk-!-margin-bottom-0');
  const header = ():string => (measureOptions.certificateCode ? display999lHeader(measureOptions.certificateCode, translation, hasOnlyOne999l) : displaySubtypeHeader(translation, hasMultipleThresholds, thresholds));
  const contentBlock = ():string => `${showMultiCertificatePrefix(measureOptions, translation)}${markdown.render(convertHtmlLinkToMarkdown(display999lDescription(String(measureOptions.certificateCode), measureOptions.descriptionOverlay)), { translation, isTranslated: false })}`;

  if ((contentUserType === UserType.nonDeclaringTrader) || (hasMultipleThresholds && !firstThreshold)) {
    return contentBlock();
  }
  return `<h4 class="govuk-heading-s ${noMarginBottom()}">${header()}</h4>${contentBlock()}`;
};

export const getConditions = (
  measureOptionsLength: number,
  translation: any,
  emptyMultipleMeasureOptions: boolean,
  measure: MeasuresEntity,
  index: number,
): string => {
  const measureHas999L = measure.measureOptions && measure.measureOptions[index]?.options?.some((option: any) => option.certificateCode === '999L');

  if (measureOptionsLength > 1 && !measureHas999L) {
    return `<h3 class="govuk-heading-m">${translation.common.measures.multipleConditions(translation.common.numbers[measureOptionsLength])}</h3>`;
  }

  if (measureOptionsLength > 2 && measureHas999L) {
    return `<h3 class="govuk-heading-m">${translation.common.measures.multipleConditions(translation.common.numbers[measureOptionsLength - 1])}</h3>`;
  }

  if (measureOptionsLength && emptyMultipleMeasureOptions) {
    return `<h3 class="govuk-heading-m">${translation.common.measures.rules}</h3>`;
  }

  if (measureOptionsLength) {
    return `<h3 class="govuk-heading-m">${translation.common.measures.condition}</h3>`;
  }

  return '';
};

export const addH2Heading = (text: string): string => (text && text.charAt(0) !== '#' ? `## ${text}` : text);

export const has999l = (measures: MeasuresEntity[]): boolean => (measures ? measures.filter((measure: any) => measure.measureOptions?.[0].options.some((option: any) => option.certificateCode === '999L')).length > 0 : false);

export const renderFollowRules = (
  measure: MeasuresEntity,
  translation: any,
  hasMultipleMeasureOptions: boolean,
  tradeType: TypeOfTrade,
): string => (measure.measureOptions && hasMultipleMeasureOptions ? `<p class="govuk-body">${tradeType === TypeOfTrade.import ? translation.common.measures.followRules : translation.common.measures.followRulesExport}</p>` : '');

const showCaption = (
  measure: MeasuresEntity,
  measureOptionsLength: number,
  translation: any,
  hasMultipleMeasureOptions: boolean,
  emptyMultipleMeasureOptions: boolean,
  tradeType: TypeOfTrade,
  index: number,
): string => (hasMultipleMeasureOptions ? getConditions(measureOptionsLength, translation, emptyMultipleMeasureOptions, measure, index) : `<p class="govuk-body">${tradeType === TypeOfTrade.import ? translation.common.measures.followRules : translation.common.measures.followRulesExport}</p>`);

const getMeasuresBlock = (
  measureOption: MeasuresEntity[],
  translation: any,
  contentUserType: UserType,
  tradeType: TypeOfTrade,
): string => measureOption.map((measure: MeasuresEntity) => {
  const multipleMeasureOptions: any = measure.measureOptions?.find((options: any) => options.options)?.options;
  const emptyMultipleMeasureOptions = multipleMeasureOptions ? (Object.keys(multipleMeasureOptions).length === 0) : false;
  const hasMultipleMeasureOptions: boolean = measure.measureOptions ? measure.measureOptions.length > 1 : false;
  return `
    ${markdown.render(addH2Heading(decode(measure.descriptionOverlay)), { translation, isTranslated: false })}
    ${renderFollowRules(measure, translation, hasMultipleMeasureOptions, tradeType)}
     ${measure?.measureOptions ? measure.measureOptions
    .map((measureOptions: MeasureOptionsEntity, idx: number) => `
      ${showCaption(measure, Object.values(measureOptions.options as OptionsEntity[]).length, translation, hasMultipleMeasureOptions, emptyMultipleMeasureOptions, tradeType, idx)}
      ${measureOptions.options && measureOptions.options.length ? measureOptions.options
    .sort(orderMeasureTypeOptions).sort(order999Llast)
    .map((options: OptionsEntity, index: number, array: OptionsEntity[]) => `
        ${!hasMultipleMeasureOptions ? displayMeasureOptionHeader(options, array, index, translation, contentUserType) : ''}
        ${displayMeasureOptions(options, array, index, translation, hasMultipleMeasureOptions, contentUserType)}
    `).join('') : ''}
  `).join('') : ''}
 `;
}).join('');

const filterMeasuresByAdditionalQuestions = (measures: any, req: Request, translation: any): any[] => {
  const measuresFiltered = measures.map((measure: any) => {
    const question = additionalQuestions[measure.id]?.(measure.measureOptions[0].options, translation);
    const optionSelected = question?.options.find((option: any) => option.value.includes(req.query[measure.id]));
    if (optionSelected) {
      const measureFiltered = {
        ...measure,
        measureOptions: [
          {
            options: measure.measureOptions[0].options.filter((option: any) => optionSelected.result.includes(option.certificateCode)),
          },
        ],
      };
      return measureFiltered;
    }
    return measure;
  });
  return measuresFiltered;
};

export const sortFilteredMeasuresByMeasureId = (measures: any) => measures.sort((firstMeasure: MeasuresEntity, secondMeasure: MeasuresEntity) => Number(firstMeasure.id) - Number(secondMeasure.id));

export const getMeasuresAsHtml = (
  data: Measures,
  translation: any,
  contentUserType: UserType,
  req: Request,
  tradeType: TypeOfTrade,
): string => {
  const { measures } = data;
  const filteredMeasures = filterMeasuresByAdditionalQuestions(measures, req, translation);
  const sortedFilteredMeasuresByMeasureId = sortFilteredMeasuresByMeasureId(filteredMeasures);
  return getMeasuresBlock(sortedFilteredMeasuresByMeasureId, translation, contentUserType, tradeType);
};

export const getUserType = (
  userTypeTrader: string,
  importDeclarations: string,
): UserType => {
  if (userTypeTrader === ImportUserTypeTrader.no) {
    return UserType.agent;
  } if (userTypeTrader === ImportUserTypeTrader.yes && importDeclarations === 'no') {
    return UserType.nonDeclaringTrader;
  }
  return UserType.declaringTrader;
};

export default getMeasuresAsHtml;
