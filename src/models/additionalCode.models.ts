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

import { AdditionalCodeResponse, AdditionalCodeRadioInput } from '../interfaces/additionalCode.interface';

export const getAdditionalCodeRadiosInputs = (response: AdditionalCodeResponse, additionalCode: string): AdditionalCodeRadioInput[] => {
  const additionalCodeRadioInputs: AdditionalCodeRadioInput[] = [];
  const { data } = response;

  if (data) {
    Object.keys(data).forEach((items: any) => {
      const { code } = data[items];
      const { description } = data[items];
      additionalCodeRadioInputs.push({
        value: code,
        html: `<strong>${code}</strong> - ${description}`,
        checked: `${additionalCode}` === code,
      });
    });
  }
  return additionalCodeRadioInputs;
};

export default getAdditionalCodeRadiosInputs;
