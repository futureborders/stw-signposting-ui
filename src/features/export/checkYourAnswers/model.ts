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

import { Request, Response } from 'express';
import { getCountryNameByCode } from '../../../utils/filters/getCountryNameByCode';
import { ExportParamsOrder } from '../../../interfaces/enums.interface';
import { Route } from '../../../interfaces/routes.interface';
import { CheckYourAnswersData, StringsMapping, CommodityData } from './interface';
import { getImportDateFromQuery } from '../../../utils/queryHelper';
import { formatDate } from '../../../utils/filters/formatDate';

export const hierarchy = (data: CommodityData): string => `${data?.sub?.map((item: any) => item).join('  &mdash; ')} &mdash; <strong>${data?.description}</strong>`;

const getStringsMapping = (
  answer: string,
  commodityData: CommodityData,
  language: string,
  translation: any,
  tradeDate: any,
  additionalCode: string,
): StringsMapping => ({
  tradeType: {
    question: translation.page.typeOfTrade.question,
    answer: translation.page.typeOfTrade[answer],
    route: Route.typeOfTrade,
  },
  exportGoodsIntent: {
    question: translation.page.exportGoodsIntent.question,
    answer: translation.page.exportGoodsIntent[answer],
    route: Route.exportGoodsIntent,
  },
  tradeDateDay: {
    question: translation.page.exportGoodsArrivalDate.question,
    answer: formatDate(tradeDate),
    route: Route.exportGoodsArrivalDate,
  },
  exportDeclarations: {
    question: translation.page.exportDeclarations.question,
    answer: translation.page.exportDeclarations[answer],
    route: Route.exportDeclarations,
  },
  exportUserTypeTrader: {
    question: translation.page.exportUserTypeTrader.question,
    answer: translation.page.exportUserTypeTrader[answer],
    route: Route.exportUserTypeTrader,
  },
  originCountry: {
    question: translation.page.exportOriginCountry.question,
    answer: translation.page.exportOriginCountry[answer],
    route: Route.exportOriginCountry,
  },
  destinationCountry: {
    question: translation.page.exportCountryDestination.questionExporting,
    answer: getCountryNameByCode(answer, language),
    route: Route.exportCountryDestination,
  },
  commodity: {
    question: translation.page.exportCommoditySearch.question,
    answer: `${answer}${additionalCode}<div class="truncated-block-container" id="toggle"><div class="truncated truncated-block" data-show-label="${translation.page.manageThisTrade.showLabel}" data-hide-label="${translation.page.manageThisTrade.hideLabel}">${hierarchy(commodityData)}</div></div>`,
    route: Route.exportCommoditySearch,
  },
});

export const checkYourAnswersRows = (
  req: Request,
  res: Response,
  commodityData: CommodityData,
): CheckYourAnswersData => {
  const { query } = req;
  const { translation, language, queryParams } = res.locals;
  const tradeDate = getImportDateFromQuery(req);
  const { additionalCode } = query;

  const getAdditionalCode = (additionalCode !== 'false' && additionalCode !== undefined) ? ` - ${additionalCode}` : '';

  const result = Object.keys(query).map((key: any) => {
    if (Object.values(ExportParamsOrder).includes(key as ExportParamsOrder)) {
      const stringsMapping: StringsMapping = getStringsMapping(
        `${query[key]}`,
        commodityData,
        language,
        translation,
        tradeDate,
        getAdditionalCode,
      );

      return {
        id: key,
        key: {
          text: stringsMapping[key].question,
          classes: 'govuk-!-width-one-third',
        },
        value: {
          html: stringsMapping[key].answer,
        },
        actions: {
          items: [
            {
              href: `${stringsMapping[key].route}?${queryParams}&isEdit=true`,
              text: translation.page.manageThisTrade.commoditySummary.edit,
              visuallyHiddenText: stringsMapping[key].question,
              attributes: {
                id: `edit_${key}`,
              },
            },
          ],
        },
      };
    }
    return null as any;
  }).sort((a: any, b: any) => Object.values(ExportParamsOrder).indexOf(a?.id) - Object.values(ExportParamsOrder).indexOf(b?.id)).filter((x: any) => x)
    .filter((y) => y.value.html !== undefined);

  return { rows: result };
};

export default checkYourAnswersRows;
