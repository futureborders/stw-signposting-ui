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
import { RequestHandler } from 'express';
import TradeTariffApi from '../services/TradeTariffApi.service';
import StwTradeTariffApi from '../services/StwTradeTariffApi.service';
import 'dotenv/config';
import { Route } from '../interfaces/routes.interface';
import { redirectRoute } from '../utils/redirectRoute';
import { DestinationCountry, SearchType, TypeOfTrade } from '../interfaces/enums.interface';
import { getAdditionalCodeRadiosInputs } from '../models/additionalCode.models';
import InvalidDestinationCountry from '../exceptions/invalidDestinationCountry';
import InvalidOriginCountry from '../exceptions/invalidOriginCountry';
import InvalidTradeType from '../exceptions/invalidTradeType';

import {
  commodityCodeIsEmpty,
  hasNoAdditionalCodes,
  cleanCommodity,
} from '../utils/validateCommodityCode';
import { setSessionCurrentPath, clearSessionErrorMessages } from '../utils/sessionHelpers';
import {
  getResultsRowsChapters,
  getResultsRows,
  getBreadcrumbs,
} from '../models/searchResults.models';

import { ResultsRows, HeaderRows } from '../interfaces/search.interface';
import { getImportDateFromQuery } from '../utils/queryHelper';
import { ImportDate } from '../interfaces/importDate.interface';
import { handleMissingQueryParams } from '../utils/handleMissingQueryParams';
import validateImportDate from '../utils/validateImportDate';
import { findCode } from '../utils/findCode';
import { removeParam } from '../utils/filters/removeParam';

class Search {
   private tradeTariffApi: TradeTariffApi;

   private stwTradeTariffApi: StwTradeTariffApi;

   constructor(tradeTariffApi: TradeTariffApi, stwTradeTariffApi: StwTradeTariffApi) {
     this.tradeTariffApi = tradeTariffApi;
     this.stwTradeTariffApi = stwTradeTariffApi;
   }

   private groupBy = (key: any) => (array: any[]) => array.reduce((objectsByKeyValue, obj) => {
     const objects = objectsByKeyValue;
     const value = obj[key];
     objects[value] = (objects[value] || []).concat(obj);
     return objects;
   }, {});

   private isValidCommodityCode = (response: any): boolean => response.results.length === 1
      && response.results[0].goods_nomenclature_item_id.startsWith(cleanCommodity(response.q))
      && (response.results[0].type === SearchType.COMMODITY || response.results[0].declarable)
      && findCode(response.results[0].goods_nomenclature_item_id);

   private isChapter = (response: any): boolean => response.results.length === 1 && response.results[0].type === SearchType.CHAPTER;

   private isHeading = (response: any): boolean => response.results.length === 1 && response.results[0].type === SearchType.HEADING;

   private isSubHeading = (response: any): boolean => response.results.length === 1 && response.results[0].type === SearchType.SUBHEADING;

   private isCommodity = (response: any): boolean => response.results.length > 1 || (response.results.length === 1 && response.results[0].type === SearchType.COMMODITY);

