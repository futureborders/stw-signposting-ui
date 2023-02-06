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

/* istanbul ignore file */

export const translation = {
  page: {
    calculateCustomsDutyImportVat: {
      tariffs: 'Tariffs',
      taxes: 'Taxes',
      measureType: 'Measure type',
      quota: 'Quota order number',
      additionalCode: 'Additional code',
      value: 'Value',
      awaitingData: 'Awaiting data.',
    },
  },
  common: {
    measures: {
      rules: 'Rules that apply to your goods',
      exceptions: 'When rules are different or do not apply',
      multiCertificatePrefix: 'MULTI_CERTIFICATE prefix',
      condition: 'You must meet this condition',
      multipleConditions: (amount: string): string => `You must meet one of these ${amount} conditions`,
      code: 'Code',
      followRules: 'followRules text',
      followRulesExport: 'followRules export text',
      waiverApplies: (certificateCode: string): string => `${certificateCode} waiver applies`,
      waiverAlsoApplies: (certificateCode: string): string => `${certificateCode} waiver also applies`,
      '999L': {
        header: 'Customs Declaration Service (CDS) universal waiver',
        body: 'Requirement for a licence is waived by entering the 999L document code and the document identifier CDS WAIVER in the additional documentation field for this commodity item. 999L can be used for CDS in a similar way to LIC99 on the CHIEF system, when a waiver may be applied.',
      },
      measureOptionSubtype: {
        PRICE_BASED: 'Price threshold applies',
        VOLUME_BASED: 'Volume threshold applies',
        UNIT_BASED: 'Unit threshold applies',
        WEIGHT_BASED: 'Weight threshold applies',
        PRICE_PER_UNIT_BASED: (unit: string): string => `Price / ${unit} threshold applies`,
      },
      thresholdConditionsApply: 'Threshold conditions apply:',
    },
    accessibility: {
      opensNewTab: '(opens in new tab)',
    },
    numbers: {
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
      6: 'six',
      7: 'seven',
      8: 'eight',
      9: 'nine',
      10: 'ten',
      11: 'eleven',
      12: 'twelve',
      13: 'thirteen',
      14: 'fourteen',
      15: 'fifteen',
      16: 'sixteen',
      17: 'seventeen',
      18: 'eighteen',
      19: 'nineteen',
      20: 'twenty',
    },
  },
};

export const mockedRestrictiveMeasures = {
  data: {
    measures: [
      {
        id: '410',
        measureTypeSeries: 'B',
        descriptionOverlay: '## Veterinary controls',
        description: '## Veterinary controls',
        measureOptions: [
          {
            options: [
              {
                certificateCode: 'N853',
                type: 'CERTIFICATE',
                descriptionOverlay: 'descriptionOverlay N853',
              },
              {
                certificateCode: 'C084',
                type: 'EXCEPTION',
                descriptionOverlay: 'descriptionOverlay C084',
              },
              {
                certificateCode: 'Y058',
                type: 'THRESHOLD_CERTIFICATE',
                descriptionOverlay: 'descriptionOverlay Y058',
              },
            ],
          },
        ],
        measureType: 'RESTRICTIVE',
      },
      {
        id: '350',
        measureTypeSeries: 'B',
        descriptionOverlay: '## Animal Health Certificate',
        description: '## Animal Health Certificate',
        measureOptions: [
          {
            options: [
              {
                certificateCode: '9120',
                type: 'CERTIFICATE',
                descriptionOverlay: 'descriptionOverlay 9120',
              },
              {
                certificateCode: '999L',
                type: 'EXCEPTION',
                descriptionOverlay: 'descriptionOverlay 999L',
              },
            ],
          },
        ],
        measureType: 'RESTRICTIVE',
      },
      {
        id: '710',
        measureTypeSeries: 'B',
        descriptionOverlay: '## CITES: import control',
        description: '## CITES: import control',
        measureOptions: [
          {
            options: [
              {
                certificateCode: 'C400',
                type: 'CERTIFICATE',
                descriptionOverlay: 'descriptionOverlay C400',
              },
              {
                certificateCode: '999L',
                type: 'EXCEPTION',
                descriptionOverlay: 'National Document: CDS universal waiver',
              },
              {
                certificateCode: 'Y900',
                type: 'EXCEPTION',
                descriptionOverlay: 'descriptionOverlay Y900',
              },
            ],
          },
        ],
        measureType: 'RESTRICTIVE',
      },
      {
        id: '750',
        measureTypeSeries: 'B',
        descriptionOverlay: '## Organic goods: import control',
        description: '## Organic goods: import control',
        measureOptions: [
          {
            options: [
              {
                certificateCode: 'C644',
                type: 'CERTIFICATE',
                descriptionOverlay: 'descriptionOverlay C644',
              },
              {
                certificateCode: 'Y929',
                type: 'EXCEPTION',
                descriptionOverlay: 'descriptionOverlay Y929',
              },
            ],
          },
        ],
        measureType: 'RESTRICTIVE',
      },
    ],
  },
};

