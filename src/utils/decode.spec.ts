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

const {
  decode,
} = require('./decode');

describe('decode', () => {
  test('It should URI decode the string', () => {
    expect(decode('some%20string%20%40%C2%A3%24%25%5E%26')).toEqual('some string @£$%^&');
  });
  test('It should return an empty string', () => {
    expect(decode(null)).toEqual('');
    expect(decode(undefined)).toEqual('');
    expect(decode('')).toEqual('');
  });
});
