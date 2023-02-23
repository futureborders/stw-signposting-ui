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

/* istanbul ignore file */

import {
  cleanEnv, port, str, num, bool, url,
} from 'envalid';

const validateEnv = (): any => cleanEnv(process.env, {
  NODE_ENV: str(),
  STW_TRADE_TARIFF_API_URL: str(),
  TRADE_TARIFF_SERVICE_API_URL: str(),
  PORT: port(),
  COOKIE_SECRET: str(),
  COOKIE_MAX_AGE: num(),
  COOKIE_SETTINGS_MAX_AGE: num(),
  AUTH_ENABLED: bool(),
  REDIRECT_DOMAIN: str(),
  OAUTH_DOMAIN: str(),
  OAUTH_CLIENT_ID: str(),
  OAUTH_CLIENT_SECRET: str(),
  GATAG: str(),
  CSP_WHITE_LIST: str(),
  SHOW_LANGUAGE_TOGGLE: bool(),
  TRADE_TARIFF_COUNTRY_EXCLUSION: str(),
  CONTACT_TECHNICAL_HELP: str(),
  BETA_FEEDBACK: str(),
  CACHE_PERIOD: num(),
  STARTPAGE_ENABLED: bool(),
  STARTPAGE_URL: str(),
  EXPORTS_ENABLED: bool(),
  CHEG_SERVICE_BASE_URL: url(),
});

export default validateEnv;
