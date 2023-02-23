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

import e from 'express';
import { AxiosResponse } from 'axios';
import { handleExceptions, handleImportExceptions } from './handleExceptions';
import getTodaysDate from '../utils/tests/getTodaysDate';
import {
  mockedCommodityCodeError,
  mockedDestinationCountryError,
  mockedExportOriginCountryError,
  mockedTradeTypeError,
} from '../features/export/checkLicencesAndRestrictions/mockedData';

import {
  mockedOriginCountryError,
  mockedAdditionalCodeError,
} from '../utils/mockedData';
import InvalidCommodityCodeError from './invalidCommodityCode';
import InvalidDestinationCountryError from './invalidDestinationCountry';
import InvalidOriginCountryError from './invalidOriginCountry';
import InvalidTradeTypeError from './invalidTradeType';
import InvalidAdditionalCodeError from './invalidAdditionalCode';
import CommodityNotFoundException from './commodityNotFoundException';
import { getParams } from '../utils/queryHelper';
import { Route } from '../interfaces/routes.interface';

describe('handleExceptions()', () => {
  const createMockRequest = () => (
     {
       query: {
         tradeType: 'export',
         tradeDateDay: getTodaysDate.day,
         tradeDateMonth: getTodaysDate.month,
         tradeDateYear: getTodaysDate.year,
         originCountry: 'GB',
         exportDeclarations: 'yes',
         destinationCountry: 'CN',
         commodity: '0301921000',
       },
       cookies: {
         stw_signposting: 'stw_signposting',
       },
       csrfToken: () => 'csrftoken',
     } as unknown as e.Request
  );

  const creatMockResponse = () => (
     {
       redirect: jest.fn(),
       locals: {
         queryParams: getParams(createMockRequest().query).substring(1),
         translation: {
           page: {
             importGoods: {
               errors: {
                 commodityNotFound: 'commodityNotFound error',
               },
             },
             exportCountryDestination: {
               error: 'exportCountryDestination error',
             },
             exportOriginCountry: {
               error: 'exportOriginCountry error',
             },
             typeOfTrade: {
               error: 'typeOfTrade error',
             },
           },
         },
         language: 'en',
       },
     } as unknown as e.Response
  );

  it('It should call redirect with the correct parameters with invalidCommodityCode', () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedCommodityCodeError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockError = new InvalidCommodityCodeError(axiosRestrictiveMeasuresResponse);
    const mockNext = jest.fn();
    handleExceptions(mockResponse, mockRequest, mockError, mockNext);
    expect(mockResponse.redirect).toHaveBeenCalledWith(`${Route.exportCommoditySearch}${getParams(createMockRequest().query)}`);
  });

  it('It should call redirect with the correct parameters with InvalidDestinationCountry', () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedDestinationCountryError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockError = new InvalidDestinationCountryError(axiosRestrictiveMeasuresResponse);
    const mockNext = jest.fn();
    handleExceptions(mockResponse, mockRequest, mockError, mockNext);
    expect(mockResponse.redirect).toHaveBeenCalledWith(`${Route.exportCountryDestination}${getParams(createMockRequest().query)}`);
  });

  it('It should call redirect with the correct parameters with InvalidOriginCountry', () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedExportOriginCountryError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockError = new InvalidOriginCountryError(axiosRestrictiveMeasuresResponse);
    const mockNext = jest.fn();
    handleExceptions(mockResponse, mockRequest, mockError, mockNext);
    expect(mockResponse.redirect).toHaveBeenCalledWith(`${Route.exportOriginCountry}${getParams(createMockRequest().query)}`);
  });

  it('It should call redirect with the correct parameters with InvalidTradeType', () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedTradeTypeError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockError = new InvalidTradeTypeError(axiosRestrictiveMeasuresResponse);
    const mockNext = jest.fn();
    handleExceptions(mockResponse, mockRequest, mockError, mockNext);
    expect(mockResponse.redirect).toHaveBeenCalledWith(`${Route.typeOfTrade}${getParams(createMockRequest().query)}`);
  });

  it('It should call next on a render error', () => {
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockNext = jest.fn();

    const mockError = Error();
    mockResponse.render = () => { throw mockError; };

    handleExceptions(mockResponse, mockRequest, mockError, mockNext);

    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});

