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
import { Request, Response } from 'express';
import validateAdditionalQuestion from './validateAdditionalQuestion';
import Translation from '../translation/en';
import { MeasureType } from '../interfaces/enums.interface';

describe('validateAdditionalQuestion', () => {
  test('It should not return an error', () => {
    const error = validateAdditionalQuestion('additional-question=710&710=yes&another=value', Translation, { query: {} } as Request, { locals: { queryParams: '' } as any } as Response, '');
    expect(error).toBeNull();
  });
  test('It should return error for CITES question', () => {
    const error = validateAdditionalQuestion('additional-question=710&another=value', Translation, { query: {} } as Request, { locals: { queryParams: '' } as any } as Response, '');
    expect(error).not.toBeNull();
    expect(error?.text).toEqual(Translation.page.additionalQuestions[MeasureType.CITES].errorText);
  });
  test('It should return error for ORGANIC question', () => {
    const error = validateAdditionalQuestion('additional-question=750&another=value', Translation, { query: {} } as Request, { locals: { queryParams: '' } as any } as Response, '');
    expect(error).not.toBeNull();
    expect(error?.text).toEqual(Translation.page.additionalQuestions[MeasureType.ORGANICS].errorText);
  });
  test('It should return error for PHYTOSANITARY question for Y251', () => {
    const error = validateAdditionalQuestion('additional-question=360&another=value', Translation, { query: {} } as Request, { locals: { queryParams: '' } as any } as Response, 'Y251');
    expect(error).not.toBeNull();
    expect(error?.text).toEqual(Translation.page.additionalQuestions[MeasureType.PHYTOSANITARY].Y251.errorText);
  });
});
