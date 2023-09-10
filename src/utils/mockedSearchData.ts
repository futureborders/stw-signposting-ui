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

/* istanbul ignore file */

export const mockedSearchDataChapter = {
  data: {
    q: 'apples',
    as_of: '2021-07-08',
    results: [
      {
        type: 'chapter',
        goods_nomenclature_item_id: '0800000000',
        validity_start_date: null,
        validity_end_date: null,
        description: 'EDIBLE FRUIT AND NUTS; PEEL OF CITRUS FRUIT OR MELONS',
      },
    ],
  },
};

export const mockedSearchDataCommodity = {
  data: {
    q: '1006101000',
    as_of: '2021-08-24',
    results: [
      {
        type: 'commodity',
        goods_nomenclature_item_id: '1006101000',
        producline_suffix: '80',
        number_indents: 2,
        validity_start_date: null,
        validity_end_date: null,
        description: 'For sowing',
      },
    ],
  },
};

export const mockedSearchDataDeclarableHeading = {
  data: {
    q: '1006',
    as_of: '2022-07-19',
    results: [
      {
        declarable: true,
        description: 'A declarable heading',
        goods_nomenclature_item_id: '1006101000',
        number_indents: null,
        producline_suffix: '80',
        type: 'heading',
        validity_end_date: null,
        validity_start_date: '1972-01-01',
      }],
  },
};

export const mockedSearchDataChapters = {
  data: {
    data: {
      id: '30808',
      type: 'chapter',
      attributes: {
        goods_nomenclature_sid: 30808,
        goods_nomenclature_item_id: '0800000000',
        description: 'EDIBLE FRUIT AND NUTS; PEEL OF CITRUS FRUIT OR MELONS',
        formatted_description: 'Edible fruit and nuts; peel of citrus fruit or melons',
        chapter_note: '',
        forum_url: null,
        section_id: 2,
      },
      relationships: {},
    },
    included: [
      {
        id: '2',
        type: 'section',
        attributes: {
          id: 2,
          numeral: 'II',
          title: 'Vegetable products',
          position: 2,
          section_note: "* 1\\. In this section the term 'pellets' means products which have been agglomerated either directly by compression or by the addition of a binder in a proportion not exceeding 3% by weight.",
        },
      },
      {
        id: '5',
        type: 'guide',
        attributes: {
          title: 'Edible fruits, nuts and peel',
          url: 'https://www.gov.uk/guidance/classifying-edible-fruits-nuts-and-peel',
        },
      },
      {
        id: '31666',
        type: 'heading',
        attributes: {
          goods_nomenclature_sid: 31666,
          goods_nomenclature_item_id: '0813000000',
          declarable: false,
          description: 'Fruit, dried, other than that of headings 0801 to 0806; mixtures of nuts or dried fruits of this chapter',
          producline_suffix: '80',
          leaf: true,
          description_plain: 'Fruit, dried, other than that of headings 0801 to 0806; mixtures of nuts or dried fruits of this chapter',
          formatted_description: 'Fruit, dried, other than that of headings 0801 to 0806; mixtures of nuts or dried fruits of this chapter',
        },
        relationships: { children: { data: [] } },
      },
      {
        id: '31698',
        type: 'heading',
        attributes: {
          goods_nomenclature_sid: 31698,
          goods_nomenclature_item_id: '0814000000',
          declarable: true,
          description: 'Peel of citrus fruit or melons (including watermelons), fresh, frozen, dried or provisionally preserved in brine, in sulphur water or in other preservative solutions',
          producline_suffix: '80',
          leaf: true,
          description_plain: 'Peel of citrus fruit or melons (including watermelons), fresh, frozen, dried or provisionally preserved in brine, in sulphur water or in other preservative solutions',
          formatted_description: 'Peel of citrus fruit or melons (including watermelons), fresh, frozen, dried or provisionally preserved in brine, in sulphur water or in other preservative solutions',
        },
        relationships: { children: { data: [] } },
      },
    ],
  },
};

export const mockedSearchDataHorses = {
  data: {
    q: 'horses',
    as_of: '2021-08-24',
    results: [
      {
        type: 'heading',
        goods_nomenclature_item_id: '0101000000',
        producline_suffix: '80',
        number_indents: 0,
        validity_start_date: '01/01/1972',
        validity_end_date: null,
        description: 'Live horses, asses, mules and hinnies',
      },
      {
        type: 'commodity',
        goods_nomenclature_item_id: '0206909100',
        producline_suffix: '80',
        number_indents: 3,
        validity_start_date: '01/01/1972',
        validity_end_date: null,
        description: 'Of horses, asses, mules and hinnies',
      },
    ],
  },
};

export const mockedSearchDataCommodities = {
  data: {
    q: 'horses',
    as_of: '2021-08-24',
    results: [
      {
        type: 'heading',
        goods_nomenclature_item_id: '0205000000',
        producline_suffix: '80',
        number_indents: 0,
        validity_start_date: '01/01/1972',
        validity_end_date: null,
        description: 'Meat of horses, asses, mules or hinnies, fresh, chilled or frozen',
      },
      {
        type: 'commodity',
        goods_nomenclature_item_id: '4412994000',
        producline_suffix: '80',
        number_indents: 5,
        validity_start_date: '01/01/2010',
        validity_end_date: null,
        description: 'Of alder, ash, beech, birch, cherry, chestnut, elm, hickory, hornbeam, horse chestnut, lime, maple, oak, plane tree, poplar, robinia, walnut or yellow poplar',
      },
    ],
  },
};

