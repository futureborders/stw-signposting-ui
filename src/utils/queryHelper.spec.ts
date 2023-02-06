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

import { getImportDateFromQuery, updateQueryParams } from './queryHelper';

describe('Testing getImportDateFromQuery', () => {
  test('It should return the date and trim spaces and pad double digits', () => {
    const req: any = {
      query: {
        importDateDay: ' 1 ',
        importDateMonth: ' 2 ',
        importDateYear: ' 2020 ',
      },
    };

    expect(getImportDateFromQuery(req)).toEqual({
      day: '01',
      month: '02',
      year: '2020',
    });
  });
});

describe('Testing updateQueryParams', () => {
  test('It should update the queryParams', () => {
    expect(updateQueryParams('foo=bar', { foo: 'xyz' })).toEqual('foo=xyz');
    expect(updateQueryParams('foo=bar', { foo: 'xyz', abc: 'def' })).toEqual('foo=xyz&abc=def');
  });
});
