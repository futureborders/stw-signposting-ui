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
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Route } from '../interfaces/routes.interface';
import { ResultsRows, HeaderRows, Breadcrumbs } from '../interfaces/search.interface';
import { TypeOfTrade } from '../interfaces/enums.interface';

import { findCode } from '../utils/findCode';
import { removeParam } from '../utils/filters/removeParam';
import { notTranslatedAttribute, notTranslated } from '../utils/filters/notTranslated';

const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const setSearchDepth = (queryParams: string, depth: number) => {
  const params = new URLSearchParams(queryParams);
  params.set('depth', String(depth));
  return params;
};

export const highlight = (string: string, searchTerm: string): string => {
  const terms: string[] = searchTerm ? searchTerm.trim().split(' ') : [];
  let stringToReplace = string;
  terms.forEach((term: string) => {
    const regex = new RegExp(escapeRegExp(term), 'gi');
    stringToReplace = stringToReplace?.replace(regex, `<mark>${stringToReplace.match(regex)?.[0]}</mark>`);
  });
  return stringToReplace;
};

export const replaceCommodityWithSearchTerm = (queryString: string, itemId: string) => {
  const params = new URLSearchParams(queryString);
  params.set('commodity', itemId);
  return params.toString();
};

const hierarchy = (sub: any, description: string, searchTerm: string) => `${sub.map((item: any) => item).join('  &mdash; ')} &mdash; <strong>${highlight(description, searchTerm)}</strong>`;

const chaptersLink = (declarable: boolean, itemId: string, description: string, searchTerm: string, queryParams: string, translation: any) => (!declarable
  ? `<div class="search-results-head">
    <strong>${translation.page.searchResults.category}: ${itemId.substring(0, 4)}</strong>
  </div>
  <div class="search-results-description">
    <a href="${Route.search}/${itemId}/0?${replaceCommodityWithSearchTerm(queryParams, itemId.substring(0, 4))}&searchParent=${searchTerm}">${highlight(description, searchTerm)}</a>
  </div>`
  : `<div class="search-results-head">
    <a href="${Route.search}?${replaceCommodityWithSearchTerm(queryParams, String(itemId))}">${translation.page.searchResults.commodityCode}: <strong>${itemId}</strong></a>
  </div>
  <div class="search-results-description">${highlight(description, searchTerm)}</div>
  `);

export const getResultsRowsChapters = async (
  data: any,
  searchTerm: string,
  queryParams: string,
  translation: any,
): Promise<HeaderRows[]> => data.included.filter((item: any) => item.type === 'heading' && !(item.attributes.declarable && !findCode(item.attributes.goods_nomenclature_item_id))).map((item: any) => {
  const type = (declarable: boolean) => (!declarable ? 'heading' : 'commodity');
  return [{
    html: chaptersLink(
      item.attributes.declarable,
      item.attributes.goods_nomenclature_item_id,
      item.attributes.description,
      searchTerm,
      queryParams,
      translation,
    ),
    sid: item.attributes.goods_nomenclature_sid,
    level: item.attributes.number_indents,
    parent_sid: item.attributes.parent_sid,
    type: type(item.attributes.declarable),
  }];
}).sort((a: any, b: any) => a[0].type.localeCompare(b[0].type));

const headingsDescriptionHtml = (
  indents: number,
  description: string,
  leaf: boolean,
  itemId: number,
  sid: number,
  queryParams: string,
  searchTerm: string,
  subheadingParentId: string,
  isSubheading: boolean,
  translation: any,
  language?: string,
): string => (indents >= 1 && !leaf
  ? `<div class="search-results-head">
        <a href="${Route.search}/${encodeURIComponent(isSubheading ? subheadingParentId : itemId)}/${sid}?${setSearchDepth(queryParams, indents)}"${notTranslatedAttribute(language)}>${highlight(description, searchTerm)}</a>
      </div>`
  : `<div class="search-results-head">
        <a href="${Route.search}?${replaceCommodityWithSearchTerm(removeParam(queryParams, ['isSubheading']), String(itemId))}">${translation.page.searchResults.commodityCode}: <strong>${itemId}</strong></a>
       </div>
       <div class="search-results-description"${notTranslatedAttribute(language)}>${highlight(description, searchTerm)}</div>
      `);

export const getResultsRowsHeadings = async (
  data: any,
  searchTerm: string,
  queryParams: string,
  sid: string,
  suffix: string,
  itemId: string,
  translation: any,
  language?: string,
): Promise<HeaderRows[]> => {
  const params = new URLSearchParams(queryParams);
  const isSubheading = params.get('isSubheading') === 'true';
  const type = (indents: number, leaf: boolean) => (indents >= 1 && !leaf ? 'heading' : 'commodity');
  const sidCheck = (parentSid: number) => (sid !== '0' ? parentSid === Number(sid) : true);
  const getLevel = (id: string) => data.included.find((item: any) => item.id === id);
  const level = (getLevel(sid)?.attributes?.number_indents ?? 0) + 1;
  let setLevel: number;

  if (level > 1) {
    setLevel = level;
  } else if (!Number.isNaN(Number(suffix))) {
    setLevel = 2; // skip first level for subheaders
  } else {
    setLevel = 1;
  }

  const rows = data.included.filter((item: any) => item.attributes.goods_nomenclature_item_id
      && !(item.type === 'commodity' && item.attributes.leaf && !findCode(item.attributes.goods_nomenclature_item_id))
      && item.type !== 'chapter'
      && item.attributes.number_indents === setLevel
      && sidCheck(item.attributes.parent_sid)).map((item: any) => [{
    html: headingsDescriptionHtml(
      item.attributes.number_indents,
      item.attributes.formatted_description,
      item.attributes.leaf,
      item.attributes.goods_nomenclature_item_id,
      item.attributes.goods_nomenclature_sid,
      isSubheading ? queryParams : removeParam(queryParams, ['subheadingSuffix']),
      searchTerm,
      itemId,
      isSubheading,
      translation,
      language,
    ),
    type: type(item.attributes.number_indents, item.attributes.leaf),
    parent_sid: item.attributes.parent_sid,
    sid: item.attributes.goods_nomenclature_sid,
    level: item.attributes.number_indents,
  }]);
  return rows.sort((a: any, b: any) => a[0].type.localeCompare(b[0].type));
};