export const mockedSearchDataCommodityAdditionalCode = {
  data: {
    q: '9102910000',
    as_of: '2021-08-24',
    results: [
      {
        type: 'commodity',
        goods_nomenclature_item_id: '9102910000',
        producline_suffix: '80',
        number_indents: 2,
        validity_start_date: null,
        validity_end_date: null,
        description: 'Electrically operated',
      },
    ],
  },
};

export const mockedSearchDataAdditionalCode = {
  data: {
    data: [
      {
        code: '4055',
        description: 'Clocks and watches and parts thereof, between 50 and 100 years old, other than those covered by the additional codes 4008, 4010, 4011, 4013, 4023, 4040 - 4048',
      },
      {
        code: '4099',
        description: 'Other than those mentioned in Regulation (EC) no 1210/2003 (OJ L 169): no restrictions',
      },
    ],
  },
};

export const mockedSearchDataHeading = {

  data: {
    q: 'cheese',
    as_of: '2021-08-24',
    results: [
      {
        type: 'heading',
        goods_nomenclature_item_id: '0406000000',
        producline_suffix: null,
        number_indents: null,
        validity_start_date: null,
        validity_end_date: null,
        description: 'Cheese and curd',
      },
    ],
  },
};

export const mockedSearchDataValidCommodity = {
  data: {
    data: {
      id: '43846',
      type: 'heading',
      attributes: {
        validity_start_date: '1972-01-01T00:00:00.000Z',
        validity_end_date: null,
        goods_nomenclature_item_id: '6309000000',
        description: 'Worn clothing and other worn articles',
        bti_url: 'https://www.gov.uk/guidance/check-what-youll-need-to-get-a-legally-binding-decision-on-a-commodity-code',
        formatted_description: 'Worn clothing and other worn articles',
        basic_duty_rate: '<span>4.00</span> %',
        meursing_code: false,
        declarable: true,
      },
      relationships: {
        footnotes: { data: [{ id: '701', type: 'footnote' }] },
        section: { data: { id: '11', type: 'section' } },
        chapter: { data: { id: '43610', type: 'chapter' } },
        import_measures: {
          data: [],
        },
        export_measures: { data: [{ id: '20099625', type: 'measure' }] },
      },
    },
    included: [

      {
        id: '43610',
        type: 'chapter',
        attributes: {
          goods_nomenclature_item_id: '6309000000',
          description: 'OTHER MADE-UP TEXTILE ARTICLES; SETS; WORN CLOTHING AND WORN TEXTILE ARTICLES; RAGS',
          formatted_description: 'Other made-up textile articles; sets; worn clothing and worn textile articles; rags',
          chapter_note: {
            id: 16,
            section_id: 11,
            chapter_id: '63',
            content: '',
          },
          forum_url: null,
        },
        relationships: {
          guides: { data: [{ id: '23', type: 'guide' }] },
        },
      },

    ],
  },
};

export const mockedSearchDataSearchByType = {
  data: {
    data: {
      id: '43846',
      type: 'heading',
      attributes: {
        validity_start_date: '1972-01-01T00:00:00.000Z',
        validity_end_date: null,
        goods_nomenclature_item_id: '6309000000',
        description: 'Worn clothing and other worn articles',
        bti_url: 'https://www.gov.uk/guidance/check-what-youll-need-to-get-a-legally-binding-decision-on-a-commodity-code',
        formatted_description: 'Worn clothing and other worn articles',
        basic_duty_rate: '<span>4.00</span> %',
        meursing_code: false,
        declarable: true,
      },
      relationships: {
        footnotes: { data: [{ id: '701', type: 'footnote' }] },
        section: { data: { id: '11', type: 'section' } },
        chapter: { data: { id: '43610', type: 'chapter' } },
        import_measures: {
          data: [],
        },
        export_measures: { data: [{ id: '20099625', type: 'measure' }] },
      },
    },
    included: [
      {
        id: '43610',
        type: 'chapter',
        attributes: {
          goods_nomenclature_item_id: '0800000000',
          description: 'OTHER MADE-UP TEXTILE ARTICLES; SETS; WORN CLOTHING AND WORN TEXTILE ARTICLES; RAGS',
          formatted_description: 'Other made-up textile articles; sets; worn clothing and worn textile articles; rags',
          chapter_note: {
            id: 16,
            section_id: 11,
            chapter_id: '63',
            content: '',
          },
          forum_url: null,
        },
        relationships: {
          guides: { data: [{ id: '23', type: 'guide' }] },
        },
      },
      {
        id: '43610',
        type: 'heading',
        attributes: {
          goods_nomenclature_item_id: '816000000',
          description: 'OTHER MADE-UP TEXTILE ARTICLES; SETS; WORN CLOTHING AND WORN TEXTILE ARTICLES; RAGS',
          formatted_description: 'Other made-up textile articles; sets; worn clothing and worn textile articles; rags',
          chapter_note: {
            id: 16,
            section_id: 11,
            chapter_id: '63',
            content: '',
          },
          forum_url: null,
        },
        relationships: {
          guides: { data: [{ id: '23', type: 'guide' }] },
        },
      },
    ],
  },
};

