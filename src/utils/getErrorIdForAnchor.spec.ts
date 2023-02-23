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

import { getErrorIdForAnchor } from './getErrorIdForAnchor';

describe('getErrorIdForAnchor', () => {
  test('It should return the correct id', () => {
    expect(getErrorIdForAnchor('invalidMonth')).toBe('Month');
    expect(getErrorIdForAnchor('missingMonth')).toBe('Month');
    expect(getErrorIdForAnchor('invalidYear')).toBe('Year');
    expect(getErrorIdForAnchor('missingYear')).toBe('Year');
    expect(getErrorIdForAnchor('someInvalidMessage')).toBe('Day');
    expect(getErrorIdForAnchor('missingDayYear')).toBe('Day');
    expect(getErrorIdForAnchor('missingDayMonth')).toBe('Day');
    expect(getErrorIdForAnchor('missingMonthYear')).toBe('Month');
  });
});
