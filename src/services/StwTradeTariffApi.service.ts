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

/* eslint-disable class-methods-use-this */

import axios from 'axios';
import 'dotenv/config';
import CommodityNotFoundError from '../exceptions/commodityNotFoundException';
import InvalidDestinationCountryError from '../exceptions/invalidDestinationCountry';
import InvalidOriginCountryError from '../exceptions/invalidOriginCountry';
import InvalidCommodityCodeError from '../exceptions/invalidCommodityCode';
import InvalidAdditionalCodeError from '../exceptions/invalidAdditionalCode';
import InvalidTradeTypeError from '../exceptions/invalidTradeType';
import InvalidImportDateError from '../exceptions/invalidImportDate';
import { DestinationCountry } from '../interfaces/enums.interface';
import { ImportDate } from '../interfaces/importDate.interface';

class StwTradeTariffApi {
  public async getAdditionalCode(
    commodityCode: string,
    tradeType: string,
    originCountry: string,
    destinationCountry: DestinationCountry,
    importDate: ImportDate,
  ):Promise<any> {
    try {
      const data = await axios.get(`${process.env.STW_TRADE_TARIFF_API_URL}/commodities/${encodeURIComponent(commodityCode)}/additional-codes`, {
        params: {
          tradeType,
          originCountry,
          destinationCountry,
          importDate: this.getImportDate(importDate),
        },
      });
      return data;
    } catch (e: any) {
      const validationErrors = e.response?.data?.validationErrors;
      const invalidDestinationCountry = this.hasValidationErros(validationErrors, 'destinationCountry');
      const invalidOriginCountry = this.hasValidationErros(validationErrors, 'originCountry');
      const invalidCommodityCode = this.hasValidationErros(validationErrors, 'commodityCode');
      const invalidTradeType = this.hasValidationErros(validationErrors, 'tradeType');
      const invalidImportDate = this.hasValidationErros(validationErrors, 'importDate');

      if (e.response?.status === 404) {
        throw new CommodityNotFoundError(commodityCode);
      } else if (invalidCommodityCode) {
        throw new InvalidCommodityCodeError(e);
      } else if (invalidDestinationCountry) {
        throw new InvalidDestinationCountryError(e);
      } else if (invalidOriginCountry) {
        throw new InvalidOriginCountryError(e);
      } else if (invalidTradeType) {
        throw new InvalidTradeTypeError(e);
      } else if (invalidImportDate) {
        throw new InvalidImportDateError(e);
      } else {
        throw e;
      }
    }
  }

  public async getTariffAndTaxesData(
    commodityCode: string,
    tradeType: string,
    originCountry: string,
    destinationCountry: DestinationCountry,
    importDate: ImportDate,
  ): Promise<any> {
    try {
      const data = await axios.get(`${process.env.STW_TRADE_TARIFF_API_URL}/commodities/${encodeURIComponent(commodityCode)}/duties`, {
        params: {
          tradeType,
          originCountry,
          destinationCountry,
          importDate: this.getImportDate(importDate),
        },
      });
      return data;
    } catch (e: any) {
      const validationErrors = e.response?.data?.validationErrors;
      const invalidDestinationCountry = this.hasValidationErros(validationErrors, 'destinationCountry');
      const invalidOriginCountry = this.hasValidationErros(validationErrors, 'originCountry');
      const invalidCommodityCode = this.hasValidationErros(validationErrors, 'commodityCode');
      const invalidImportDate = this.hasValidationErros(validationErrors, 'importDate');

      if (e.response?.status === 404) {
        throw new CommodityNotFoundError(commodityCode);
      } else if (invalidDestinationCountry) {
        throw new InvalidDestinationCountryError(e);
      } else if (invalidOriginCountry) {
        throw new InvalidOriginCountryError(e);
      } else if (invalidCommodityCode) {
        throw new InvalidCommodityCodeError(e);
      } else if (invalidImportDate) {
        throw new InvalidImportDateError(e);
      } else {
        throw e;
      }
    }
  }

  private hasValidationErros = (validationErrors: any, field: string): boolean => !!validationErrors?.find((element: any) => element.fieldName === field);

  private getImportDate = (importDate: ImportDate): string => `${importDate.year}-${importDate.month}-${importDate.day}`;

  public async getRestrictiveMeasures(
    commodityCode: string,
    tradeType: string,
    originCountry: string,
    destinationCountry: DestinationCountry,
    importDate: ImportDate,
    additionalCode?: string,
  ): Promise<any> {
    try {
      const data: any = await axios.get(`${process.env.STW_TRADE_TARIFF_API_URL}/v1/commodities/${encodeURIComponent(commodityCode)}/restrictive-measures`, {
        params: {
          tradeType,
          originCountry,
          destinationCountry,
          tradeDate: this.getImportDate(importDate),
          ...((additionalCode && additionalCode !== 'false' && additionalCode !== 'undefined') && { additionalCode }),
        },
      });
      return data;
    } catch (e: any) {
      const validationErrors = e.response?.data?.validationErrors;
      const invalidDestinationCountry = this.hasValidationErros(validationErrors, 'destinationCountry');
      const invalidOriginCountry = this.hasValidationErros(validationErrors, 'originCountry');
      const invalidCommodityCode = this.hasValidationErros(validationErrors, 'commodityCode');
      const invalidTradeType = this.hasValidationErros(validationErrors, 'tradeType');
      const invalidImportDate = this.hasValidationErros(validationErrors, 'importDate');
      const invalidAdditionalCode = this.hasValidationErros(validationErrors, 'additionalCode');

      if (e.response?.status === 404) {
        throw new CommodityNotFoundError(commodityCode);
      } else if (invalidDestinationCountry) {
        throw new InvalidDestinationCountryError(e);
      } else if (invalidOriginCountry) {
        throw new InvalidOriginCountryError(e);
      } else if (invalidCommodityCode) {
        throw new InvalidCommodityCodeError(e);
      } else if (invalidTradeType) {
        throw new InvalidTradeTypeError(e);
      } else if (invalidImportDate) {
        throw new InvalidImportDateError(e);
      } else if (invalidAdditionalCode) {
        throw new InvalidAdditionalCodeError(e);
      } else {
        throw e;
      }
    }
  }
}

export default StwTradeTariffApi;
