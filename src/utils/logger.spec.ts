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

import logger from './logger';
import winstonLogger from './winston';

jest.mock('../utils/winston');

afterEach(() => {
  jest.resetAllMocks();
});

describe('Testing logger', () => {
  test('It should log error message', () => {
    logger.error('error message');
    expect(winstonLogger.error).toHaveBeenCalledWith('error message', {});
  });

  test('It should log debug message', () => {
    logger.debug('debug message');
    expect(winstonLogger.debug).toHaveBeenCalledWith('debug message', {});
  });

  test('It should log warn message', () => {
    logger.warn('warn message');
    expect(winstonLogger.warn).toHaveBeenCalledWith('warn message', {});
  });

  test('It should log info message', () => {
    logger.info('info message');
    expect(winstonLogger.info).toHaveBeenCalledWith('info message', {});
  });
});
