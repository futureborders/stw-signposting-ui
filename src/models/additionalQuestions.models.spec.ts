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

import { getAdditionalQuestions } from './additionalQuestions.models';
import {
  translation,
  mockedAdditionalQuestionsData,
} from '../utils/mockedAdditionalQuestionsData';

describe('getAdditionalQuestions', () => {
  const { data } = mockedAdditionalQuestionsData;

  test('It should return the correct questions object', () => {
    const result = getAdditionalQuestions(data as any, translation as any);
    expect(result.questionsId).toEqual(['710', '360', '750', '712']);
    expect(result.questions.find((item: any) => item.questionId === '360').question).toEqual('question_Y251');
    expect(result.questions.find((item: any) => item.questionId === '750').question).toEqual('question ORGANICS');
    expect(result.questions.find((item: any) => item.questionId === '710').question).toEqual('question CITES');
    expect(result.questions.find((item: any) => item.questionId === '712').question).toEqual('question IAS');
  });

  test('It should return the correct questions object with Y252', () => {
    data.measures[0].measureOptions[0].options[2].certificateCode = 'Y252';
    const result = getAdditionalQuestions(data as any, translation as any);
    expect(result.questions.find((item: any) => item.questionId === '360').question).toEqual('question_Y252');
  });

  test('It should return the correct questions object with Y253', () => {
    data.measures[0].measureOptions[0].options[2].certificateCode = 'Y253';
    const result = getAdditionalQuestions(data as any, translation as any);
    expect(result.questions.find((item: any) => item.questionId === '360').question).toEqual('question_Y253');
  });

  test('It should return the correct questions object with Y256', () => {
    data.measures[0].measureOptions[0].options[2].certificateCode = 'Y256';
    const result = getAdditionalQuestions(data as any, translation as any);
    expect(result.questions.find((item: any) => item.questionId === '360').question).toEqual('question_Y256');
  });

  test('It should return the correct questions object with Y067', () => {
    data.measures[0].measureOptions[0].options[2].certificateCode = 'Y067';
    const result = getAdditionalQuestions(data as any, translation as any);
    expect(result.questions.find((item: any) => item.questionId === '360').question).toEqual('question_Y067');
  });

  test('It should return the correct questions object with Y501', () => {
    data.measures[0].measureOptions[0].options[2].certificateCode = 'Y501';
    const result = getAdditionalQuestions(data as any, translation as any);
    expect(result.questions.find((item: any) => item.questionId === '360').question).toEqual('question_Y501');
  });

  test('It should return null', () => {
    data.measures[0].measureOptions[0].options[2].certificateCode = 'XZY';
    data.measures[1].measureOptions[0].options[1].certificateCode = 'XZY';
    data.measures[2].measureOptions[0].options[1].certificateCode = 'XZY';
    data.measures[3].measureOptions[0].options[1].certificateCode = 'XZY';
    const result = getAdditionalQuestions(data as any, translation as any);
    expect(result.questions[0]).toEqual(null);
    expect(result.questions[1]).toEqual(null);
    expect(result.questions[2]).toEqual(null);
    expect(result.questions[3]).toEqual(null);
  });

  test('It should return null', () => {
    data.measures[0].measureOptions[0].options[1].certificateCode = 'Y257';
    data.measures[0].measureOptions[0].options[2].certificateCode = 'Y250';
    const result = getAdditionalQuestions(data as any, translation as any);
    expect(result.questions[0]).toEqual(null);
  });
});
