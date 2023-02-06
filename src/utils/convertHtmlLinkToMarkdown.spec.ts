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

import { convertHtmlLinkToMarkdown } from './convertHtmlLinkToMarkdown';

describe('convertHtmlLinkToMarkdown', () => {
  test('It should convert to markdown', () => {
    const case1 = 'some sentence start <a href="https://www.somelink1.com/slug?param1=foo&param2=bar">some link 1</a> some sentence end. some sentence start <a href="https://www.somelink2.com/slug?param1=foo&param2=bar">some link 2</a> some sentence end.';
    const case2 = 'some sentence start (<a href="https://www.somelink1.com/slug?param1=foo&param2=bar">https://www.somelink1.com/slug?param1=foo&param2=bar</a>) some sentence end. some sentence start (<a href="https://www.somelink2.com/slug?param1=foo&param2=bar">https://www.somelink2.com/slug?param1=foo&param2=bar</a>) some sentence end.';
    const case3 = 'some sentence start [some link 3](https://www.somelink1.com/slug?param1=foo&param2=bar) some sentence end.';
    expect(convertHtmlLinkToMarkdown(case1)).toEqual('some sentence start [some link 1](https://www.somelink1.com/slug?param1=foo&param2=bar) some sentence end. some sentence start [some link 2](https://www.somelink2.com/slug?param1=foo&param2=bar) some sentence end.');
    expect(convertHtmlLinkToMarkdown(case2)).toEqual('some sentence start [https://www.somelink1.com/slug?param1=foo&param2=bar](https://www.somelink1.com/slug?param1=foo&param2=bar) some sentence end. some sentence start [https://www.somelink2.com/slug?param1=foo&param2=bar](https://www.somelink2.com/slug?param1=foo&param2=bar) some sentence end.');
    expect(convertHtmlLinkToMarkdown(case3)).toEqual('some sentence start [some link 3](https://www.somelink1.com/slug?param1=foo&param2=bar) some sentence end.');
  });
});
