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

import { translation } from './mockedData';

const { newWindowLink } = require('./accessibility');

describe('Testing accessibility', () => {
  describe('newWindowLink', () => {
    test('It should return the link in a new tab', () => {
      expect(newWindowLink('link text', 'http://www.url.com', translation))
        .toBe('<a target="_blank" rel="noopener noreferrer" href="http://www.url.com">link text (opens in new tab)</a>');
    });
  });
});
