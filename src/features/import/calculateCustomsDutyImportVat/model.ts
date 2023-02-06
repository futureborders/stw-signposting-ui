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

import {
  TariffAndTaxesData, TariffAndTaxesRows, TariffAndTaxesHeaders,
} from './interface';

import { notTranslatedOject } from '../../../utils/filters/notTranslated';

export const getTariffAndTaxesData = (data: any, translation: any): TariffAndTaxesData => {
  const rowsTariffs: TariffAndTaxesRows[] = [];
  const rowsTaxes: TariffAndTaxesRows[] = [];
  const setLangAttribute = notTranslatedOject(translation);

  const hasEmptyColumn = (table: string, column: string) => !Object.values(data.data[table]).some((x: any) => x?.[column] !== null && x?.[column] !== undefined);

  const headers = (table: string) => {
    const headersQuota = {
      * [Symbol.iterator]() {
        if (!hasEmptyColumn(table, 'quota')) {
          yield {
            text: translation.page.calculateCustomsDutyImportVat.quota,
            classes: 'govuk-!-width-one-quarter'
          };
        }
      },
    };

    const headersAdditionalCode = {
      * [Symbol.iterator]() {
        if (!hasEmptyColumn(table, 'additionalCode')) {
          yield {
            text: translation.page.calculateCustomsDutyImportVat.additionalCode,
            classes: 'govuk-!-width-one-quarter',
          };
        }
      },
    };

    return [
      {
        text: translation.page.calculateCustomsDutyImportVat.measureType,
        classes: 'govuk-!-width-one-quarter',
      },
      ...headersQuota,
      ...headersAdditionalCode,
      {
        text: translation.page.calculateCustomsDutyImportVat.value,
        format: 'numeric',
        classes: 'govuk-!-width-one-quarter',
      },
    ];
  };

  const headersTariffs: TariffAndTaxesHeaders[] = headers('tariffs');
  const headersTaxes: TariffAndTaxesHeaders[] = headers('taxes');

  const rows = (item: any, table: string, index: number) => {
    const showGeographicalArea = item?.geographicalArea ? ` for ${item?.geographicalArea?.description}` : '';

    const measureType = item?.geographicalArea?.id === '1011' ? item.text : `${item.text}${showGeographicalArea}`;

    const value = !item.value ? 'Conditional' : item.value;

    const quotaRow = {
      * [Symbol.iterator]() {
        if (!hasEmptyColumn(table, 'quota')) {
          yield {
            html: item?.quota?.number ? item.quota.number : '-',
            attributes: { 'data-id': `${table}-quota-${index}`, ...setLangAttribute },
          };
        }
      },
    };

    const additionalCodeRow = {
      * [Symbol.iterator]() {
        if (!hasEmptyColumn(table, 'additionalCode')) {
          yield {
            html: item.additionalCode?.code ? `<strong>${item.additionalCode?.code}</strong><br />${item.additionalCode?.description}` : '-',
            attributes: { 'data-id': `${table}-additional-code-${index}`, ...setLangAttribute },
          };
        }
      },
    };

    return [
      { html: measureType, attributes: { 'data-id': `${table}-measure-type-${index}`, ...setLangAttribute } },
      ...quotaRow,
      ...additionalCodeRow,
      { html: value, format: 'numeric', attributes: { 'data-id': `${table}-value-${index}`, ...setLangAttribute } },
    ];
  };

  Object.values(data.data.tariffs).forEach((item: any, index: number) => rowsTariffs.push(rows(item, 'tariffs', index)));
  Object.values(data.data.taxes).forEach((item: any, index: number) => rowsTaxes.push(rows(item, 'taxes', index)));

  return {
    headersTariffs,
    headersTaxes,
    rowsTariffs,
    rowsTaxes,
  };
};

export default getTariffAndTaxesData;
