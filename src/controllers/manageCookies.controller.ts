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

import { RequestHandler, Response, Request } from 'express';
import {
  setCookie, getCookiePreferences, refuseAllCookies, approveAllCookies,
} from '../middlewares/cookies.middleware';
import { Route } from '../interfaces/routes.interface';

const setCookieBannerPreferences = (req: Request, res: Response) => {
  if (req.body.cookies === 'accept') {
    setCookie('stw_cookie_preferences', approveAllCookies, res);
  } else {
    setCookie('stw_cookie_preferences', refuseAllCookies, res);
  }
  res.redirect(`${res.locals.backPath}`);
};

const setCookiePreferences = (req: Request, res: Response) => {
  const preferences = getCookiePreferences(req);
  const cookieGoogleAnalytics = req.body?.cookieGoogleAnalytics ? (req.body?.cookieGoogleAnalytics === 'true') : preferences?.cookieGoogleAnalytics || false;
  const cookieRememberSettings = req.body?.cookieRememberSettings ? (req.body?.cookieRememberSettings === 'true') : preferences?.cookieRememberSettings || false;
  if (cookieRememberSettings) {
    setCookie('stw_cookie_preferences', {
      cookieGoogleAnalytics,
      cookieRememberSettings,
    }, res);
  } else {
    setCookie('stw_cookie_preferences', refuseAllCookies, res);
  }
};

class ManageCookiesController {
  public manageCookies: RequestHandler = (req, res, next) => {
    try {
      const preferences = getCookiePreferences(req);
      const cookieGoogleAnalytics = preferences?.cookieGoogleAnalytics || false;
      const cookieRememberSettings = preferences?.cookieRememberSettings || false;
      const cookieSettingsSaved = req.session?.cookieSettingsSaved;
      res.locals.showCookieMessage = false;
      delete req.session?.showCookieSuccessBanner;
      delete req.session?.cookieSettingsSaved;

      res.render('cookie-settings', {
        cookieGoogleAnalytics,
        cookieRememberSettings,
        cookieSettingsSaved,
        csrfToken: req.csrfToken(),
      });
    } catch (e) {
      next(e);
    }
  }

  public saveCookieSettings: RequestHandler = (req, res, next) => {
    try {
      if (req.body.cookies) {
        if (req.session) {
          req.session.showCookieSuccessBanner = true;
        }

        setCookieBannerPreferences(req, res);
      } else if (req.body.hideCookieSuccessBanner) {
        if (req.session) {
          req.session.showCookieSuccessBanner = false;
        }

        res.redirect(res.locals.backPath);
      } else {
        if (req.session) {
          req.session.cookieSettingsSaved = true;
        }

        const { queryParams } = res.locals;
        setCookiePreferences(req, res);
        const queryString = queryParams ? `?${queryParams}` : '';
        res.redirect(`${Route.manageCookies}${queryString}`);
      }
    } catch (e) {
      next(e);
    }
  }
}

export default ManageCookiesController;
