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

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request } from 'express';
import { additionalQuestions } from './additionalQuestions.models';
import { UserType, TypeOfTrade } from '../interfaces/enums.interface';

import {
  measureOptionTypeOrder,
  MeasureOptionType,
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
  if (measureOptionTypeOrder.indexOf(firstMeasureOption.type) === measureOptionTypeOrder.indexOf(secondMeasureOption.type)) {
    return firstMeasureOption.certificateCode?.localeCompare(String(secondMeasureOption.certificateCode));
  }
  return measureOptionTypeOrder.indexOf(firstMeasureOption.type) - measureOptionTypeOrder.indexOf(secondMeasureOption.type);
};

const order999Llast = (firstMeasureOption: OptionsEntity, secondMeasureOption: OptionsEntity): number => (secondMeasureOption.certificateCode === '999L' ? -1 : 0);

const shouldDisplayMeasureOptionHeading = (
  measureOptionsType: MeasureOptionType,
  array: OptionsEntity[],
  index: number,
): boolean => {
  const measureOptionsTypesArray = array[index]?.type;
  return measureOptionsType === array[index - 1]?.type
   || measureOptionsTypesArray === MeasureOptionType.MULTI_CERTIFICATE
   || measureOptionsTypesArray === MeasureOptionType.THRESHOLD
   || measureOptionsTypesArray === MeasureOptionType.THRESHOLD_CERTIFICATE;
};

const getMeasureOptionHeadings = (
  measureOptionsType: MeasureOptionType,
  translation: any,
): string => `${measureOptionsType === MeasureOptionType.CERTIFICATE ? translation.page.manageThisTrade.rules : translation.page.manageThisTrade.exceptions}`;

const shouldDisplayExceptionHeadings = (
  measureOptionsType: MeasureOptionType,
  translation: any,
  array: OptionsEntity[],
  contentUserType: UserType,
  certificateCode: string,
): string => {
  const headingText = getMeasureOptionHeadings(measureOptionsType, translation);
  const exceptions = array.filter((item: any) => item.type === MeasureOptionType.EXCEPTION);

  return (headingText === translation.page.manageThisTrade.exceptions)
  && (contentUserType === UserType.nonDeclaringTrader)
  && (certificateCode === '999L')
  && (exceptions.length === 1) ? '' : `<h3 class="govuk-heading-m">${headingText}</h3>`;
};

const showMultiCertificatePrefix = (
  measureOptions: OptionsEntity,
  translation: any,
): string => (measureOptions.type === MeasureOptionType.MULTI_CERTIFICATE ? `<p class="govuk-body">${translation.page.manageThisTrade.multiCertificatePrefix}</p>` : '');

const displayMeasureOptionHeader = (
  measureOptions: OptionsEntity,
  array: OptionsEntity[],
  index: number,
  translation: any,
  contentUserType: UserType,
): string => (shouldDisplayMeasureOptionHeading(measureOptions.type, array, index)
  ? ''
  : shouldDisplayExceptionHeadings(measureOptions.type, translation, array, contentUserType, measureOptions.certificateCode));

const displayMeasureOptions = (
  measureOptions: OptionsEntity,
  array: OptionsEntity[],
  index: number,
  translation: any,
  hasMultipleMeasureOptions: boolean,
  contentUserType: UserType,
): string => `${contentUserType === UserType.nonDeclaringTrader ? '' : `<h4 class="govuk-heading-s ${display999lNoMargin(measureOptions.certificateCode, 'govuk-!-margin-bottom-0')}">${measureOptions.certificateCode ? display999lHeader(measureOptions.certificateCode, translation) : 'n/a'}</h4>`}
  ${showMultiCertificatePrefix(measureOptions, translation)}${markdown.render(convertHtmlLinkToMarkdown(display999lDescription(measureOptions.certificateCode, measureOptions.descriptionOverlay)))}`;

const getConditions = (
  measureOptionsLength: number,
  translation: any,
  emptyMultipleMeasureOptions: boolean,
  measure: MeasuresEntity,
  index: number,
): string => {
  const measureHas999L = measure.measureOptions && measure.measureOptions[index]?.options?.some((option: any) => option.certificateCode === '999L');

  if (measureOptionsLength > 1 && !measureHas999L) {
    return `<h3 class="govuk-heading-m">${translation.page.manageThisTrade.multipleConditions(translation.common.numbers[measureOptionsLength])}</h3>`;
  }

  if (measureOptionsLength > 2 && measureHas999L) {
    return `<h3 class="govuk-heading-m">${translation.page.manageThisTrade.multipleConditions(translation.common.numbers[measureOptionsLength - 1])}</h3>`;
  }

  if (measureOptionsLength && emptyMultipleMeasureOptions) {
    return `<h3 class="govuk-heading-m">${translation.page.manageThisTrade.rules}</h3>`;
  }

  if (measureOptionsLength) {
    return `<h3 class="govuk-heading-m">${translation.page.manageThisTrade.condition}</h3>`;
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
): string => (measure.measureOptions && hasMultipleMeasureOptions ? `<p class="govuk-body">${tradeType === TypeOfTrade.import ? translation.page.manageThisTrade.followRules : translation.page.manageThisTrade.followRulesExport}</p>` : '');

const showCaption = (
  measure: MeasuresEntity,
  measureOptionsLength: number,
  translation: any,
  hasMultipleMeasureOptions: boolean,
  emptyMultipleMeasureOptions: boolean,
  tradeType: TypeOfTrade,
  index: number,
): string => (hasMultipleMeasureOptions ? getConditions(measureOptionsLength, translation, emptyMultipleMeasureOptions, measure, index) : `<p class="govuk-body">${tradeType === TypeOfTrade.import ? translation.page.manageThisTrade.followRules : translation.page.manageThisTrade.followRulesExport}</p>`);

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
    ${tradeType === TypeOfTrade.import ? markdown.render(decode(measure.descriptionOverlay)) : `${markdown.render(addH2Heading(decode(measure.descriptionOverlay)))}`}
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

export const getMeasuresAsHtml = (
  data: Measures,
  translation: any,
  contentUserType: UserType,
  req: Request,
  tradeType: TypeOfTrade,
): string => {
  const { measures } = data;
  const filteredMeasures = filterMeasuresByAdditionalQuestions(measures, req, translation);
  return getMeasuresBlock(filteredMeasures, translation, contentUserType, tradeType);
};

export const getUserType = (
  userTypeTrader: string,
  importDeclarations: string,
): UserType => {
  if (userTypeTrader === 'false') {
    return UserType.agent;
  } if (userTypeTrader === 'true' && importDeclarations === 'no') {
    return UserType.nonDeclaringTrader;
  }
  return UserType.declaringTrader;
};

export default getMeasuresAsHtml;
