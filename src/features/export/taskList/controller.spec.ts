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

import * as request from 'supertest';
import { AxiosResponse } from 'axios';
import App from '../../../app';
import 'dotenv/config';
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';
import { ImportDate } from '../../../interfaces/importDate.interface';

import { mockedRestrictiveMeasures } from '../checkLicencesAndRestrictions/mockedData';
import { mockedRestrictiveMeasuresWithProhibitions } from '../prohibitionsAndRestrictions/mockedData';

import translation from '../../../translation/en';
import { ExportsParams } from '../../../interfaces/exports.interface';
import { getParams } from '../../../utils/queryHelper';
import getTodaysDate from '../../../utils/tests/getTodaysDate';
import { formatDate } from '../../../utils/filters/formatDate';

jest.mock('../../../services/TradeTariffApi.service');
jest.mock('../../../services/StwTradeTariffApi.service');

const MockedTradeTariffApi = <jest.Mock<TradeTariffApi>>TradeTariffApi;
const mockedTradeTariffApi = <jest.Mocked<TradeTariffApi>>(
  new MockedTradeTariffApi()
);

const MockedStwTradeTariffApi = <jest.Mock<StwTradeTariffApi>>StwTradeTariffApi;
const mockedStwTradeTariffApi = <jest.Mocked<StwTradeTariffApi>>(
  new MockedStwTradeTariffApi()
);

jest.mock('../../../middlewares/auth-middleware', () => jest.fn((req, res, next) => next()));

const indexRoute = new IndexRoute(
  mockedTradeTariffApi,
  mockedStwTradeTariffApi,
);
const app = new App([indexRoute]);

let params:ExportsParams = {};

beforeEach(() => {
  jest.clearAllMocks();
  params = {
    tradeType: 'export',
    tradeDateDay: getTodaysDate.day,
    tradeDateMonth: getTodaysDate.month,
    tradeDateYear: getTodaysDate.year,
    originCountry: 'GB',
    exportDeclarations: 'yes',
    destinationCountry: 'CN',
    commodity: '0301921000',
    checkRestrictions: 'true',
    exportGoodsIntent: 'goodsExportedToBeSoldForBusiness',
  };
  process.env.CHEG_SERVICE_BASE_URL = 'https://cheg/';
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe(`[GET] ${Route.exportTaskList}`, () => {
  it('It should return status 200 and show correct text with no measures', async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      data: {
        measures: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.exportTaskList}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Check what licences, certificates and other restrictions apply to the goods<br /><br />There are no export measures for this commodity on this date.'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should return status 200 and show correct text with measures', async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.exportTaskList}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Check what licences, certificates and other restrictions apply to the goods'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should return status 200 and show correct text with "Check which declarations you need to submit" when the user has selected "Someone acting on my behalf will do this for me" to the "Who will submit the declarations" question', async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    params.exportDeclarations = 'yes';

    await request(app.getServer())
      .get(`${Route.exportTaskList}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Check which declarations you need to submit'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should return status 200 and hide the text with "Check which declarations you need to submit" when the user has not selected "Someone acting on my behalf will do this for me" to the "Who will submit the declarations" question', async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    params.exportDeclarations = 'no';

    await request(app.getServer())
      .get(`${Route.exportTaskList}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).not.toEqual(expect.stringContaining('Check which declarations you need to submit'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should return status 500', async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      data: {},
      status: 500,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockRejectedValue(
      axiosTradeDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.exportTaskList}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(500);
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it(`It should return status 302 redirect to ${Route.exportGoodsArrivalDate} with  invalid date`, async () => {
    params.tradeDateDay = 'invalidDay';

    await request(app.getServer())
      .get(`${Route.exportTaskList}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.exportGoodsArrivalDate}${getParams(params)}&error=${encodeURIComponent(translation.page.exportGoodsArrivalDate.errorDayNotNumber)}`,
      );
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).not.toHaveBeenCalled();
  });

  it(`It should return status 302 redirect to ${Route.typeOfTrade} with missing commodity param`, async () => {
    delete params.commodity;
    await request(app.getServer())
      .get(`${Route.exportTaskList}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.typeOfTrade}`,
      );
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).not.toHaveBeenCalled();
  });

  it('It should return status 200 and show correct trade details', async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      data: {
        measures: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    const date = {
      day: params.tradeDateDay,
      month: params.tradeDateMonth,
      year: params.tradeDateYear,
    };

    await request(app.getServer())
      .get(`${Route.exportTaskList}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Commodity code'));
        expect(res.text).toEqual(expect.stringContaining(String(params.commodity)));
        expect(res.text).toEqual(expect.stringContaining('Export date'));
        expect(res.text).toEqual(expect.stringContaining(formatDate(date as ImportDate)));
        expect(res.text).toEqual(expect.stringContaining('Country of departure'));
        expect(res.text).toEqual(expect.stringContaining('Great Britain (England, Scotland and Wales)'));
        expect(res.text).toEqual(expect.stringContaining('Goods going into'));
        expect(res.text).toEqual(expect.stringContaining('China'));
        expect(res.text).toEqual(expect.stringContaining('Classification'));
        expect(res.text).toEqual(expect.stringContaining('Live fish  &mdash; Other live fish  &mdash; Eels (Anguilla spp.) &mdash; <strong>Of a length of less than 12 cm</strong>'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it(`It should return status 302 aand redirect to ${Route.exportProhibitionsAndRestrictions} when prohibitions`, async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      ...mockedRestrictiveMeasuresWithProhibitions,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.exportTaskList}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.exportProhibitionsAndRestrictions}${getParams(params)}`,
      );
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should ignore CHEG url for invalid destination country', async () => {
    params.destinationCountry = 'random';

    const axiosTradeDataResponse: AxiosResponse = {
      data: {
        measures: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.exportTaskList}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('https://cheg/'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should ignore CHEG url for invalid originCountry', async () => {
    params.originCountry = 'random';

    const axiosTradeDataResponse: AxiosResponse = {
      data: {
        measures: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.exportTaskList}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('https://cheg/'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should ignore CHEG url for invalid commodity', async () => {
    params.commodity = 'random';

    const axiosTradeDataResponse: AxiosResponse = {
      data: {
        measures: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.exportTaskList}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('https://cheg/'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should return correct CHEG url', async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      data: {
        measures: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.exportTaskList}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('https://cheg/prodmap?oc=GB&amp;dc=CN&amp;code=0301921000&amp;utm_source=stwgs&amp;utm_medium=referral&amp;utm_term=task_list'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should return correct CHEG url whithout slash', async () => {
    process.env.CHEG_SERVICE_BASE_URL = 'https://cheg';

    const axiosTradeDataResponse: AxiosResponse = {
      data: {
        measures: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.exportTaskList}${getParams(params)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('https://cheg/prodmap?oc=GB&amp;dc=CN&amp;code=0301921000&amp;utm_source=stwgs&amp;utm_medium=referral&amp;utm_term=task_list'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });
});
