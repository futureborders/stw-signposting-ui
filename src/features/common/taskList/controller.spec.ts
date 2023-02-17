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

import * as request from 'supertest';
import { AxiosResponse } from 'axios';
import App from '../../../app';
import 'dotenv/config';
import StwTradeTariffApi from '../../../services/StwTradeTariffApi.service';
import TradeTariffApi from '../../../services/TradeTariffApi.service';
import { Route } from '../../../interfaces/routes.interface';
import IndexRoute from '../../../routes/index.route';
import { ImportDate } from '../../../interfaces/importDate.interface';

import { mockedRestrictiveMeasures } from '../../export/checkLicencesAndRestrictions/mockedData';
import { mockedRestrictiveMeasuresWithProhibitions } from '../../export/prohibitionsAndRestrictions/mockedData';
import { mockedTariffAndTaxesData } from '../../../utils/mockedData';

import translation from '../../../translation/en';
import { Params } from '../../../interfaces/params.interface';
import { getParams } from '../../../utils/queryHelper';
import getTodaysDate from '../../../utils/tests/getTodaysDate';
import { formatDate } from '../../../utils/filters/formatDate';
import {
  mockedAdditionalCodeData,
} from '../additionalCode/mockedData';

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

const indexRoute = new IndexRoute(
  mockedTradeTariffApi,
  mockedStwTradeTariffApi,
);
const app = new App([indexRoute]);

let exportsParams:Params = {};
let importsParams:Params = {};

