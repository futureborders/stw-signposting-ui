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

import axios, { AxiosResponse } from 'axios';
import { DestinationCountry } from '../interfaces/enums.interface';
import StwTradeTariffApi from './StwTradeTariffApi.service';
import { mockedTariffAndTaxesData, mockedRestrictiveMeasures } from '../utils/mockedData';
import { ImportDate } from '../interfaces/importDate.interface';
import CommodityNotFoundException from '../exceptions/commodityNotFoundException';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const stwTradeTariffApi = new StwTradeTariffApi();

afterAll(async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
});

beforeEach(() => {
  jest.clearAllMocks();
});

let importDate = {
  day: '1',
  month: '2',
  year: '2021',
};

describe('Testing StwTradeTariffApi', () => {
  describe('getAdditionalCode ', () => {
    test('getAdditionalCode 200', async () => {
      const axiosTradeDataResponse: AxiosResponse = {
        ...mockedRestrictiveMeasures,
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
      };

      mockedAxios.get.mockResolvedValue(axiosTradeDataResponse);
      const response = await stwTradeTariffApi.getAdditionalCode(
        '0208907000',
        'import',
        'CN',
        DestinationCountry.GB,
        importDate as ImportDate,
      );

      expect(Object.keys(response.data.measures).length).toBe(4);
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getAdditionalCode 500', async () => {
      const expectedResult = 500;
      mockedAxios.get.mockRejectedValue({ response: { status: expectedResult } });

      try {
        await stwTradeTariffApi.getAdditionalCode(
          '0208907000',
          'import',
          'CN',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
      } catch (e: any) {
        if (e.response.status === 500) {
          expect(e.response.status).toEqual(500);
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getAdditionalCode 404', async () => {
      mockedAxios.get.mockRejectedValue(new CommodityNotFoundException('0208907000'));

      try {
        await stwTradeTariffApi.getAdditionalCode(
          '0208907000',
          'import',
          'CN',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
        expect(true).toBe(false);
      } catch (e: any) {
        if (e.name === 'CommodityNotFoundError') {
          expect(e.name).toEqual('CommodityNotFoundError');
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getAdditionalCode throw InvalidDestinationCountryError', async () => {
      const expectedResult: any = {
        response: {
          data: {
            validationErrors: [{
              fieldName: 'destinationCountry',
              message: "Invalid destination country 'XX'",
            }],
          },
        },
      };

      mockedAxios.get.mockRejectedValue(expectedResult);

      try {
        await stwTradeTariffApi.getAdditionalCode(
          '0208907000',
          'import',
          'CN',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
      } catch (e: any) {
        if (e.response.response.data.validationErrors[0].fieldName === 'destinationCountry') {
          expect(e.response.response.data.validationErrors[0].message).toEqual('Invalid destination country \'XX\'');
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getAdditionalCode throw InvalidOriginCountryError ', async () => {
      const expectedResult: any = {
        response: {
          data: {
            validationErrors: [{
              fieldName: 'originCountry',
              message: "Invalid origin country 'XX'",
            }],
          },
        },
      };

      mockedAxios.get.mockRejectedValue(expectedResult);

      try {
        await stwTradeTariffApi.getAdditionalCode(
          '0208907000',
          'import',
          '',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
      } catch (e: any) {
        if (e.response.response.data.validationErrors[0].fieldName === 'originCountry') {
          expect(e.response.response.data.validationErrors[0].message).toEqual('Invalid origin country \'XX\'');
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getAdditionalCode throw InvalidCommodityCodeError', async () => {
      const axiosTradeDataResponse: any = {
        response: {
          data: {
            validationErrors: [{
              fieldName: 'commodityCode',
              message: 'some invalid message',
            }],
          },
          status: 400,
          statusText: 'Bad Request',
        },
      };

      mockedAxios.get.mockRejectedValue(axiosTradeDataResponse);

      try {
        await stwTradeTariffApi.getAdditionalCode(
          '',
          'import',
          'CN',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
      } catch (e: any) {
        if (e.response.response.data.validationErrors[0].fieldName === 'commodityCode') {
          expect(e.response.response.data.validationErrors[0].message).toEqual('some invalid message');
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getAdditionalCode throw InvalidTradeTypeError', async () => {
      const expectedResult: any = {
        response: {
          data: {
            validationErrors: [{
              fieldName: 'tradeType',
              message: 'some invalid message',
            }],
          },
        },
      };

      mockedAxios.get.mockRejectedValue(expectedResult);

      try {
        await stwTradeTariffApi.getAdditionalCode(
          '0208907000',
          '',
          'CN',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
      } catch (e: any) {
        if (e.response.response.data.validationErrors[0].fieldName === 'tradeType') {
          expect(e.response.response.data.validationErrors[0].message).toEqual('some invalid message');
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getAdditionalCode throw InvalidImportDateError', async () => {
      const axiosTradeDataResponse: any = {
        response: {
          data: {
            validationErrors: [{
              fieldName: 'importDate',
              message: 'some invalid message',
            }],
          },
          status: 400,
          statusText: 'Bad Request',
        },
      };

      mockedAxios.get.mockRejectedValue(axiosTradeDataResponse);

      importDate = {
        day: '0',
        month: '0',
        year: '0000',
      };

      try {
        await stwTradeTariffApi.getAdditionalCode(
          '0208907000',
          '',
          'CN',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
      } catch (e: any) {
        if (e.response.response.data.validationErrors[0].fieldName === 'importDate') {
          expect(e.response.response.data.validationErrors[0].message).toEqual('some invalid message');
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
  });
  describe('getTariffAndTaxesData ', () => {
    test('getTariffAndTaxesData 200', async () => {
      const axiosTariffAndTaxesDataResponse: AxiosResponse = {
        ...mockedTariffAndTaxesData,
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
      };

      mockedAxios.get.mockResolvedValue(axiosTariffAndTaxesDataResponse);
      const response = await stwTradeTariffApi.getTariffAndTaxesData(
        '0208907000',
        'import',
        'CN',
        DestinationCountry.GB,
        importDate as ImportDate,
      );
      expect(response.data).toBe(mockedTariffAndTaxesData.data);
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getTariffAndTaxesData 404', async () => {
      mockedAxios.get.mockRejectedValue(new CommodityNotFoundException('0208907000'));

      try {
        await stwTradeTariffApi.getTariffAndTaxesData(
          '0208907000',
          'import',
          'CN',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
        expect(true).toBe(false);
      } catch (e: any) {
        if (e.name === 'CommodityNotFoundError') {
          expect(e.name).toEqual('CommodityNotFoundError');
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getTariffAndTaxesData 500', async () => {
      const expectedResult = 500;

      mockedAxios.get.mockRejectedValue({ response: { status: expectedResult } });

      try {
        await stwTradeTariffApi.getTariffAndTaxesData(
          '0208907000',
          'import',
          'XX',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
      } catch (e: any) {
        if (e.response.status === 500) {
          expect(e.response.status).toEqual(500);
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getTariffAndTaxesData throw InvalidDestinationCountryError', async () => {
      const expectedResult: any = {
        response: {
          data: {
            validationErrors: [{
              fieldName: 'destinationCountry',
              message: "Invalid destination country 'XX'",
            }],
          },
        },
      };

      mockedAxios.get.mockRejectedValue(expectedResult);

      try {
        await stwTradeTariffApi.getTariffAndTaxesData(
          '0208907000',
          'import',
          'CN',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
      } catch (e: any) {
        if (e.response.response.data.validationErrors[0].fieldName === 'destinationCountry') {
          expect(e.response.response.data.validationErrors[0].message).toEqual('Invalid destination country \'XX\'');
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getTariffAndTaxesData throw InvalidOriginCountryError ', async () => {
      const expectedResult: any = {
        response: {
          data: {
            validationErrors: [{
              fieldName: 'originCountry',
              message: "Invalid origin country 'XX'",
            }],
          },
        },
      };

      mockedAxios.get.mockRejectedValue(expectedResult);

      try {
        await stwTradeTariffApi.getTariffAndTaxesData(
          '0208907000',
          'import',
          'XX',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
      } catch (e: any) {
        if (e.response.response.data.validationErrors[0].fieldName === 'originCountry') {
          expect(e.response.response.data.validationErrors[0].message).toEqual('Invalid origin country \'XX\'');
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getTariffAndTaxesData throw InvalidCommodityCodeError', async () => {
      const axiosTradeDataResponse: any = {
        response: {
          data: {
            validationErrors: [{
              fieldName: 'commodityCode',
              message: 'some invalid message',
            }],
          },
          status: 400,
          statusText: 'Bad Request',
        },
      };

      mockedAxios.get.mockRejectedValue(axiosTradeDataResponse);

      try {
        await stwTradeTariffApi.getTariffAndTaxesData(
          '',
          'import',
          'CN',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
      } catch (e: any) {
        if (e.response.response.data.validationErrors[0].fieldName === 'commodityCode') {
          expect(e.response.response.data.validationErrors[0].message).toEqual('some invalid message');
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getTariffAndTaxesData throw InvalidImportDateError', async () => {
      const axiosTradeDataResponse: any = {
        response: {
          data: {
            validationErrors: [{
              fieldName: 'importDate',
              message: 'some invalid message',
            }],
          },
          status: 400,
          statusText: 'Bad Request',
        },
      };

      mockedAxios.get.mockRejectedValue(axiosTradeDataResponse);

      importDate = {
        day: '0',
        month: '0',
        year: '0000',
      };

      try {
        await stwTradeTariffApi.getTariffAndTaxesData(
          '0208907000',
          'import',
          'CN',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
      } catch (e: any) {
        if (e.response.response.data.validationErrors[0].fieldName === 'importDate') {
          expect(e.response.response.data.validationErrors[0].message).toEqual('some invalid message');
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
  });
  describe('getRestrictiveMeasures ', () => {
    test('getRestrictiveMeasures 200', async () => {
      const axiosTradeDataResponse: AxiosResponse = {
        ...mockedRestrictiveMeasures,
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
      };

      mockedAxios.get.mockResolvedValue(axiosTradeDataResponse);

      const response = await stwTradeTariffApi.getRestrictiveMeasures(
        '0208907000',
        'export',
        'CN',
        DestinationCountry.GB,
        importDate as ImportDate,
      );

      expect(response.data.measures[0].descriptionOverlay).toBe('## Veterinary controls');
      expect(response.data.measures[1].descriptionOverlay).toBe('## Animal Health Certificate');
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getRestrictiveMeasures 200 with additional code', async () => {
      const axiosTradeDataResponse: AxiosResponse = {
        ...mockedRestrictiveMeasures,
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
      };

      mockedAxios.get.mockResolvedValue(axiosTradeDataResponse);

      const response = await stwTradeTariffApi.getRestrictiveMeasures(
        '0208907000',
        'export',
        'CN',
        DestinationCountry.GB,
        importDate as ImportDate,
        'some_additional_code',
      );

      expect(response.data.measures[0].descriptionOverlay).toBe('## Veterinary controls');
      expect(response.data.measures[1].descriptionOverlay).toBe('## Animal Health Certificate');
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getRestrictiveMeasures 404', async () => {
      mockedAxios.get.mockRejectedValue(new CommodityNotFoundException('0208907000'));

      try {
        await stwTradeTariffApi.getRestrictiveMeasures(
          '0208907000',
          'export',
          'CN',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
        expect(true).toBe(false);
      } catch (e: any) {
        if (e.name === 'CommodityNotFoundError') {
          expect(e.name).toEqual('CommodityNotFoundError');
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getRestrictiveMeasures 500', async () => {
      const expectedResult = 500;

      mockedAxios.get.mockRejectedValue({ response: { status: expectedResult } });

      try {
        await stwTradeTariffApi.getRestrictiveMeasures(
          '0208907000',
          'export',
          'CN',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
      } catch (e: any) {
        if (e.response.status === 500) {
          expect(e.response.status).toEqual(500);
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getRestrictiveMeasures throw InvalidDestinationCountryError', async () => {
      const expectedResult: any = {
        response: {
          data: {
            validationErrors: [{
              fieldName: 'destinationCountry',
              message: "Invalid destination country 'XX'",
            }],
          },
        },
      };

      mockedAxios.get.mockRejectedValue(expectedResult);

      try {
        await stwTradeTariffApi.getRestrictiveMeasures(
          '0208907000',
          'export',
          'CN',
          'XX' as DestinationCountry,
          importDate as ImportDate,
        );
      } catch (e: any) {
        if (e.response.response.data.validationErrors[0].fieldName === 'destinationCountry') {
          expect(e.response.response.data.validationErrors[0].message).toEqual('Invalid destination country \'XX\'');
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getRestrictiveMeasures throw InvalidOriginCountryError ', async () => {
      const expectedResult: any = {
        response: {
          data: {
            validationErrors: [{
              fieldName: 'originCountry',
              message: "Invalid origin country 'XX'",
            }],
          },
        },
      };

      mockedAxios.get.mockRejectedValue(expectedResult);

      try {
        await stwTradeTariffApi.getRestrictiveMeasures(
          '0208907000',
          'export',
          'XX',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
      } catch (e: any) {
        if (e.response.response.data.validationErrors[0].fieldName === 'originCountry') {
          expect(e.response.response.data.validationErrors[0].message).toEqual('Invalid origin country \'XX\'');
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getRestrictiveMeasures throw InvalidCommodityCodeError', async () => {
      const axiosTradeDataResponse: any = {
        response: {
          data: {
            validationErrors: [{
              fieldName: 'commodityCode',
              message: 'some invalid message',
            }],
          },
          status: 400,
          statusText: 'Bad Request',
        },
      };

      mockedAxios.get.mockRejectedValue(axiosTradeDataResponse);

      try {
        await stwTradeTariffApi.getRestrictiveMeasures(
          '',
          'export',
          'CN',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
      } catch (e: any) {
        if (e.response.response.data.validationErrors[0].fieldName === 'commodityCode') {
          expect(e.response.response.data.validationErrors[0].message).toEqual('some invalid message');
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getRestrictiveMeasures throw InvalidTradeTypeError', async () => {
      const expectedResult: any = {
        response: {
          data: {
            validationErrors: [{
              fieldName: 'tradeType',
              message: 'some invalid message',
            }],
          },
        },
      };

      mockedAxios.get.mockRejectedValue(expectedResult);

      try {
        await stwTradeTariffApi.getRestrictiveMeasures(
          '0208907000',
          'someOtherTradeType',
          'CN',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
      } catch (e: any) {
        if (e.response.response.data.validationErrors[0].fieldName === 'tradeType') {
          expect(e.response.response.data.validationErrors[0].message).toEqual('some invalid message');
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getRestrictiveMeasures throw InvalidImportDateError', async () => {
      const axiosTradeDataResponse: any = {
        response: {
          data: {
            validationErrors: [{
              fieldName: 'importDate',
              message: 'some invalid message',
            }],
          },
          status: 400,
          statusText: 'Bad Request',
        },
      };

      mockedAxios.get.mockRejectedValue(axiosTradeDataResponse);

      importDate = {
        day: '0',
        month: '0',
        year: '0000',
      };

      try {
        await stwTradeTariffApi.getRestrictiveMeasures(
          '0208907000',
          'export',
          'CN',
          DestinationCountry.GB,
          importDate as ImportDate,
        );
      } catch (e: any) {
        if (e.response.response.data.validationErrors[0].fieldName === 'importDate') {
          expect(e.response.response.data.validationErrors[0].message).toEqual('some invalid message');
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
    test('getRestrictiveMeasures throw InvalidAdditionalCodeError', async () => {
      const expectedResult: any = {
        response: {
          data: {
            validationErrors: [{
              fieldName: 'additionalCode',
              message: 'Invalid additionalCode',
            }],
          },
        },
      };

      mockedAxios.get.mockRejectedValue(expectedResult);

      try {
        await stwTradeTariffApi.getRestrictiveMeasures(
          '0208907000',
          'export',
          'XX',
          DestinationCountry.GB,
          importDate as ImportDate,
          'abc',
        );
      } catch (e: any) {
        if (e.response.response.data.validationErrors[0].fieldName === 'additionalCode') {
          expect(e.response.response.data.validationErrors[0].message).toEqual('Invalid additionalCode');
        } else {
          throw e;
        }
      }
      expect(mockedAxios.get).toHaveBeenCalled();
    });
  });
});
