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

import * as express from 'express';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as nunjucks from 'nunjucks';
import * as path from 'path';
import * as csurf from 'csurf';
import * as http from 'http';
import { Response } from 'express';

import { createTerminus } from '@godaddy/terminus';
import logger from './utils/logger';
import requestLoggerMiddleware from './middlewares/requestLogger.middleware';
import sanitizeMiddleware from './middlewares/sanitize.middleware';
import xssProtectionMiddleware from './middlewares/xssProtection.middleware';
import languageToggleMiddleware from './middlewares/language.middleware';
import errorMiddleware from './middlewares/error.middleware';
import notFoundMiddleware from './middlewares/notFound.middleware';
import gatagCspNonce from './middlewares/gatag-csp-nonce.middleware';
import cookiesMiddleware from './middlewares/cookies.middleware';
import queryParamsMiddleware from './middlewares/queryParams.middleware';
import setCache from './middlewares/cache.middleware';
import fileHash from './middlewares/fileHash.middleware';
import { addCustomNunjucksFilters } from './utils/addCustomNunjucksFilters';
import overrideXForwardedHeaders from './middlewares/overrideXForwardedHeaders';

import Routes from './interfaces/routes.interface';
import { onHealthCheck } from './health-check';

const passport = require('passport');
const { OAuth2Strategy } = require('passport-oauth');
const cookieSession = require('cookie-session');
const checkUserIsAuthenticated = require('./middlewares/auth-middleware');

export const AUTH_PROVIDER_URL = '/auth/provider';
export const AUTH_CALLBACK_URL = '/auth/callback';

const cspWhitelist = (res: Response) => `${process.env.CSP_WHITE_LIST} 'nonce-${res.locals.$gatagCspNonce}'`;

const views = [
  path.join(__dirname, '../node_modules/govuk-frontend/'),
  path.join(__dirname, '../node_modules/govuk-frontend/components'),
  path.join(__dirname, '../src/views'),
  path.join(__dirname, '../src/features'),
];

const prod = (process.env.NODE_ENV === 'production');

class App {
  public app: express.Application;

  public port: (string | number);

  public env: boolean;

  public cookieSecret: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = prod;
    this.cookieSecret = `${process.env.COOKIE_SECRET}`;
    this.initializeMiddlewares();
    if (process.env.AUTH_ENABLED === 'true') {
      this.initializeLogin();
    }
    this.initializeRoutes(routes);
    this.initializeRenderEngine();
    this.initializeErrorHandling();
  }

  public listen(): void {
    const server = http.createServer(this.app);

    createTerminus(server, {
      healthChecks: { '/health': onHealthCheck, verbatim: true },
      timeout: 3500,
      logger: logger.error,
      signal: 'SIGINT',
      onSignal: async () => { logger.info('Received SIGINT - Terminating'); },
    });

    server.keepAliveTimeout = 1000 * (60 * 6); // 6 minutes

    server.listen(this.port, () => {
      logger.info(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cookieParser());

    this.app.use(gatagCspNonce);

    this.app.use(
      helmet(),
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'", (req, res: any) => cspWhitelist(res)],
          scriptSrc: ["'self'", (req, res: any) => cspWhitelist(res)],
          baseUri: ["'self'"],
          styleSrc: ["'self'"],
          blockAllMixedContent: [],
          fontSrc: ["'self'", 'https: data:'],
          frameAncestors: ["'self'"],
          imgSrc: ["'self'", `${process.env.CSP_WHITE_LIST} data:`],
          objectSrc: [],
          scriptSrcAttr: [],
          upgradeInsecureRequests: [],
        },
      }),
    );

    this.app.set('trust proxy', 1);

    this.app.use(overrideXForwardedHeaders);

    this.app.use(cookieSession({
      name: 'stw_signposting',
      secret: this.cookieSecret,
      maxAge: parseInt(`${process.env.COOKIE_MAX_AGE}`, 10),
      sameSite: 'lax',
      httpOnly: true,
      secure: prod,
    }));

    this.app.use(fileHash);
    this.app.use(setCache);
    this.app.use(queryParamsMiddleware);
    this.app.use(languageToggleMiddleware);
    this.app.use(xssProtectionMiddleware);
    this.app.use(requestLoggerMiddleware);
    this.app.use(cookiesMiddleware);
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(sanitizeMiddleware);
    this.app.use('/static', express.static(path.join(__dirname, '../public')));
    this.app.use('/.well-known', express.static(path.join(__dirname, '../.well-known')));
    this.app.use(csurf());

    this.app.use((req, res, next) => {
      res.locals.$gatag = process.env.GATAG;
      next();
    });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });

    this.app.get('/robots.txt', (req, res) => {
      res.type('text/plain');
      res.send('User-agent: *\nDisallow: /');
    });
  }

  private initializeRenderEngine() {
    const env = nunjucks.configure(views, {
      autoescape: true,
      express: this.app,
    }).addGlobal('CONTACT_TECHNICAL_HELP', process.env.CONTACT_TECHNICAL_HELP)
      .addGlobal('BETA_FEEDBACK', process.env.BETA_FEEDBACK)
      .addGlobal('STARTPAGE_ENABLED', process.env.STARTPAGE_ENABLED)
      .addGlobal('STARTPAGE_URL', process.env.STARTPAGE_URL)
      .addGlobal('EXPORTS_ENABLED', process.env.EXPORTS_ENABLED);

    this.app.engine('html', nunjucks.render);
    this.app.set('views', views);
    this.app.set('view engine', 'html');
    addCustomNunjucksFilters(env);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
    this.app.use(notFoundMiddleware);
  }

  private initializeLogin() {
    const client = new OAuth2Strategy({
      authorizationURL: `${process.env.OAUTH_DOMAIN}/oauth2/authorize`,
      tokenURL: `${process.env.OAUTH_DOMAIN}/oauth2/token`,
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_DOMAIN + AUTH_CALLBACK_URL,
    },
    ((accessToken: any, refreshToken: any, profile: any, done: any) => {
      done(null, profile);
    }));

    client.userProfile = function auth(accesstoken: any, done: any) {
      const headers = {
        Authorization: `Bearer ${accesstoken}`,
      };
      this._oauth2._request('GET', `${process.env.OAUTH_DOMAIN}/oauth2/userInfo`, headers, null, accesstoken, (err: any, data: any) => {
        if (err) { return done(err); }
        try {
          return done(null, JSON.parse(data));
        } catch (e) {
          return done(e);
        }
      });
    };

    passport.use('provider', client);

    passport.serializeUser((user: any, done: any) => {
      done(null, user);
    });

    passport.deserializeUser((user: any, done: any) => {
      done(null, user);
    });

    this.app.use(passport.initialize());

    this.app.use(passport.session());

    this.app.use(checkUserIsAuthenticated);

    this.app.get(AUTH_PROVIDER_URL, passport.authenticate('provider'));

    this.app.get(AUTH_CALLBACK_URL, passport.authenticate('provider', { successRedirect: '/' }));

    this.app.get('/logout', (req, res) => {
      req.logout();
      const logoutUrl = `${process.env.OAUTH_DOMAIN}/logout?client_id=${process.env.OAUTH_CLIENT_ID}&logout_uri=${process.env.REDIRECT_DOMAIN}/`;
      res.redirect(logoutUrl);
    });
  }
}

export default App;
