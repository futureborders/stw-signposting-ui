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

import { phytosanitary } from './additionalQuestionsConfig/phytosanitary';
import { cites } from './additionalQuestionsConfig/cites';
import { organics } from './additionalQuestionsConfig/organics';
import { invasiveAlienSpecies } from './additionalQuestionsConfig/invasiveAlienSpecies';

import { AdditionalQuestionsOrder, MeasureType } from '../interfaces/enums.interface';

interface Questions {
  [key: string]: any;
}

export const additionalQuestions: Questions = {
  ...phytosanitary,
  ...cites,
  ...organics,
  ...invasiveAlienSpecies,
};

const orderAdditionalQuestions = (a: Questions, b: Questions): number => AdditionalQuestionsOrder.indexOf(a?.questionId) - AdditionalQuestionsOrder.indexOf(b?.questionId);
const orderAdditionalQuestionIds = (a: MeasureType, b: MeasureType): number => AdditionalQuestionsOrder.indexOf(a) - AdditionalQuestionsOrder.indexOf(b);

export const getAdditionalQuestions = (tradeDataResponse: any, translation: any): any => {
  let result = { questions: [], questionsId: [] };
  const { measures } = tradeDataResponse;
  if (measures) {
    result = measures.reduce((acc: any, measure: any) => {
      const measureTypeId: string = measure.id;
      if (Object.keys(additionalQuestions).includes(measureTypeId)) {
        acc.questions.push(additionalQuestions[measureTypeId](measure.measureOptions[0].options, translation));
        acc.questionsId.push(measureTypeId);
      }
      return acc;
    }, { questions: [], questionsId: [] });
  }

  result.questions.sort(orderAdditionalQuestions);
  result.questionsId.sort(orderAdditionalQuestionIds);

  return result;
};

export default getAdditionalQuestions;
