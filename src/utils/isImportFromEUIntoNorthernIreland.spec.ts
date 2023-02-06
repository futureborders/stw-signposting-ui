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
import { DestinationCountry } from '../interfaces/enums.interface';
import { isImportFromEUIntoNorthernIreland } from './isImportFromEUIntoNorthernIreland';

describe('Testing isImportFromEUIntoNorthernIreland', () => {
  test('It should return true when importing from FR into XI', () => {
    expect(isImportFromEUIntoNorthernIreland(
      DestinationCountry.XI,
      'FR',
    )).toEqual(true);
  });
  test('It should return false when importing from CN into XI', () => {
    expect(isImportFromEUIntoNorthernIreland(
      DestinationCountry.XI,
      'CN',
    )).toEqual(false);
  });
  test('It should return false when importing from DE into GB', () => {
    expect(isImportFromEUIntoNorthernIreland(
      DestinationCountry.GB,
      'DE',
    )).toEqual(false);
  });
});