   public search: RequestHandler = async (req, res, next) => {
     setSessionCurrentPath(req);
     const { translation, queryParams } = res.locals;
     const commodity = cleanCommodity(`${req.query.commodity}`);
     const {
       originCountry, tradeType, isEdit, destinationCountry,
     } = req.query;
     const additionalCode = String(req.query.additionalCode);
     const { sid } = req.params;
     let results = {};
     let searchResultsRows: ResultsRows[] | HeaderRows[] = [];
     const importDate = getImportDateFromQuery(req);
     const invalidDate = validateImportDate(importDate, translation);
     const isImportsJourney = tradeType === TypeOfTrade.import;
     const isExportsJourney = tradeType === TypeOfTrade.export;
     const searchRoute = isImportsJourney ? Route.importGoods : Route.exportCommoditySearch;
     const previousPage = searchRoute;
     const additionalCodeRoute = isExportsJourney ? Route.exportAdditionalCode : Route.additionalCode;

     clearSessionErrorMessages(req);

     try {
       if (commodityCodeIsEmpty(commodity)) {
         redirectRoute(previousPage, isEdit ? `${queryParams}&isEdit=true` : queryParams, res, req, translation.page.importGoods.errors.required);
       } else if (handleMissingQueryParams(req)) {
         redirectRoute(Route.typeOfTrade, '', res, req);
       } else if (invalidDate && isImportsJourney) {
         redirectRoute(Route.importDate, queryParams, res, req, invalidDate);
       } else {
         const response = await this.tradeTariffApi.searchTradeTariff(commodity);

         results = {
           ...response,
         };

         if (this.isValidCommodityCode(response)) {
           const commodityCode = response.results[0].goods_nomenclature_item_id;

           const { data } = await this.stwTradeTariffApi.getAdditionalCode(
             `${commodityCode}`,
             `${tradeType}`,
             `${originCountry}`,
              destinationCountry as DestinationCountry,
              importDate as ImportDate,
           );

           const additionalCodeRadios = await getAdditionalCodeRadiosInputs(data, additionalCode);

           const newQueryParams = new URLSearchParams(queryParams);
           newQueryParams.set('commodity', commodityCode);

           if (hasNoAdditionalCodes(additionalCodeRadios) && previousPage === Route.importGoods) {
             redirectRoute(Route.manageThisTrade, newQueryParams.toString(), res);
           } else if (isExportsJourney && hasNoAdditionalCodes(additionalCodeRadios)) {
             return redirectRoute(Route.exportCheckYourAnswers, removeParam(newQueryParams.toString(), ['additionalCode']), res);
           } else {
             return redirectRoute(additionalCodeRoute, newQueryParams.toString(), res);
           }
         } else {
           if (this.isChapter(response)) {
             const items = await this.tradeTariffApi.searchTradeTariffByType(`${SearchType.CHAPTER}s`, `${response.results[0].goods_nomenclature_item_id}`, '');

             searchResultsRows = await getResultsRowsChapters(items.data, commodity, queryParams);

             results = {
               q: commodity,
               type: response.results[0].type,
               results: [{
                 ...items.data,
               }],
             };
           }

           if (this.isHeading(response)) {
             redirectRoute(`/search/${response.results[0].goods_nomenclature_item_id}/0` as Route, `${queryParams}&isHeading=true`, res);
             return false;
           }

           if (this.isSubHeading(response)) {
             redirectRoute(`/search/${response.results[0].goods_nomenclature_item_id}/0` as Route, `${queryParams}&subheadingSuffix=${response.results[0].producline_suffix}&isSubheading=true`, res);
             return false;
           }

           if (this.isCommodity(response)) {
             // A 'producline_suffix' of 80 means it's a real commodity code (as opposed to a 'structural' one)
             const headings = response.results.filter((elem: any) => elem.type === 'heading' && elem.producline_suffix === '80');

             const commodities = response.results.filter((elem: any) => elem.producline_suffix === '80' && findCode(elem.goods_nomenclature_item_id) && elem.type === 'commodity');

             commodities.map((elem:any, index: any) => {
               commodities[index].sub = findCode(elem.goods_nomenclature_item_id).sub;
               return null;
             });

             const filtered: ResultsRows[] = [
               ...commodities,
               ...headings,
             ];

             const groupByType = this.groupBy('type');

             const groupByTypeFiltered = groupByType(filtered.filter((item: any) => !['chapter', 'section'].includes(item.type)));
             searchResultsRows = await getResultsRows(groupByTypeFiltered, commodity, queryParams);

             results = {
               q: commodity,
               type: SearchType.FREE,
               results: [groupByTypeFiltered],
             };
           }

           const breadcrumbs = await getBreadcrumbs([], commodity, queryParams, sid, translation, '');

           res.render('search', {
             csrfToken: req.csrfToken(),
             previousPage,
             commodity,
             results,
             searchResultsRows,
             searchRoute,
             breadcrumbs,
           });
         }
       }
     } catch (e) {
       if (e instanceof InvalidDestinationCountry) {
         redirectRoute(Route.destinationCountry, queryParams, res, req, translation.page.destinationCountry.error);
       } else if (e instanceof InvalidOriginCountry) {
         redirectRoute(Route.importCountryOrigin, queryParams, res, req, translation.page.importCountryOrigin.error);
       } else if (e instanceof InvalidTradeType) {
         redirectRoute(Route.typeOfTrade, queryParams, res, req, translation.page.typeOfTrade.error);
       } else {
         next(e);
       }
     }
     return null;
   }
}

export default Search;