export const mockedSearchDataCheese = {
  data: {
    data: {
      id: '29719',
      type: 'heading',
      attributes: {
        goods_nomenclature_item_id: '0406000000',
        description: 'Cheese and curd',
        bti_url: 'https://www.gov.uk/guidance/check-what-youll-need-to-get-a-legally-binding-decision-on-a-commodity-code',
        formatted_description: 'Cheese and curd',
      },
      relationships: {},
    },
    included: [
      {
        id: '29845',
        type: 'commodity',
        attributes: {
          description: 'Made from unpasteurized milk, of a minimum fat content of 50% by weight, in the dry matter, matured for at least nine months, of a free-at-frontier value per 100 kg net weight of 334,20 Euro or more in the case of standard whole sizes (cheeses of the conventional flat cylindrical shape of a net weight of not less than 33 kg but not more than 44 kg; cubic block shape or parallelepiped shape, of a net weight of 10 kg or more), 354,83 Euro or more in the case of cheeses of a net weight of 500 g or more and 368,58 Euro or more in the case of cheeses of a net weight of less than 500 g',
          number_indents: 1,
          goods_nomenclature_item_id: '0406902110',
          leaf: true,
          goods_nomenclature_sid: 29845,
          formatted_description: 'Made from unpasteurized milk, of a minimum fat content of 50% by weight, in the dry matter, matured for at least nine months, of a free-at-frontier value per 100 kg net weight of 334,20 Euro or more in the case of standard whole sizes (cheeses of the conventional flat cylindrical shape of a net weight of not less than 33 kg but not more than 44 kg; cubic block shape or parallelepiped shape, of a net weight of 10 kg or more), 354,83 Euro or more in the case of cheeses of a net weight of 500 g or more and 368,58 Euro or more in the case of cheeses of a net weight of less than 500 g',
          description_plain: 'Made from unpasteurized milk, of a minimum fat content of 50% by weight, in the dry matter, matured for at least nine months, of a free-at-frontier value per 100 kg net weight of 334,20 Euro or more in the case of standard whole sizes (cheeses of the conventional flat cylindrical shape of a net weight of not less than 33 kg but not more than 44 kg; cubic block shape or parallelepiped shape, of a net weight of 10 kg or more), 354,83 Euro or more in the case of cheeses of a net weight of 500 g or more and 368,58 Euro or more in the case of cheeses of a net weight of less than 500 g',
          producline_suffix: '80',
          parent_sid: 29844,
        },
        relationships: {
          overview_measures: {
            data: [
              { id: '20000916', type: 'measure' },
              { id: '-1009498041', type: 'measure' },
            ],
          },
        },
      },
      {
        id: '29846',
        type: 'commodity',
        attributes: {
          description: 'Whole cheeses (of the conventional flat cylindrical shape of a net weight of not less than 33 kg but not more than 44 kg and cheeses in cubic blocks or in parallelepiped shape, of a net weight of 10 kg or more) of a minimum fat content of 50% by weight, in the dry matter, matured for at least three months',
          number_indents: 2,
          goods_nomenclature_item_id: '0406902120',
          leaf: true,
          goods_nomenclature_sid: 29846,
          formatted_description: 'Whole cheeses (of the conventional flat cylindrical shape of a net weight of not less than 33 kg but not more than 44 kg and cheeses in cubic blocks or in parallelepiped shape, of a net weight of 10 kg or more) of a minimum fat content of 50% by weight, in the dry matter, matured for at least three months',
          description_plain: 'Whole cheeses (of the conventional flat cylindrical shape of a net weight of not less than 33 kg but not more than 44 kg and cheeses in cubic blocks or in parallelepiped shape, of a net weight of 10 kg or more) of a minimum fat content of 50% by weight, in the dry matter, matured for at least three months',
          producline_suffix: '80',
          parent_sid: 29845,
        },
        relationships: {
          overview_measures: {
            data: [
              { id: '20000916', type: 'measure' },
              { id: '-1009498041', type: 'measure' },
            ],
          },
        },
      },
    ],
  },
};

export const mockedSearchDataCheeseHtmlLevel1 = [
  [
    {
      html: '<div class="search-results-head">\n'
        + '        <a href="/search?commodity=0406902110&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true">Commodity code: <strong>0406902110</strong></a>\n'
        + '       </div>\n'
        + '       <div class="search-results-description">Made from unpasteurized milk, of a minimum fat content of 50% by weight, in the dry matter, matured for at least nine months, of a free-at-frontier value per 100 kg net weight of 334,20 Euro or more in the case of standard whole sizes (cheeses of the conventional flat cylindrical shape of a net weight of not less than 33 kg but not more than 44 kg; cubic block shape or parallelepiped shape, of a net weight of 10 kg or more), 354,83 Euro or more in the case of cheeses of a net weight of 500 g or more and 368,58 Euro or more in the case of cheeses of a net weight of less than 500 g</div>\n'
        + '      ',
      type: 'commodity',
      parent_sid: 29844,
      sid: 29845,
      level: 1,
    },
  ],
];

export const mockedSearchDataCheeseHtmlLevel2 = [
  [
    {
      html: '<div class="search-results-head">\n'
        + '        <a href="/search?commodity=0406902120&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true">Commodity code: <strong>0406902120</strong></a>\n'
        + '       </div>\n'
        + '       <div class="search-results-description">Whole cheeses (of the conventional flat cylindrical shape of a net weight of not less than 33 kg but not more than 44 kg and cheeses in cubic blocks or in parallelepiped shape, of a net weight of 10 kg or more) of a minimum fat content of 50% by weight, in the dry matter, matured for at least three months</div>\n'
        + '      ',
      type: 'commodity',
      parent_sid: 29845,
      sid: 29846,
      level: 2,
    },
  ],
];

