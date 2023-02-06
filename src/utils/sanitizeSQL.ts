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

const excludeList = [
  ';--',
  '; --',
  '/\\*\\*/',
  'SELECT user',
  'SELECT current_user',
  'SELECT session_user',
  'SELECT usename FROM pg_user',
  'SELECT getpgusername()',
  'SELECT usename FROM pg_user',
  'SELECT usename FROM pg_user WHERE usesuper IS TRUE',
  'SELECT usename, usecreatedb, usesuper, usecatupd FROM pg_user',
  'SELECT current_database()',
  'SELECT datname FROM pg_database',
  'SELECT table_name FROM information_schema.tables',
  "SELECT column_name FROM information_schema.columns WHERE table_name='data_table'",
  "select query_to_xml('select * from pg_user',true,true,'')",
  "select database_to_xml(true,true,'')",
  "select database_to_xmlschema(true,true,'')",
  "' and substr(version(),1,10) = 'PostgreSQL' and '",
  "' and substr(version(),1,10) = 'PostgreXXX' and '",
  'AND [RANDNUM]=(SELECT [RANDNUM] FROM PG_SLEEP([SLEEPTIME]))',
  "select pg_ls_dir('./')",
  "select pg_read_file('PG_VERSION', 0, 200)",
  'CHR(65)',
  'CHR(66)',
  'CHR(67)',
  '$$',
];

const sanitizeSQL = (input: string): string => {
  let cleaned = input;
  excludeList.forEach((value) => {
    const reg = new RegExp(value, 'gi');
    cleaned = cleaned.replace(reg, '');
  });
  return cleaned;
};

export default sanitizeSQL;
