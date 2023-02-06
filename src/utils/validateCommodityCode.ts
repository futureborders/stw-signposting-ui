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

import { AdditionalCodeRadioInput } from '../interfaces/additionalCode.interface';

export const commodityCodeIsEmpty = (commodityCode: string): boolean => /^(?![\s\S])/.test(`${commodityCode}`);

export const commodityCodeNotNumber = (commodityCode: string): boolean => !/^\d+$/.test(`${commodityCode}`);

export const commodityCodeNotCorrectDigits = (commodityCode: string): boolean => /^(?!(\d{10})$)/g.test(`${commodityCode}`);

export const hasNoAdditionalCodes = (response: AdditionalCodeRadioInput[]): boolean => Object.values(response).length === 0;

export const cleanCommodity = (commodityCode: string): string => (/\d/.test(commodityCode) ? commodityCode.replace(/[+.\s]/g, '') : commodityCode);

export default commodityCodeIsEmpty;
