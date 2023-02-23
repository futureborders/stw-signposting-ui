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

const params = 'commodity=0301110000&'
  + 'tradeType=export&'
  + 'exportGoodsIntent=bringGoodsToSellForBusiness&'
  + 'exportUserTypeTrader=NE&'
  + 'exportDeclarations=yes&'
  + 'originCountry=GB&'
  + 'destinationCountry=CN&'
  + 'tradeDateDay=01&'
  + 'tradeDateMonth=12&'
  + 'tradeDateYear=2022&'
  + 'isEdit=true';

export const mockedCheckYourAnswersRows = {
  rows: [
    {
      actions: {
        items: [
          {
            attributes: {
              id: 'edit_tradeType',
            },
            href: `/type-of-trade?${params}`,
            text: 'edit',
            visuallyHiddenText: 'typeOfTrade question',
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
            href: `/export/goods-intent?${params}`,
            text: 'edit',
            visuallyHiddenText: 'exportGoodsIntent question',
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
            href: `/export/export-goods-arrival-date?${params}`,
            text: 'edit',
            visuallyHiddenText: 'exportGoodsArrivalDate question',
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
            href: `/export/what-are-you-responsible-for?${params}`,
            text: 'edit',
            visuallyHiddenText: 'exportUserTypeTrader question',
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
            href: `/export/export-declarations?${params}`,
            text: 'edit',
            visuallyHiddenText: 'exportDeclarations question',
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
            href: `/export/export-origin-country?${params}`,
            text: 'edit',
            visuallyHiddenText: 'exportOriginCountry question',
          },
        ],
      },
      id: 'originCountry',
      key: {
        classes: 'govuk-!-width-one-third',
        text: 'exportOriginCountry question',
      },
      value: {
        html: 'GB',
      },
    },
    {
      actions: {
        items: [
          {
            attributes: {
              id: 'edit_destinationCountry',
            },
            href: `/export/country-destination?${params}`,
            text: 'edit',
            visuallyHiddenText: 'exportCountryDestination question',
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
            href: `/export/export-commodity-search?${params}`,
            text: 'edit',
            visuallyHiddenText: 'exportCommoditySearch question',
          },
        ],
      },
      id: 'commodity',
      key: {
        classes: 'govuk-!-width-one-third',
        text: 'exportCommoditySearch question',
      },
      value: { html: '0301110000<div class="truncated-block-container" id="toggle"><div class="truncated truncated-block" data-show-label="showLabel" data-hide-label="hideLabel">Live horses, asses, mules and hinnies  &mdash; Horses  &mdash; Other &mdash; <strong>Other</strong></div></div>' },
    },
  ],
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mockedResponse = (req: any): any => ({
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
    translation: {
      page: {
        manageThisTrade: {
          commoditySummary: {
            edit: 'edit',
          },
          hideLabel: 'hideLabel',
          showLabel: 'showLabel',
        },
        exportGoodsArrivalDate: {
          question: 'exportGoodsArrivalDate question',
        },
        typeOfTrade: {
          question: 'typeOfTrade question',
          export: 'export value',
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
          bringGoodsToSellForBusiness: 'exportGoodsIntent value',
        },
        checkYourAnswers: {
          visuallyHiddenText: {
            tradeType: 'tradeType visuallyHiddenText',
            exportGoodsIntent: 'exportGoodsIntent visuallyHiddenText',
            exportGoodsArrivalDate: 'exportGoodsArrivalDate visuallyHiddenText',
            exportDeclarations: 'exportDeclarations visuallyHiddenText',
            exportUserTypeTrader: 'responsible for',
            exportOriginCountry: 'exportOriginCountry visuallyHiddenText',
            destinationCountry: 'destinationCountry visuallyHiddenText',
            commodity: 'commodity visuallyHiddenText',
          },
        },
      },
    },
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
