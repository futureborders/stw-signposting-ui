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

import { Request, Response } from 'express';
import {
  ExportParamsOrder, ImportParamsOrder, TypeOfTrade,
} from '../../../interfaces/enums.interface';
import { Route } from '../../../interfaces/routes.interface';
import { CheckYourAnswersData, StringsMapping, CommodityData } from './interface';
import { getImportDateFromQuery } from '../../../utils/queryHelper';
import { formatDate } from '../../../utils/filters/formatDate';
import { notTranslatedAttribute } from '../../../utils/filters/notTranslated';

export const hierarchy = (data: CommodityData): string => `${data && data.sub && data.sub.map((item: any) => item).join('  &mdash; ')} &mdash; <strong>${data && data.description}</strong>`;

const getStringsMapping = (
  answer: string,
  commodityData: CommodityData,
  language: string,
  translation: any,
  tradeDate: any,
  additionalCode: string,
  isImport: boolean,
  destinationCountry: string,
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
    answer: formatDate(tradeDate, language),
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
    question: isImport ? translation.page.importCountryOrigin.question : translation.page.exportOriginCountry.question,
    answer: translation.common.countries[answer],
    route: isImport ? Route.importCountryOrigin : Route.exportOriginCountry,
  },
  destinationCountry: {
    question: isImport ? translation.page.destinationCountry.question : translation.page.exportCountryDestination.questionExporting,
    answer: translation.common.countries[answer],
    route: isImport ? Route.destinationCountry : Route.exportCountryDestination,
  },
  commodity: {
    question: isImport ? translation.page.importGoods.question : translation.page.exportCommoditySearch.question,
    answer: `${answer}${additionalCode}<div id="classification"${notTranslatedAttribute(language)}>${hierarchy(commodityData)}</div>`,
    route: isImport ? Route.importGoods : Route.exportCommoditySearch,
  },
  goodsIntent: {
    question: translation.page.goodsIntent.question,
    answer: translation.page.goodsIntent.bringGoodsToSellForBusiness,
    route: Route.goodsIntent,
  },
  userTypeTrader: {
    question: translation.page.identifyUserType.question,
    answer: translation.page.identifyUserType[answer],
    route: Route.identifyUserType,
  },
  importDeclarations: {
    question: translation.page.importDeclarations.question,
    answer: translation.page.importDeclarations[answer],
    route: Route.importDeclarations,
  },
  importDateDay: {
    question: translation.page.importDate.question,
    answer: formatDate(tradeDate, language),
    route: Route.importDate,
  },
  exportResponsibleForDeclaringGoods: {
    question: translation.page.exportResponsibleForDeclaringGoods.question(translation.common.countries[destinationCountry]),
    answer: translation.page.exportResponsibleForDeclaringGoods[answer],
    route: Route.exportResponsibleForDeclaringGoods,
  },
});

export const checkYourAnswersRows = (
  req: Request,
  res: Response,
  commodityData: CommodityData,
): CheckYourAnswersData => {
  const { query } = req;
  const { translation, language, queryParams } = res.locals;
  const { additionalCode, tradeType, destinationCountry } = query;
  const tradeDate = getImportDateFromQuery(req);
  const isImport = tradeType === TypeOfTrade.import;
  const getAdditionalCode = (additionalCode !== 'false' && additionalCode !== undefined) ? ` - ${additionalCode}` : '';
  const paramsOrder = isImport ? ImportParamsOrder : ExportParamsOrder;

  const result = Object.keys(query).map((key: any) => {
    if (Object.values(paramsOrder).includes(key as ExportParamsOrder | ImportParamsOrder)) {
      const stringsMapping: StringsMapping = getStringsMapping(
        `${query[key]}`,
        commodityData,
        language,
        translation,
        tradeDate,
        getAdditionalCode,
        isImport,
        String(destinationCountry),
      );

      return {
        id: key,
        key: {
          html: stringsMapping[key].question,
          classes: 'govuk-!-width-one-third',
        },
        value: {
          html: stringsMapping[key].answer,
        },
        actions: {
          items: [
            {
              href: `${stringsMapping[key].route}?${queryParams}&isEdit=true`,
              text: translation.common.tradeDetails.change,
              visuallyHiddenText: stringsMapping[key].question,
              classes: 'govuk-!-display-none-print',
              attributes: {
                id: `edit_${key}`,
              },
            },
          ],
        },
      };
    }
    return null as any;
  }).sort((a: any, b: any) => Object.values(paramsOrder).indexOf(a?.id) - Object.values(paramsOrder).indexOf(b?.id)).filter((x: any) => x)
    .filter((y) => y.value.html !== undefined);

  return { rows: result };
};

export default checkYourAnswersRows;
