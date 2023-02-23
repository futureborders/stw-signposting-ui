/**
 * Copyright 2022 Crown Copyright (Single Trade Window)
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

export const mockedRestrictiveMeasures = {
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
        id: '719',
        measureTypeSeries: 'B',
        descriptionOverlay: 'Some Measure heading 2',
        measureOptions: [
          {
            options: [
              {
                certificateCode: 'C673',
                type: 'CERTIFICATE',
                descriptionOverlay: 'Other certificates: Catch certificate',
              },
              {
                certificateCode: '999L',
                type: 'EXCEPTION',
                descriptionOverlay: 'National Document: CDS universal waiver',
              },
              {
                certificateCode: 'Y927',
                type: 'EXCEPTION',
                descriptionOverlay: 'Particular provisions: Catch Certificate not required - see footnote for exempted goods.',
              },
            ],
          },
        ],
      },
    ],
  },
};

export const mockedRestrictiveMeasuresNo999L = {
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
            ],
          },
        ],
      },
    ],
  },
};

export const mockedCommodityCodeError = {
  data: {
    data: {
      validationErrors: [
        {
          fieldName: 'commodityCode',
          message: 'must match "^\\d{8}|\\d{10}$"',
        },
      ],
    },
  },
};

export const mockedDestinationCountryError = {
  data: {
    data: {
      validationErrors: [
        {
          fieldName: 'destinationCountry',
          message: 'must match "^\\w{2}$"',
        },
      ],
    },
  },
};

export const mockedExportOriginCountryError = {
  data: {
    data: {
      validationErrors: [
        {
          fieldName: 'originCountry',
          message: 'Origin country is not a valid UK country',
        },
      ],
    },
  },
};

export const mockedTradeTypeError = {
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

export default mockedRestrictiveMeasures;
