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

import { DocumentCode, MeasureType } from '../../interfaces/enums.interface';

export const phytosanitary = {
  [MeasureType.PHYTOSANITARY]: (conditions: any[], translation: any) => {
    const text = translation.page.additionalQuestions[MeasureType.PHYTOSANITARY];
    const labelYes = text.options[0].label;
    const valueYes = 'yes';
    const labelNo = text.options[1].label;
    const valueNo = 'no';
    const labelNotSure = text.options[2].label;
    const valueNotSure = 'notSure';

    const resultY251 = [DocumentCode.N851, DocumentCode.Y251].every((code: string) => conditions.some((condition: any) => condition.documentCode === code || condition.certificateCode === code));
    if (resultY251) {
      return {
        type: 'measure_type',
        questionType: 'boolean',
        questionId: MeasureType.PHYTOSANITARY,
        question: translation.page.additionalQuestions[MeasureType.PHYTOSANITARY].Y251.question,
        errorMessageId: 'Y251',
        options: [
          {
            label: labelYes,
            value: valueYes,
            result: [DocumentCode.N851],
          },
          {
            label: labelNo,
            value: valueNo,
            result: [DocumentCode.Y251],
          },
          {
            label: labelNotSure,
            value: valueNotSure,
            result: [DocumentCode.N851, DocumentCode.Y251, DocumentCode['999L']],
          },
        ],
      };
    }
    const resultY252 = [DocumentCode.N851, DocumentCode.Y252].every((code: string) => conditions.some((condition: any) => condition.documentCode === code || condition.certificateCode === code));
    if (resultY252) {
      return {
        type: 'measure_type',
        questionType: 'boolean',
        questionId: MeasureType.PHYTOSANITARY,
        question: translation.page.additionalQuestions[MeasureType.PHYTOSANITARY].Y252.question,
        errorMessageId: 'Y252',
        options: [
          {
            label: labelYes,
            value: valueYes,
            result: [DocumentCode.N851],
          },
          {
            label: labelNo,
            value: valueNo,
            result: [DocumentCode.Y252],
          },
          {
            label: labelNotSure,
            value: valueNotSure,
            result: [DocumentCode.N851, DocumentCode.Y252, DocumentCode['999L']],
          },
        ],
      };
    }
    const resultY253 = [DocumentCode.N851, DocumentCode.Y253].every((code: string) => conditions.some((condition: any) => condition.documentCode === code || condition.certificateCode === code));
    if (resultY253) {
      return {
        type: 'measure_type',
        questionType: 'boolean',
        questionId: MeasureType.PHYTOSANITARY,
        question: translation.page.additionalQuestions[MeasureType.PHYTOSANITARY].Y253.question,
        errorMessageId: 'Y253',
        options: [
          {
            label: labelYes,
            value: valueYes,
            result: [DocumentCode.N851],
          },
          {
            label: labelNo,
            value: valueNo,
            result: [DocumentCode.Y253],
          },
          {
            label: labelNotSure,
            value: valueNotSure,
            result: [DocumentCode.N851, DocumentCode.Y253, DocumentCode['999L']],
          },
        ],
      };
    }
    const resultY256 = [DocumentCode.N851, DocumentCode.Y256].every((code: string) => conditions.some((condition: any) => condition.documentCode === code || condition.certificateCode === code));
    if (resultY256) {
      return {
        type: 'measure_type',
        questionType: 'boolean',
        questionId: MeasureType.PHYTOSANITARY,
        question: translation.page.additionalQuestions[MeasureType.PHYTOSANITARY].Y256.question,
        errorMessageId: 'Y256',
        options: [
          {
            label: labelYes,
            value: valueYes,
            result: [DocumentCode.N851],
          },
          {
            label: labelNo,
            value: valueNo,
            result: [DocumentCode.Y256],
          },
          {
            label: labelNotSure,
            value: valueNotSure,
            result: [DocumentCode.N851, DocumentCode.Y256, DocumentCode['999L']],
          },
        ],
      };
    }

    const resultY250Exclude = [DocumentCode.N851, DocumentCode.Y257, DocumentCode.Y250].every((code: string) => conditions.some((condition: any) => condition.documentCode === code || condition.certificateCode === code));
    if (resultY250Exclude) {
      return null;
    }

    const resultY257 = [DocumentCode.N851, DocumentCode.Y257].every((code: string) => conditions.some((condition: any) => condition.documentCode === code || condition.certificateCode === code));
    if (resultY257) {
      return {
        type: 'measure_type',
        questionType: 'boolean',
        questionId: MeasureType.PHYTOSANITARY,
        question: translation.page.additionalQuestions[MeasureType.PHYTOSANITARY].Y257.question,
        errorMessageId: 'Y257',
        options: [
          {
            label: labelYes,
            value: valueYes,
            result: [DocumentCode.N851],
          },
          {
            label: labelNo,
            value: valueNo,
            result: [DocumentCode.Y257],
          },
          {
            label: labelNotSure,
            value: valueNotSure,
            result: [DocumentCode.N851, DocumentCode.Y257, DocumentCode['999L']],
          },
        ],
      };
    }
    const resultY258 = [DocumentCode.N851, DocumentCode.Y258].every((code: string) => conditions.some((condition: any) => condition.documentCode === code || condition.certificateCode === code));
    if (resultY258) {
      return {
        type: 'measure_type',
        questionType: 'boolean',
        questionId: MeasureType.PHYTOSANITARY,
        question: translation.page.additionalQuestions[MeasureType.PHYTOSANITARY].Y258.question,
        errorMessageId: 'Y258',
        options: [
          {
            label: labelYes,
            value: valueYes,
            result: [DocumentCode.N851],
          },
          {
            label: labelNo,
            value: valueNo,
            result: [DocumentCode.Y258],
          },
          {
            label: labelNotSure,
            value: valueNotSure,
            result: [DocumentCode.N851, DocumentCode.Y258, DocumentCode['999L']],
          },
        ],
      };
    }
    const resultY259 = [DocumentCode.N851, DocumentCode.Y259].every((code: string) => conditions.some((condition: any) => condition.documentCode === code || condition.certificateCode === code));
    if (resultY259) {
      return {
        type: 'measure_type',
        questionType: 'boolean',
        questionId: MeasureType.PHYTOSANITARY,
        question: translation.page.additionalQuestions[MeasureType.PHYTOSANITARY].Y259.question,
        errorMessageId: 'Y259',
        options: [
          {
            label: labelYes,
            value: valueYes,
            result: [DocumentCode.N851],
          },
          {
            label: labelNo,
            value: valueNo,
            result: [DocumentCode.Y259],
          },
          {
            label: labelNotSure,
            value: valueNotSure,
            result: [DocumentCode.N851, DocumentCode.Y259, DocumentCode['999L']],
          },
        ],
      };
    }
    const resultY067 = [DocumentCode.N851, DocumentCode.Y067].every((code: string) => conditions.some((condition: any) => condition.documentCode === code || condition.certificateCode === code));
    if (resultY067) {
      return {
        type: 'measure_type',
        questionType: 'boolean',
        questionId: MeasureType.PHYTOSANITARY,
        question: translation.page.additionalQuestions[MeasureType.PHYTOSANITARY].Y067.question,
        errorMessageId: 'Y067',
        options: [
          {
            label: labelYes,
            value: valueYes,
            result: [DocumentCode.N851],
          },
          {
            label: labelNo,
            value: valueNo,
            result: [DocumentCode.Y067],
          },
          {
            label: labelNotSure,
            value: valueNotSure,
            result: [DocumentCode.N851, DocumentCode.Y067, DocumentCode['999L']],
          },
        ],
      };
    }

    const resultY501 = [DocumentCode.N851, DocumentCode.Y501].every((code: string) => conditions.some((condition: any) => condition.documentCode === code || condition.certificateCode === code));
    if (resultY501) {
      return {
        type: 'measure_type',
        questionType: 'boolean',
        questionId: MeasureType.PHYTOSANITARY,
        question: translation.page.additionalQuestions[MeasureType.PHYTOSANITARY].Y501.question,
        errorMessageId: 'Y501',
        options: [
          {
            label: labelYes,
            value: valueYes,
            result: [DocumentCode.N851],
          },
          {
            label: labelNo,
            value: valueNo,
            result: [DocumentCode.Y501],
          },
          {
            label: labelNotSure,
            value: valueNotSure,
            result: [DocumentCode.N851, DocumentCode.Y501, DocumentCode['999L']],
          },
        ],
      };
    }
    return null;
  },
};

export default phytosanitary;
