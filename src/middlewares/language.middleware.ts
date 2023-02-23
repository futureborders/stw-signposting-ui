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

/* eslint-disable no-underscore-dangle */
import {
  Request, Response, NextFunction,
} from 'express';

const enum LANGUAGE {
  en = 'en',
  cy = 'cy',
}

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
  let lang = LANGUAGE.en;

  const SHOW_LANGUAGE_TOGGLE = process.env.SHOW_LANGUAGE_TOGGLE === 'true';
  const languageQuery = req.query.lang;
  const languageCookie = req.cookies.stw_language;

  if (SHOW_LANGUAGE_TOGGLE) {
    lang = validateLanguage((languageQuery || languageCookie || LANGUAGE.en) as string);
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

  const importPath = `../translation/${lang}`;

  const { default: Translation } = await import(importPath);
  res.locals.translation = Translation;

  if (SHOW_LANGUAGE_TOGGLE) {
    res.locals.showLanguageToggle = true;
  }

  next();
};

export default languageMiddleware;