export const getResultsRows = async (
  data: any,
  searchTerm: string,
  queryParams: string,
  translation: any,
  language: string,
): Promise<ResultsRows[]> => {
  const heading = await data.heading?.map((item: any) => [{
    html: findCode(item.goods_nomenclature_item_id) ? `
        <div class="search-results-head">
          <a href="${Route.search}?${replaceCommodityWithSearchTerm(queryParams, item.goods_nomenclature_item_id)}">${translation.page.searchResults.commodityCode}: <strong>${item.goods_nomenclature_item_id}</strong></a>
        </div>
        <div class="search-results-description"${notTranslatedAttribute(language)}>
          ${highlight(item.description, searchTerm)}
        </div>`
      : `<div class="search-results-head">
          <a href="${Route.search}/${item.goods_nomenclature_item_id}/0?${queryParams}&searchParent=${searchTerm}"><strong>${translation.page.searchResults.category}: ${item.goods_nomenclature_item_id.substring(0, 4)}</strong></a>
        </div>
        <div class="search-results-description"${notTranslatedAttribute(language)}>
          ${highlight(item.description, searchTerm)}
        </div>
        `,
  },
  ]);

  const commodity = await data.commodity?.map((item: any) => [
    {
      html: `
          <div class="search-results-head">
            <a href="${Route.search}?${replaceCommodityWithSearchTerm(queryParams, item.goods_nomenclature_item_id)}">${translation.page.searchResults.commodityCode}: <strong>${item.goods_nomenclature_item_id}</strong></a>
          </div>
          <div class="search-results-description"${notTranslatedAttribute(language)}>
            ${hierarchy(item.sub, item.description, searchTerm)}
          </div>
        `,
    },
  ]);

  return [{
    commodity,
    heading,
  }];
};

export const getBreadcrumbs = async (data: any, searchTerm: string, queryParams: string, sid: string, translation: any, subheadingParentId: string, language?: string) => {
  const params = new URLSearchParams(queryParams);
  const depth = params.get('depth');
  const isHeading = params.get('isHeading') === 'true';
  const tradeType = params.get('tradeType');
  const searchParent = params.get('searchParent');
  const isSubheading = params.get('isSubheading') === 'true';
  const current = data.included?.find((item: any) => item.id === sid);
  const getParent = (parentSid: number) => data.included.find((item: any) => Number(item.id) === parentSid);
  const breadcrumbsTempArray: Breadcrumbs[] = [];
  const isExportJourney = tradeType === TypeOfTrade.export;

  let breadcrumbs: Breadcrumbs[] = [{
    sid: null,
    text: translation.page.searchResults.search,
    href: `${isExportJourney ? Route.exportCommoditySearch : Route.importGoods}?${removeParam(queryParams, ['commodity', 'depth', 'isHeading', 'subheadingSuffix', 'isSubheading', 'searchParent'])}`,
  }];

  if ((sid && Number(sid) > 0) || (Number(sid) === 0 && !(isSubheading || isHeading))) {
    breadcrumbs.push({
      sid: null,
      html: notTranslated(searchParent || searchTerm, String(language)),
      href: `${Route.search}?${searchParent ? removeParam(replaceCommodityWithSearchTerm(queryParams, searchParent), ['searchParent', 'depth']) : removeParam(queryParams, ['depth', 'subheadingSuffix'])}`,
    });
  }

  if (searchParent && Number(depth) > 0) {
    breadcrumbs.push({
      sid: null,
      text: `${translation.page.searchResults.category}: ${current?.attributes.goods_nomenclature_item_id ? current.attributes.goods_nomenclature_item_id.substring(0, 4) : searchTerm}`,
      href: `${Route.search}/${current?.attributes.goods_nomenclature_item_id}/0?${removeParam(queryParams, ['depth'])}`,
    });
  }

  if (Number(depth) > 1) {
    for (let i = 0; i < (current?.attributes.number_indents ?? 0); i += 1) {
      if (i === 0) {
        breadcrumbsTempArray.push({
          sid: Number(sid),
          text: null,
          href: null,
        });
      }

      if (i > 0 && !(isSubheading && (i === (Number(depth) - 1)))) {
        const parent = getParent(Number(breadcrumbsTempArray[i - 1].sid));

        breadcrumbsTempArray.push({
          sid: Number(parent.attributes.parent_sid),
          html: notTranslated(getParent(Number(parent.attributes.parent_sid)).attributes.formatted_description, String(language)),
          href: `${Route.search}/${encodeURIComponent(isSubheading ? subheadingParentId : getParent(Number(parent.attributes.parent_sid)).attributes.goods_nomenclature_item_id)}/${parent.attributes.parent_sid}?${setSearchDepth(queryParams, current.attributes.number_indents - i)}`,
        });
      }
    }
    breadcrumbsTempArray.reverse().pop();
    breadcrumbs = breadcrumbs.concat(breadcrumbsTempArray);
  }

  return breadcrumbs;
};

export default getResultsRowsChapters;
