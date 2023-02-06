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

import { formatDate } from './formatDate';
import { ImportDate } from '../../interfaces/importDate.interface';

describe('Testing formatDate filter', () => {
  test('It should format the date as 1 Rhagfyr 2021', () => {
    const importDate:ImportDate = {
      day: '1',
      month: '12',
      year: '2021',
    };
    expect(formatDate(importDate, 'cy')).toBe('1 Rhagfyr 2021');
  });
  test('It should format the date as 1 December 2021', () => {
    const importDate:ImportDate = {
      day: '1',
      month: '12',
      year: '2021',
    };
    expect(formatDate(importDate)).toBe('1 December 2021');
  });
});
