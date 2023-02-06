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

import { DocumentCode, MeasureType } from '../../interfaces/enums.interface';

export const organics = {
  [MeasureType.ORGANICS]: (conditions: any[], translation: any) => {
    const result = [DocumentCode.C644, DocumentCode.Y929].every((code: string) => conditions.some((condition: any) => condition.documentCode === code || condition.certificateCode === code));
    if (result) {
      return {
        type: 'measure_type',
        questionType: 'boolean',
        questionId: MeasureType.ORGANICS,
        question: translation.page.additionalQuestions[MeasureType.ORGANICS].question,
        options: [
          {
            label: translation.page.additionalQuestions[MeasureType.ORGANICS].options[0].label,
            value: 'yes',
            result: [DocumentCode.C644],
          },
          {
            label: translation.page.additionalQuestions[MeasureType.ORGANICS].options[1].label,
            value: 'no',
            result: [DocumentCode.Y929],
          },
          {
            label: translation.page.additionalQuestions[MeasureType.ORGANICS].options[2].label,
            value: 'notSure',
            result: [DocumentCode.C644, DocumentCode.Y929],
          },
        ],
      };
    }
    return null;
  },
};

export default organics;
