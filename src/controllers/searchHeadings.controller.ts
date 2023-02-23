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
import { setSessionCurrentPath } from '../utils/sessionHelpers';
import { Route } from '../interfaces/routes.interface';
import TradeTariffApi from '../services/TradeTariffApi.service';
import StwTradeTariffApi from '../services/StwTradeTariffApi.service';
import { SearchType, TypeOfTrade } from '../interfaces/enums.interface';
import { redirectRoute } from '../utils/redirectRoute';
import {
  getResultsRowsHeadings,
  getBreadcrumbs,
} from '../models/searchResults.models';
import { SearchResultsRows } from '../interfaces/search.interface';
import { findCode } from '../utils/findCode';

class SearchHeadingsController {
  private tradeTariffApi: TradeTariffApi;

  private stwTradeTariffApi: StwTradeTariffApi;

  constructor(tradeTariffApi: TradeTariffApi, stwTradeTariffApi: StwTradeTariffApi) {
    this.tradeTariffApi = tradeTariffApi;
    this.stwTradeTariffApi = stwTradeTariffApi;
  }

  private isValidCommodityCode = (searchResultsRows: SearchResultsRows[], commodityCode: string): boolean => Object.keys(searchResultsRows).length === 0 && findCode(commodityCode);

  public searchHeadings: RequestHandler = async (req, res, next) => {
    setSessionCurrentPath(req);
    const { translation, queryParams } = res.locals;
    const commodity = String(req.query.commodity);
    const { itemId, sid } = req.params;
    const {
      isHeading,
      isSubheading,
      searchParent,
      tradeType,
      subheadingSuffix,
    } = req.query;
    const categoryId = itemId.substring(0, 4);
    const isImportsJourney = tradeType === TypeOfTrade.import;
    const isExportsJourney = tradeType === TypeOfTrade.export;
    const searchRoute = isImportsJourney ? Route.importGoods : Route.exportCommoditySearch;
    const previousPage = searchRoute;

    let results = {};
    let searchResultsRows: SearchResultsRows[] = [];

    try {
      const searchType = subheadingSuffix ? `${SearchType.SUBHEADING}s` : `${SearchType.HEADING}s`;

      const items = await this.tradeTariffApi.searchTradeTariffByType(searchType, `${itemId}`, `${subheadingSuffix}`);

      const currentSearchItem = items.data.included.find((item: any) => item.id === sid)?.attributes.formatted_description;

      searchResultsRows = await getResultsRowsHeadings(items.data, commodity, queryParams, sid, `${subheadingSuffix}`, itemId);

      const breadcrumbs = await getBreadcrumbs(items.data, commodity, queryParams, sid, translation, itemId);

      if (this.isValidCommodityCode(searchResultsRows, commodity)) {
        if (isExportsJourney) {
          return redirectRoute(Route.exportCheckYourAnswers, queryParams, res);
        }
        redirectRoute(Route.manageThisTrade, `${queryParams}&additionalCode=false`, res);

        return false;
      }
      results = {
        q: commodity,
        type: 'heading',
        results: [{
          ...items.data,
        }],
      };

      res.render('search', {
        csrfToken: req.csrfToken(),
        previousPage,
        commodity,
        results,
        searchResultsRows,
        categoryId,
        isHeading,
        isSubheading,
        searchParent,
        currentSearchItem,
        breadcrumbs,
        searchRoute,
      });
    } catch (e) {
      next(e);
    }
    return null;
  }
}

export default SearchHeadingsController;
