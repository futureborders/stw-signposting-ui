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
import { Request, Response } from 'express';

interface Error {
  text: string;
  visuallyHiddenText: string;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const validateAdditionalQuestion = (queryParams: string, translation: any, req: Request, res: Response, errorMessageId: string): Error | null => {
  let errors;
  const params = new URLSearchParams(queryParams);
  if (params.has('additional-question')) {
    const questionId = params.get('additional-question') as string;
    if (!params.has(questionId)) {
      const { errorText } = translation.page.additionalQuestions[questionId];
      errors = {
        text: errorText || translation.page.additionalQuestions[questionId][errorMessageId]?.errorText,
        visuallyHiddenText: translation.common.errors.error,
      };
    } else {
      errors = null;
    }
    params.delete('additional-question');
    delete req.query['additional-question'];
    res.locals.queryParams = params.toString();
  }
  return errors || null;
};

export default validateAdditionalQuestion;
