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

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */

import {
  Request, Response, NextFunction,
} from 'express';

import { cloneDeep } from 'lodash';
import { LANGUAGE } from '../interfaces/enums.interface';
import en from '../translation/en';
import cy from '../translation/cy';

const messages: any = {};

messages[LANGUAGE.en] = en;
messages[LANGUAGE.cy] = cloneDeep(en);

const copyMessages = (targetLanguageMessages: any, overrideLanguageMessages: any) => {
  if (typeof targetLanguageMessages !== 'object') {
    return;
  }

  for (const key in targetLanguageMessages) {
    if (overrideLanguageMessages[key] === undefined && typeof targetLanguageMessages[key] === 'string' && !targetLanguageMessages[key].startsWith('http', 0)) {
      overrideLanguageMessages[key] = `<span lang='en'>${targetLanguageMessages[key]}</span>`;
    }

    if (overrideLanguageMessages[key] === undefined && typeof targetLanguageMessages[key] === 'function') {
      overrideLanguageMessages[key] = eval(targetLanguageMessages[key].toString().replace(/`/, '`<span lang="en">').replace(/`([^`]*)$/, '</span>`' + '$1'));
    }

    if (overrideLanguageMessages[key] === undefined && typeof targetLanguageMessages[key] === 'object') {
      overrideLanguageMessages[key] = JSON.parse(JSON.stringify(targetLanguageMessages[key]).replace(/:"/g, ':"<span lang=\'en\'>').replace(/",/g, '</span>",').replace(/"}/g, '</span>"}'));
    }

    if (!Object.hasOwnProperty.call(targetLanguageMessages, key)
      || !Object.hasOwnProperty.call(overrideLanguageMessages, key)) {
      continue;
    }

    if (typeof targetLanguageMessages[key] === 'object') {
      copyMessages(targetLanguageMessages[key], overrideLanguageMessages[key]);
    } else if (overrideLanguageMessages[key] !== undefined) {
      targetLanguageMessages[key] = overrideLanguageMessages[key];
    }
  }
};

// Replace any missing keys in Welsh with the messages from English
copyMessages(messages[LANGUAGE.cy], cy);

const defaultLanguage = LANGUAGE.en;

const toggleLanguage = (lang: string) => (lang === LANGUAGE.en ? LANGUAGE.cy : LANGUAGE.en);

const queryOperator = (url: string) => {
  switch (true) {
    case /\?lang=/.test(url):
      return '?';
    case (/(\?|&)/g).test(url):
      return '&';
    default:
      return '?';
  }
};

const dedupeQuery = (url: string) => url.replace(/(\?|&)lang=([^&]*)/g, '');

const languagePath = (req: Request, lang: string) => `${dedupeQuery(req.originalUrl)}${queryOperator(req.originalUrl)}lang=${toggleLanguage(lang)}`;

const validateLanguage = (language: string) => (typeof language === 'string' && language === LANGUAGE.cy ? LANGUAGE.cy : LANGUAGE.en);

const languageMiddleware = async (
  req: Request, res: Response, next: NextFunction,
): Promise<any> => {
  let lang = defaultLanguage;

  const SHOW_LANGUAGE_TOGGLE = process.env.SHOW_LANGUAGE_TOGGLE === 'true';
  const languageQuery = req.query.lang;
  const languageCookie = req.cookies.stw_language;

  if (SHOW_LANGUAGE_TOGGLE) {
    lang = validateLanguage((languageQuery || languageCookie || defaultLanguage) as string);
  }

  if (lang !== languageCookie) {
    res.cookie('stw_language', lang, {
      maxAge: parseInt(process.env.COOKIE_SETTINGS_MAX_AGE || '2419200000', 10),
      sameSite: 'lax',
      httpOnly: true,
      encode: String,
      secure: process.env.NODE_ENV === 'production',
    });
  }

  res.locals.language = lang;
  res.locals.toggledLanguagePath = languagePath(req, lang);
  res.locals.translation = messages[lang];

  if (SHOW_LANGUAGE_TOGGLE) {
    res.locals.showLanguageToggle = true;
  }

  next();
};

export default languageMiddleware;