beforeEach(() => {
  jest.clearAllMocks();
  exportsParams = {
    tradeType: 'export',
    tradeDateDay: getTodaysDate.day,
    tradeDateMonth: getTodaysDate.month,
    tradeDateYear: getTodaysDate.year,
    originCountry: 'GB',
    exportDeclarations: 'yes',
    destinationCountry: 'CN',
    commodity: '0301921000',
    exportGoodsIntent: 'goodsExportedToBeSoldForBusiness',
    exportUserTypeTrader: 'goodsExportedToBeSold',
    exportResponsibleForDeclaringGoods: 'yes',
  };
  importsParams = {
    commodity: '0208907000',
    tradeType: 'import',
    goodsIntent: 'bringGoodsToSell',
    importDeclarations: 'yes',
    userTypeTrader: 'yes',
    destinationCountry: 'GB',
    originCountry: 'CN',
    additionalCode: 'false',
    importDateDay: getTodaysDate.day,
    importDateMonth: getTodaysDate.month,
    importDateYear: getTodaysDate.year,
  };
  process.env.CHEG_SERVICE_BASE_URL = 'https://cheg/';
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe(`[GET] ${Route.taskList} for exports`, () => {
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

    const axiosAdditionalCodeResponse: AxiosResponse = {
      data: {
        data: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );

    await request(app.getServer())
      .get(`${Route.taskList}${getParams(exportsParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Exporting goods to China: what you need to do - Check how to import or export goods - GOV.UK'));
        expect(res.text).toEqual(expect.stringContaining('Getting the goods through China’s customs border'));
        expect(res.text).toEqual(expect.stringContaining('Check what licences, certificates and other restrictions apply to the goods<br /><br />There are no export measures for this commodity on this date.'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });

  it('It should return status 200 and show correct text with measures', async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const axiosAdditionalCodeResponse: AxiosResponse = {
      data: {
        data: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );

    await request(app.getServer())
      .get(`${Route.taskList}${getParams(exportsParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Check what licences, certificates and other restrictions apply to the goods'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });

  it('It should return status 200 and show correct text with "Check which declarations you need to submit" when the user has selected "Someone acting on my behalf will do this for me" to the "Who will submit the declarations" question', async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const axiosAdditionalCodeResponse: AxiosResponse = {
      data: {
        data: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );

    exportsParams.exportDeclarations = 'yes';

    await request(app.getServer())
      .get(`${Route.taskList}${getParams(exportsParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Check which declarations you need to submit'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });

  it('It should return status 200 and hide the text with "Check which declarations you need to submit" when the user has not selected "Someone acting on my behalf will do this for me" to the "Who will submit the declarations" question', async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      ...mockedRestrictiveMeasures,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const axiosAdditionalCodeResponse: AxiosResponse = {
      data: {
        data: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );

    exportsParams.exportDeclarations = 'no';

    await request(app.getServer())
      .get(`${Route.taskList}${getParams(exportsParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).not.toEqual(expect.stringContaining('Check which declarations you need to submit'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });

  it('It should return status 500', async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      data: {},
      status: 500,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const axiosAdditionalCodeResponse: AxiosResponse = {
      data: {
        data: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockRejectedValue(
      axiosTradeDataResponse,
    );

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );

    await request(app.getServer())
      .get(`${Route.taskList}${getParams(exportsParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(500);
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });

  it(`It should return status 302 redirect to ${Route.exportGoodsArrivalDate} with  invalid date`, async () => {
    exportsParams.tradeDateDay = 'invalidDay';

    await request(app.getServer())
      .get(`${Route.taskList}${getParams(exportsParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.exportGoodsArrivalDate}${getParams(exportsParams)}&error=${encodeURIComponent(translation.page.exportGoodsArrivalDate.errorDayNotNumber)}`,
      );
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).not.toHaveBeenCalled();
  });

  it(`It should return status 302 redirect to ${Route.typeOfTrade} with missing commodity param`, async () => {
    delete exportsParams.commodity;
    await request(app.getServer())
      .get(`${Route.taskList}${getParams(exportsParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.typeOfTrade}`,
      );
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).not.toHaveBeenCalled();
  });

  it(`It should respond with statusCode 200 and redirect to ${Route.exportCommoditySearch} when commodity not found`, async () => {
    exportsParams.commodity = '0000000000';
    await request(app.getServer())
      .get(`${Route.taskList}${getParams(exportsParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.exportCommoditySearch}${getParams(exportsParams)}&error=This%20code%20is%20not%20valid.%20Enter%20a%20valid%20commodity%20code`);
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
      day: exportsParams.tradeDateDay,
      month: exportsParams.tradeDateMonth,
      year: exportsParams.tradeDateYear,
    };

    await request(app.getServer())
      .get(`${Route.taskList}${getParams(exportsParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Commodity code'));
        expect(res.text).toEqual(expect.stringContaining(String(exportsParams.commodity)));
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

  it(`It should return status 302 and redirect to ${Route.exportProhibitionsAndRestrictions} when prohibitions`, async () => {
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
      .get(`${Route.taskList}${getParams(exportsParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.exportProhibitionsAndRestrictions}${getParams(exportsParams)}`,
      );
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
  });

  it('It should ignore CHEG url for invalid destination country', async () => {
    exportsParams.destinationCountry = 'random';

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
      .get(`${Route.taskList}${getParams(exportsParams)}&externalLink=true`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', 'https://cheg/');

    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).not.toHaveBeenCalled();
  });

  it('It should ignore CHEG url for invalid originCountry', async () => {
    exportsParams.originCountry = 'random';

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
      .get(`${Route.taskList}${getParams(exportsParams)}&externalLink=true`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', 'https://cheg/');

    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).not.toHaveBeenCalled();
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
      .get(`${Route.taskList}${getParams(exportsParams)}&externalLink=true`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', 'https://cheg/prodmap?oc=GB&dc=CN&code=0301921000&utm_source=stwgs&utm_medium=referral&utm_term=task_list');

    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).not.toHaveBeenCalled();
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
      .get(`${Route.taskList}${getParams(exportsParams)}&externalLink=true`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', 'https://cheg/prodmap?oc=GB&dc=CN&code=0301921000&utm_source=stwgs&utm_medium=referral&utm_term=task_list');

    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).not.toHaveBeenCalled();
  });

  it(`It should respond with statusCode 302 and redirect to ${Route.additionalCode} if invalid additional code`, async () => {
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

    const axiosAdditionalCodeResponse: AxiosResponse = {
      ...mockedAdditionalCodeData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );

    exportsParams.additionalCode = '0000';

    await request(app.getServer())
      .get(`${Route.taskList}${getParams(exportsParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.additionalCode}${getParams(exportsParams)}&error=${encodeURIComponent(translation.common.additionalCode.error)}`);
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
  });

  it(`It should respond with statusCode 302 and redirect to ${Route.exportResponsibleForDeclaringGoods} if exportDeclarations and misssing exportResponsibleForDeclaringGoods`, async () => {
    exportsParams.exportResponsibleForDeclaringGoods = '';

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

    const axiosAdditionalCodeResponse: AxiosResponse = {
      ...mockedAdditionalCodeData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );

    exportsParams.additionalCode = '0000';

    await request(app.getServer())
      .get(`${Route.taskList}${getParams(exportsParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.exportResponsibleForDeclaringGoods}${getParams(exportsParams)}&isEdit=true&error=${encodeURIComponent(translation.page.exportResponsibleForDeclaringGoods.error(translation.common.countries.CN))}`);

    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).not.toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).not.toHaveBeenCalled();
  });
});

describe(`[GET] ${Route.taskList} for imports`, () => {
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

    const axiosAdditionalCodeResponse: AxiosResponse = {
      data: {
        data: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const axiosTariffAndTaxesDataResponse: AxiosResponse = {
      ...mockedTariffAndTaxesData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );

    mockedStwTradeTariffApi.getTariffAndTaxesData.mockResolvedValue(
      axiosTariffAndTaxesDataResponse,
    );

    await request(app.getServer())
      .get(`${Route.taskList}${getParams(importsParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual(expect.stringContaining('Check what licences, certificates and other restrictions apply to the goods<br /><br />There are no import measures for this commodity on this date.'));
      });
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getTariffAndTaxesData).toHaveBeenCalled();
  });

  it(`It should return status 302 redirect to ${Route.importDate} with invalid date`, async () => {
    importsParams.importDateDay = 'invalidDay';

    await request(app.getServer())
      .get(`${Route.taskList}${getParams(importsParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect(
        'Location',
        `${Route.importDate}${getParams(importsParams)}&error=${encodeURIComponent(translation.page.importDate.errorDayNotNumber)}`,
      );
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).not.toHaveBeenCalled();
  });

  it(`It should return status 302 and redirect to ${Route.destinationCountry} when destinationCountry = originCountry`, async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      data: {
        measures: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const axiosAdditionalCodeResponse: AxiosResponse = {
      data: {
        data: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const axiosTariffAndTaxesDataResponse: AxiosResponse = {
      ...mockedTariffAndTaxesData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );

    mockedStwTradeTariffApi.getTariffAndTaxesData.mockResolvedValue(
      axiosTariffAndTaxesDataResponse,
    );

    importsParams.destinationCountry = 'GB';
    importsParams.originCountry = 'GB';

    await request(app.getServer())
      .get(`${Route.taskList}${getParams(importsParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.destinationCountry}${getParams(importsParams)}`);
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getTariffAndTaxesData).toHaveBeenCalled();
  });

  it(`It should return status 302 and redirect to ${Route.northernIrelandAndEUTrading} when importsIntoXIFromEU`, async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      data: {
        measures: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const axiosAdditionalCodeResponse: AxiosResponse = {
      data: {
        data: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const axiosTariffAndTaxesDataResponse: AxiosResponse = {
      ...mockedTariffAndTaxesData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );

    mockedStwTradeTariffApi.getTariffAndTaxesData.mockResolvedValue(
      axiosTariffAndTaxesDataResponse,
    );

    importsParams.destinationCountry = 'XI';
    importsParams.originCountry = 'FR';

    await request(app.getServer())
      .get(`${Route.taskList}${getParams(importsParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.northernIrelandAndEUTrading}${getParams(importsParams)}`);
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getTariffAndTaxesData).toHaveBeenCalled();
  });

  it(`It should respond with statusCode 200 and redirect to ${Route.importGoods} when commodity not found`, async () => {
    importsParams.commodity = '0000000000';
    await request(app.getServer())
      .get(`${Route.taskList}${getParams(importsParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(302)
      .expect('Location', `${Route.importGoods}${getParams(importsParams)}&error=This%20code%20is%20not%20valid.%20Enter%20a%20valid%20commodity%20code`);
  });

  it('It should return status 200 ', async () => {
    const axiosTradeDataResponse: AxiosResponse = {
      data: {
        measures: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const axiosAdditionalCodeResponse: AxiosResponse = {
      data: {
        data: [],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const axiosTariffAndTaxesDataResponse: AxiosResponse = {
      ...mockedTariffAndTaxesData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    mockedStwTradeTariffApi.getRestrictiveMeasures.mockResolvedValue(
      axiosTradeDataResponse,
    );

    mockedStwTradeTariffApi.getAdditionalCode.mockResolvedValue(
      axiosAdditionalCodeResponse,
    );

    mockedStwTradeTariffApi.getTariffAndTaxesData.mockResolvedValue(
      axiosTariffAndTaxesDataResponse,
    );

    delete importsParams.additionalCode;

    await request(app.getServer())
      .get(`${Route.taskList}${getParams(importsParams)}`)
      .set('user-agent', 'node-superagent')
      .expect(200);
    expect(mockedStwTradeTariffApi.getRestrictiveMeasures).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getAdditionalCode).toHaveBeenCalled();
    expect(mockedStwTradeTariffApi.getTariffAndTaxesData).toHaveBeenCalled();
  });
});
