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

import logger from '../logger';

import languageEN from '../../translation/en';
import languageCY from '../../translation/cy';

export const getCountryNameByCode = (countryCode: string, language: string): any => {
  let country = languageEN.common.countries[countryCode.toUpperCase() as keyof typeof languageEN.common.countries];

  if (!country) {
    logger.error(`No English translation for country ${countryCode}`);
    return undefined;
  }

  if (language === 'cy') {
    const countryCY = languageCY.common.countries[countryCode.toUpperCase() as keyof typeof languageCY.common.countries];

    if (countryCY) {
      country = countryCY;
    } else {
      logger.warn(`No Welsh translation for country ${countryCode}`);
    }
  }
  return country;
};

export default getCountryNameByCode;