export const mockedRestrictiveMeasuresWithProhibitions = {
  data: {
    measures: [
      {
        id: '715',
        measureTypeSeries: 'B',
        descriptionOverlay: 'Some Measure heading 1',
        measureOptions: [
          {
            options: [
              {
                certificateCode: 'C400',
                type: 'CERTIFICATE',
                descriptionOverlay: 'Other certificates: Presentation of the required "CITES" certificate',
              },
              {
                certificateCode: '999L',
                type: 'EXCEPTION',
                descriptionOverlay: 'National Document: CDS universal waiver',
              },
              {
                certificateCode: 'Y900',
                type: 'EXCEPTION',
                descriptionOverlay: 'Particular provisions: Declared goods do not belong to the Washington Convention (CITES)',
              },
            ],
          },
        ],
      },
      {
        measureTypeId: '278',
        id: '278',
        measureTypeSeries: 'A',
        legalAct: 'X1904110',
        description: '## Some prohibition description',
        measureType: 'PROHIBITIVE',
      },
    ],
  },
};

export const mockedAdditionalCodeData = {
  data: {
    data: [
      { code: '4200', description: 'Procyon lotor' },
      { code: '4201', description: 'Canis lupus' },
      { code: '4202', description: 'Martes zibellina' },
    ],
  },
};

export const mockedInvalidDestinationError = {
  data: {
    data: {
      validationErrors: [
        {
          fieldName: 'destinationCountry',
          message: 'must not be null',
        },
      ],
    },
  },
};

export const mockedOriginCountryError = {
  data: {
    data: {
      validationErrors: [
        {
          fieldName: 'originCountry',
          message: 'must match "^\\w{2}$',
        },
      ],
    },
  },
};

export const mockedAdditionalCodeError = {
  data: {
    data: {
      validationErrors: [
        {
          fieldName: 'additionalCode',
          message: 'must match "^\\d{4}$"',
        },
      ],
    },
  },
};

export const mockedImportDateError = {
  data: {
    data: {
      validationErrors: [
        {
          fieldName: 'importDate',
          message: 'some date error',
        },
      ],
    },
  },
};

export const mockedInvalidTradeTypeError = {
  data: {
    data: {
      validationErrors: [
        {
          fieldName: 'tradeType',
          message: 'some tradeType error',
        },
      ],
    },
  },
};