export const mockedSearchDataFrogs = {
  data: {
    heading: [
      {
        type: 'heading',
        goods_nomenclature_item_id: '7302000000',
        producline_suffix: '80',
        number_indents: 0,
        validity_start_date: '01/01/1972',
        validity_end_date: null,
        description: 'Railway or tramway track construction material of iron or steel, the following: rails, check-rails and rack rails, switch blades, crossing frogs, point rods and other crossing pieces, sleepers (cross-ties), fish-plates, chairs, chair wedges, sole plates (base plates), rail clips, bedplates, ties and other material specialised for jointing or fixing rails',
      },
    ],
    commodity: [
      {
        type: 'commodity',
        goods_nomenclature_item_id: '7302300000',
        producline_suffix: '80',
        number_indents: 1,
        validity_start_date: '01/01/1972',
        validity_end_date: null,
        description: 'Switch blades, crossing frogs, point rods and other crossing pieces',
        sub: [
          'Railway or tramway track construction material of iron or steel, the following: rails, check-rails and rack rails, switch blades, crossing frogs, point rods and other crossing pieces, sleepers (cross-ties), fish-plates, chairs, chair wedges, sole plates (base plates), rail clips, bedplates, ties and other material specialised for jointing or fixing rails',
        ],
      },
      {
        type: 'commodity',
        goods_nomenclature_item_id: '0208907000',
        producline_suffix: '80',
        number_indents: 2,
        validity_start_date: '01/01/2007',
        validity_end_date: null,
        description: "Frogs' legs",
        declarable: false,
        sub: [
          'Other meat and edible meat offal, fresh, chilled or frozen',
          'Other',
        ],
      },
    ],
  },
};

export const mockedSearchDataFrogsHtml = [
  {
    heading: [
      [
        {
          html: '<div class="search-results-head">\n'
            + '          <a href="/search/7302000000/0?commodity=frogs&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&searchParent=frogs"><strong>Category: 7302</strong></a>\n'
            + '        </div>\n'
            + '        <div class="search-results-description">\n'
            + '          Railway or tramway track construction material of iron or steel, the following: rails, check-rails and rack rails, switch blades, crossing <mark>frogs</mark>, point rods and other crossing pieces, sleepers (cross-ties), fish-plates, chairs, chair wedges, sole plates (base plates), rail clips, bedplates, ties and other material specialised for jointing or fixing rails\n'
            + '        </div>\n'
            + '        ',
        },
      ],
    ],
    commodity: [
      [
        {
          html: '\n'
            + '          <div class="search-results-head">\n'
            + '            <a href="/search?commodity=7302300000&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true">Commodity code: <strong>7302300000</strong></a>\n'
            + '          </div>\n'
            + '          <div class="search-results-description">\n'
            + '            Railway or tramway track construction material of iron or steel, the following: rails, check-rails and rack rails, switch blades, crossing frogs, point rods and other crossing pieces, sleepers (cross-ties), fish-plates, chairs, chair wedges, sole plates (base plates), rail clips, bedplates, ties and other material specialised for jointing or fixing rails &mdash; <strong>Switch blades, crossing <mark>frogs</mark>, point rods and other crossing pieces</strong>\n'
            + '          </div>\n'
            + '        ',
        },
      ],
      [
        {
          html: '\n'
            + '          <div class="search-results-head">\n'
            + '            <a href="/search?commodity=0208907000&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true">Commodity code: <strong>0208907000</strong></a>\n'
            + '          </div>\n'
            + '          <div class="search-results-description">\n'
            + "            Other meat and edible meat offal, fresh, chilled or frozen  &mdash; Other &mdash; <strong><mark>Frogs</mark>' legs</strong>\n"
            + '          </div>\n'
            + '        ',
        },
      ],
    ],
  },
];

export const mockedSearchDataRicotta = {
  data: {
    commodity: [
      {
        type: 'commodity',
        goods_nomenclature_item_id: '0406105090',
        producline_suffix: '80',
        number_indents: 4,
        validity_start_date: null,
        validity_end_date: null,
        description: 'Other',
        sub: [],
      },
    ],
  },
};

export const mockedSearchDataRicottaHtml = [
  {
    heading: undefined,
    commodity: [
      [
        {
          html: '\n'
            + '          <div class="search-results-head">\n'
            + '            <a href="/search?commodity=0406105090&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true">Commodity code: <strong>0406105090</strong></a>\n'
            + '          </div>\n'
            + '          <div class="search-results-description">\n'
            + '             &mdash; <strong>Other</strong>\n'
            + '          </div>\n'
            + '        ',
        },
      ],
    ],
  },
];

export const mockedSearchDataTin = {
  data: {
    heading: [
      {
        type: 'heading',
        goods_nomenclature_item_id: '8001000000',
        producline_suffix: '80',
        number_indents: 0,
        validity_start_date: '01/01/1972',
        validity_end_date: null,
        description: 'Unwrought tin',
      },
      {
        type: 'heading',
        goods_nomenclature_item_id: '8002000000',
        producline_suffix: '80',
        number_indents: 0,
        validity_start_date: '01/01/1972',
        validity_end_date: null,
        description: 'Tin waste and scrap',
      },
      {
        type: 'heading',
        goods_nomenclature_item_id: '8003000000',
        producline_suffix: '80',
        number_indents: 0,
        validity_start_date: '01/01/1972',
        validity_end_date: null,
        description: 'Tin bars, rods, profiles and wire',
      },
      {
        type: 'heading',
        goods_nomenclature_item_id: '8007000000',
        producline_suffix: '80',
        number_indents: 0,
        validity_start_date: '01/01/1972',
        validity_end_date: null,
        description: 'Other articles of tin',
      },
      {
        type: 'heading',
        goods_nomenclature_item_id: '2609000000',
        producline_suffix: '80',
        number_indents: 0,
        validity_start_date: '01/01/1972',
        validity_end_date: null,
        description: 'Tin ores and concentrates',
      },
    ],
    commodity: [
      {
        type: 'commodity',
        goods_nomenclature_item_id: '2620994000',
        producline_suffix: '80',
        number_indents: 3,
        validity_start_date: '01/01/2002',
        validity_end_date: null,
        description: 'Containing mainly tin',
        sub: [
          'Slag, ash and residues (other than from the manufacture of iron or steel), containing metals, arsenic or their compounds',
          'Other',
          'Other',
        ],
      },
    ],
  },
};

