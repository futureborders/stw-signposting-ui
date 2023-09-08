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

import {
  Request, Response, NextFunction,
} from 'express';
import { CookieSettings } from '../interfaces/helpers.interface';
import { Route } from '../interfaces/routes.interface';
import { CookiesBannerDecision } from '../interfaces/enums.interface';

export const getCookiePreferences = (req: Request): any => (
  req.cookies?.stw_cookie_preferences ? req.cookies?.stw_cookie_preferences : null
);

export const approveAllCookies:CookieSettings = {
  cookieGoogleAnalytics: true,
  cookieRememberSettings: true,
};

export const refuseAllCookies:CookieSettings = {
  cookieGoogleAnalytics: false,
  cookieRememberSettings: false,
};

export const setCookie = (name: string, value: CookieSettings, res: Response): any => {
  res.cookie(name, value, {
    maxAge: parseInt(process.env.COOKIE_SETTINGS_MAX_AGE || '2419200000', 10),
    sameSite: 'lax',
    httpOnly: true,
    encode: String,
    secure: process.env.NODE_ENV === 'production',
  });
};

const showCookieConsentBanner = (req: Request, res: Response, preferences: CookieSettings) => {
  if (preferences) {
    res.locals.showCookieMessage = false;
  } else {
    res.locals.showCookieMessage = true;
  }
};

const allowGoogleAnalytics = (req: Request, res: Response, preferences: CookieSettings) => {
  if (preferences?.cookieGoogleAnalytics) {
    res.locals.allowGoogleAnalytics = true;
  } else {
    res.locals.allowGoogleAnalytics = false;
  }
};

const cookieSuccessBanner = (req: Request, res: Response, preferences: CookieSettings) => {
  if (req.session?.showCookieSuccessBanner) {
    res.locals.showCookieSuccessBanner = true;
    if (preferences?.cookieGoogleAnalytics && preferences?.cookieRememberSettings) {
      res.locals.decision = CookiesBannerDecision.acceptedCookies;
    } else {
      res.locals.decision = CookiesBannerDecision.rejectedCookies;
    }
  }
  if (req.url.includes(Route.manageCookies)) {
    res.locals.showCookieSuccessBanner = false;
  }
};

const cookiesMiddleware = (req: Request, res: Response, next: NextFunction):any => {
  const preferences = getCookiePreferences(req);
  showCookieConsentBanner(req, res, preferences);
  cookieSuccessBanner(req, res, preferences);
  allowGoogleAnalytics(req, res, preferences);
  next();
};

export default cookiesMiddleware;