export const mockedTariffAndTaxesData = {
  data: {
    tariffs: [
      {
        measureTypeId: '103',
        text: 'Third country duty',
        subtext: null,
        value: '8.00 %',
        additionalCode: { code: 'VATZ', description: 'VAT zero rate' },
        geographicalArea: {
          id: '1011',
          description: 'ERGA OMNES',
        },
        quota: null,
      },
      {
        measureTypeId: '103',
        text: 'Tariff preference',
        subtext: null,
        value: '3.50 %',
        additionalCode: null,
        geographicalArea: {
          id: 'MA',
          description: 'Morocco',
        },
        quota: null,
      },
      {
        measureTypeId: '103',
        text: 'Preferential tariff quota',
        subtext: null,
        value: '0.00 %',
        additionalCode: null,
        geographicalArea: {
          id: 'MA',
          description: 'Morocco',
        },
        quota: {
          number: '051104',
        },
      },
      {
        measureTypeId: '103',
        text: 'Preferential tariff quota',
        subtext: null,
        value: null,
        additionalCode: null,
        geographicalArea: {
          id: 'MA',
          description: 'Morocco',
        },
        quota: {
          number: '051193',
        },
      },
    ],
    taxes: [
      {
        measureTypeId: '305',
        text: 'Value added tax',
        subtext: null,
        value: '0.00 %',
        additionalCode: {
          code: 'VATZ',
          description: 'VAT zero rate',
        },
      },
      {
        measureTypeId: '305',
        text: 'Value added tax',
        subtext: null,
        value: '0.00 %',
        additionalCode: null,
      },
    ],
  },
};

export const mockedTariffAndTaxesDataResponse = {
  headersTariffs: [
    { text: 'Measure type', classes: 'govuk-!-width-one-quarter' },
    {
      text: 'Quota order number',
      classes: 'govuk-!-width-one-quarter',
    },
    { text: 'Additional code', classes: 'govuk-!-width-one-quarter' },
    {
      text: 'Value',
      format: 'numeric',
      classes: 'govuk-!-width-one-quarter',
    },
  ],
  headersTaxes: [
    { text: 'Measure type', classes: 'govuk-!-width-one-quarter' },
    { text: 'Additional code', classes: 'govuk-!-width-one-quarter' },
    {
      text: 'Value',
      format: 'numeric',
      classes: 'govuk-!-width-one-quarter',
    },
  ],
  rowsTariffs: [
    [
      { html: 'Third country duty', attributes: { 'data-id': 'tariffs-measure-type-0' } },
      { html: '-', attributes: { 'data-id': 'tariffs-quota-0' } },
      { html: '<strong>VATZ</strong><br />VAT zero rate', attributes: { 'data-id': 'tariffs-additional-code-0' } },
      { html: '8.00 %', format: 'numeric', attributes: { 'data-id': 'tariffs-value-0' } },
    ],
    [
      { html: 'Tariff preference for Morocco', attributes: { 'data-id': 'tariffs-measure-type-1' } },
      { html: '-', attributes: { 'data-id': 'tariffs-quota-1' } },
      { html: '-', attributes: { 'data-id': 'tariffs-additional-code-1' } },
      { html: '3.50 %', format: 'numeric', attributes: { 'data-id': 'tariffs-value-1' } },
    ],
    [
      { html: 'Preferential tariff quota for Morocco', attributes: { 'data-id': 'tariffs-measure-type-2' } },
      { html: '051104', attributes: { 'data-id': 'tariffs-quota-2' } },
      { html: '-', attributes: { 'data-id': 'tariffs-additional-code-2' } },
      { html: '0.00 %', format: 'numeric', attributes: { 'data-id': 'tariffs-value-2' } },
    ],
    [
      { html: 'Preferential tariff quota for Morocco', attributes: { 'data-id': 'tariffs-measure-type-3' } },
      { html: '051193', attributes: { 'data-id': 'tariffs-quota-3' } },
      { html: '-', attributes: { 'data-id': 'tariffs-additional-code-3' } },
      { html: 'Conditional', format: 'numeric', attributes: { 'data-id': 'tariffs-value-3' } },
    ],
  ],
  rowsTaxes: [
    [
      { html: 'Value added tax', attributes: { 'data-id': 'taxes-measure-type-0' } },
      { html: '<strong>VATZ</strong><br />VAT zero rate', attributes: { 'data-id': 'taxes-additional-code-0' } },
      { html: '0.00 %', format: 'numeric', attributes: { 'data-id': 'taxes-value-0' } },
    ],
    [
      { html: 'Value added tax', attributes: { 'data-id': 'taxes-measure-type-1' } },
      { html: '-', attributes: { 'data-id': 'taxes-additional-code-1' } },
      { html: '0.00 %', format: 'numeric', attributes: { 'data-id': 'taxes-value-1' } },
    ],
  ],
};