export const mockedSearchDataTinHtml = [
  {
    heading: [
      [
        {
          html: '<div class="search-results-head">\n'
            + '          <a href="/search/8001000000/0?commodity=tin&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&searchParent=tin"><strong>Category: 8001</strong></a>\n'
            + '        </div>\n'
            + '        <div class="search-results-description">\n'
            + '          Unwrought <mark>tin</mark>\n'
            + '        </div>\n'
            + '        ',
        },
      ],
      [
        {
          html: '\n'
            + '        <div class="search-results-head">\n'
            + '          <a href="/search?commodity=8002000000&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true">Commodity code: <strong>8002000000</strong></a>\n'
            + '        </div>\n'
            + '        <div class="search-results-description">\n'
            + '          <mark>Tin</mark> waste and scrap\n'
            + '        </div>',
        },
      ],
      [
        {
          html: '\n'
            + '        <div class="search-results-head">\n'
            + '          <a href="/search?commodity=8003000000&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true">Commodity code: <strong>8003000000</strong></a>\n'
            + '        </div>\n'
            + '        <div class="search-results-description">\n'
            + '          <mark>Tin</mark> bars, rods, profiles and wire\n'
            + '        </div>',
        },
      ],
      [
        {
          html: '<div class="search-results-head">\n'
            + '          <a href="/search/8007000000/0?commodity=tin&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&searchParent=tin"><strong>Category: 8007</strong></a>\n'
            + '        </div>\n'
            + '        <div class="search-results-description">\n'
            + '          Other articles of <mark>tin</mark>\n'
            + '        </div>\n'
            + '        ',
        },
      ],
      [
        {
          html: '\n'
            + '        <div class="search-results-head">\n'
            + '          <a href="/search?commodity=2609000000&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true">Commodity code: <strong>2609000000</strong></a>\n'
            + '        </div>\n'
            + '        <div class="search-results-description">\n'
            + '          <mark>Tin</mark> ores and concentrates\n'
            + '        </div>',
        },
      ],
    ],
    commodity: [
      [
        {
          html: '\n'
            + '          <div class="search-results-head">\n'
            + '            <a href="/search?commodity=2620994000&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true">Commodity code: <strong>2620994000</strong></a>\n'
            + '          </div>\n'
            + '          <div class="search-results-description">\n'
            + '            Slag, ash and residues (other than from the manufacture of iron or steel), containing metals, arsenic or their compounds  &mdash; Other  &mdash; Other &mdash; <strong>Containing mainly <mark>tin</mark></strong>\n'
            + '          </div>\n'
            + '        ',
        },
      ],
    ],
  },
];

export const mockedSearchData123 = {
  data: {
    id: '32109',
    type: 'chapter',
    attributes: {
      goods_nomenclature_sid: 32109,
      goods_nomenclature_item_id: '1200000000',
      description: 'OIL SEEDS AND OLEAGINOUS FRUITS; MISCELLANEOUS GRAINS, SEEDS AND FRUIT; INDUSTRIAL OR MEDICINAL PLANTS; STRAW AND FODDER',
      formatted_description: 'Oil seeds and oleaginous fruits; miscellaneous grains, seeds and fruit; industrial or medicinal plants; straw and fodder',
      chapter_note: '',
      forum_url: null,
      section_id: 2,
    },
    relationships: {},
  },
  included: [
    {
      id: '2',
      type: 'section',
      attributes: {
        id: 2,
        numeral: 'II',
        title: 'Vegetable products',
        position: 2,
        section_note: "1. In this section, the term 'pellets' means products which have been agglomerated either directly by compression or by the addition of a binder in a proportion not exceeding 3% by weight.\r\n",
      },
    },
    {
      id: '23',
      type: 'guide',
      attributes: {
        title: 'Classification of goods',
        url: 'https://www.gov.uk/government/collections/classification-of-goods',
      },
    },
    {
      id: '32110',
      type: 'heading',
      attributes: {
        goods_nomenclature_sid: 32110,
        goods_nomenclature_item_id: '1201000000',
        declarable: false,
        description: 'Soya beans, whether or not broken',
        producline_suffix: '80',
        leaf: true,
        description_plain: 'Soya beans, whether or not broken',
        formatted_description: 'Soya beans, whether or not broken',
      },
      relationships: { children: { data: [] } },
    },
    {
      id: '32113',
      type: 'heading',
      attributes: {
        goods_nomenclature_sid: 32113,
        goods_nomenclature_item_id: '1202000000',
        declarable: false,
        description: 'Groundnuts, not roasted or otherwise cooked, whether or not shelled or broken',
        producline_suffix: '80',
        leaf: true,
        description_plain: 'Groundnuts, not roasted or otherwise cooked, whether or not shelled or broken',
        formatted_description: 'Groundnuts, not roasted or otherwise cooked, whether or not shelled or broken',
      },
      relationships: { children: { data: [] } },
    },
    {
      id: '32118',
      type: 'heading',
      attributes: {
        goods_nomenclature_sid: 32118,
        goods_nomenclature_item_id: '1203000000',
        declarable: true,
        description: 'Copra',
        producline_suffix: '80',
        leaf: true,
        description_plain: 'Copra',
        formatted_description: 'Copra',
      },
      relationships: { children: { data: [] } },
    },
    {
      id: '32119',
      type: 'heading',
      attributes: {
        goods_nomenclature_sid: 32119,
        goods_nomenclature_item_id: '1204000000',
        declarable: false,
        description: 'Linseed, whether or not broken',
        producline_suffix: '80',
        leaf: true,
        description_plain: 'Linseed, whether or not broken',
        formatted_description: 'Linseed, whether or not broken',
      },
      relationships: { children: { data: [] } },
    },
  ],
};

