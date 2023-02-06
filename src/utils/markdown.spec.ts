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

import { markdown } from './markdown';

const translation = {
  common: {
    accessibility: {
      opensNewTab: '(opens in new tab)',
    },
    numbers: {
      1: 'one',
    },
  },
};

describe('Testing markdown', () => {
  test('It should return h1', () => {
    expect(markdown.render('# h1 Heading', { translation })).toEqual(
      expect.stringContaining('<h1 class="govuk-heading-xl">h1 Heading</h1>'),
    );
  });

  test('It should return h2', () => {
    expect(markdown.render('## h2 Heading', { translation })).toEqual(
      expect.stringContaining('<h2 class="govuk-heading-l">h2 Heading</h2>'),
    );
  });

  test('It should return h3', () => {
    expect(markdown.render('### h3 Heading', { translation })).toEqual(
      expect.stringContaining('<h3 class="govuk-heading-m">h3 Heading</h3>'),
    );
  });

  test('It should return h4', () => {
    expect(markdown.render('#### h4 Heading', { translation })).toEqual(
      expect.stringContaining('<h4 class="govuk-heading-s">h4 Heading</h4>'),
    );
  });

  test('It should return ordered list', () => {
    expect(markdown.render('1. l1\n2. l2\n3. l2', { translation })).toEqual(
      expect.stringContaining('<ol class="govuk-list govuk-list--number">\n'
    + '<li>l1</li>\n'
    + '<li>l2</li>\n'
    + '<li>l2</li>\n'
    + '</ol>\n'),
    );
  });

  test('It should return unordered list', () => {
    expect(markdown.render('+ l1\n+ l2\n+ l2', { translation })).toEqual(
      expect.stringContaining('<ul class="govuk-list govuk-list--bullet">\n'
    + '<li>l1</li>\n'
    + '<li>l2</li>\n'
    + '<li>l2</li>\n'
    + '</ul>\n'),
    );
  });

  test('It should return link', () => {
    expect(markdown.render('[link text](http://some-link.com)', { translation })).toEqual(
      expect.stringContaining('<p class="govuk-body"><a href="http://some-link.com" target="_blank" rel="noopener noreferrer">link text <span class="govuk-!-display-none-print">(opens in new tab)</span></a></p>'),
    );
  });

  test('It should return p', () => {
    expect(markdown.render('some paragraph', { translation })).toEqual(
      expect.stringContaining('<p class="govuk-body">some paragraph</p>'),
    );
  });

  test('It should return details summary', () => {
    const response = markdown.render('+++ Some details link\nSome details hidden text\n+++', { translation });
    expect(response).toEqual(expect.stringContaining('<details class="govuk-details" data-module="govuk-details">\n'
      + '<summary class="govuk-details__summary">\n'
      + '<span class="govuk-details__summary-text">Some details link</span>\n'
      + '</summary><div class="govuk-details__text"><p class="govuk-body">Some details hidden text</p>\n'
      + '</div></details>\n'));
  });

  test('It should return blockquote', () => {
    const text = ':::+\nSome text here\n:::';
    expect(markdown.render(text, { translation })).toEqual(
      expect.stringContaining('<div class="govuk-inset-text"><p class="govuk-body">Some text here</p>\n</div>'),
    );
  });

  test('It should replace the period after the </a> tag', () => {
    const text = '[link text.](http://some-link.com)';
    expect(markdown.render(text, { translation })).toEqual(
      expect.stringContaining('<a href="http://some-link.com" target="_blank" rel="noopener noreferrer">link text <span class="govuk-!-display-none-print">(opens in new tab)</span></a>.'),
    );
  });

  test('It should return lang="en"', () => {
    translation.common.numbers['1'] = 'un';
    expect(markdown.render('# h1 Heading', { translation, isTranslated: false })).toEqual(
      expect.stringContaining('<h1 lang="en" class="govuk-heading-xl">h1 Heading</h1>'),
    );

    expect(markdown.render('## h2 Heading', { translation, isTranslated: false })).toEqual(
      expect.stringContaining('<h2 lang="en" class="govuk-heading-l">h2 Heading</h2>'),
    );

    expect(markdown.render('### h3 Heading', { translation, isTranslated: false })).toEqual(
      expect.stringContaining('<h3 lang="en" class="govuk-heading-m">h3 Heading</h3>'),
    );

    expect(markdown.render('#### h4 Heading', { translation, isTranslated: false })).toEqual(
      expect.stringContaining('<h4 lang="en" class="govuk-heading-s">h4 Heading</h4>'),
    );

    expect(markdown.render('[link text](http://some-link.com)', { translation, isTranslated: false })).toEqual(
      expect.stringContaining('<p lang="en" class="govuk-body"><a href="http://some-link.com" target="_blank" rel="noopener noreferrer">link text <span class="govuk-!-display-none-print" lang="cy">(opens in new tab)</span></a></p>'),
    );

    expect(markdown.render('+ l1\n+ l2\n+ l2', { translation, isTranslated: false })).toEqual(
      expect.stringContaining('<ul lang="en" class="govuk-list govuk-list--bullet">\n'
    + '<li>l1</li>\n'
    + '<li>l2</li>\n'
    + '<li>l2</li>\n'
    + '</ul>\n'),
    );

    expect(markdown.render('1. l1\n2. l2\n3. l2', { translation, isTranslated: false })).toEqual(
      expect.stringContaining('<ol lang="en" class="govuk-list govuk-list--number">\n'
    + '<li>l1</li>\n'
    + '<li>l2</li>\n'
    + '<li>l2</li>\n'
    + '</ol>\n'),
    );

    const response = markdown.render('+++ Some details link\nSome details hidden text\n+++', { translation, isTranslated: false });
    expect(response).toEqual(expect.stringContaining('<details lang="en" class="govuk-details" data-module="govuk-details">\n'
      + '<summary class="govuk-details__summary">\n'
      + '<span class="govuk-details__summary-text">Some details link</span>\n'
      + '</summary><div class="govuk-details__text"><p lang="en" class="govuk-body">Some details hidden text</p>\n'
      + '</div></details>\n'));
  });
});
