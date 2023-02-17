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

import { Router } from 'express';
import IndexController from '../features/common/index/controller';
import TypeOfTradeController from '../features/common/typeOfTrade/controller';
import GoodsIntentController from '../features/import/goodsIntent/controller';
import IdentifyUserTypeController from '../features/import/identifyUserType/controller';
import ImportDateController from '../features/import/importDate/controller';
import ImportDeclarationsController from '../features/import/importDeclarations/controller';
import ImportGoodsController from '../features/import/importGoods/controller';
import DestinationCountryController from '../features/import/destinationCountry/controller';
import ImportCountryOriginController from '../features/import/importCountryOrigin/controller';
import ImportCheckLicencesAndRestrictionsController from '../features/import/checkLicencesAndRestrictions/controller';
import ImportProhibitionsAndRestrictionsController from '../features/import/prohibitionsAndRestrictions/controller';
import ImportAdditionalQuestionsController from '../features/import/additionalQuestions/controller';
import ImportCalculateCustomsDutyImportVatController from '../features/import/calculateCustomsDutyImportVat/controller';
import ImportRegisterToBringGoodsController from '../features/import/registerToBringGoods/controller';
import ImportCheckInformationAndDocumentsController from '../features/import/checkInformationAndDocuments/controller';
import ImportCheckDeclarationsController from '../features/import/checkDeclarations/controller';
import NorthernIrelandAndEUTradingController from '../features/common/northernIrelandAndEUTrading/controller';
import AccessibilityController from '../features/common/accessibility/controller';
import ManageCookiesController from '../features/common/cookies/controller';
import PrivacyNoticeController from '../features/common/privacyNotice/controller';
import AdditionalCodeController from '../features/common/additionalCode/controller';
import SearchController from '../features/common/search/controller';
import SearchHeadingsController from '../features/common/search/searchHeadings';
import Routes, { Route } from '../interfaces/routes.interface';
import StwTradeTariffApi from '../services/StwTradeTariffApi.service';
import TradeTariffApi from '../services/TradeTariffApi.service';
import ExportDeclarationsController from '../features/export/declarations/controller';
import TaskListController from '../features/common/taskList/controller';
import ExportCommoditySearchController from '../features/export/commoditySearch/controller';
import ExportCheckLicencesAndRestrictionsController from '../features/export/checkLicencesAndRestrictions/controller';
import ExportCountryDestinationController from '../features/export/countryDestination/controller';
import CheckYourAnswersController from '../features/common/checkYourAnswers/controller';
import ExportOriginCountryController from '../features/export/originCountry/controller';
import ExportCheckWhatServicesYouNeedToRegisterController from '../features/export/checkWhatServicesYouNeedToRegister/controller';
import ExportGoodsArrivalDateController from '../features/export/goodsArrivalDate/controller';
import ExportMovingGoodsFromNorthernIrelandToAnEUCountryController from '../features/export/movingGoodsFromNorthernIrelandToAnEUCountry/controller';
import ExportUserTypeTraderController from '../features/export/userTypeTrader/controller';
import ExportGoodsIntentController from '../features/export/goodsIntent/controller';
import ExportProhibitionsAndRestrictionsController from '../features/export/prohibitionsAndRestrictions/controller';
import ExportCheckInformationAndDocumentsController from '../features/export/checkInformationAndDocuments/controller';
import ExportCheckDeclarationsController from '../features/export/checkDeclarations/controller';
import ExportResponsibleForDeclaringGoodsController from '../features/export/responsibleForDeclaringGoods/controller';

class IndexRoute implements Routes {
  public router = Router();

  public indexController = new IndexController();

  public typeOfTradeController = new TypeOfTradeController();

  public goodsIntentController = new GoodsIntentController();

  public identifyUserTypeController = new IdentifyUserTypeController();

  public importGoodsController = new ImportGoodsController();

  public importDateController = new ImportDateController();

  public importDeclarationsController = new ImportDeclarationsController();

  public destinationCountryController = new DestinationCountryController();

  public northernIrelandAndEUTradingController = new NorthernIrelandAndEUTradingController();

  public accessibilityController = new AccessibilityController();

  public manageCookiesController = new ManageCookiesController();

  public privacyNoticeController = new PrivacyNoticeController();

  private additionalCodeController : AdditionalCodeController;

  private importCountryOriginController : ImportCountryOriginController;

  private importCheckLicencesAndRestrictionsController : ImportCheckLicencesAndRestrictionsController;

  private importProhibitionsAndRestrictionsController : ImportProhibitionsAndRestrictionsController;

  private importAdditionalQuestionsController : ImportAdditionalQuestionsController;

  private importCalculateCustomsDutyImportVatController : ImportCalculateCustomsDutyImportVatController;

  public importRegisterToBringGoodsController = new ImportRegisterToBringGoodsController();

  public importCheckInformationAndDocumentsController = new ImportCheckInformationAndDocumentsController();

  private importCheckDeclarationsController = new ImportCheckDeclarationsController();

  private searchController : SearchController;

  private searchHeadingsController : SearchHeadingsController;

  public exportDeclarationsController = new ExportDeclarationsController();

