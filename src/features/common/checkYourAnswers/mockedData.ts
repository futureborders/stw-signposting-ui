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

const exportParams = 'commodity=0301110000&'
  + 'tradeType=export&'
  + 'exportGoodsIntent=goodsExportedToBeSoldForBusiness&'
  + 'exportUserTypeTrader=NE&'
  + 'exportDeclarations=yes&'
  + 'originCountry=GB&'
  + 'destinationCountry=CN&'
  + 'tradeDateDay=01&'
  + 'tradeDateMonth=12&'
  + 'tradeDateYear=2022&'
  + 'isEdit=true';

const importParams = 'commodity=0301110000&'
  + 'tradeType=import&'
  + 'goodsIntent=bringGoodsToSell&'
  + 'userTypeTrader=yes&'
  + 'importDeclarations=yes&'
  + 'originCountry=CN&'
  + 'destinationCountry=GB&'
  + 'importDateDay=01&'
  + 'importDateMonth=12&'
  + 'importDateYear=2022&'
  + 'isEdit=true';

const translation = {
  common: {
    countries: {
      GB: 'Great Britain (England, Scotland and Wales)',
      CN: 'China',
    },
    measures: {
      hideLabel: 'hideLabel',
      showLabel: 'showLabel',
    },
    tradeDetails: {
      change: 'Change',
    },
  },
  page: {
    exportGoodsArrivalDate: {
      question: 'exportGoodsArrivalDate question',
    },
    typeOfTrade: {
      question: 'typeOfTrade question',
      export: 'export value',
      import: 'import value',
    },
    exportDeclarations: {
      question: 'exportDeclarations question',
      yes: 'yes',
    },
    exportOriginCountry: {
      question: 'exportOriginCountry question',
      GB: 'GB',
    },
    exportCountryDestination: {
      questionExporting: 'exportCountryDestination question',
    },
    exportCommoditySearch: {
      question: 'exportCommoditySearch question',
    },
    exportUserTypeTrader: {
      question: 'exportUserTypeTrader question',
      NE: 'exportUserTypeTrader value',
    },
    exportGoodsIntent: {
      question: 'exportGoodsIntent question',
      goodsExportedToBeSoldForBusiness: 'exportGoodsIntent value',
    },
    goodsIntent: {
      question: 'goodsIntent question',
      bringGoodsToSellForBusiness: 'goodsIntent value',
    },
    identifyUserType: {
      question: 'identifyUserType question',
      yes: 'identifyUserType value',
    },
    importDeclarations: {
      question: 'importDeclarations question',
      yes: 'importDeclarations value',
    },
    importDate: {
      question: 'importDate question',
    },
    importCountryOrigin: {
      question: 'importCountryOrigin question',
    },
    destinationCountry: {
      question: 'destinationCountry question',
    },
    importGoods: {
      question: 'importGoods question',
    },
  },
};

