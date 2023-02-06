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

import {
  getResultsRowsHeadings,
  getResultsRows,
  getResultsRowsChapters,
  replaceCommodityWithSearchTerm,
  highlight,
  setSearchDepth,
  getBreadcrumbs,
} from './searchResults.models';
import {
  mockedSearchDataCheese,
  mockedSearchDataCheeseHtmlLevel1,
  mockedSearchDataCheeseHtmlLevel2,
  mockedSearchDataFrogs,
  mockedSearchDataFrogsHtml,
  mockedSearchDataRicotta,
  mockedSearchDataRicottaHtml,
  mockedSearchDataTin,
  mockedSearchDataTinHtml,
  mockedSearchData123,
  mockedSearchData123Html,
  mockedSearchDataChaptersUnmatched,
  mockedSearchDataChaptersUnmatchedHtml,
  mockedSearchDataSearchJam,
  mockedSearchDataSearch000,
  mockedSearchDataSubheadingLvl,
  mockedSearchDataSubheadingHtmlLvl,
} from '../utils/mockedSearchData';

import Translation from '../translation/en';

const commonQueryString = '&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true';
const commonExportsQueryString = '&originCountry=GB&tradeType=export&destinationCountry=CN&exportDeclarations=yes&isSubheading=true';

describe('Testing models', () => {
  describe('getResultsRowsHeadings', () => {
    let searchTerm = 'cheese';
    let queryParams = `commodity=${searchTerm}${commonQueryString}`;
    test('It should return the correct html rows for cheese level 1', async () => {
      const result = await getResultsRowsHeadings(
        mockedSearchDataCheese.data,
        mockedSearchDataCheese.data.data.attributes.goods_nomenclature_item_id,
        queryParams,
        '0',
        'undefined',
        mockedSearchDataCheese.data.data.attributes.goods_nomenclature_item_id,
        Translation,
      );
      expect(result).toEqual(mockedSearchDataCheeseHtmlLevel1);
    });

    test('It should return the correct html rows for cheese level 2', async () => {
      const result = await getResultsRowsHeadings(
        mockedSearchDataCheese.data,
        mockedSearchDataCheese.data.data.attributes.goods_nomenclature_item_id,
        queryParams,
        String(mockedSearchDataCheese.data.included[1].attributes.parent_sid),
        'undefined',
        mockedSearchDataCheese.data.data.attributes.goods_nomenclature_item_id,
        Translation,
      );
      expect(result).toEqual(mockedSearchDataCheeseHtmlLevel2);
    });

    test('It should return the correct html rows for subheadings lvl', async () => {
      searchTerm = 'lvl';
      queryParams = `commodity=${searchTerm}${commonQueryString}&subheadingSuffix=10&isSubheading=true`;
      const result = await getResultsRowsHeadings(
        mockedSearchDataSubheadingLvl.data,
        mockedSearchDataSubheadingLvl.data.data.attributes.goods_nomenclature_item_id,
        queryParams,
        '0',
        '10',
        mockedSearchDataSubheadingLvl.data.data.attributes.goods_nomenclature_item_id,
        Translation,
      );
      expect(result).toEqual(mockedSearchDataSubheadingHtmlLvl);
    });
  });

  describe('getResultsRows', () => {
    test('It should return the correct html rows for frogs', async () => {
      const searchTerm = 'frogs';
      const queryParams = `commodity=${searchTerm}${commonQueryString}`;
      const result = await getResultsRows(mockedSearchDataFrogs.data, searchTerm, queryParams, Translation, 'en');
      expect(result).toEqual(mockedSearchDataFrogsHtml);
    });

    test('It should return the correct html rows for ricotta', async () => {
      const searchTerm = 'ricotta';
      const queryParams = `commodity=${searchTerm}${commonQueryString}`;
      const result = await getResultsRows(mockedSearchDataRicotta.data, searchTerm, queryParams, Translation, 'en');
      expect(result).toEqual(mockedSearchDataRicottaHtml);
    });

    test('It should return the correct html rows for tin', async () => {
      const searchTerm = 'tin';
      const queryParams = `commodity=${searchTerm}${commonQueryString}`;
      const result = await getResultsRows(mockedSearchDataTin.data, searchTerm, queryParams, Translation, 'en');
      expect(result).toEqual(mockedSearchDataTinHtml);
    });
  });

  describe('getResultsRowsChapters', () => {
    const searchTerm = '123';
    const queryParams = `commodity=${searchTerm}${commonQueryString}`;
    test('It should return the correct html rows for 123', async () => {
      const result = await getResultsRowsChapters(mockedSearchData123, searchTerm, queryParams, Translation);
      expect(result).toEqual(mockedSearchData123Html);
    });
    test('It should return the correct html rows for Chapters with unmatched commodity code', async () => {
      const result = await getResultsRowsChapters(mockedSearchDataChaptersUnmatched, searchTerm, queryParams, Translation);
      expect(result).toEqual(mockedSearchDataChaptersUnmatchedHtml);
    });
  });

  describe('replaceCommodityWithSearchTerm', () => {
    const searchTerm = 'cheese';
    const queryParams = `commodity=${searchTerm}${commonQueryString}`;
    test('It should return replace commodity with the itemId', async () => {
      const result = await replaceCommodityWithSearchTerm(queryParams, '0406000000');
      expect(result).toEqual(`commodity=0406000000${commonQueryString}`);
    });
  });

  describe('highlight', () => {
    const searchTerm = 'term';
    const string = 'some term here and here term.';
    test('It should highlight the searchTerm', async () => {
      const result = await highlight(string, searchTerm);
      expect(result).toEqual('some <mark>term</mark> here and here <mark>term</mark>.');
    });
  });

  describe('setSearchDepth', () => {
    const queryParams = `${commonQueryString}`;
    test('It should return 1', async () => {
      const result = setSearchDepth(queryParams, 1);
      expect(result.get('depth')).toEqual('1');
    });
    test('It should return 5', async () => {
      const result = setSearchDepth(queryParams, 5);
      expect(result.get('depth')).toEqual('5');
    });
  });

  describe('getBreadcrumbs', () => {
    const queryParams = `${commonQueryString}`;
    test('It should return correct breadcrumbs for jam at depth 0', async () => {
      const result = await getBreadcrumbs(mockedSearchDataSearchJam, 'jam', `${queryParams}&commodity=jam`, '0', Translation, '');
      expect(result).toEqual([{
        sid: null,
        text: 'Search',
        href: '/import-goods?originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes',
      }]);
    });

    test('It should return correct breadcrumbs for jam at depth 0 (exports)', async () => {
      const result = await getBreadcrumbs(mockedSearchDataSearchJam, 'jam', `${commonExportsQueryString}&commodity=jam`, '0', Translation, '');
      expect(result).toEqual([{
        sid: null,
        text: 'Search',
        href: '/export/export-commodity-search?originCountry=GB&tradeType=export&destinationCountry=CN&exportDeclarations=yes',
      }]);
    });

    test('It should return correct breadcrumbs for jam  at depth 1', async () => {
      const result = await getBreadcrumbs(mockedSearchDataSearchJam, 'jam', `${queryParams}&commodity=jam&depth=1`, '33698', Translation, '');
      expect(result).toEqual([{
        sid: null,
        text: 'Search',
        href: '/import-goods?originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes',
      }, {
        sid: null,
        html: 'jam',
        href: '/search?originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&commodity=jam',
      }]);
    });

    test('It should return correct breadcrumbs for jam at depth 2', async () => {
      const result = await getBreadcrumbs(mockedSearchDataSearchJam, 'jam', `${queryParams}&commodity=jam&depth=2`, '33699', Translation, '');
      expect(result).toEqual([{
        sid: null,
        text: 'Search',
        href: '/import-goods?originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes',
      }, {
        sid: null,
        html: 'jam',
        href: '/search?originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&commodity=jam',
      }, {
        sid: 33698,
        html: 'Other',
        href: '/search/2007910000/33698?originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&commodity=jam&depth=1',
      }]);
    });

    test('It should return correct breadcrumbs for 000 at depth 2', async () => {
      const result = await getBreadcrumbs(mockedSearchDataSearch000, '000', `${queryParams}&commodity=000&searchParent=000&depth=2`, '50789', Translation, '');
      expect(result).toEqual([{
        sid: null,
        text: 'Search',
        href: '/import-goods?originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes',
      }, {
        sid: null,
        html: '000',
        href: '/search?originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&commodity=000',
      }, {
        sid: null,
        text: 'Category: 8536',
        href: '/search/8536690000/0?originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&commodity=000&searchParent=000',
      }, {
        sid: 50781,
        html: 'Lamp holders, plugs and sockets',
        href: '/search/8536610000/50781?originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&commodity=000&searchParent=000&depth=1',
      }]);
    });

    test('It should return correct breadcrumbs for (subheading) lvl at depth 0', async () => {
      const result = await getBreadcrumbs(mockedSearchDataSubheadingLvl.data, 'lvl', `${queryParams}&commodity=lvl&subheadingSuffix=10&isSubheading=true`, '0', Translation, '4412410000');
      expect(result).toEqual([{
        sid: null,
        text: 'Search',
        href: '/import-goods?originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes',
      }]);
    });

    test('It should return correct breadcrumbs for (subheading) lvl at depth 2', async () => {
      const result = await getBreadcrumbs(mockedSearchDataSubheadingLvl.data, 'lvl', `${queryParams}&commodity=lvl&subheadingSuffix=10&isSubheading=true&depth=2`, '107457', Translation, '4412410000');
      expect(result).toEqual([{
        sid: null,
        text: 'Search',
        href: '/import-goods?originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes',
      }, {
        sid: null,
        html: 'lvl',
        href: '/search?originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&commodity=lvl&isSubheading=true',
      }]);
    });

    test('It should return correct breadcrumbs for (subheading) lvl at depth 3', async () => {
      const result = await getBreadcrumbs(mockedSearchDataSubheadingLvl.data, 'lvl', `${queryParams}&commodity=lvl&subheadingSuffix=10&isSubheading=true&depth=3`, '107459', Translation, '4412410000');
      expect(result).toEqual([{
        sid: null,
        text: 'Search',
        href: '/import-goods?originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes',
      }, {
        sid: null,
        html: 'lvl',
        href: '/search?originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&commodity=lvl&isSubheading=true',
      }, {
        sid: 107457,
        html: 'With at least one outer ply of tropical wood',
        href: '/search/4412410000/107457?originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&commodity=lvl&subheadingSuffix=10&isSubheading=true&depth=2',
      }]);
    });
  });
});