  private taskListController : TaskListController;

  public exportCommoditySearchController = new ExportCommoditySearchController();

  private exportCheckLicencesAndRestrictionsController : ExportCheckLicencesAndRestrictionsController;

  private exportCountryDestinationController : ExportCountryDestinationController;

  public checkYourAnswersController = new CheckYourAnswersController();

  private exportOriginCountryController : ExportOriginCountryController;

  public exportCheckWhatServicesYouNeedToRegisterController = new ExportCheckWhatServicesYouNeedToRegisterController();

  public exportGoodsArrivalDateController = new ExportGoodsArrivalDateController();

  public exportMovingGoodsFromNorthernIrelandToAnEUCountryController = new ExportMovingGoodsFromNorthernIrelandToAnEUCountryController();

  public exportUserTypeTraderController = new ExportUserTypeTraderController();

  public exportGoodsIntentController = new ExportGoodsIntentController();

  private exportProhibitionsAndRestrictionsController : ExportProhibitionsAndRestrictionsController;

  public exportCheckInformationAndDocumentsController = new ExportCheckInformationAndDocumentsController();

  public exportCheckDeclarationsController = new ExportCheckDeclarationsController();

  public exportResponsibleForDeclaringGoodsController = new ExportResponsibleForDeclaringGoodsController();