export const mockedTariffAndTaxesDataEmptyColumns = {
  data: {
    tariffs: [
      {
        text: 'Third country duty',
        subtext: null,
        value: '8.00 %',
        additionalCode: null,
        geographicalArea: {
          id: '1011',
          description: 'ERGA OMNES',
        },
        quota: null,
      },
      {
        text: 'Tariff preference',
        subtext: null,
        value: '3.50 %',
        additionalCode: null,
        geographicalArea: {
          id: 'MA',
          description: 'Morocco',
        },
        quota: null,
      },
    ],
    taxes: [
      {
        measureTypeId: '305',
        text: 'Value added tax',
        subtext: null,
        value: '0.00 %',
        additionalCode: {
          code: 'VATZ',
          description: 'VAT zero rate',
        },
      },
      {
        measureTypeId: '305',
        text: 'Value added tax',
        subtext: null,
        value: null,
        additionalCode: null,
      },
    ],
  },
};

export const mockedTariffAndTaxesDataEmptyColumnsResponse = {
  headersTariffs: [
    { text: 'Measure type', classes: 'govuk-!-width-one-quarter' },
    {
      text: 'Value',
      format: 'numeric',
      classes: 'govuk-!-width-one-quarter',
    },
  ],
  headersTaxes: [
    { text: 'Measure type', classes: 'govuk-!-width-one-quarter' },
    { text: 'Additional code', classes: 'govuk-!-width-one-quarter' },
    {
      text: 'Value',
      format: 'numeric',
      classes: 'govuk-!-width-one-quarter',
    },
  ],
  rowsTariffs: [
    [
      { html: 'Third country duty', attributes: { 'data-id': 'tariffs-measure-type-0' } },
      { html: '8.00 %', format: 'numeric', attributes: { 'data-id': 'tariffs-value-0' } },
    ],
    [
      { html: 'Tariff preference for Morocco', attributes: { 'data-id': 'tariffs-measure-type-1' } },
      { html: '3.50 %', format: 'numeric', attributes: { 'data-id': 'tariffs-value-1' } },
    ],
  ],
  rowsTaxes: [
    [
      { html: 'Value added tax', attributes: { 'data-id': 'taxes-measure-type-0' } },
      { html: '<strong>VATZ</strong><br />VAT zero rate', attributes: { 'data-id': 'taxes-additional-code-0' } },
      { html: '0.00 %', format: 'numeric', attributes: { 'data-id': 'taxes-value-0' } },
    ],
    [
      { html: 'Value added tax', attributes: { 'data-id': 'taxes-measure-type-1' } },
      { html: '-', attributes: { 'data-id': 'taxes-additional-code-1' } },
      { html: 'Conditional', format: 'numeric', attributes: { 'data-id': 'taxes-value-1' } },
    ],
  ],
};

export const mockedTariffAndTaxesDataNoTariff = {
  data: {
    tariffs: [],
    taxes: [
      {
        measureTypeId: '305',
        text: 'Value added tax',
        subtext: null,
        value: '5.00 %',
        additionalCode: {
          code: 'VATZ',
          description: 'VAT zero rate',
        },
      },
    ],
  },
};

export const mockedTariffAndTaxesDataNoTax = {
  data: {
    tariffs: [
      {
        text: 'Third country duty',
        subtext: null,
        value: '8.00 %',
        additionalCode: null,
        geographicalArea: {
          id: '1011',
          description: 'ERGA OMNES',
        },
        quota: null,
      },
    ],
    taxes: [],
  },
};
