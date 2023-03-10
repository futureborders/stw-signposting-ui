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

export const notTranslated = (text: string, lang: string): string => (lang === 'cy' ? `<span lang='en'>${text}</span>` : text);

export const notTranslatedToEnglish = (text: string, lang: string): string => (lang === 'en' ? `<span lang='cy'>${text}</span>` : text);

export const notTranslatedAttribute = (lang: string | undefined): string => (lang === 'cy' ? ' lang="en"' : '');

export const notTranslatedOject = (translation: any): any => (translation.common.numbers['1'] === 'un' ? { lang: 'en' } : null);

export default notTranslated;
