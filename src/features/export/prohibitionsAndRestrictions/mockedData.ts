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
        description: '## Export prohibition%0A%0A[Read the North Korea sanctions guidance](https://www.gov.uk/government/publications/democratic-peoples-republic-of-korea-sanctions-guidance)',
        measureType: 'PROHIBITIVE',
      },
    ],
  },
};

export default mockedRestrictiveMeasuresWithProhibitions;
