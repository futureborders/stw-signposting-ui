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

import { transports, format, createLogger } from 'winston';

const getLogLevel = (): string => process.env.LOGS_LEVEL || 'info';

export const getLogFilePath = (): string => process.env.LOGS_FILE_PATH || '/logs.json';

const logPath = process.cwd() + getLogFilePath();
const { combine, timestamp } = format;

const devTransports = [
  new transports.File({
    filename: logPath,
    maxsize: 5242880,
    format: combine(
      timestamp(),
      format.errors({ stack: true }),
      format.json(),
    ),
  }),
  new transports.Console({
    format: combine(
      timestamp(),
      format.errors({ stack: true }),
      format.json(),
    ),
  }),
];

const otherTransports = [
  new transports.Console({
    silent: process.env.NODE_ENV === 'test',
    format: combine(
      timestamp(),
      format.errors({ stack: false }),
      format.json(),
    ),
  }),
];

const winstonLogger = createLogger({
  level: getLogLevel(),
  transports:
    process.env.NODE_ENV === 'development' ? devTransports : otherTransports,
});

export default winstonLogger;
