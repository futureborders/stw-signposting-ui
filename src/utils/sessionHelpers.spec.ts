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

import { ExportGoodsIntent } from '../interfaces/enums.interface';
import {
  setSessionCurrentPath,
  getErrorMessage,
  clearSessionErrorMessages,
  setSessionStatus,
  getSessionStatus,
  getSessionCurrentPath,
} from './sessionHelpers';

afterEach(() => {
  jest.resetAllMocks();
});

describe('Testing sessionHelpers', () => {
  describe('setSessionCurrentPath', () => {
    test('It should set session currentPath to "/original-path"', () => {
      const req: any = {
        session: {
          currentPath: '/current-path',
        },
        originalUrl: '/original-path?foo=bar',
      };
      setSessionCurrentPath(req);
      expect(req.session.currentPath).toBe('/original-path');
    });
    test('It should be undefined', () => {
      const req: any = {};
      setSessionCurrentPath(req);
      expect(req.session?.currentPath).toBe(undefined);
    });
  });

  describe('getErrorMessage', () => {
    test('It should getErrorMessage', () => {
      const req: any = {
        session: {
          errorMessage: 'some error message',
        },
      };
      expect(getErrorMessage(req)).toBe('some error message');
    });
    test('It should getErrorMessage', () => {
      const req: any = {
        session: {},
        query: {
          error: 'some error message',
        },
      };
      expect(getErrorMessage(req)).toBe('some error message');
    });
    test('It should be undefined', () => {
      const req: any = {};
      setSessionCurrentPath(req);
      expect(getErrorMessage(req)).toBe(undefined);
    });
  });

  describe('clearSessionErrorMessages', () => {
    test('It should be undefined', () => {
      const req: any = {
        session: {
          errorMessage: 'some error message',
        },
      };
      clearSessionErrorMessages(req);
      expect(req.session.errorMessage).toBe(undefined);
    });
    test('It should be undefined', () => {
      const req: any = {};
      clearSessionErrorMessages(req);
      expect(req.session?.errorMessage).toBe(undefined);
    });
  });

  describe('getSessionStatus', () => {
    test('It should set session.state getSessionStatus to values in query', () => {
      const req: any = {
        query: {
          commodity: '0208907000',
          tradeType: 'export',
          exportDeclarations: 'notSure',
          destinationCountry: 'BR',
        },
        session: {},
      };
      const state: any = {
        commodity: '0208907000',
        destinationCountry: 'BR',
        originCountry: 'GB',
        tradeType: 'export',
        exportDeclarations: 'notSure',
        exportGoodsIntent: ExportGoodsIntent.goodsExportedToBeSoldForBusiness,
        exportUserTypeTrader: 'NE',
        tradeDateDay: '01',
        tradeDateMonth: '01',
        tradeDateYear: '2022',
        checkExportDetailsStatus: 'IN_PROGRESS',
        checkRestrictionsStatus: 'CANNOT_VIEW_YET',
        signUpToServicesStatus: 'CANNOT_VIEW_YET',
        preparingToClearTheOriginCountryBorderInfoStatus: 'CANNOT_VIEW_YET',
        preparingToClearDestinationCountryBorderStatus: 'CANNOT_VIEW_YET',
        finalSummaryStatus: 'CANNOT_VIEW_YET',
      };
      setSessionStatus(req, state);
      expect(req.session.state.commodity).toBe('0208907000');
    });

    test('It should overide value in session.state getSessionStatus to values in query', () => {
      const req: any = {
        query: {
          commodity: '0208907001',
          tradeType: 'export',
          exportDeclarations: 'notSure',
          destinationCountry: 'BR',
        },
        session: {},
      };
      const state: any = {
        commodity: '0208907000',
        destinationCountry: 'BR',
        originCountry: 'GB',
        tradeType: 'export',
        exportDeclarations: 'notSure',
        exportGoodsIntent: ExportGoodsIntent.goodsExportedToBeSoldForBusiness,
        exportUserTypeTrader: 'NE',
        tradeDateDay: '01',
        tradeDateMonth: '01',
        tradeDateYear: '2022',
        checkExportDetailsStatus: 'IN_PROGRESS',
        checkRestrictionsStatus: 'CANNOT_VIEW_YET',
        signUpToServicesStatus: 'CANNOT_VIEW_YET',
        preparingToClearTheOriginCountryBorderInfoStatus: 'CANNOT_VIEW_YET',
        preparingToClearDestinationCountryBorderStatus: 'CANNOT_VIEW_YET',
        finalSummaryStatus: 'CANNOT_VIEW_YET',
      };
      setSessionStatus(req, state);
      expect(req.session.state.commodity).toBe('0208907000');
    });

    test('It should return {} when no session object from getSessionStatus', () => {
      const req: any = {};
      const state: any = {};
      expect(setSessionStatus(req, state)).toStrictEqual({});
    });
  });

  describe('getSessionStatus', () => {
    test('It should return commodity from getSessionStatus', () => {
      const req: any = {
        session: {
          state: {
            commodity: '0208907000',
          },
        },
      };
      const res = getSessionStatus(req);
      expect(res.commodity).toBe('0208907000');
    });
    test('It should be undefined', () => {
      const req: any = {};
      const res = getSessionStatus(req);
      expect(res.commodity).toBe(undefined);
    });
  });
  describe('getSessionCurrentPath', () => {
    test('It should return the path from getSessionCurrentPath', () => {
      const req: any = {
        session: {
          currentPath: '/current-path',
        },
      };
      const result = getSessionCurrentPath(req);
      expect(result).toBe('/current-path');
    });
    test('It should return \'\' from getSessionCurrentPath', () => {
      const req: any = {};
      const result = getSessionCurrentPath(req);
      expect(result).toBe('');
    });
  });
});