export const mockedCheckYourAnswersRowsExports = {
  rows: [
    {
      actions: {
        items: [
          {
            attributes: {
              id: 'edit_tradeType',
            },
            href: `/type-of-trade?${exportParams}`,
            text: 'Change',
            visuallyHiddenText: 'typeOfTrade question',
            classes: 'govuk-!-display-none-print',
          },
        ],
      },
      id: 'tradeType',
      key: {
        classes: 'govuk-!-width-one-third',
        text: 'typeOfTrade question',
      },
      value: {
        html: 'export value',
      },
    },
    {
      actions: {
        items: [
          {
            attributes: {
              id: 'edit_exportGoodsIntent',
            },
            href: `/export/goods-intent?${exportParams}`,
            text: 'Change',
            visuallyHiddenText: 'exportGoodsIntent question',
            classes: 'govuk-!-display-none-print',
          },
        ],
      },
      id: 'exportGoodsIntent',
      key: {
        classes: 'govuk-!-width-one-third',
        text: 'exportGoodsIntent question',
      },
      value: {
        html: 'exportGoodsIntent value',
      },
    },
    {
      actions: {
        items: [
          {
            attributes: {
              id: 'edit_tradeDateDay',
            },
            href: `/export/export-goods-arrival-date?${exportParams}`,
            text: 'Change',
            visuallyHiddenText: 'exportGoodsArrivalDate question',
            classes: 'govuk-!-display-none-print',
          },
        ],
      },
      id: 'tradeDateDay',
      key: {
        classes: 'govuk-!-width-one-third',
        text: 'exportGoodsArrivalDate question',
      },
      value: {
        html: '1 December 2022',
      },
    },
    {
      actions: {
        items: [
          {
            attributes: {
              id: 'edit_exportUserTypeTrader',
            },
            href: `/export/what-are-you-responsible-for?${exportParams}`,
            text: 'Change',
            visuallyHiddenText: 'exportUserTypeTrader question',
            classes: 'govuk-!-display-none-print',
          },
        ],
      },
      id: 'exportUserTypeTrader',
      key: {
        classes: 'govuk-!-width-one-third',
        text: 'exportUserTypeTrader question',
      },
      value: {
        html: 'exportUserTypeTrader value',
      },
    },
    {
      actions: {
        items: [
          {
            attributes: {
              id: 'edit_exportDeclarations',
            },
            href: `/export/export-declarations?${exportParams}`,
            text: 'Change',
            visuallyHiddenText: 'exportDeclarations question',
            classes: 'govuk-!-display-none-print',
          },
        ],
      },
      id: 'exportDeclarations',
      key: {
        classes: 'govuk-!-width-one-third',
        text: 'exportDeclarations question',
      },
      value: {
        html: 'yes',
      },
    },
    {
      actions: {
        items: [
          {
            attributes: {
              id: 'edit_originCountry',
            },
            href: `/export/export-origin-country?${exportParams}`,
            text: 'Change',
            visuallyHiddenText: 'exportOriginCountry question',
            classes: 'govuk-!-display-none-print',
          },
        ],
      },
      id: 'originCountry',
      key: {
        classes: 'govuk-!-width-one-third',
        text: 'exportOriginCountry question',
      },
      value: {
        html: 'Great Britain (England, Scotland and Wales)',
      },
    },
    {
      actions: {
        items: [
          {
            attributes: {
              id: 'edit_destinationCountry',
            },
            href: `/export/country-destination?${exportParams}`,
            text: 'Change',
            visuallyHiddenText: 'exportCountryDestination question',
            classes: 'govuk-!-display-none-print',
          },
        ],
      },
      id: 'destinationCountry',
      key: {
        classes: 'govuk-!-width-one-third',
        text: 'exportCountryDestination question',
      },
      value: {
        html: 'China',
      },
    },
    {
      actions: {
        items: [
          {
            attributes: {
              id: 'edit_commodity',
            },
            href: `/export/export-commodity-search?${exportParams}`,
            text: 'Change',
            visuallyHiddenText: 'exportCommoditySearch question',
            classes: 'govuk-!-display-none-print',
          },
        ],
      },
      id: 'commodity',
      key: {
        classes: 'govuk-!-width-one-third',
        text: 'exportCommoditySearch question',
      },
      value: { html: '0301110000<div id="classification">Live horses, asses, mules and hinnies  &mdash; Horses  &mdash; Other &mdash; <strong>Other</strong></div>' },
    },
  ],
};

