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

import {
  display999lFragment, display999lHeader, display999lDescription, display999lNoMargin,
} from './display999lFragment';
import Translation from '../translation/en';

describe('display999lFragment', () => {
  test('It should convert the {999L} to display999lFragment as html when has999l', () => {
    expect(display999lFragment(true, 'some content {999l} somme other content', Translation)).toEqual(
      `some content <h4 class="govuk-heading-s">${Translation.page.manageThisTrade['999L'].header}</h4><p class="govuk-body">${Translation.page.manageThisTrade['999L'].body}</p> somme other content`,
    );
  });

  test('It should not convert the {999L} to display999lFragment as html does not have has999l', () => {
    expect(display999lFragment(false, 'some content{999l} somme other content', Translation)).toEqual(
      'some content somme other content',
    );
  });

  test('It should display "some content somme other content"', () => {
    expect(display999lFragment(false, 'some content somme other content', Translation)).toEqual(
      'some content somme other content',
    );
  });
});

describe('display999lHeader', () => {
  test('It should append waiver applies when 999L', () => {
    expect(display999lHeader('999L', Translation)).toEqual(`999L ${Translation.page.manageThisTrade.waiverApplies}`);
  });
  test('It should not append waiver', () => {
    expect(display999lHeader('someCertificateCode', Translation)).toEqual('someCertificateCode');
  });
});

describe('display999lDescription', () => {
  test('It should append display empty string when 999L', () => {
    expect(display999lDescription('999L', 'some description')).toEqual('');
  });
  test('It should append display "some description"', () => {
    expect(display999lDescription('someCertificateCode', 'some description')).toEqual('some description');
  });
});

describe('display999lNoMargin', () => {
  test('It should display and empty string when 999L', () => {
    expect(display999lNoMargin('999L', 'someCssClass')).toEqual('');
  });
  test('It should append display "someCssClass"', () => {
    expect(display999lNoMargin('someCertificateCode', 'someCssClass')).toEqual('someCssClass');
  });
});