export const mockedSearchData123Html = [
  [
    {
      html: '<div class="search-results-head">\n'
        + '    <a href="/search?commodity=1203000000&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true">Commodity code: <strong>1203000000</strong></a>\n'
        + '  </div>\n'
        + '  <div class="search-results-description">Copra</div>\n'
        + '  ',
      sid: 32118,
      level: undefined,
      parent_sid: undefined,
      type: 'commodity',
    },
  ],
  [
    {
      html: '<div class="search-results-head">\n'
        + '    <strong>Category: 1201</strong>\n'
        + '  </div>\n'
        + '  <div class="search-results-description">\n'
        + '    <a href="/search/1201000000/0?commodity=1201&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&searchParent=123">Soya beans, whether or not broken</a>\n'
        + '  </div>',
      sid: 32110,
      level: undefined,
      parent_sid: undefined,
      type: 'heading',
    },
  ],
  [
    {
      html: '<div class="search-results-head">\n'
        + '    <strong>Category: 1202</strong>\n'
        + '  </div>\n'
        + '  <div class="search-results-description">\n'
        + '    <a href="/search/1202000000/0?commodity=1202&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&searchParent=123">Groundnuts, not roasted or otherwise cooked, whether or not shelled or broken</a>\n'
        + '  </div>',
      sid: 32113,
      level: undefined,
      parent_sid: undefined,
      type: 'heading',
    },
  ],
  [
    {
      html: '<div class="search-results-head">\n'
        + '    <strong>Category: 1204</strong>\n'
        + '  </div>\n'
        + '  <div class="search-results-description">\n'
        + '    <a href="/search/1204000000/0?commodity=1204&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&searchParent=123">Linseed, whether or not broken</a>\n'
        + '  </div>',
      sid: 32119,
      level: undefined,
      parent_sid: undefined,
      type: 'heading',
    },
  ],
];

export const mockedSearchDataChaptersUnmatched = {
  data: {
    id: '32109',
    type: 'chapter',
    attributes: {
      goods_nomenclature_sid: 32109,
      goods_nomenclature_item_id: '1200000000',
      description: 'OIL SEEDS AND OLEAGINOUS FRUITS; MISCELLANEOUS GRAINS, SEEDS AND FRUIT; INDUSTRIAL OR MEDICINAL PLANTS; STRAW AND FODDER',
      formatted_description: 'Oil seeds and oleaginous fruits; miscellaneous grains, seeds and fruit; industrial or medicinal plants; straw and fodder',
      chapter_note: '',
      forum_url: null,
      section_id: 2,
    },
    relationships: {},
  },
  included: [
    {
      id: '2',
      type: 'section',
      attributes: {
        id: 2,
        numeral: 'II',
        title: 'Vegetable products',
        position: 2,
        section_note: "1. In this section, the term 'pellets' means products which have been agglomerated either directly by compression or by the addition of a binder in a proportion not exceeding 3% by weight.\r\n",
      },
    },
    {
      id: '23',
      type: 'guide',
      attributes: {
        title: 'Classification of goods',
        url: 'https://www.gov.uk/government/collections/classification-of-goods',
      },
    },
    {
      id: '32110',
      type: 'heading',
      attributes: {
        goods_nomenclature_sid: 32110,
        goods_nomenclature_item_id: '0000000000',
        declarable: true,
        description: 'Some unmatched description',
        producline_suffix: '80',
        leaf: true,
        description_plain: 'Some unmatched description',
        formatted_description: 'Some unmatched description',
      },
      relationships: { children: { data: [] } },
    },
    {
      id: '32113',
      type: 'heading',
      attributes: {
        goods_nomenclature_sid: 32113,
        goods_nomenclature_item_id: '1202000000',
        declarable: false,
        description: 'Groundnuts, not roasted or otherwise cooked, whether or not shelled or broken',
        producline_suffix: '80',
        leaf: true,
        description_plain: 'Groundnuts, not roasted or otherwise cooked, whether or not shelled or broken',
        formatted_description: 'Groundnuts, not roasted or otherwise cooked, whether or not shelled or broken',
      },
      relationships: { children: { data: [] } },
    },
    {
      id: '32118',
      type: 'heading',
      attributes: {
        goods_nomenclature_sid: 32118,
        goods_nomenclature_item_id: '1203000000',
        declarable: true,
        description: 'Copra',
        producline_suffix: '80',
        leaf: true,
        description_plain: 'Copra',
        formatted_description: 'Copra',
      },
      relationships: { children: { data: [] } },
    },
    {
      id: '32119',
      type: 'heading',
      attributes: {
        goods_nomenclature_sid: 32119,
        goods_nomenclature_item_id: '1204000000',
        declarable: false,
        description: 'Linseed, whether or not broken',
        producline_suffix: '80',
        leaf: true,
        description_plain: 'Linseed, whether or not broken',
        formatted_description: 'Linseed, whether or not broken',
      },
      relationships: { children: { data: [] } },
    },
  ],
};

