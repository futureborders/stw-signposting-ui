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

import { DestinationCountry, OriginCountry, NoDutiesContentKey } from '../interfaces/enums.interface';
import { isImportFromEUIntoNorthernIreland } from './isImportFromEUIntoNorthernIreland';

const getNoDutiesContentKey = (
  originCountry: string,
  destinationCountry: DestinationCountry,
): NoDutiesContentKey|null => {
  switch (true) {
    case isImportFromEUIntoNorthernIreland(destinationCountry, originCountry):
      return NoDutiesContentKey.IMPORT_INTO_XI_FROM_EU;
    case destinationCountry === DestinationCountry.GB && originCountry === OriginCountry.XI:
      return NoDutiesContentKey.IMPORT_INTO_GB_FROM_XI;
    case destinationCountry === DestinationCountry.GB && originCountry !== OriginCountry.XI:
      return NoDutiesContentKey.IMPORT_INTO_GB_FROM_ROW;
    case destinationCountry === DestinationCountry.XI && originCountry === OriginCountry.GB:
      return NoDutiesContentKey.IMPORT_INTO_XI_FROM_GB;
    default:
      return null;
  }
};

export default getNoDutiesContentKey;