export const mockedCheckYourAnswersRowsImports = {
  rows: [
    {
      actions: {
        items: [
          {
            attributes: {
              id: 'edit_tradeType',
            },
            href: `/type-of-trade?${importParams}`,
            text: 'Change',
            visuallyHiddenText: 'typeOfTrade question',
            classes: 'govuk-!-display-none-print',
          },
        ],
      },
      id: 'tradeType',
      key: {
        classes: 'govuk-!-width-one-third',
        text: 'typeOfTrade question',
      },
      value: {
        html: 'import value',
      },
    },
    {
      actions: {
        items: [
          {
            attributes: {
              id: 'edit_goodsIntent',
            },
            href: `/goods-intent?${importParams}`,
            text: 'Change',
            visuallyHiddenText: 'goodsIntent question',
            classes: 'govuk-!-display-none-print',
          },
        ],
      },
      id: 'goodsIntent',
      key: {
        classes: 'govuk-!-width-one-third',
        text: 'goodsIntent question',
      },
      value: {
        html: 'goodsIntent value',
      },
    },
    {
      actions: {
        items: [
          {
            attributes: {
              id: 'edit_importDateDay',
            },
            href: `/import-date?${importParams}`,
            text: 'Change',
            visuallyHiddenText: 'importDate question',
            classes: 'govuk-!-display-none-print',
          },
        ],
      },
      id: 'importDateDay',
      key: {
        classes: 'govuk-!-width-one-third',
        text: 'importDate question',
      },
      value: {
        html: '1 December 2022',
      },
    },
    {
      actions: {
        items: [
          {
            attributes: {
              id: 'edit_originCountry',
            },
            href: `/import-country-origin?${importParams}`,
            text: 'Change',
            visuallyHiddenText: 'importCountryOrigin question',
            classes: 'govuk-!-display-none-print',
          },
        ],
      },
      id: 'originCountry',
      key: {
        classes: 'govuk-!-width-one-third',
        text: 'importCountryOrigin question',
      },
      value: {
        html: 'China',
      },
    },
    {
      actions: {
        items: [
          {
            attributes: {
              id: 'edit_destinationCountry',
            },
            href: `/destination-country?${importParams}`,
            text: 'Change',
            visuallyHiddenText: 'destinationCountry question',
            classes: 'govuk-!-display-none-print',
          },
        ],
      },
      id: 'destinationCountry',
      key: {
        classes: 'govuk-!-width-one-third',
        text: 'destinationCountry question',
      },
      value: {
        html: 'Great Britain (England, Scotland and Wales)',
      },
    },    
    {
      actions: {
        items: [
          {
            attributes: {
              id: 'edit_userTypeTrader',
            },
            href: `/identify-user-type?${importParams}`,
            text: 'Change',
            visuallyHiddenText: 'identifyUserType question',
            classes: 'govuk-!-display-none-print',
          },
        ],
      },
      id: 'userTypeTrader',
      key: {
        classes: 'govuk-!-width-one-third',
        text: 'identifyUserType question',
      },
      value: {
        html: 'identifyUserType value',
      },
    },
    {
      actions: {
        items: [
          {
            attributes: {
              id: 'edit_importDeclarations',
            },
            href: `/import-declarations?${importParams}`,
            text: 'Change',
            visuallyHiddenText: 'importDeclarations question',
            classes: 'govuk-!-display-none-print',
          },
        ],
      },
      id: 'importDeclarations',
      key: {
        classes: 'govuk-!-width-one-third',
        text: 'importDeclarations question',
      },
      value: {
        html: 'importDeclarations value',
      },
    },
    {
      actions: {
        items: [
          {
            attributes: {
              id: 'edit_commodity',
            },
            href: `/import-goods?${importParams}`,
            text: 'Change',
            visuallyHiddenText: 'importGoods question',
            classes: 'govuk-!-display-none-print',
          },
        ],
      },
      id: 'commodity',
      key: {
        classes: 'govuk-!-width-one-third',
        text: 'importGoods question',
      },
      value: { html: '0301110000 - 1234<div id="classification">Live horses, asses, mules and hinnies  &mdash; Horses  &mdash; Other &mdash; <strong>Other</strong></div>' },
    },
  ],
};

export const mockedResponseExports = (req: any): any => ({
  locals: {
    language: 'en',
    queryParams: `commodity=${req.query.commodity}&`
      + `tradeType=${req.query.tradeType}&`
      + `exportGoodsIntent=${req.query.exportGoodsIntent}&`
      + `exportUserTypeTrader=${req.query.exportUserTypeTrader}&`
      + `exportDeclarations=${req.query.exportDeclarations}&`
      + `originCountry=${req.query.originCountry}&`
      + `destinationCountry=${req.query.destinationCountry}&`
      + `tradeDateDay=${req.query.tradeDateDay}&`
      + `tradeDateMonth=${req.query.tradeDateMonth}&`
      + `tradeDateYear=${req.query.tradeDateYear}`,
    translation,
  },
});

export const mockedResponseImports = (req: any): any => ({
  locals: {
    language: 'en',
    queryParams: `commodity=${req.query.commodity}&`
      + `tradeType=${req.query.tradeType}&`
      + `goodsIntent=${req.query.goodsIntent}&`
      + `userTypeTrader=${req.query.userTypeTrader}&`
      + `importDeclarations=${req.query.importDeclarations}&`
      + `originCountry=${req.query.originCountry}&`
      + `destinationCountry=${req.query.destinationCountry}&`
      + `importDateDay=${req.query.importDateDay}&`
      + `importDateMonth=${req.query.importDateMonth}&`
      + `importDateYear=${req.query.importDateYear}`,
    translation,
  },
});

export const mockedCommodityData = {
  id: '0301110000',
  description: 'Other',
  sub: [
    'Live horses, asses, mules and hinnies',
    'Horses',
    'Other',
  ],
};
