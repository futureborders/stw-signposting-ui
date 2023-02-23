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

import { UserType, TypeOfTrade } from '../interfaces/enums.interface';
import {
  getUserType, addH2Heading, has999l, getMeasuresAsHtml,
} from './manageThisTrade.models';
import {
  translation,
} from '../utils/mockedData';
import { Measures, MeasuresEntity } from '../interfaces/measure.interface';

import { mockedRestrictiveMeasures, mockedRestrictiveMeasuresNo999L } from '../features/export/checkLicencesAndRestrictions/mockedData';

describe('Testing manageThisTrade.models', () => {
  describe('getContentUserType', () => {
    test('It should return the correct UserType', () => {
      expect(getUserType('true', 'no')).toBe(UserType.nonDeclaringTrader);
      expect(getUserType('true', 'yes')).toBe(UserType.declaringTrader);
      expect(getUserType('false', '')).toBe(UserType.agent);
    });
  });

  describe('addH2Heading', () => {
    test('It should add a h2 in markdown', () => {
      expect(addH2Heading('Some heading')).toBe('## Some heading');
    });
    test('It should return the heading as is', () => {
      expect(addH2Heading('## Some heading')).toBe('## Some heading');
    });
    test('It should return empty string', () => {
      expect(addH2Heading('')).toBe('');
    });
  });

  describe('has999l', () => {
    test('It should return true from restrictiveMeasures data', () => {
      expect(has999l(mockedRestrictiveMeasures.data.measures as MeasuresEntity[])).toBe(true);
    });
    test('It should return false from restrictiveMeasures data', () => {
      expect(has999l(mockedRestrictiveMeasuresNo999L.data.measures as MeasuresEntity[])).toBe(false);
    });
  });

  describe('getMeasuresAsHtml', () => {
    test('It should return correct html for imports', () => {
      const result = getMeasuresAsHtml(mockedRestrictiveMeasures.data as Measures, translation, UserType.declaringTrader, {} as any, TypeOfTrade.import);
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">Some Measure heading 1</p>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">followRules text</p>'));
      expect(result).toEqual(expect.stringContaining('<h3 class="govuk-heading-m">Rules that apply to your goods</h3>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s govuk-!-margin-bottom-0">C400</h4>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">Other certificates: Presentation of the required &quot;CITES&quot; certificate</p>'));
      expect(result).toEqual(expect.stringContaining('<h3 class="govuk-heading-m">When rules are different or do not apply</h3>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s govuk-!-margin-bottom-0">Y900</h4>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">Particular provisions: Declared goods do not belong to the Washington Convention (CITES)</p>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s ">999L waiver also applies</h4>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">Some Measure heading 2</p>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">followRules text</p>'));
      expect(result).toEqual(expect.stringContaining('<h3 class="govuk-heading-m">Rules that apply to your goods</h3>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s govuk-!-margin-bottom-0">C673</h4>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">Other certificates: Catch certificate</p>'));
      expect(result).toEqual(expect.stringContaining('<h3 class="govuk-heading-m">When rules are different or do not apply</h3>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s govuk-!-margin-bottom-0">Y927</h4>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">Particular provisions: Catch Certificate not required - see footnote for exempted goods.</p>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s ">999L waiver also applies</h4>'));
    });
    test('It should return correct html for exports', () => {
      const result = getMeasuresAsHtml(mockedRestrictiveMeasures.data as Measures, translation, UserType.declaringTrader, {} as any, TypeOfTrade.export);
      expect(result).toEqual(expect.stringContaining('<h2 class="govuk-heading-l">Some Measure heading 1</h2>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">followRules export text</p>'));
      expect(result).toEqual(expect.stringContaining('<h3 class="govuk-heading-m">Rules that apply to your goods</h3>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s govuk-!-margin-bottom-0">C400</h4>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">Other certificates: Presentation of the required &quot;CITES&quot; certificate</p>'));
      expect(result).toEqual(expect.stringContaining('<h3 class="govuk-heading-m">When rules are different or do not apply</h3>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s govuk-!-margin-bottom-0">Y900</h4>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">Particular provisions: Declared goods do not belong to the Washington Convention (CITES)</p>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s ">999L waiver also applies</h4>'));
      expect(result).toEqual(expect.stringContaining('<h2 class="govuk-heading-l">Some Measure heading 2</h2>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">followRules export text</p>'));
      expect(result).toEqual(expect.stringContaining('<h3 class="govuk-heading-m">Rules that apply to your goods</h3>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s govuk-!-margin-bottom-0">C673</h4>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">Other certificates: Catch certificate</p>'));
      expect(result).toEqual(expect.stringContaining('<h3 class="govuk-heading-m">When rules are different or do not apply</h3>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s govuk-!-margin-bottom-0">Y927</h4>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">Particular provisions: Catch Certificate not required - see footnote for exempted goods.</p>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s ">999L waiver also applies</h4>'));
    });
  });
});
