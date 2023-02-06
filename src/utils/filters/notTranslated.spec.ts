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

import { notTranslated, notTranslatedAttribute, notTranslatedOject, notTranslatedToEnglish } from './notTranslated';

describe('Testing notTranslated filters', () => {
  test('It should return correct strings', () => {
    expect(notTranslated('foo', 'cy')).toBe("<span lang='en'>foo</span>");
    expect(notTranslated('foo', 'en')).toBe('foo');
  });

  test('It should return correct strings', () => {
    expect(notTranslatedToEnglish('Some welsh text', 'en')).toBe("<span lang='cy'>Some welsh text</span>");
    expect(notTranslatedToEnglish('Some welsh text', 'cy')).toBe('Some welsh text');
  });

  test('It should return correct strings', () => {
    expect(notTranslatedAttribute('cy')).toBe(' lang="en"');
    expect(notTranslatedAttribute('en')).toBe('');
  });

  test('It should return correct object', () => {
    let translation = {
      common: {
        numbers: {
          '1': 'un'
        }
      }
    };
    expect(notTranslatedOject(translation)).toEqual({ lang: 'en' });
  });

  test('It should return correct object', () => {
    let translation = {
      common: {
        numbers: {
          '1': 'one'
        }
      }
    };
    expect(notTranslatedOject(translation)).toEqual(null);
  });
});
