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

const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
):void => {
  const { translation } = res.locals;
  const status = 404;
  const { message } = translation.common.errors[`${status}`];
  const { title } = translation.common.errors[`${status}`];

  logger.info('Info', { message: 'Page not found' });

  res.status(status).render('error.njk', {
    title,
    message,
    status,
  });
};

export default notFoundMiddleware;
