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

import getNoDutiesContentKey from './getNoDutiesContentKey';
import { NoDutiesContentKey, DestinationCountry } from '../interfaces/enums.interface';

describe('getNoDutiesContentKey', () => {
  test('It should return IMPORT_INTO_XI_FROM_EU', () => {
    expect(getNoDutiesContentKey(
      'FR',
      'XI' as DestinationCountry,
    )).toEqual(NoDutiesContentKey.IMPORT_INTO_XI_FROM_EU);
  });
  test('It should return IMPORT_INTO_GB_FROM_XI', () => {
    expect(getNoDutiesContentKey(
      'XI',
      'GB' as DestinationCountry,
    )).toEqual(NoDutiesContentKey.IMPORT_INTO_GB_FROM_XI);
  });
  test('It should return IMPORT_INTO_GB_FROM_ROW', () => {
    expect(getNoDutiesContentKey(
      'CN',
      'GB' as DestinationCountry,
    )).toEqual(NoDutiesContentKey.IMPORT_INTO_GB_FROM_ROW);
  });
  test('It should return IMPORT_INTO_XI_FROM_GB', () => {
    expect(getNoDutiesContentKey(
      'GB',
      'XI' as DestinationCountry,
    )).toEqual(NoDutiesContentKey.IMPORT_INTO_XI_FROM_GB);
  });
  test('It should return null', () => {
    expect(getNoDutiesContentKey(
      'CN',
      'XI' as DestinationCountry,
    )).toEqual(null);
  });
});
