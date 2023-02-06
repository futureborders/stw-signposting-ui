# "Check how to import or export goods" service - stw-signposting-ui

## About the service

Use this service to get information about importing and exporting goods for your business, including:

- how to register your business for trading
- which licences and certificates you need for your goods
- paying the right VAT and duties for your goods
- how to make declarations for your goods to clear the UK border
- which commodity codes you'll need to classify your goods

The live service is accessed via ```https://www.gov.uk/check-how-to-import-export```

## About this repository
- this is the frontend ui for the signposting service
- it's a Node.js Express app written in Typescript
- it uses Nunjucks templates
- it uses the [GOV.UK Trade Tariff API](https://api.trade-tariff.service.gov.uk/)
- it uses the [GDS Design System](https://design-system.service.gov.uk/)

## Installation

The following steps will enable you to setup your development environment:

* Install the node_modules in the root folder : ```yarn install```
* Add a .env file with the appropriate environment variables. You can create or rename the .env-example to .env, the example can be found [here](/.env-example)
* Build the project : ```yarn build```
* Build the assets : ```yarn build:assets```
* Run the application on development mode: ```yarn dev```
* Run tests : ```yarn test```
* Run linting : ```yarn lint```

## Dependencies

* NodeJS - https://nodejs.org/en/download/
* npm - https://www.npmjs.com/package/npm

## Structure

|Directory|Description|
|---------|-----------|
|`images/`|Contains images.|
|`sass/`|Contains all sass style sheets.|
|`src/`|Contains all the source code.|
|`src/exceptions/`|Contains all the exceptions logic for error handling.|
|`src/features/`|Contains all the code split out into features. Each folder, export, import and common contains a controller, test and view for each feature in this case each page of the journey.|
|`src/interfaces/`|Contains all the Typescript interfaces and type definitions.|
|`src/js/`|Contains all the client-side Javascript.|
|`src/middlewares/`|Contains all the middleware functions that have access to the request, response and next objects.|
|`src/models/`|Contains all the functions that manipulate data from the response object.|
|`src/routes/`|Contains all the routing functions.|
|`src/services/`|Contains the functions that handle the connections to the apis.|
|`src/translation/`|Contains all the content for English and Welsh.|
|`src/utils/`|Contains all the common helper functions and utilities.|
|`src/views/`|Contains the common includes and Nunjucks templates.|
|`welshTools/`| Contains tools to help manage Welsh translations see the [README](/welshTools/README.md).|

## Licence

This application is made available under the [Apache 2.0 licence](/LICENSE).