describe('handleImportExceptions()', () => {
  const createMockRequest = () => (
     {
       query: {
         tradeType: 'export',
         tradeDateDay: getTodaysDate.day,
         tradeDateMonth: getTodaysDate.month,
         tradeDateYear: getTodaysDate.year,
         originCountry: 'GB',
         exportDeclarations: 'yes',
         destinationCountry: 'CN',
         commodity: '0301921000',
       },
       cookies: {
         stw_signposting: 'stw_signposting',
       },
       csrfToken: () => 'csrftoken',
     } as unknown as e.Request
  );

  const creatMockResponse = () => (
     {
       redirect: jest.fn(),
       locals: {
         queryParams: getParams(createMockRequest().query).substring(1),
         translation: {
           page: {
             importGoods: {
               errors: {
                 commodityNotFound: 'commodityNotFound error',
               },
             },
             typeOfTrade: {
               error: 'typeOfTrade error',
             },
             destinationCountry: {
               error: 'destinationCountry error',
             },
             importCountryOrigin: {
               error: 'importCountryOrigin error',
             },
             additionalCode: {
               error: 'additionalCode error',
             },
           },
         },
         language: 'en',
       },
     } as unknown as e.Response
  );

  it('It should call redirect with the correct parameters with invalidDestinationCountry', () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedDestinationCountryError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };

    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockError = new InvalidDestinationCountryError(axiosRestrictiveMeasuresResponse);
    const mockNext = jest.fn();
    handleImportExceptions(mockResponse, mockRequest, mockError, mockNext, Route.typeOfTrade);
    expect(mockResponse.redirect).toHaveBeenCalledWith(`${Route.destinationCountry}${getParams(createMockRequest().query)}`);
  });

  it('It should call redirect with the correct parameters with invalidDestinationCountry with error', () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedDestinationCountryError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };

    const mockRequest = createMockRequest();

    mockRequest.query.destinationCountry = 'SOME_COUNTRY';
    mockRequest.query.originCountry = 'SOME_COUNTRY';

    const mockResponse = creatMockResponse();
    const mockError = new InvalidDestinationCountryError(axiosRestrictiveMeasuresResponse);
    const mockNext = jest.fn();
    handleImportExceptions(mockResponse, mockRequest, mockError, mockNext, Route.typeOfTrade);
    expect(mockResponse.redirect).toHaveBeenCalledWith(`${Route.destinationCountry}${getParams(createMockRequest().query)}`);
  });

  it('It should call redirect with the correct parameters with InvalidOriginCountry', () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedOriginCountryError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockError = new InvalidOriginCountryError(axiosRestrictiveMeasuresResponse);
    const mockNext = jest.fn();
    handleImportExceptions(mockResponse, mockRequest, mockError, mockNext, Route.typeOfTrade);
    expect(mockResponse.redirect).toHaveBeenCalledWith(`${Route.importCountryOrigin}${getParams(createMockRequest().query)}`);
  });

  it('It should call redirect with the correct parameters with CommodityNotFoundException', () => {
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockError = new CommodityNotFoundException('');
    const mockNext = jest.fn();
    handleImportExceptions(mockResponse, mockRequest, mockError, mockNext, Route.manageThisTrade);
    expect(mockResponse.redirect).toHaveBeenCalledWith(`${Route.manageThisTrade}${getParams(createMockRequest().query)}`);
  });

  it('It should call redirect with the correct parameters with InvalidAdditionalCode', () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedAdditionalCodeError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockError = new InvalidAdditionalCodeError(axiosRestrictiveMeasuresResponse);
    const mockNext = jest.fn();
    handleImportExceptions(mockResponse, mockRequest, mockError, mockNext, Route.additionalCode);
    expect(mockResponse.redirect).toHaveBeenCalledWith(`${Route.additionalCode}${getParams(createMockRequest().query)}`);
  });

  it('It should call redirect with the correct parameters with InvalidAdditionalCode', () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedAdditionalCodeError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockError = new InvalidAdditionalCodeError(axiosRestrictiveMeasuresResponse);
    const mockNext = jest.fn();
    handleImportExceptions(mockResponse, mockRequest, mockError, mockNext, Route.manageThisTrade);
    expect(mockResponse.redirect).toHaveBeenCalledWith(`${Route.importGoods}${getParams(createMockRequest().query)}`);
  });

  it('It should call redirect with the correct parameters with InvalidTradeType', () => {
    const axiosRestrictiveMeasuresResponse: AxiosResponse = {
      ...mockedTradeTypeError,
      status: 400,
      statusText: 'Bad Request',
      config: {},
      headers: {},
    };
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockError = new InvalidTradeTypeError(axiosRestrictiveMeasuresResponse);
    const mockNext = jest.fn();
    handleImportExceptions(mockResponse, mockRequest, mockError, mockNext, Route.typeOfTrade);
    expect(mockResponse.redirect).toHaveBeenCalledWith(`${Route.typeOfTrade}${getParams(createMockRequest().query)}`);
  });

  it('It should call next on a render error', () => {
    const mockRequest = createMockRequest();
    const mockResponse = creatMockResponse();
    const mockNext = jest.fn();

    const mockError = Error();
    mockResponse.render = () => { throw mockError; };

    handleImportExceptions(mockResponse, mockRequest, mockError, mockNext, Route.typeOfTrade);

    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
