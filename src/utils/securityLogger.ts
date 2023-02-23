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

import logger from './logger';

const securityLogger = (
  req: Request,
  subject: string,
  message?: string,
): void => {
  logger.info(message || '', {
    tag: 'security_json',
    dest: 'ec2-instance/kubernetes_container',
    process_name: req.hostname,
    process_id: process.pid,
    body: [{
      subject,
      src_ip: req.ip,
      uri_type: `${req.protocol}://${req.headers.host}${req.originalUrl.split('?').shift()}`,
      uri_query: req.originalUrl.split('?').pop(),
    }],
  });
};

export default securityLogger;
