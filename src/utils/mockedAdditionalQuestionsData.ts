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

import { MeasureType } from '../interfaces/enums.interface';

export const mockedAdditionalQuestionsData = {
  data: {
    measures: [
      {
        id: '360',
        measureTypeSeries: 'B',
        descriptionOverlay: 'Phytosanitary Certificate (import)',
        subtext: null,
        measureOptions: [
          {
            options: [
              {
                certificateCode: 'N851',
                type: 'CERTIFICATE',
                descriptionOverlay: 'descriptionOverlay N851',
              },
              {
                certificateCode: '999L',
                type: 'EXCEPTION',
                descriptionOverlay: 'National Document: CDS universal waiver',
              },
              {
                certificateCode: 'Y251',
                type: 'EXCEPTION',
                descriptionOverlay: 'descriptionOverlay Y251',
              },
              {
                id: '712',
                measureTypeSeries: 'B',
                descriptionOverlay: '## Import control - Invasive Alien Species',
                description: '## Import control - Invasive Alien Species',
                measureOptions: [
                  {
                    options: [
                      {
                        certificateCode: 'C065',
                        type: 'CERTIFICATE',
                        descriptionOverlay: 'descriptionOverlay C065',
                      },
                      {
                        certificateCode: 'Y942',
                        type: 'EXCEPTION',
                        descriptionOverlay: 'descriptionOverlay Y942',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: '710',
        measureTypeSeries: 'B',
        descriptionOverlay: 'CITES',
        subtext: null,
        measureOptions: [
          {
            options: [
              {
                certificateCode: 'C400',
                type: 'CERTIFICATE',
                descriptionOverlay: 'descriptionOverlay C400',
              },
              {
                certificateCode: 'Y900',
                type: 'EXCEPTION',
                descriptionOverlay: 'descriptionOverlay Y900',
              },
            ],
          },
        ],
      },
      {
        id: '750',
        measureTypeSeries: 'B',
        descriptionOverlay: 'Import control of organic products',
        subtext: null,
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
      },
      {
        id: '712',
        measureTypeSeries: 'B',
        descriptionOverlay: '## Import control - Invasive Alien Species',
        description: '## Import control - Invasive Alien Species',
        measureOptions: [
          {
            options: [
              {
                certificateCode: 'C065',
                type: 'CERTIFICATE',
                descriptionOverlay: 'descriptionOverlay C065',
              },
              {
                certificateCode: 'Y942',
                type: 'EXCEPTION',
                descriptionOverlay: 'descriptionOverlay Y942',
              },
            ],
          },
        ],
      },
    ],
  },
};

export const translation = {
  page: {
    additionalQuestions: {
      [MeasureType.PHYTOSANITARY]: {
        Y251: {
          question: 'question_Y251',
          errorText: 'errorText_Y251',
        },
        Y252: {
          question: 'question_Y252',
          errorText: 'errorText_Y252',
        },
        Y253: {
          question: 'question_Y253',
          errorText: 'errorText_Y253',
        },
        Y256: {
          question: 'question_Y256',
          errorText: 'errorText_Y256',
        },
        Y257: {
          question: 'question_Y257',
          errorText: 'errorText_Y257',
        },
        Y258: {
          question: 'question_Y258',
          errorText: 'errorText_Y258',
          hintText: 'hintText_Y258',
        },
        Y259: {
          question: 'question_Y259',
          errorText: 'errorText_Y259',
          hintText: 'hintText_Y259',
        },
        Y067: {
          question: 'question_Y067',
          errorText: 'errorText_Y067',
          hintText: 'hintText_Y067',
        },
        Y501: {
          question: 'question_Y501',
          errorText: 'errorText_Y501',
        },
        options: [
          {
            label: 'Yes',
          },
          {
            label: 'No',
          },
          {
            label: 'I\'m not sure',
          },
        ],
      },
      [MeasureType.CITES]: {
        question: 'question CITES',
        errorText: 'errorText CITES',
        options: [
          {
            label: 'Yes',
          },
          {
            label: 'No',
          },
          {
            label: 'I\'m not sure',
          },
        ],
      },
      [MeasureType.ORGANICS]: {
        question: 'question ORGANICS',
        errorText: 'errorText ORGANICS',
        options: [
          {
            label: 'Yes',
          },
          {
            label: 'No',
          },
          {
            label: 'I\'m not sure',
          },
        ],
      },
      [MeasureType.IAS]: {
        question: 'question IAS',
        errorText: 'errorText IAS',
        options: [
          {
            label: 'Yes',
          },
          {
            label: 'No',
          },
          {
            label: 'I\'m not sure',
          },
        ],
      },
    },
  },
};
