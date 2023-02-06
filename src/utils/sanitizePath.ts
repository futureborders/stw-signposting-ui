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

const blackList = [
  '%2e',
  '%252e',
  '%2f',
  '%252f',
  '%255c',
  '%5c',
  '%c0%af',
  '%c1%9c',
  '..\\\\',   //eslint-disable-line
  '\\.\\.',     //eslint-disable-line
  '^\/',        //eslint-disable-line
];

const sanitizePath = (userInput: string): string => {
  let userInputCleaned = userInput;
  blackList.forEach((value) => {
    const reg = new RegExp(value, 'gi');
    userInputCleaned = userInputCleaned.replace(reg, '');
  });
  return userInputCleaned;
};

export default sanitizePath;
