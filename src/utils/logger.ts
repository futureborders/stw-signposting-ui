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

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import winstonLogger from './winston';

enum SEVERITY {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export default class logger {
  static error(message: string, payload?: any): void {
    this.console(message, SEVERITY.ERROR, payload);
  }

  static debug(message: string, payload?: any): void {
    this.console(message, SEVERITY.DEBUG, payload);
  }

  static warn(message: string, payload?: any): void {
    this.console(message, SEVERITY.WARN, payload);
  }

  static info(message: string, payload?: any): void {
    this.console(message, SEVERITY.INFO, payload);
  }

  static console(
    message: string,
    severity: SEVERITY,
    payload: any,
  ): void {
    switch (severity) {
      case SEVERITY.DEBUG:
        winstonLogger.debug(message, { ...payload });
        break;
      case SEVERITY.INFO:
        winstonLogger.info(message, { ...payload });
        break;
      case SEVERITY.WARN:
        winstonLogger.warn(message, { ...payload });
        break;
      case SEVERITY.ERROR:
        winstonLogger.error(message, { ...payload });
        break;
      default:
        break;
    }
  }
}
