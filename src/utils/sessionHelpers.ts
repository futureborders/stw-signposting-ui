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

import { Request } from 'express';
import { ExportsParams } from '../interfaces/exports.interface';

export const setSessionCurrentPath = (req: Request): void => {
  if (req.session) {
    req.session.previousPath = req.session.currentPath;
    req.session.currentPath = req.originalUrl.split('?').shift();
  }
};

export const getSessionCurrentPath = (req: Request): string => {
  if (req.session) {
    return req.session.currentPath;
  }
  return '';
};

export const getErrorMessage = (req: Request): string | undefined => {
  let errorMessage;
  if (req.session) {
    errorMessage = req.session.errorMessage || req.query.error;
  }
  return errorMessage;
};

export const clearSessionErrorMessages = (req: Request): void => {
  if (req.session) {
    delete req.session.errorMessage;
  }
};

export const setSessionExport = (req: Request, exportState: ExportsParams): ExportsParams => {
  if (req.session) {
    req.session.exportState = exportState;
    // calc states
    return exportState;
  }
  // TODO: error?
  return {};
};

export const getSessionExport = (req: Request): ExportsParams => {
  if (req.session) {
    return req.session.exportState;
  }
  return {};
};

export default setSessionCurrentPath;
