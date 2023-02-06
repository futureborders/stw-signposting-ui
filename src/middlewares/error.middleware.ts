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

import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import HttpException from '../exceptions/HttpException';

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
):void => {
  const { translation } = res.locals;
  let status = error?.response?.status || 500;
  let title: string = translation.common.errors[`${status}`]?.title || translation.common.errors['500'].title;
  let message: string = translation.common.errors[`${status}`]?.message || translation.common.errors['500'].message;

  const options = {
    name: error?.name || '',
    message: error?.message || '',
    stackTrace: error?.stack || '',
    error,
  };

  if (error?.code === 'EBADCSRFTOKEN') {
    title = translation.common.session.expire;
    message = translation.common.session.message;
    status = 200;
    res.locals.showCookieMessage = false;
    logger.info('Info', options);
  } else {
    logger.error('Error', options);
  }

  res.status(status).render('error.njk', {
    title,
    message,
    status,
  });
};

export default errorMiddleware;
