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

import { Countries } from '../../interfaces/countries.interface';
import logger from '../logger';

const countries = require('../../countries.json');
const WelshCountryTranslation = require('../../translation/countries.cy').default;

export const getCountryNameByCode = (countryCode: string, language: string): any => {
  let country = countries.data.filter((countryItem: Countries) => countryItem.id === countryCode)[0]?.attributes.description;
  const key = `${country?.replace(/ /g, '.').toLowerCase()}`;
  if (language === 'cy') {
    if (WelshCountryTranslation.countries[key]) {
      country = WelshCountryTranslation.countries[key];
    } else {
      logger.error(`No Welsh translation for ${country}`);
    }
  }
  return country;
};

export default getCountryNameByCode;
