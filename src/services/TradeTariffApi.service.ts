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

/* eslint-disable class-methods-use-this */
import axios from 'axios';
import 'dotenv/config';

export default class TradeTariffApi {
  public async searchTradeTariff(searchTerm: string):Promise<any> {
    const term = encodeURIComponent(searchTerm);
    const { data } = await axios.get(
      `${process.env.TRADE_TARIFF_SERVICE_API_URL}/search.json?q=${term}&input-autocomplete=${term}`,
    );

    return data;
  }

  public async searchTradeTariffByType(responseType: string, goodsId: string, suffix: string):Promise<any> {
    const type = encodeURIComponent(responseType);
    let setGoodsId;
    if (type === 'chapters') {
      setGoodsId = encodeURIComponent(goodsId.slice(0, 2));
    } else if (type === 'subheadings') {
      setGoodsId = encodeURIComponent(`${goodsId}-${suffix}`);
    } else {
      setGoodsId = encodeURIComponent(goodsId.slice(0, 4));
    }

    const response = await axios.get(
      `${process.env.TRADE_TARIFF_SERVICE_API_URL}/api/v2/${type}/${setGoodsId}`,
    );
    return response;
  }
}
