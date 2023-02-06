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

import { existsSync } from 'fs';

import {
  NextFunction, Request, Response,
} from 'express';

const crypto = require('crypto');
const fs = require('fs');

export const getHash = (filename: string): string => {
  if (existsSync(filename)) {
    const fileBuffer = fs.readFileSync(filename);
    const sum = crypto.createHash('md5');
    sum.update(fileBuffer);
    const hex = sum.digest('hex');
    return hex;
  }
  return 'dev';
};

export const getFiles = (dir: string): string[] => {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file: string) => {
    const fileName = `${dir}/${file}`;
    const stat = fs.statSync(fileName);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fileName));
    } else {
      results.push(fileName);
    }
  });
  return results;
};

const calculateFileHashes = () => {
  const folder = getFiles('./public');
  const hashedRef: any = {};
  folder.forEach((file: any) => {
    const fileName = file.split(/(\\|\/)/g).pop().split('.').join('.');
    hashedRef[fileName] = `?ref=${getHash(file)}`;
  });

  return hashedRef;
};

// Cache the file hashes
const fileHashes = calculateFileHashes();

const fileHash = (
  req: Request,
  res: Response,
  next: NextFunction,
):void => {
  res.locals.fileHash = fileHashes;
  next();
};

export default fileHash;
