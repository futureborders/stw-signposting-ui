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
export const display999lHeader = (certificateCode: string, translation: any): string => (certificateCode === '999L' ? `${certificateCode} ${translation.page.manageThisTrade.waiverApplies}` : certificateCode);
export const display999lDescription = (certificateCode: string, description: string): string => (certificateCode === '999L' ? '' : description);
export const display999lNoMargin = (certificateCode: string, cssClass: string): string => (certificateCode === '999L' ? '' : cssClass);

const convert99lHtml = (markdown: string, translation: any): string => `${markdown.replace(/\{999L\}/gi, `<h4 class="govuk-heading-s">${translation.page.manageThisTrade['999L'].header}</h4><p class="govuk-body">${translation.page.manageThisTrade['999L'].body}</p>`)}`;

export const display999lFragment = (has999l: boolean, markdown: string, translation: any): string => (has999l ? convert99lHtml(markdown, translation) : markdown.replace(/\{999L\}/gi, ''));

export default display999lFragment;