  constructor(tradeTariffApi: TradeTariffApi, stwtradeTariffApi: StwTradeTariffApi) {
    this.importCheckLicencesAndRestrictionsController = new ImportCheckLicencesAndRestrictionsController(stwtradeTariffApi);
    this.importProhibitionsAndRestrictionsController = new ImportProhibitionsAndRestrictionsController(stwtradeTariffApi);
    this.importAdditionalQuestionsController = new ImportAdditionalQuestionsController(stwtradeTariffApi);
    this.importCalculateCustomsDutyImportVatController = new ImportCalculateCustomsDutyImportVatController(stwtradeTariffApi);
    this.importCountryOriginController = new ImportCountryOriginController(stwtradeTariffApi);
    this.additionalCodeController = new AdditionalCodeController(stwtradeTariffApi);
    this.searchController = new SearchController(tradeTariffApi, stwtradeTariffApi);
    this.searchHeadingsController = new SearchHeadingsController(tradeTariffApi, stwtradeTariffApi);
    this.exportCheckLicencesAndRestrictionsController = new ExportCheckLicencesAndRestrictionsController(stwtradeTariffApi);
    this.exportCountryDestinationController = new ExportCountryDestinationController(tradeTariffApi);
    this.exportOriginCountryController = new ExportOriginCountryController(stwtradeTariffApi);
    this.taskListController = new TaskListController(stwtradeTariffApi);
    this.exportProhibitionsAndRestrictionsController = new ExportProhibitionsAndRestrictionsController(stwtradeTariffApi);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(Route.index, this.indexController.index);
    this.router.get(Route.typeOfTrade, this.typeOfTradeController.typeOfTrade);
    this.router.post(Route.typeOfTrade, this.typeOfTradeController.typeOfTradeSubmit);
    this.router.get(Route.goodsIntent, this.goodsIntentController.goodsIntent);
    this.router.post(Route.goodsIntent, this.goodsIntentController.goodsIntentSubmit);
    this.router.get(
      Route.identifyUserType,
      this.identifyUserTypeController.identifyUserType,
    );
    this.router.post(
      Route.identifyUserType,
      this.identifyUserTypeController.identifyUserTypeSubmit,
    );
    this.router.get(
      Route.importDeclarations,
      this.importDeclarationsController.importDeclarations,
    );
    this.router.post(
      Route.importDeclarations,
      this.importDeclarationsController.importDeclarationsSubmit,
    );
    this.router.get(
      Route.importDate,
      this.importDateController.importDate,
    );
    this.router.post(
      Route.importDate,
      this.importDateController.importDateSubmit,
    );
    this.router.get(
      Route.importGoods,
      this.importGoodsController.importGoods,
    );
    this.router.post(
      Route.importGoods,
      this.importGoodsController.importGoodsSubmit,
    );
    this.router.get(
      Route.destinationCountry,
      this.destinationCountryController.destinationCountry,
    );
    this.router.post(
      Route.destinationCountry,
      this.destinationCountryController.destinationCountrySubmit,
    );
    this.router.get(
      Route.importCountryOrigin,
      this.importCountryOriginController.importCountryOrigin,
    );
    this.router.post(
      Route.importCountryOrigin,
      this.importCountryOriginController.importCountryOriginSubmit,
    );
    this.router.get(
      Route.additionalCode,
      this.additionalCodeController.additionalCode,
    );
    this.router.post(
      Route.additionalCode,
      this.additionalCodeController.additionalCodeSubmit,
    );
    this.router.get(
      Route.importCheckLicencesAndRestrictions,
      this.importCheckLicencesAndRestrictionsController.importCheckLicencesAndRestrictions,
    );
    this.router.get(
      Route.importProhibitionsAndRestrictions,
      this.importProhibitionsAndRestrictionsController.importProhibitionsAndRestrictions,
    );
    this.router.get(
      Route.importAdditionalQuestions,
      this.importAdditionalQuestionsController.importAdditionalQuestions,
    );
    this.router.get(
      Route.importCalculateCustomsDutyImportVat,
      this.importCalculateCustomsDutyImportVatController.importCalculateCustomsDutyImportVat,
    );
    this.router.get(
      Route.importRegisterToBringGoods,
      this.importRegisterToBringGoodsController.importRegisterToBringGoods,
    );
    this.router.get(
      Route.importCheckInformationAndDocuments,
      this.importCheckInformationAndDocumentsController.importCheckInformationAndDocuments,
    );
    this.router.get(
      Route.importCheckDeclarations,
      this.importCheckDeclarationsController.importCheckDeclarations,
    );
    this.router.get(
      Route.northernIrelandAndEUTrading,
      this.northernIrelandAndEUTradingController.northernIrelandAndEUTrading,
    );
    this.router.get(
      Route.accessibility,
      this.accessibilityController.accessibility,
    );
    this.router.get(
      Route.manageCookies,
      this.manageCookiesController.manageCookies,
    );
    this.router.get(
      Route.privacyNotice,
      this.privacyNoticeController.privacyNotice,
    );
    this.router.get(
      Route.search,
      this.searchController.search,
    );
    this.router.get(
      Route.searchHeadings,
      this.searchHeadingsController.searchHeadings,
    );
    this.router.post(
      Route.saveCookieSettings,
      this.manageCookiesController.saveCookieSettings,
    );
    this.router.post(
      Route.exportDeclarations,
      this.exportDeclarationsController.exportDeclarationsSubmit,
    );
    this.router.get(
      Route.exportDeclarations,
      this.exportDeclarationsController.exportDeclarations,
    );
    this.router.get(
      Route.exportCommoditySearch,
      this.exportCommoditySearchController.exportCommoditySearch,
    );
    this.router.post(
      Route.exportCommoditySearch,
      this.exportCommoditySearchController.exportCommoditySearchSubmit,
    );
    this.router.get(
      Route.taskList,
      this.taskListController.taskList,
    );
    this.router.get(
      Route.exportCheckLicencesAndRestrictions,
      this.exportCheckLicencesAndRestrictionsController.exportCheckLicencesAndRestrictions,
    );
    this.router.get(
      Route.exportCountryDestination,
      this.exportCountryDestinationController.exportCountryDestination,
    );
    this.router.post(
      Route.exportCountryDestination,
      this.exportCountryDestinationController.exportCountryDestinationSubmit,
    );
    this.router.get(
      Route.checkYourAnswers,
      this.checkYourAnswersController.checkYourAnswers,
    );
    this.router.get(
      Route.exportOriginCountry,
      this.exportOriginCountryController.exportOriginCountry,
    );
    this.router.post(
      Route.exportOriginCountry,
      this.exportOriginCountryController.exportOriginCountrySubmit,
    );
    this.router.get(
      Route.exportCheckWhatServicesYouNeedToRegister,
      this.exportCheckWhatServicesYouNeedToRegisterController.checkWhatServicesYouNeedToRegister,
    );
    this.router.get(
      Route.exportGoodsArrivalDate,
      this.exportGoodsArrivalDateController.exportGoodsArrivalDate,
    );
    this.router.post(
      Route.exportGoodsArrivalDate,
      this.exportGoodsArrivalDateController.exportGoodsArrivalDateSubmit,
    );
    this.router.get(
      Route.exportMovingGoodsFromNorthernIrelandToAnEUCountry,
      this.exportMovingGoodsFromNorthernIrelandToAnEUCountryController.movingGoodsFromNorthernIrelandToAnEUCountry,
    );
    this.router.get(
      Route.exportUserTypeTrader,
      this.exportUserTypeTraderController.exportUserTypeTrader,
    );
    this.router.post(
      Route.exportUserTypeTrader,
      this.exportUserTypeTraderController.exportUserTypeTraderSubmit,
    );
    this.router.get(
      Route.exportGoodsIntent,
      this.exportGoodsIntentController.exportGoodsIntent,
    );
    this.router.post(
      Route.exportGoodsIntent,
      this.exportGoodsIntentController.exportGoodsIntentSubmit,
    );
    this.router.get(
      Route.exportProhibitionsAndRestrictions,
      this.exportProhibitionsAndRestrictionsController.exportProhibitionsAndRestrictions,
    );
    this.router.get(
      Route.exportCheckInformationAndDocuments,
      this.exportCheckInformationAndDocumentsController.checkInformationAndDocuments,
    );
    this.router.get(
      Route.exportCheckDeclarations,
      this.exportCheckDeclarationsController.exportCheckDeclarations,
    );
    this.router.get(
      Route.exportResponsibleForDeclaringGoods,
      this.exportResponsibleForDeclaringGoodsController.exportResponsibleForDeclaringGoods,
    );
    this.router.post(
      Route.exportResponsibleForDeclaringGoods,
      this.exportResponsibleForDeclaringGoodsController.exportResponsibleForDeclaringGoodsSubmit,
    );
  }
}

export default IndexRoute;
