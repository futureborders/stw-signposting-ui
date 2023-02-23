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

const filters = require('./filters');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const addCustomNunjucksFilters = (env: any): any => {
  Object.keys(filters).forEach((key: any) => {
    env.addFilter(key, filters[key]);
  });
};

export default addCustomNunjucksFilters;
