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

export const clearAdditionalQuestions = (queryParams: string, questions: any[]): URLSearchParams => {
  const params = new URLSearchParams(queryParams);
  const filteredParams = new URLSearchParams();
  params.forEach((value: string, key: string) => {
    if (!questions.includes(key)) filteredParams.append(key, value);
    if (key === 'additional-question') filteredParams.delete(key);
  });
  return filteredParams;
};

export default clearAdditionalQuestions;
