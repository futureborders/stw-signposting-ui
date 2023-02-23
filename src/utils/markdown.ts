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

import Translation from '../translation/en';

const collapsible = require('markdown-it-collapsible');
const container = require('markdown-it-container');

// eslint-disable-next-line global-require
export const markdown = require('markdown-it')().use(collapsible).use(container, 'inset', {
  validate(params: any) {
    return params === '+';
  },
  render(tokens: any, idx: any) {
    if (tokens[idx].nesting === 1) {
      return '<div class="govuk-inset-text">';
    }
    return '</div>';
  },
});

const defaultRender = (tokens: any, idx: any, options: any, env: any, self: any) => {
  if (tokens[idx].type === 'link_close') {
    return ` ${Translation.common.accessibility.opensNewTab}${self.renderToken(tokens, idx, options)}`;
  }
  return self.renderToken(tokens, idx, options);
};

markdown.renderer.rules.heading_open = (tokens: any, idx: any, options: any, env: any, self: any) => {
  const classDoesNotExist = (tokens[idx].attrIndex('class') < 0);

  if (classDoesNotExist) {
    switch (tokens[idx].tag) {
      case 'h1':
        tokens[idx].attrPush(['class', 'govuk-heading-xl']);
        break;
      case 'h2':
        tokens[idx].attrPush(['class', 'govuk-heading-l']);
        break;
      case 'h3':
        tokens[idx].attrPush(['class', 'govuk-heading-m']);
        break;
      case 'h4':
        tokens[idx].attrPush(['class', 'govuk-heading-s']);
        break;
      default:
        tokens[idx].attrPush(['class', 'govuk-body']);
    }
  }
  return defaultRender(tokens, idx, options, env, self);
};

markdown.renderer.rules.link_open = (tokens: any, idx: any, options: any, env: any, self: any) => {
  const aIndex = tokens[idx].attrIndex('target');
  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']);
    tokens[idx].attrPush(['rel', 'noopener noreferrer']);
  } else {
    // eslint-disable-next-line no-param-reassign
    tokens[idx].attrs[aIndex][1] = '_blank';
  }

  return defaultRender(tokens, idx, options, env, self);
};

markdown.renderer.rules.link_close = (tokens: any, idx: any, options: any, env: any, self: any) => defaultRender(tokens, idx, options, env, self);

markdown.renderer.rules.bullet_list_open = (tokens: any, idx: any, options: any, env: any, self: any) => {
  const classDoesNotExist = (tokens[idx].attrIndex('class') < 0);
  if (classDoesNotExist) {
    tokens[idx].attrPush(['class', 'govuk-list govuk-list--bullet']);
  }
  return defaultRender(tokens, idx, options, env, self);
};

markdown.renderer.rules.ordered_list_open = (tokens: any, idx: any, options: any, env: any, self: any) => {
  const classDoesNotExist = (tokens[idx].attrIndex('class') < 0);
  if (classDoesNotExist) {
    tokens[idx].attrPush(['class', 'govuk-list govuk-list--number']);
  }
  return defaultRender(tokens, idx, options, env, self);
};

// eslint-disable-next-line func-names
markdown.renderer.rules.paragraph_open = (tokens: any, idx: any, options: any, env: any, self: any) => {
  const classDoesNotExist = (tokens[idx].attrIndex('class') < 0);
  if (classDoesNotExist) {
    tokens[idx].attrPush(['class', 'govuk-body']);
  }
  return defaultRender(tokens, idx, options, env, self);
};

markdown.renderer.rules.collapsible_summary = (tokens: any, idx: any, options: any, env: any, self: any) => `${'<summary class="govuk-details__summary">\n'
  + '<span class="govuk-details__summary-text">'}${self.renderInline(tokens[idx].children, options, env)}</span>\n`
  + '</summary><div class="govuk-details__text">';

markdown.renderer.rules.collapsible_open = (tokens: any, idx: any, options: any, env: any, self: any) => {
  const classDoesNotExist = (tokens[idx].attrIndex('class') < 0);
  if (classDoesNotExist) {
    tokens[idx].attrPush(['class', 'govuk-details']);
    tokens[idx].attrPush(['data-module', 'govuk-details']);
  }
  return defaultRender(tokens, idx, options, env, self);
};

markdown.renderer.rules.collapsible_close = (tokens: any, idx: any, options: any, env: any, self: any) => `</div>${self.renderToken(tokens, idx, options)}`;

export default markdown;