export const mockedSearchDataChaptersUnmatchedHtml = [
  [
    {
      html: '<div class="search-results-head">\n'
        + '    <a href="/search?commodity=1203000000&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true">Commodity code: <strong>1203000000</strong></a>\n'
        + '  </div>\n'
        + '  <div class="search-results-description">Copra</div>\n'
        + '  ',
      sid: 32118,
      level: undefined,
      parent_sid: undefined,
      type: 'commodity',
    },
  ],
  [
    {
      html: '<div class="search-results-head">\n'
        + '    <strong>Category: 1202</strong>\n'
        + '  </div>\n'
        + '  <div class="search-results-description">\n'
        + '    <a href="/search/1202000000/0?commodity=1202&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&searchParent=123">Groundnuts, not roasted or otherwise cooked, whether or not shelled or broken</a>\n'
        + '  </div>',
      sid: 32113,
      level: undefined,
      parent_sid: undefined,
      type: 'heading',
    },
  ],
  [
    {
      html: '<div class="search-results-head">\n'
        + '    <strong>Category: 1204</strong>\n'
        + '  </div>\n'
        + '  <div class="search-results-description">\n'
        + '    <a href="/search/1204000000/0?commodity=1204&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&searchParent=123">Linseed, whether or not broken</a>\n'
        + '  </div>',
      sid: 32119,
      level: undefined,
      parent_sid: undefined,
      type: 'heading',
    },
  ],
];

export const mockedSearchDataSearchJam = {
  data: {
    id: '33678',
    type: 'heading',
    attributes: {
      goods_nomenclature_item_id: '2007000000',
      description: '',
      bti_url: '',
      formatted_description: '',
      declarable: false,
    },
    relationships: {},
  },
  included: [
    {
      id: '33698',
      type: 'commodity',
      attributes: {
        description: 'Other',
        number_indents: 1,
        goods_nomenclature_item_id: '2007910000',
        leaf: false,
        goods_nomenclature_sid: 33698,
        formatted_description: 'Other',
        description_plain: 'Other',
        producline_suffix: '10',
        parent_sid: null,
      },
      relationships: {},
    },
    {
      id: '33699',
      type: 'commodity',
      attributes: {
        description: 'Citrus fruit',
        number_indents: 2,
        goods_nomenclature_item_id: '2007910000',
        leaf: false,
        goods_nomenclature_sid: 33699,
        formatted_description: 'Citrus fruit',
        description_plain: 'Citrus fruit',
        producline_suffix: '80',
        parent_sid: 33698,
      },
      relationships: {},
    },
  ],
};

export const mockedSearchDataSearch000 = {
  data: {
    id: '50711',
    type: 'heading',
    attributes: {
      goods_nomenclature_item_id: '8536000000',
      description: '',
      bti_url: '',
      formatted_description: '',
      declarable: false,
    },
    relationships: {},
  },
  included: [
    {
      id: '50781',
      type: 'commodity',
      attributes: {
        description: 'Lamp holders, plugs and sockets',
        number_indents: 1,
        goods_nomenclature_item_id: '8536610000',
        leaf: false,
        goods_nomenclature_sid: 50781,
        formatted_description: 'Lamp holders, plugs and sockets',
        description_plain: 'Lamp holders, plugs and sockets',
        producline_suffix: '10',
        parent_sid: null,
      },
      relationships: {},
    },
    {
      id: '50789',
      type: 'commodity',
      attributes: {
        description: 'Other',
        number_indents: 2,
        goods_nomenclature_item_id: '8536690000',
        leaf: false,
        goods_nomenclature_sid: 50789,
        formatted_description: 'Other',
        description_plain: 'Other',
        producline_suffix: '80',
        parent_sid: 50781,
      },
      relationships: {},
    },
  ],
};

export const mockedSearchDataSubheading = {
  data: {
    q: 'lvl',
    as_of: '2022-05-18',
    results: [
      {
        declarable: false,
        description: 'Laminated veneered lumber (LVL)',
        goods_nomenclature_item_id: '4412410000',
        number_indents: 1,
        producline_suffix: '10',
        type: 'subheading',
        validity_end_date: null,
        validity_start_date: null,
      },
    ],
  },
};

