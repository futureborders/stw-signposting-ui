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
import { Request } from 'express';
import { DataEntity } from '../interfaces/tradeTariffApi.interface';
import { TypeOfTrade } from '../interfaces/enums.interface';
import { getCountryNameByCode } from '../utils/filters/getCountryNameByCode';
import { CountriesDropdown } from '../interfaces/countries.interface';

const countries = require('../countries.json');

const excludedCountries = process.env.TRADE_TARIFF_COUNTRY_EXCLUSION?.split(',');

export const getCountryDropdown = (req: Request, language: string, defaultCountrySelectLabel: string): any => {
  const dropdownCountries: CountriesDropdown[] = [];

  const filteredCountries = countries.data.filter((items: any) => !excludedCountries?.includes(items.id));

  filteredCountries.forEach((item: DataEntity) => {
    dropdownCountries.push({
      value: item.id,
      text: getCountryNameByCode(item.id, language),
      selected: req.query.originCountry === item.id || (req.query.destinationCountry === item.id && req.query.tradeType === TypeOfTrade.export) ? 'selected' : '',
    });
  });

  dropdownCountries.sort((a, b) => a.text.localeCompare(b.text));

  dropdownCountries.unshift({
    value: '',
    text: defaultCountrySelectLabel,
    selected: '',
  });

  return dropdownCountries;
};

export default getCountryDropdown;
