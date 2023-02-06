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

import { UserType, TypeOfTrade } from '../interfaces/enums.interface';
import {
  getUserType, addH2Heading, has999l, getMeasuresAsHtml, getConditions, displaySubtypeHeader, sortFilteredMeasuresByMeasureId,
} from './measures.models';
import {
  translation,
} from '../utils/mockedData';
import {
  Measures, MeasuresEntity, MeasureOptionType, MeasureOptionSubtype, OptionsEntity,
} from '../interfaces/measure.interface';

import {
  mockedRestrictiveMeasures,
  mockedRestrictiveMeasuresNo999L,
  mockedRestrictiveMeasuresOneException,
  mockedRestrictiveMeasuresMultipleThreshold,
  mockedRestrictiveMeasuresMultipleExceptions,
} from '../features/export/checkLicencesAndRestrictions/mockedData';

describe('getContentUserType', () => {
  test('It should return the correct UserType', () => {
    expect(getUserType('yes', 'no')).toBe(UserType.nonDeclaringTrader);
    expect(getUserType('yes', 'yes')).toBe(UserType.declaringTrader);
    expect(getUserType('no', '')).toBe(UserType.agent);
    expect(getUserType('neither', 'yes')).toBe(UserType.declaringTrader);
  });
});

describe('Testing measures.models', () => {
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
      expect(result).toEqual(expect.stringContaining('<h2 class="govuk-heading-l">Some Measure heading 1</h2>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">followRules text</p>'));
      expect(result).toEqual(expect.stringContaining('<h3 class="govuk-heading-m">Rules that apply to your goods</h3>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s govuk-!-margin-bottom-0">C400</h4>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">Other certificates: Presentation of the required &quot;CITES&quot; certificate</p>'));
      expect(result).toEqual(expect.stringContaining('<h3 class="govuk-heading-m">You must meet this condition</h3>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s govuk-!-margin-bottom-0">Y900</h4>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">Particular provisions: Declared goods do not belong to the Washington Convention (CITES)</p>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s ">999L waiver also applies</h4>'));
      expect(result).toEqual(expect.stringContaining('<h2 class="govuk-heading-l">Some Measure heading 2</h2>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">followRules text</p>'));
      expect(result).toEqual(expect.stringContaining('<h3 class="govuk-heading-m">Rules that apply to your goods</h3>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s govuk-!-margin-bottom-0">C673</h4>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">Other certificates: Catch certificate</p>'));
      expect(result).toEqual(expect.stringContaining('<h3 class="govuk-heading-m">You must meet this condition</h3>'));
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
      expect(result).toEqual(expect.stringContaining('<h3 class="govuk-heading-m">You must meet this condition</h3>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s govuk-!-margin-bottom-0">Y900</h4>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">Particular provisions: Declared goods do not belong to the Washington Convention (CITES)</p>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s ">999L waiver also applies</h4>'));
      expect(result).toEqual(expect.stringContaining('<h2 class="govuk-heading-l">Some Measure heading 2</h2>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">followRules export text</p>'));
      expect(result).toEqual(expect.stringContaining('<h3 class="govuk-heading-m">Rules that apply to your goods</h3>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s govuk-!-margin-bottom-0">C673</h4>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">Other certificates: Catch certificate</p>'));
      expect(result).toEqual(expect.stringContaining('<h3 class="govuk-heading-m">You must meet this condition</h3>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s govuk-!-margin-bottom-0">Y927</h4>'));
      expect(result).toEqual(expect.stringContaining('<p class="govuk-body">Particular provisions: Catch Certificate not required - see footnote for exempted goods.</p>'));
      expect(result).toEqual(expect.stringContaining('<h4 class="govuk-heading-s ">999L waiver also applies</h4>'));
    });

    test('It should return only one header when multiple thresholds', () => {
      const result = getMeasuresAsHtml(mockedRestrictiveMeasuresMultipleThreshold.data as Measures, translation, UserType.declaringTrader, {} as any, TypeOfTrade.export);
      expect(result).toEqual(expect.stringMatching(/<h4 class="govuk-heading-s govuk-!-margin-bottom-0">Threshold conditions apply:<\/h4>\s*<p class="govuk-body">descriptionOverlay 1<\/p>\s*<p class="govuk-body">descriptionOverlay 2<\/p>/g));
    });

    test('It should not contain a second "When rules are different or do not apply" for imports', () => {
      const result = getMeasuresAsHtml(mockedRestrictiveMeasures.data as Measures, translation, UserType.declaringTrader, {} as any, TypeOfTrade.import);
      expect(result).toEqual(expect.not.stringMatching(/When rules are different or do not apply<\/h3>\s*<h4 class="govuk-heading-s ">999L waiver also applies/g));
    });

    test('It should not contain a second "When rules are different or do not apply" for exports', () => {
      const result = getMeasuresAsHtml(mockedRestrictiveMeasures.data as Measures, translation, UserType.declaringTrader, {} as any, TypeOfTrade.export);
      expect(result).toEqual(expect.not.stringMatching(/When rules are different or do not apply<\/h3>\s*<h4 class="govuk-heading-s ">999L waiver also applies/g));
    });

    test('It should contain "999L waiver applies" when only one waiver', () => {
      const result = getMeasuresAsHtml(mockedRestrictiveMeasuresOneException.data as Measures, translation, UserType.declaringTrader, {} as any, TypeOfTrade.export);
      expect(result).toEqual(expect.stringMatching('999L waiver applies'));
    });

    test('It should contain the heading "You must meet one of these two conditions"', () => {
      const result = getMeasuresAsHtml(mockedRestrictiveMeasuresMultipleExceptions.data as Measures, translation, UserType.declaringTrader, {} as any, TypeOfTrade.import);
      expect(result).toEqual(expect.stringContaining('<h3 class="govuk-heading-m">You must meet one of these two conditions</h3>'));
    });
  });

  describe('getConditions', () => {
    test('It should return correct message (You must meet one of these two conditions)', () => {
      expect(getConditions(
        2,
        translation,
        false,
        {
          id: '410',
          measureTypeSeries: 'B',
          descriptionOverlay: '## Veterinary controls',
          description: '## Veterinary controls',
          measureOptions: [
            {
              options: [
                {
                  certificateCode: 'N853',
                  type: MeasureOptionType.CERTIFICATE,
                  descriptionOverlay: 'descriptionOverlay N853',
                },
              ],
            },
          ],
          measureType: 'RESTRICTIVE',
        },
        0,
      )).toEqual(expect.stringContaining('You must meet one of these two conditions'));
    });

    test('It should return correct message (You must meet one of these five conditions)', () => {
      expect(getConditions(
        6,
        translation,
        false,
        {
          id: '410',
          measureTypeSeries: 'B',
          descriptionOverlay: '## Veterinary controls',
          description: '## Veterinary controls',
          measureOptions: [
            {
              options: [
                {
                  certificateCode: '999L',
                  type: MeasureOptionType.EXCEPTION,
                  descriptionOverlay: 'descriptionOverlay 999L',
                },
              ],
            },
          ],
          measureType: 'RESTRICTIVE',
        },
        0,
      )).toEqual(expect.stringContaining('You must meet one of these five conditions'));
    });

    test('It should return correct message (Rules that apply to your goods)', () => {
      expect(getConditions(
        1,
        translation,
        true,
        {
          id: '410',
          measureTypeSeries: 'B',
          descriptionOverlay: '## Veterinary controls',
          description: '## Veterinary controls',
          measureOptions: [
            {
              options: [
                {
                  certificateCode: '999L',
                  type: MeasureOptionType.EXCEPTION,
                  descriptionOverlay: 'descriptionOverlay 999L',
                },
              ],
            },
          ],
          measureType: 'RESTRICTIVE',
        },
        0,
      )).toEqual(expect.stringContaining('Rules that apply to your goods'));
    });

    test('It should return correct message (You must meet this condition)', () => {
      expect(getConditions(
        1,
        translation,
        false,
        {
          id: '410',
          measureTypeSeries: 'B',
          descriptionOverlay: '## Veterinary controls',
          description: '## Veterinary controls',
          measureOptions: [
            {
              options: [
                {
                  certificateCode: 'ABC',
                  type: MeasureOptionType.CERTIFICATE,
                  descriptionOverlay: 'descriptionOverlay ABC',
                },
              ],
            },
          ],
          measureType: 'RESTRICTIVE',
        },
        0,
      )).toEqual(expect.stringContaining('You must meet this condition'));
    });

    test('It should return empty string', () => {
      expect(getConditions(
        0,
        translation,
        false,
        {
          id: '410',
          measureTypeSeries: 'B',
          descriptionOverlay: '## Veterinary controls',
          description: '## Veterinary controls',
          measureOptions: [],
          measureType: 'RESTRICTIVE',
        },
        0,
      )).toEqual(expect.stringContaining(''));
    });
  });

  describe('getConditions', () => {
    test('It should return correct message (You must meet one of these two conditions)', () => {
      expect(getConditions(
        2,
        translation,
        false,
        {
          id: '410',
          measureTypeSeries: 'B',
          descriptionOverlay: '## Veterinary controls',
          description: '## Veterinary controls',
          measureOptions: [
            {
              options: [
                {
                  certificateCode: 'N853',
                  type: MeasureOptionType.CERTIFICATE,
                  descriptionOverlay: 'descriptionOverlay N853',
                },
              ],
            },
          ],
          measureType: 'RESTRICTIVE',
        },
        0,
      )).toEqual(expect.stringContaining('You must meet one of these two conditions'));
    });

    test('It should return correct message (You must meet one of these five conditions)', () => {
      expect(getConditions(
        6,
        translation,
        false,
        {
          id: '410',
          measureTypeSeries: 'B',
          descriptionOverlay: '## Veterinary controls',
          description: '## Veterinary controls',
          measureOptions: [
            {
              options: [
                {
                  certificateCode: '999L',
                  type: MeasureOptionType.EXCEPTION,
                  descriptionOverlay: 'descriptionOverlay 999L',
                },
              ],
            },
          ],
          measureType: 'RESTRICTIVE',
        },
        0,
      )).toEqual(expect.stringContaining('You must meet one of these five conditions'));
    });

    test('It should return correct message (Rules that apply to your goods)', () => {
      expect(getConditions(
        1,
        translation,
        true,
        {
          id: '410',
          measureTypeSeries: 'B',
          descriptionOverlay: '## Veterinary controls',
          description: '## Veterinary controls',
          measureOptions: [
            {
              options: [
                {
                  certificateCode: '999L',
                  type: MeasureOptionType.EXCEPTION,
                  descriptionOverlay: 'descriptionOverlay 999L',
                },
              ],
            },
          ],
          measureType: 'RESTRICTIVE',
        },
        0,
      )).toEqual(expect.stringContaining('Rules that apply to your goods'));
    });

    test('It should return correct message (You must meet this condition)', () => {
      expect(getConditions(
        1,
        translation,
        false,
        {
          id: '410',
          measureTypeSeries: 'B',
          descriptionOverlay: '## Veterinary controls',
          description: '## Veterinary controls',
          measureOptions: [
            {
              options: [
                {
                  certificateCode: 'ABC',
                  type: MeasureOptionType.CERTIFICATE,
                  descriptionOverlay: 'descriptionOverlay ABC',
                },
              ],
            },
          ],
          measureType: 'RESTRICTIVE',
        },
        0,
      )).toEqual(expect.stringContaining('You must meet this condition'));
    });

    test('It should return empty string', () => {
      expect(getConditions(
        0,
        translation,
        false,
        {
          id: '410',
          measureTypeSeries: 'B',
          descriptionOverlay: '## Veterinary controls',
          description: '## Veterinary controls',
          measureOptions: [],
          measureType: 'RESTRICTIVE',
        },
        0,
      )).toEqual(expect.stringContaining(''));
    });
  });

  describe('getConditions', () => {
    test('It should return correct message (You must meet one of these two conditions)', () => {
      expect(getConditions(
        2,
        translation,
        false,
        {
          id: '410',
          measureTypeSeries: 'B',
          descriptionOverlay: '## Veterinary controls',
          description: '## Veterinary controls',
          measureOptions: [
            {
              options: [
                {
                  certificateCode: 'N853',
                  type: MeasureOptionType.CERTIFICATE,
                  descriptionOverlay: 'descriptionOverlay N853',
                },
              ],
            },
          ],
          measureType: 'RESTRICTIVE',
        },
        0,
      )).toEqual(expect.stringContaining('You must meet one of these two conditions'));
    });

    test('It should return correct message (You must meet one of these five conditions)', () => {
      expect(getConditions(
        6,
        translation,
        false,
        {
          id: '410',
          measureTypeSeries: 'B',
          descriptionOverlay: '## Veterinary controls',
          description: '## Veterinary controls',
          measureOptions: [
            {
              options: [
                {
                  certificateCode: '999L',
                  type: MeasureOptionType.EXCEPTION,
                  descriptionOverlay: 'descriptionOverlay 999L',
                },
              ],
            },
          ],
          measureType: 'RESTRICTIVE',
        },
        0,
      )).toEqual(expect.stringContaining('You must meet one of these five conditions'));
    });

    test('It should return correct message (Rules that apply to your goods)', () => {
      expect(getConditions(
        1,
        translation,
        true,
        {
          id: '410',
          measureTypeSeries: 'B',
          descriptionOverlay: '## Veterinary controls',
          description: '## Veterinary controls',
          measureOptions: [
            {
              options: [
                {
                  certificateCode: '999L',
                  type: MeasureOptionType.EXCEPTION,
                  descriptionOverlay: 'descriptionOverlay 999L',
                },
              ],
            },
          ],
          measureType: 'RESTRICTIVE',
        },
        0,
      )).toEqual(expect.stringContaining('Rules that apply to your goods'));
    });

    test('It should return correct message (You must meet this condition)', () => {
      expect(getConditions(
        1,
        translation,
        false,
        {
          id: '410',
          measureTypeSeries: 'B',
          descriptionOverlay: '## Veterinary controls',
          description: '## Veterinary controls',
          measureOptions: [
            {
              options: [
                {
                  certificateCode: 'ABC',
                  type: MeasureOptionType.CERTIFICATE,
                  descriptionOverlay: 'descriptionOverlay ABC',
                },
              ],
            },
          ],
          measureType: 'RESTRICTIVE',
        },
        0,
      )).toEqual(expect.stringContaining('You must meet this condition'));
    });

    test('It should return empty string', () => {
      expect(getConditions(
        0,
        translation,
        false,
        {
          id: '410',
          measureTypeSeries: 'B',
          descriptionOverlay: '## Veterinary controls',
          description: '## Veterinary controls',
          measureOptions: [],
          measureType: 'RESTRICTIVE',
        },
        0,
      )).toEqual(expect.stringContaining(''));
    });
  });

  describe('displaySubtypeHeader', () => {
    test('It should return "Threshold conditions apply:"', () => {
      const thresholds: OptionsEntity[] = [
        {
          type: MeasureOptionType.THRESHOLD,
          subtype: MeasureOptionSubtype.PRICE_PER_UNIT_BASED,
          unit: 'item',
          conditionCode: 'E',
          descriptionOverlay: 'descriptionOverlay 1',
        },
        {
          type: MeasureOptionType.THRESHOLD,
          subtype: MeasureOptionSubtype.PRICE_PER_UNIT_BASED,
          unit: 'litre',
          conditionCode: 'E',
          descriptionOverlay: 'descriptionOverlay 2',
        },
      ];
      const result = displaySubtypeHeader(translation, true, thresholds);
      expect(result).toEqual('Threshold conditions apply:');
    });
    test('It should return "Price threshold applies"', () => {
      const thresholds: OptionsEntity[] = [
        {
          type: MeasureOptionType.THRESHOLD,
          subtype: MeasureOptionSubtype.PRICE_BASED,
          unit: 'item',
          descriptionOverlay: 'descriptionOverlay 1',
        },
      ];
      const result = displaySubtypeHeader(translation, false, thresholds);
      expect(result).toEqual('Price threshold applies');
    });

    test('It should return "Volume threshold applies"', () => {
      const thresholds: OptionsEntity[] = [
        {
          type: MeasureOptionType.THRESHOLD,
          subtype: MeasureOptionSubtype.VOLUME_BASED,
          conditionCode: 'E',
          descriptionOverlay: 'descriptionOverlay 1',
        },
      ];
      const result = displaySubtypeHeader(translation, false, thresholds);
      expect(result).toEqual('Volume threshold applies');
    });

    test('It should return "Unit threshold applies"', () => {
      const thresholds: OptionsEntity[] = [
        {
          type: MeasureOptionType.THRESHOLD,
          subtype: MeasureOptionSubtype.UNIT_BASED,
          conditionCode: 'E',
          descriptionOverlay: 'descriptionOverlay 1',
        },
      ];
      const result = displaySubtypeHeader(translation, false, thresholds);
      expect(result).toEqual('Unit threshold applies');
    });
    test('It should return "Weight threshold applies"', () => {
      const thresholds: OptionsEntity[] = [
        {
          type: MeasureOptionType.THRESHOLD,
          subtype: MeasureOptionSubtype.WEIGHT_BASED,
          conditionCode: 'E',
          descriptionOverlay: 'descriptionOverlay 1',
        },
      ];
      const result = displaySubtypeHeader(translation, false, thresholds);
      expect(result).toEqual('Weight threshold applies');
    });
    test('It should return "Price / some unit threshold applies"', () => {
      const thresholds: OptionsEntity[] = [
        {
          type: MeasureOptionType.THRESHOLD,
          subtype: MeasureOptionSubtype.PRICE_PER_UNIT_BASED,
          unit: 'some unit',
          conditionCode: 'E',
          descriptionOverlay: 'descriptionOverlay 1',
        },
      ];
      const result = displaySubtypeHeader(translation, false, thresholds);
      expect(result).toEqual('Price / some unit threshold applies');
    });
    test('It should return an empty string', () => {
      const thresholds: OptionsEntity[] = [
        {
          type: MeasureOptionType.THRESHOLD,
          descriptionOverlay: 'descriptionOverlay 1',
        },
      ];
      const result = displaySubtypeHeader(translation, false, thresholds);
      expect(result).toEqual('');
    });
  });

  describe('sortFilteredMeasuresByMeasureId', () => {
    test('It should return sorted array by id', () => {
      const result = sortFilteredMeasuresByMeasureId(mockedRestrictiveMeasures.data.measures);
      expect(result.map((item: any) => item.id)).toEqual(['715', '719', '800']);
    });
  });
});