export const mockedSearchDataSubheadingLvl = {
  data: {
    data: {
      id: '107456',
      type: 'subheading',
      attributes: {
        goods_nomenclature_item_id: '4412410000',
        goods_nomenclature_sid: 107456,
        number_indents: 1,
        producline_suffix: '10',
        description: 'Laminated veneered lumber (LVL)',
        formatted_description: 'Laminated veneered lumber (LVL)',
        declarable: false,
      },
      relationships: {},
    },
    included: [
      {
        id: '107456',
        type: 'commodity',
        attributes: {
          formatted_description: 'Laminated veneered lumber (LVL)',
          description_plain: 'Laminated veneered lumber (LVL)',
          number_indents: 1,
          goods_nomenclature_item_id: '4412410000',
          producline_suffix: '10',
          goods_nomenclature_sid: 107456,
          parent_sid: null,
          leaf: false,
          declarable: false,
          productline_suffix: '10',
        },
        relationships: {
          overview_measures: {
            data: [
              { id: '2982637', type: 'measure' },
              { id: '-1009491172', type: 'measure' },
            ],
          },
        },
      },
      {
        id: '107457',
        type: 'commodity',
        attributes: {
          formatted_description: 'With at least one outer ply of tropical wood',
          description_plain: 'With at least one outer ply of tropical wood',
          number_indents: 2,
          goods_nomenclature_item_id: '4412410000',
          producline_suffix: '80',
          goods_nomenclature_sid: 107457,
          parent_sid: 107456,
          leaf: false,
          declarable: false,
          productline_suffix: '80',
        },
        relationships: {
          overview_measures: {
            data: [
              { id: '2982637', type: 'measure' },
              { id: '-1009491172', type: 'measure' },
            ],
          },
        },
      },
      {
        id: '107458',
        type: 'commodity',
        attributes: {
          formatted_description: 'With a least one outer layer of non-coniferous wood',
          description_plain: 'With a least one outer layer of non-coniferous wood',
          number_indents: 3,
          goods_nomenclature_item_id: '4412419100',
          producline_suffix: '80',
          goods_nomenclature_sid: 107458,
          parent_sid: 107457,
          leaf: true,
          declarable: true,
          productline_suffix: '80',
        },
        relationships: {},
      },
      {
        id: '107459',
        type: 'commodity',
        attributes: {
          formatted_description: 'Other',
          description_plain: 'Other',
          number_indents: 3,
          goods_nomenclature_item_id: '4412419900',
          producline_suffix: '80',
          goods_nomenclature_sid: 107459,
          parent_sid: 107457,
          leaf: false,
          declarable: false,
          productline_suffix: '80',
        },
        relationships: {},
      },
      {
        id: '107522',
        type: 'commodity',
        attributes: {
          formatted_description: 'Plywood of coniferous species, without the addition of other substances,of a thickness greater than 18,5 mm when sanded, or of a thickness greater than 8,5 mm when the faces are not further prepared than the peeling process',
          description_plain: 'Plywood of coniferous species, without the addition of other substances,of a thickness greater than 18,5 mm when sanded, or of a thickness greater than 8,5 mm when the faces are not further prepared than the peeling process',
          number_indents: 4,
          goods_nomenclature_item_id: '4412419910',
          producline_suffix: '80',
          goods_nomenclature_sid: 107522,
          parent_sid: 107459,
          leaf: true,
          declarable: true,
          productline_suffix: '80',
        },
        relationships: {},
      },
      {
        id: '107523',
        type: 'commodity',
        attributes: {
          formatted_description: 'Other',
          description_plain: 'Other',
          number_indents: 4,
          goods_nomenclature_item_id: '4412419990',
          producline_suffix: '80',
          goods_nomenclature_sid: 107523,
          parent_sid: 107459,
          leaf: true,
          declarable: true,
          productline_suffix: '80',
        },
        relationships: {},
      },
      {
        id: '107460',
        type: 'commodity',
        attributes: {
          formatted_description: 'Other, with at least one outer ply of non-coniferous wood',
          description_plain: 'Other, with at least one outer ply of non-coniferous wood',
          number_indents: 2,
          goods_nomenclature_item_id: '4412420000',
          producline_suffix: '80',
          goods_nomenclature_sid: 107460,
          parent_sid: 107456,
          leaf: true,
          declarable: true,
          productline_suffix: '80',
        },
        relationships: {},
      },
      {
        id: '107461',
        type: 'commodity',
        attributes: {
          formatted_description: 'Other, with both outer plies of coniferous wood',
          description_plain: 'Other, with both outer plies of coniferous wood',
          number_indents: 2,
          goods_nomenclature_item_id: '4412490000',
          producline_suffix: '80',
          goods_nomenclature_sid: 107461,
          parent_sid: 107456,
          leaf: false,
          declarable: false,
          productline_suffix: '80',
        },
      },
      {
        id: '107524',
        type: 'commodity',
        attributes: {
          formatted_description: 'Plywood of coniferous species, without the addition of other substances,of a thickness greater than 18,5 mm when sanded, or of a thickness greater than 8,5 mm when the faces are not further prepared than the peeling process',
          description_plain: 'Plywood of coniferous species, without the addition of other substances,of a thickness greater than 18,5 mm when sanded, or of a thickness greater than 8,5 mm when the faces are not further prepared than the peeling process',
          number_indents: 3,
          goods_nomenclature_item_id: '4412490010',
          producline_suffix: '80',
          goods_nomenclature_sid: 107524,
          parent_sid: 107461,
          leaf: true,
          declarable: true,
          productline_suffix: '80',
        },
        relationships: {},
      },
      {
        id: '107525',
        type: 'commodity',
        attributes: {
          formatted_description: 'Other',
          description_plain: 'Other',
          number_indents: 3,
          goods_nomenclature_item_id: '4412490090',
          producline_suffix: '80',
          goods_nomenclature_sid: 107525,
          parent_sid: 107461,
          leaf: true,
          declarable: true,
          productline_suffix: '80',
        },
        relationships: {},
      },
    ],
  },
};

export const mockedSearchDataSubheadingHtmlLvl = [
  [
    {
      html: '<div class="search-results-head">\n'
        + '        <a href="/search?commodity=4412420000&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&subheadingSuffix=10">Commodity code: <strong>4412420000</strong></a>\n'
        + '       </div>\n'
        + '       <div class="search-results-description">Other, with at least one outer ply of non-coniferous wood</div>\n'
        + '      ',
      type: 'commodity',
      parent_sid: 107456,
      sid: 107460,
      level: 2,
    },
  ],
  [
    {
      html: '<div class="search-results-head">\n'
        + '        <a href="/search/4412410000/107457?commodity=lvl&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&subheadingSuffix=10&isSubheading=true&depth=2">With at least one outer ply of tropical wood</a>\n'
        + '      </div>',
      type: 'heading',
      parent_sid: 107456,
      sid: 107457,
      level: 2,
    },
  ],
  [
    {
      html: '<div class="search-results-head">\n'
        + '        <a href="/search/4412410000/107461?commodity=lvl&originCountry=CN&goodsIntent=bringGoodsToSell&userTypeTrader=yes&tradeType=import&destinationCountry=GB&importDeclarations=yes&isHeading=true&subheadingSuffix=10&isSubheading=true&depth=2">Other, with both outer plies of coniferous wood</a>\n'
        + '      </div>',
      type: 'heading',
      parent_sid: 107456,
      sid: 107461,
      level: 2,
    },
  ],
];

export default mockedSearchDataChapter;
