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

/* istanbul ignore file */

import { MeasureType } from '../interfaces/enums.interface';

const Translation = {
  page: {
    startPage: {
      whenService: {
        p1: 'Use this service to check what you need to have in place during the import or export process: (Welsh)',
        l1: 'before you buy or sell the goods (Welsh)',
        l2: 'when you move the goods across the UK border (Welsh)',
        l3: 'after the goods arrive (Welsh)',
      },
      whatService: {
        p1: 'The service will help you: (Welsh)',
        l1: 'understand the rules, licences or certificates that apply to your goods (Welsh)',
        l2: 'pay the right tax and duty for your goods (Welsh)',
        l3: 'register your business for trading (Welsh)',
        l4: 'declare your goods to clear the UK border (Welsh)',
        l5: 'keep the right invoices and records (Welsh)',
      },
      beforeStart: {
        h2: 'Before you start (Welsh)',
        p1: 'You’ll need to know: (Welsh)',
        l1: 'where the goods are coming from or going to (Welsh)',
        l2: 'the commodity code of your goods (Welsh)',
        p2: 'If you do not have the commodity code for your goods, you’ll be able to search for it in the service. You’ll need to know what your goods are made of to get the correct information. (Welsh)',
      },
      startButton: 'Start now (Welsh)',
      alsoAvailable: (toggledLanguagePath: string): string => `This service is also available in <a href="${toggledLanguagePath}">Welsh (Cymraeg)</a>. (Welsh)`,
    },
    typeOfTrade: {
      question: 'Are the goods going to be imported or exported? (Welsh)',
      import: 'Import (bring goods into the UK) (Welsh)',
      export: 'Export (send goods from the UK) (Welsh)',
      hint: 'You will be taken to a different government service for steps to take to export goods (Welsh)',
      error: 'Select if you want to import or export goods (Welsh)',
      followDifferentRules: 'Different rules apply if you are <a href="https://www.gov.uk/guidance/trading-and-moving-goods-in-and-out-of-northern-ireland" target="_blank" rel="noopener noreferrer" class="govuk-link">moving goods between the EU and Northern Ireland (opens in new tab)</a>. (Welsh)',
    },
    goodsIntent: {
      question: 'What are you doing with the goods? (Welsh)',
      error: 'Select what you are doing with the goods (Welsh)',
      hint: 'Select only one (Welsh)',
      bringGoodsToSellForBusiness: 'I\'m transporting or bringing goods in to sell, process or use in my business (Welsh)',
      bringGoodsInLuggageForBusiness: 'I\'m bringing goods in by luggage, car or van to use in my business or sell (Welsh)',
      bringGoodsTemporarilyForBusiness: 'I\'m bringing goods into the UK temporarily for business use, for example to repair or forward to another country (Welsh)',
      bringGoodsThroughPostForPersonal: 'I\'m getting goods through the post for personal use (Welsh)',
      bringGoodsInLuggageForPersonal: 'I\'m bringing goods in luggage for personal use (Welsh)',
      movingToUkWithBelongingsForPersonal: 'I\'m moving to the UK with my personal belongings (Welsh)',
      dividerHeadingBusiness: '<h2 class=\'govuk-heading-s govuk-!-margin-top-8\'>For business use</h2> (Welsh)',
      dividerHeadingPersonal: '<h2 class=\'govuk-heading-s govuk-!-margin-top-8\'>For personal use</h2> (Welsh)',
    },
    identifyUserType: {
      question: 'Are you the importer or person buying the goods? (Welsh)',
      yes: 'Yes (Welsh)',
      no: 'No, I am the importer’s representative (for example, an agent or freight forwarder) (Welsh)',
      error: 'Select if you are the importer or their representative (Welsh)',
    },
    importDeclarations: {
      question: 'Will you submit your own import declaration? (Welsh)',
      error: 'Select if you will submit your own import declaration (Welsh)',
      hint: '<p class="govuk-hint">You need to pay for specialist software to complete your own import declarations. <a href="https://www.gov.uk/government/collections/customs-declaration-service#making-a-declaration" target="_blank" rel="noopener noreferrer" class="govuk-link">Find out how make a customs declaration (opens in new tab)</a>.</p>'
        + '<p class="govuk-hint">You can also pay someone to submit declarations on your behalf, for example an agent or freight forwarder. <a href="https://www.gov.uk/guidance/appoint-someone-to-deal-with-customs-on-your-behalf?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5" target="_blank" rel="noopener noreferrer" class="govuk-link">Find out how to hire an agent (opens in new tab)</a>.</p> (Welsh)',
      yes: 'Yes, I will complete the full or supplementary declaration (Welsh)',
      no: 'No, someone acting on my behalf will do this for me (Welsh)',
      notSure: 'I’m not sure yet (Welsh)',
    },
    importDate: {
      question: 'When will the goods be imported? (Welsh)',
      p1: 'Enter the date you’re moving goods into the UK to make sure you get accurate results. If you’re not sure, enter the date you think you will import. (Welsh)',
      regulatoryControls: 'Regulatory controls (Welsh)',
      regulatoryControlsDetails: '<p>Regulatory controls can change at any time, so you should check for updates near the expected date of your import. To do this, you can either:</p>'
      + '<ul class="govuk-list govuk-list--bullet">'
        + '<li>check the latest updates on tariffs using the <a href="https://www.gov.uk/government/collections/tariff-stop-press-notices" class="govuk-link" target="_blank" rel="noopener noreferrer">tariff stop press notices (opens in new tab)</a></li>'
        + '<li>enter your details again using this service and follow the process</li>'
      + '</ul> (Welsh)',
      hint: 'Use this date format, for example: 27 3 2022 (Welsh)',
      errorInvalidDate:
        'Date must be a real date (Welsh)',
      errorDateInThePast: 'Date must be today or in the future (Welsh)',
      errorDateWithinYear: (datePlusOneYear: string): string => `Date must be before ${datePlusOneYear} (Welsh)`,
      errorMissingDate: 'Enter the date that the goods will be imported (Welsh)',
      errorMissingYear: 'The date that the goods will be imported must include a year (Welsh)',
      errorMissingMonth: 'The date that the goods will be imported must include a month (Welsh)',
      errorMissingDay: 'The date that the goods will be imported must include a day (Welsh)',
      errorInvalidDay: 'The date that the goods will be imported must be a real day (Welsh)',
      errorInvalidMonth: 'The date that the goods will be imported must be a real month (Welsh)',
      errorInvalidYear: 'The date that the goods will be imported must be a real year (Welsh)',
      errorDayNotNumber: 'Enter a day using numbers only (Welsh)',
      errorMonthNotNumber: 'Enter a month using numbers only (Welsh)',
      errorYearNotNumber: 'Enter a year using numbers only (Welsh)',
      errorMissingDayMonth: 'The date that the goods will be imported must include a day and month (Welsh)',
      errorMissingDayYear: 'The date that the goods will be imported must include a day and year (Welsh)',
      errorMissingMonthYear: 'The date that the goods will be imported must include a month and year (Welsh)',
    },
    importGoods: {
      question: 'What is the name or commodity code for your goods? (Welsh)',
      p1: 'Commodity codes are 10-digit numbers that classify goods so you can fill in declarations and other paperwork. (Welsh)',
      p2: 'You must use the right commodity code. You need it to check licences, restrictions, duty and VAT payments. (Welsh)',
      p3: '<a href="https://www.gov.uk/guidance/ask-hmrc-for-advice-on-classifying-your-goods" target="_blank" rel="noopener noreferrer">Contact HMRC if you need help finding the right commodity code for your goods (opens in new tab)</a> (Welsh)',
      label: 'Enter the name of the goods or 10-digit commodity code: (Welsh)',
      errors: {
        required: 'Enter the name of the goods or a commodity code (Welsh)',
        mustBeNumber: 'Commodity code must be a number, like 0304410010 (Welsh)',
        digits: 'Commodity code must be 10 digits (Welsh)',
        commodityNotFound:
          'This code is not valid. Enter a valid commodity code (Welsh)',
      },
    },
    searchResults: {
      title: 'Search results (Welsh)',
      subTitle: (category: string): string => `Search results within category ${category} (Welsh)`,
      searched: (searchTerm: string): string => `You searched for '<strong>${searchTerm}</strong>'. (Welsh)`,
      noResults: (searchTerm: string): string => `No results for '<strong>${searchTerm}</strong>'. (Welsh)`,
      searchInsetText: 'Select the commodity code for your goods. If it is not displayed you can refine your search using the list below. (Welsh)',
      category: 'Category (Welsh)',
      description: 'Product description (Welsh)',
      searchAgain: 'Search again (Welsh)',
      contents: 'Contents (Welsh)',
      termAppears: (term: string, length: number, group: string): string => `The term '<strong>${term}</strong>' appears in <strong>${length}</strong> ${group}. (Welsh)`,
      noResultsMatchingH2: 'There are no results matching your query. Please search again and consider: (Welsh)',
      noResultsMatchingL1: 'Searching what the item is used for or made from (Welsh)',
      noResultsMatchingL2: 'Broadening your search criteria (Welsh)',
      noResultsMatchingL3: 'Checking your spelling (Welsh)',
      noResultsMatchingL4: 'Browsing the <a href="https://www.trade-tariff.service.gov.uk/a-z-index/a">A-Z of Classified Goods</a> on the Online Trade Tariff (Welsh)',
      heading: {
        heading: 'Commodity (Welsh)',
        matching: 'Categories matching (Welsh)',
        group: 'categories (Welsh)',
        groupSingular: 'category (Welsh)',
      },
      chapter: {
        heading: 'Category (Welsh)',
      },
      commodity: {
        matching: 'Commodities matching (Welsh)',
        group: 'commodities (Welsh)',
        groupSingular: 'commodity (Welsh)',
      },
    },
    destinationCountry: {
      question: 'Which part of the UK are you importing into? (Welsh)',
      hint: 'You may need to follow different import rules depending on where in the UK your goods are going. (Welsh)',
      gb: 'England, Scotland or Wales (Welsh)',
      xi: 'Northern Ireland (Welsh)',
      error: 'Select if you are importing into England, Scotland, Wales or Northern Ireland (Welsh)',
      origin: 'Country of origin:  (Welsh)',
      importingIntoUK: (originCountry: string): string => `You may need to follow different import rules if you are importing goods into ${originCountry}. (Welsh)`,
      assumedText: (originCountry: string, importToCountry: string): string => `Because you selected <strong>${originCountry}</strong> as the country of origin of the goods, it is assumed that the country you are importing to is <strong>${importToCountry}</strong>. (Welsh)`,
      changeOriginCountryLink: 'Change country of origin (Welsh)',
    },
    importCountryOrigin: {
      questionImporting: 'Which country or territory are you importing from? (Welsh)',
      hint: 'A territory is an area that sits outside the borders of the country that owns it, for example Gibraltar or Hong Kong. (Welsh)',
      error: 'Enter which country or territory you\'re importing the goods from (Welsh)',
      insetHtml: '<p>The country you are importing from may not be the country where your goods are grown, produced or manufactured.</p>'
              + '<p>Check if your import controls are affected. You must meet the UK import controls of the country where your goods are grown, produced or manufactured.</p>'
              + '<ul class="govuk-list">'
              + '<li class="govuk-!-margin-bottom-4"><a href="https://www.gov.uk/guidance/check-your-goods-meet-the-rules-of-origin" class="govuk-link" target="_blank" rel="noopener noreferrer">Check if your goods meet the rules of origin (opens in new tab)</a></li>'
              + '<li><a href="https://www.gov.uk/government/collections/guidance-for-preferential-rates-of-duty-and-rules-of-origin" class="govuk-link" target="_blank" rel="noopener noreferrer">Check if you may be able to reduce the duties on your goods (opens in new tab)</a></li>'
              + '</ul> (Welsh)',
    },
    northernIrelandAndEUTrading: {
      title: 'Moving goods from EU countries to Northern Ireland (Welsh)',
      body: 'Make sure you know the trading rules on doing business in Northern Ireland. (Welsh)',
      learnMore:
        '<a href="https://www.gov.uk/guidance/trading-and-moving-goods-in-and-out-of-northern-ireland" target="_blank" rel="noopener noreferrer">Learn more about moving goods in and out of Northern Ireland (opens in new tab)</a> (Welsh)',
    },
    additionalCode: {
      question: 'Describe the goods you are importing in more detail (Welsh)',
      hint: 'The commodity you have selected can be further classified by adding 4-digits to the end. Select one option. (Welsh)',
      error: 'Select a further classification for the commodity (Welsh)',
    },
    manageThisTrade: {
      printDisclaimer:
        'Information is likely subject to change over time. Return to this service for the latest information. (Welsh)',
      summaryImport: 'Import goods into the UK: what you need to do next (Welsh)',
      print: 'Print this page (Welsh)',
      and: 'and (Welsh)',
      enterBox44: (measureOptionCertificateCode: string): string => `Enter <strong>${measureOptionCertificateCode}</strong> in Box 44 of your import declaration. (Welsh)`,
      commoditySummary: {
        commodityCode: 'Commodity code (Welsh)',
        importingFrom: 'Country of origin (Welsh)',
        importingInto: 'Goods coming into (Welsh)',
        classification: 'Classification (Welsh)',
        importDate: 'Import date (Welsh)',
        edit: 'Change (Welsh)',
      },
      rules: 'Rules that apply to your goods (Welsh)',
      exceptions: 'When rules are different or do not apply (Welsh)',
      followRules: 'Follow the rules that apply to import your goods. (Welsh)',
      followRulesExport: 'Follow the rules that apply to export your goods. (Welsh)',
      multiCertificatePrefix: 'Provide both of these documents: (Welsh)',
      showLabel: 'Show full classification (Welsh)',
      hideLabel: 'Hide full classification (Welsh)',
      noMeasuresOrRestrictions: (country: string): string => `<p class="govuk-heading-s">There are no measures or restrictions for importing this commodity into the UK from ${country}.</p><p class="govuk-body">Please check back later, as the rules may change.</p> (Welsh)`,
      condition: 'You must meet this condition (Welsh)',
      multipleConditions: (amount: string): string => `You must meet one of these ${amount} conditions (Welsh)`,
      code: 'Code (Welsh)',
      calculateTaxAndDuties: 'Calculate tax and duties (Welsh)',
      waiverApplies: 'waiver also applies (Welsh)',
      calculateNow: 'Calculate now (Welsh)',
      commoditySummaryDetailsLink: 'Import details (Welsh)',
      importDeclarationsNotRequired: 'No import declaration is needed for these goods (Welsh)',
      calculateImportVat: 'Calculate the Import VAT (Welsh)',
      noCustomsDutyToPay: 'There is no Customs Duty to pay (Welsh)',
      noImportVatToPay: 'There is no Import VAT to pay (Welsh)',
      '999L': {
        header: 'Customs Declaration Service (CDS) universal waiver (Welsh)',
        body: 'Requirement for a licence is waived by entering the 999L document code and the document identifier CDS WAIVER in the additional documentation field for this commodity item. 999L can be used for CDS in a similar way to LIC99 on the CHIEF system, when a waiver may be applied. (Welsh)',
      },
      documentCodesDetailsHeader: 'Document codes (Welsh)',
      documentCodesDetailsSummary: 'The codes next to the rules or exemptions are the document codes that apply to your goods. You will need these document codes to complete the import declaration. (Welsh)',
      beforeBuying: 'Before buying the goods (Welsh)',
      readyToImport: 'When the goods are ready to import (Welsh)',
      checkWhatInformation: 'Check what information and documents you may need (Welsh)',
      entrySummaryDeclaration: 'Find out how to make an entry summary declaration (ENS) (Welsh)',
      makeAnimportDeclaration: 'Find out how to make an import declaration (Welsh)',
      subsidary: {
        'check-licences-certificates-and-other-restrictions': 'Check licences, certificates and other restrictions (Welsh)',
        'calculate-the-customs-duty-and-import-vat': 'Calculate the Customs Duty and Import VAT (Welsh)',
        'register-to-bring-goods-across-the-border': 'Register to bring goods across the border (Welsh)',
        'check-what-information-and-documents-you-may-need': 'Check what information and documents you may need (Welsh)',
      },
      checkLicensesAndCertificates: {
        non_declaring_trader: (): string => '## Rules that apply to your goods (Welsh)\n\n'
          + 'Follow the rules to find out:\n\n'
          + '- licences that you need to move the goods\n'
          + '- certificates that you must provide\n'
          + '- controls or restrictions on goods entering the country\n'
          + '- sanctions that make it illegal to trade with other countries\n\n'
          + ':::+\n'
          + 'If you do not have the right documents or licences, you will not be able to import your goods.\n\n'
          + 'Make sure you [use the right commodity code and classify your goods correctly](https://www.gov.uk/guidance/finding-commodity-codes-for-imports-or-exports).\n'
          + ':::\n\n'
          + '### Exemptions: when rules are different or do not apply\n\n'
          + 'Sometimes the rules are different or do not apply to specific goods or circumstances. The exemptions that appear after the rules tell you:\n\n'
          + '- when the rules do not apply to your goods\n'
          + '- any conditions you need to meet or evidence you need to show to prove the goods are exempt',
        declaring_trader: (showSdsContent?: string): string => `${'## Rules that apply to your goods (Welsh)\n\n'
          + 'Follow the rules to find out:\n\n'
          + '- licences that you need to move the goods\n'
          + '- certificates that you must provide\n'
          + '- controls or restrictions on goods entering the country\n'
          + '- sanctions that make it illegal to trade with other countries\n\n'
          + ':::+\n'
          + 'If you do not have the right documents or licences, you will not be able to import your goods.\n\n'
          + 'Make sure you [use the right commodity code and classify your goods correctly](https://www.gov.uk/guidance/finding-commodity-codes-for-imports-or-exports).\n'
          + ':::\n\n'
          + '### Exemptions: when rules are different or do not apply\n\n'
          + 'Sometimes the rules are different or do not apply to specific goods or circumstances. The exemptions that appear after the rules tell you:\n\n'
          + '- when the rules do not apply to your goods\n'
          + '- any conditions you need to meet or evidence you need to show to prove the goods are exempt\n\n'
          + '+++ Document codes\n'
          + 'The codes next to the rules or exemptions are the document codes that apply to your goods. You will need these document codes to complete the import declaration.\n'}${
          showSdsContent
        }\n+++`,
        intermediary: (showSdsContent?: string): string => `${'## Rules that apply to the goods (Welsh)\n\n'
          + 'Follow the rules to find out:\n\n'
          + '- licences that your importer needs to move the goods\n'
          + '- certificates that the seller must provide\n'
          + '- controls or restrictions on goods entering the country\n'
          + '- sanctions that make it illegal to trade with other countries\n\n'
          + ':::+\n'
          + 'If you do not have the right documents or licences, you will not be able to import the goods.\n\n'
          + 'Make sure you [use the right commodity code and classify the goods correctly](https://www.gov.uk/guidance/finding-commodity-codes-for-imports-or-exports).\n'
          + ':::\n\n'
          + '### Exemptions: when rules are different or do not apply\n\n'
          + 'Sometimes the rules are different or do not apply to specific goods or circumstances. The exemptions that appear after the rules tell you:\n\n'
          + '- when the rules do not apply to your goods\n'
          + '- any conditions you need to meet or evidence you need to show to prove the goods are exempt\n\n'
          + '+++ Document codes\n'
          + 'The codes next to the rules or exemptions are the document codes that apply to your goods. You will need these document codes to complete the import declaration.\n'}${
          showSdsContent
        }\n+++`,
      },
      whichDocumentsAreNeeded: {
        non_declaring_trader: 'Make sure you know what information you need to supply and the accompanying documents required to bring your goods into the country. (Welsh)\n\n'
          + 'Missing or inaccurate documents can increase risks, lead to delays and extra costs, or prevent your goods from crossing the border.\n\n'
          + '[Find out which documents are needed for goods to travel](https://www.gov.uk/guidance/international-trade-paperwork-the-basics)\n\n'
          + '[Read about trade contracts and incoterms](https://www.great.gov.uk/advice/prepare-for-export-procedures-and-logistics/international-trade-contracts-and-incoterms/)',
        declaring_trader: 'Make sure you know what information you need to supply and the accompanying documents required to bring your goods into the country. (Welsh)\n\n'
          + 'Missing or inaccurate documents can increase risks, lead to delays and extra costs, or prevent your goods from crossing the border.\n\n'
          + '[Find out which documents are needed for goods to travel](https://www.gov.uk/guidance/international-trade-paperwork-the-basics)\n\n'
          + '[Read about trade contracts and incoterms](https://www.great.gov.uk/advice/prepare-for-export-procedures-and-logistics/international-trade-contracts-and-incoterms/)',
        intermediary: 'Make sure you know what information you and your importer need to supply and the accompanying documents required to bring the goods into the country. (Welsh)\n\n'
          + 'Missing or inaccurate documents can increase risks, lead to delays and extra costs, or prevent goods from crossing the border.\n\n'
          + '[Find out which documents are needed for goods to travel](https://www.gov.uk/guidance/international-trade-paperwork-the-basics)\n\n'
          + '[Read about trade contracts and incoterms](https://www.great.gov.uk/advice/prepare-for-export-procedures-and-logistics/international-trade-contracts-and-incoterms/)',
      },
      calculateCustomsDutyImportVat: {
        non_declaring_trader: '### Work out the duty, VAT and excise you need to pay (Welsh)\n'
          + 'How much VAT and Customs Duty you pay depends on the [value of the goods you’re importing](https://www.gov.uk/guidance/how-to-value-your-imports-for-customs-duty-and-trade-statistics?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5)\n\n'
          + 'Calculate how much import duty, VAT and excise you need to pay.',
        declaring_trader: '### Work out the duty, VAT and excise you need to pay (Welsh)\n'
          + 'How much VAT and Customs Duty you pay depends on the [value of the goods you’re importing](https://www.gov.uk/guidance/how-to-value-your-imports-for-customs-duty-and-trade-statistics?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5)\n\n'
          + 'Calculate how much import duty, VAT and excise you need to pay.',
        intermediary: '### Work out the duty, VAT and excise you need to pay (Welsh)\n'
          + 'How much VAT and Customs Duty your importer pays depends on the [value of the goods you’re importing](https://www.gov.uk/guidance/how-to-value-your-imports-for-customs-duty-and-trade-statistics?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5)\n\n'
          + 'Calculate how much import duty, VAT and excise your importer needs to pay.',
      },
      registerToBringGoodsAcrossTheBorder: {
        non_declaring_trader: 'To bring goods into the UK, you need to: (Welsh)\n\n'
          + '- [get an EORI number](http://www.gov.uk/eori)\n'
          + '- [check if you should register for VAT](https://www.gov.uk/vat-registration/when-to-register?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5)',
        declaring_trader: 'To bring goods into the UK, you need to: (Welsh)\n\n'
          + '- [get an EORI number](http://www.gov.uk/eori)\n'
          + '- [check if you should register for VAT](https://www.gov.uk/vat-registration/when-to-register?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5)',
        intermediary: 'To bring goods into the UK, your importer needs to: (Welsh)\n\n'
          + '- [get an EORI number](http://www.gov.uk/eori)\n'
          + '- [check if they should register for VAT](https://www.gov.uk/vat-registration/when-to-register?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5)',
      },
    },
    calculateCustomsDutyImportVat: {
      customsDutyImportVat: 'Customs Duty and Import VAT (Welsh)',
      importIntoNorthernIreland: (link: string): string => `If you need to import into Northern Ireland, please refer to the <a href="${link}" class="govuk-link" target="_blank" rel="noopener noreferrer">Online Trade Tariff Tax and Duty Calculator (opens in new tab)</a> to determine the taxes and duties you should pay. (Welsh)`,
      customsDuty: 'Customs Duty (Welsh)',
      tariffs: 'Tariffs (Welsh)',
      awaitingData: 'Awaiting data. (Welsh)',
      importVat: 'Import VAT (Welsh)',
      taxes: 'Taxes (Welsh)',
      quota: 'Quota order number (Welsh)',
      additionalCode: 'Additional code (Welsh)',
      measureType: 'Measure type (Welsh)',
      value: 'Value (Welsh)',
      findOutMore: 'Find out more about: (Welsh)',
      guidanceLinks: [
        {
          text: 'VAT rates on goods and services (Welsh)',
          url: 'https://www.gov.uk/guidance/rates-of-vat-on-different-goods-and-services (Welsh)',
        }, {
          text: 'how to claim back VAT on imported goods (Welsh)',
          url: 'https://www.gov.uk/guidance/vat-imports-acquisitions-and-purchases-from-abroad (Welsh)',
        }, {
          text: 'how to apply for a refund or waiver on import duties (Welsh)',
          url: 'https://www.gov.uk/guidance/refunds-and-waivers-on-customs-debt (Welsh)',
        }, {
          text: 'if you can delay duty payments (Welsh)',
          url: 'https://www.gov.uk/guidance/check-if-you-can-delay-customs-duty-and-import-vat (Welsh)',
        }, {
          text: 'excise duty rates (Welsh)',
          url: 'https://www.gov.uk/government/collections/rates-and-allowances-hm-revenue-and-customs#excise-duties (Welsh)',
        },
      ],
    },
    prohibitions: {
      header: 'Prohibitions and restrictions (Welsh)',
      p1: 'Prohibitions and restrictions are legal provisions that engage customs to carry out checks in the context of the enforcement of many different policies aiming at the safety and security of the United Kingdom. (Welsh)',
      link: '<a href="https://www.gov.uk/government/publications/uk-trade-tariff-import-prohibitions-and-restrictions/uk-trade-tariff-import-prohibitions-and-restrictions" target="_blank" rel="noopener noreferrer">Learn more about prohibitions and restrictions (opens in new tab)</a> (Welsh)',
    },
    accessibility: {
      header: 'Accessibility statement for Check How to Import or Export Goods service (Welsh)',
      summary: {
        p1: 'This accessibility statement explains how accessible this service is, what to do if you have difficulty using it, and how to report accessibility problems with the service. (Welsh)',
        p2: 'This service is part of the wider GOV.UK website. There is a <a class="govuk-link" href="https://www.gov.uk/help/accessibility">separate accessibility statement for the main GOV.UK website</a>. (Welsh)',
        p3: 'This page only contains information about the Check How to Import or Export Goods service, available at https://check-how-to-import-export-goods.service.gov.uk/. (Welsh)',
      },
      usingThisService: {
        header: 'Using this service (Welsh)',
        p1: 'The Check How to Import or Export Goods service allows you to check what you need to have in place during the import or export process. The service will help you to understand the rules, licences or certificates that apply to your goods, to pay the right tax and duty for your goods, register your business for trading and declare your goods to clear the UK border. (Welsh)',
        p2: 'This service is run by HM Revenue and Customs (HMRC). We want as many people as possible to be able to use this service. This means you should be able to: (Welsh)',
        l1: 'change colours, contrast levels and fonts (Welsh)',
        l2: 'zoom in up to 300% without the text spilling off the screen (Welsh)',
        l3: 'get from the start of the service to the end using just a keyboard (Welsh)',
        l4: 'get from the start of the service to the end using speech recognition software (Welsh)',
        l5: 'listen to the service using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver) (Welsh)',
        p3: 'We have also made the text in the service as simple as possible to understand. (Welsh)',
        p4: '<a class="govuk-link" href="https://mcmw.abilitynet.org.uk">AbilityNet has advice</a> on making your device easier to use if you have a disability. (Welsh)',
      },
      howAccessible: {
        header: 'How accessible this service is (Welsh)',
        p1: 'This service is partially compliant with the <a class="govuk-link" href="https://www.w3.org/TR/WCAG21/">Web Content Accessibility Guidelines version 2.1 AA standard</a>. (Welsh)',
        p2: 'Some people may find parts of this service difficult to use: (Welsh)',
        list: [
          'All the filter search result pages have the same title which makes it difficult to distinguish between them (Welsh)',
        ],
      },
      reportingProblems: {
        header: 'Reporting accessibility problems with this service (Welsh)',
        p1: 'We are always looking to improve the accessibility of this service. If you find any problems that are not listed on this page or think we are not meeting accessibility requirements, <a class="govuk-link" href="https://www.tax.service.gov.uk/contact/accessibility-unauthenticated?service=STW-GS" target="_blank">report the accessibility problem (opens in a new tab)</a>. (Welsh)',
      },
      notHappy: {
        header: 'If you are not happy with our response (Welsh)',
        p1: 'The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the \'accessibility regulations\'). If you are not happy with how we respond to your complaint, <a class="govuk-link" href="https://www.equalityadvisoryservice.com/">contact the Equality Advisory and Support Service (EASS)</a> or the <a class="govuk-link" href="https://www.equalityni.org/Home">Equality Commission for Northern Ireland (ECNI)</a> if you live in Northern Ireland. (Welsh)',
      },
      technicalInformation: {
        header: 'Technical information about this service’s accessibility (Welsh)',
        p1: 'HMRC is committed to making this service accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018. (Welsh)',
        p2: 'This service is partially compliant with the  <a class="govuk-link" href="https://www.w3.org/TR/WCAG21/">Web Content Accessibility Guidelines version 2.1 AA standard</a>, due to the non-compliances listed below. (Welsh)',
        nonAccessibleContent: {
          header: 'Non‐accessible content (Welsh)',
          p1: 'The content listed below is non-accessible for the following reasons. (Welsh)',
          listHeading: 'Non‐compliance with the accessibility regulations (Welsh)',
          list: [
            'All the filter search result page titles are identical. This fails WCAG 2.1 success criterion 2.4.2 Page titled. This has been fixed and is awaiting retest. (Welsh)',
          ],
        },
      },
      howWeTested: {
        header: 'How we tested this service (Welsh)',
        p1: 'The service was last tested on 8 July 2022 and was checked for compliance with WCAG 2.1 AA. (Welsh)',
        p2: 'The service was built using parts that were tested by the <a class="govuk-link" href="https://www.digitalaccessibilitycentre.org/">Digital Accessibility Centre</a>. The full service was tested by HMRC and included disabled users. (Welsh)',
        p3: 'This page was prepared on 14 July 2021. It was last updated on 14 July 2022. (Welsh)',
      },
    },
    cookies: {
      header: 'Cookie settings (Welsh)',
      save: 'Save changes (Welsh)',
      measure: {
        header: 'Cookies that measure website use (Welsh)',
        p1: 'We use Google Analytics to measure how you use the website so we can improve it based on user needs. We do not allow Google to use or share the data about how you use this site. (Welsh)',
        p2: 'Google Analytics sets cookies that store anonymised information about: (Welsh)',
        l1: 'how you got to the site (Welsh)',
        l2: 'what you click on while you’re visiting the site (Welsh)',
        question: 'Do you want to allow cookies that measure website use? (Welsh)',
        use: 'Yes (Welsh)',
        dontUse: 'No (Welsh)',
        table: 'Google Analytics sets the following cookies: (Welsh)',
        caption: 'Google Analytics cookies (Welsh)',
        gaId: 'These help us count how many people visit this site by tracking if you’ve visited before (Welsh)',
        gaIdExpire: '2 years (Welsh)',
        ga: 'These help us count how many people visit this site by tracking if you’ve visited before (Welsh)',
        gaExpire: '2 years (Welsh)',
        ua: 'These help us count how many people visit this site by tracking if you’ve visited before (Welsh)',
        uaExpire: '2 years (Welsh)',
        guId: 'These help us count how many people visit this site by tracking if you’ve visited before (Welsh)',
        guIdExpire: '24 hours (Welsh)',
      },
      settings: {
        header: 'Cookies that remember your settings (Welsh)',
        question:
          'Do you want to allow cookies that remember settings on the site? (Welsh)',
        p1: 'These cookies do things like remember your preferences and the choices you make, to personalise your experience of using the site. (Welsh)',
        table: 'We use the following cookies to remember your settings: (Welsh)',
        use: 'Yes (Welsh)',
        dontUse: 'No (Welsh)',
        caption: 'Settings cookies (Welsh)',
        preferences: 'Stores the cookies preferences of this site (Welsh)',
        preferencesExpire: '28 days (Welsh)',
        language: 'Stores the language settings (Welsh)',
        languageExpire: '28 days (Welsh)',
      },
      necessary: {
        header: 'Strictly necessary cookies (Welsh)',
        table:
          'We use the following cookies to save values that you have entered into forms for validation purposes. (Welsh)',
        caption: 'Validation cookies (Welsh)',
        validation:
          'Saves validation values and messages so they can be displayed in forms and stores a user session (Welsh)',
        validationExpire: '24 hours (Welsh)',
        signature:
          'A signature cookie is generated using a secret key and is used to prevent tampering (Welsh)',
        signatureExpire: '24 hours (Welsh)',
      },
      tableHeaders: {
        name: 'Name (Welsh)',
        purpose: 'Purpose (Welsh)',
        expires: 'Expires (Welsh)',
      },
    },
    privacy: {
      header:
        'Privacy notice for ‘Check how to import or export goods’ service (Welsh)',
      thePurpose: 'The purpose of this document (Welsh)',
      summary:
        'This privacy notice sets out the personal data which that is collected by the ‘Check how to import or export goods’ service, how we use personal data and for what purposes. You should read the <a href="https://www.gov.uk/government/publications/data-protection-act-dpa-information-hm-revenue-and-customs-hold-about-you" class="govuk-link">HMRC Privacy Notice</a> alongside this privacy notice. (Welsh)',
      yourData: {
        headeData: 'The personal data we hold about you (Welsh)',
        p1: 'For the purposes of collecting feedback to help improve the ‘Check How to Import or Export Goods’ service, we will (optionally) process the following personal data: (Welsh)',
        lData1: 'name (Welsh)',
        lData2: 'email address (Welsh)',
        lData3: 'details of your feedback or support issue (Welsh)',
        headerAnalytics: 'For web analytics: (Welsh)',
        lAnalytics1: 'information about the device (for example phone or laptop) you used (Welsh)',
        lAnalytics2: 'how you got to our service (Welsh)',
        lAnalytics3: 'which links you click (Welsh)',
        lAnalytics4: 'time spent on the service (Welsh)',
        webAnalytics: 'Web analytics data is anonymised: it does not include data where the identity can be derived. (Welsh)',
        headerSupport: 'For online and telephone support: (Welsh)',
        lSupport1: 'name (Welsh)',
        lSupport2: 'email address (Welsh)',
        lSupport3: 'telephone number (Welsh)',
        lSupport4: 'details of your support issue (Welsh)',
      },
      legalBasis: {
        header: 'The legal basis for using your data (Welsh)',
        p1: 'The legal basis for processing your personal data is: (Welsh)',
        l1: 'for web analytics: because you consent to us doing so. (Welsh)',
        l2: 'for collecting feedback: on a ‘public task’ basis, as laid out in <a href="https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/lawful-basis-for-processing/public-task/" class="govuk-link">UK GDPR Article 6(1)(e)</a>. (Welsh)',
      },
      transactionMonitoring: {
        header: 'Transaction monitoring (Welsh)',
        p1: 'In order to protect your data and our services, we operate transaction monitoring capabilities. This records how you connect to our systems, and what you do whilst you are on them. (Welsh)',
      },
      sharedData: {
        header: 'Data sharing (Welsh)',
        p1: 'We will, in some circumstances and where the law allows, share your data with other government departments where it is necessary for the performance of our functions as a government department. This includes: (Welsh)',
        l1: 'Department for International Trade if you need telephone support (Welsh)',
        l2: 'Department for International Trade, in order to track usage of this service in conjunction with DIT’s Check How to Export Goods Service with a view to improving the quality of both services (anonymised data only) (Welsh)',
        l3: 'Cabinet Office for transaction monitoring (Welsh)',
      },
      transferOfInformation: {
        header: 'Transfer of information outside the UK (Welsh)',
        p1: 'As anonymised usage data for the ‘Check How to Import or Export Goods’ service is shared with our web analytics provider, it may be transferred and stored securely outside the UK. (Welsh)',
        p2: 'When we do so, we’ll make sure that we’ll meet our obligations under the UK GDPR and DPA 2018. (Welsh)',
      },
      dataSecurity: {
        header: 'Data security (Welsh)',
        p1: 'We have put in place measures to protect the security of your information. (Welsh)',
        p2: 'We treat the security of your data very seriously. We have strict security standards, and all our staff and other people who process personal data on our behalf get regular training about how to keep information safe. (Welsh)',
        p3: 'We have put in place appropriate technical, physical and managerial procedures to safeguard and secure the information we collect about you. (Welsh)',
        p4: 'In addition, we limit access to your personal information to those persons, or agents who have a business or legal need to do so. (Welsh)',
        p5: 'We have taken measures to make sure an adequate level of security for personal information processed via our website. (Welsh)',
        p6: 'We have put in place procedures to deal with any suspected data security breach and will notify you and the regulator of a suspected breach where we are legally required to do so. (Welsh)',
      },
      retention: {
        header: 'Data retention (Welsh)',
        subheading: 'How long we’ll use your information (Welsh)',
        p1: 'We will only retain your personal information for only as long as it is necessary for us to do so for the purposes for which we are using it and in line with our published records <a href="https://www.gov.uk/government/publications/hmrc-records-management-and-retention-and-disposal-policy" class="govuk-link">management and retention and disposal policy</a>. (Welsh)',
        p2: 'If you supply personal information in order to request a response to feedback or queries submitted about the service, then your personal information will be stored only as long as is required to respond successfully to the query, after which time it will be deleted. (Welsh)',
        p3: 'In some circumstances we’ll anonymise your personal information so that it can no longer be associated with you, in which case we will use such information without further notice to you. (Welsh)',
      },
      youRights: {
        header: 'Rights of access, correction, erasure, and restriction (Welsh)',
        p1: 'You have a number of <a href="https://www.gov.uk/government/publications/data-protection-act-dpa-information-hm-revenue-and-customs-hold-about-you/data-protection-act-dpa-information-hm-revenue-and-customs-hold-about-you#rights" class="govuk-link">rights</a> in relation to the processing of your personal information by HMRC. (Welsh)',
      },
      complaints: {
        header: 'Contact HMRC or make a complaint (Welsh)',
        p1: 'You <a href="https://www.gov.uk/government/publications/data-protection-act-dpa-information-hm-revenue-and-customs-hold-about-you/data-protection-act-dpa-information-hm-revenue-and-customs-hold-about-you#contact-dpo" class="govuk-link">can contact</a> us if you have questions about this privacy notice or want to make a complaint. (Welsh)',
        p2: 'If you want to request a copy of your personal data follow HMRC’s subject access <a href="https://www.gov.uk/guidance/hmrc-subject-access-request" class="govuk-link">request guidance</a>. (Welsh)',
      },
      changes: {
        header: 'Changes to the privacy notice (Welsh)',
        p1: 'We keep our privacy notices under regular review. If there are any changes we will update this page to tell you, for example, about any new uses of personal data. (Welsh)',
        p2: 'Check this page to make sure you are aware of what information we collect, how we use it and the circumstances we may share it with other organisations. (Welsh)',
      },
    },
    additionalQuestions: {
      [MeasureType.PHYTOSANITARY]: {
        Y251: {
          question: 'Are you importing botanic goods to be used in plaiting or braiding? (Welsh)',
          errorText: 'Select if you are importing botanic goods to be used in plaiting or braiding (Welsh)',
        },
        Y252: {
          question: 'Are you importing botanic goods that are fresh, chilled or whole? (Welsh)',
          errorText: 'Select if you are importing botanic goods that are fresh, chilled or whole (Welsh)',
        },
        Y253: {
          question: 'Are you importing passion fruit? (Welsh)',
          errorText: 'Select if you are importing passion fruit (Welsh)',
        },
        Y256: {
          question: 'Are you importing mangosteens? (Welsh)',
          errorText: 'Select if you are importing mangosteens (Welsh)',
        },
        Y257: {
          question: 'Are you importing botanic goods containing seeds (except barley, maize, millets, oats and sorghum) not for sowing from these countries? (Welsh)',
          errorText: 'Select if you are importing botanic goods containing seeds (except barley, maize, millets, oats and sorghum) not for sowing from these countries (Welsh)',
          hintText: 'Argentina, Australia, Bolivia, Brazil, Chile, New Zealand, Uruguay. (Welsh)',
        },
        Y258: {
          question: 'Are you importing botanic goods containing meslin, rye, triticale or wheat seeds for sowing from these countries? (Welsh)',
          errorText: 'Select if you are importing botanic goods containing meslin, rye, triticale or wheat seeds for sowing from these countries (Welsh)',
          hintText: 'Afghanistan,  Argentina, Australia, Bolivia, Brazil, Chile, India, Iran, Iraq, Mexico, Nepal, New Zealand, Pakistan, South Africa, Uruguay, USA. (Welsh)',
        },
        Y259: {
          question: 'Are you importing botanic goods containing rye, triticale or wheat seeds for sowing from these countries? (Welsh)',
          errorText: 'Select if you are importing botanic goods containing rye, triticale or wheat seeds for sowing from these countries (Welsh)',
          hintText: 'Afghanistan, India, Iran, Iraq, Mexico, Nepal, Pakistan, South Africa, USA. (Welsh)',
        },
        Y067: {
          question: 'Are you importing machinery that could be contaminated with plant material? (Welsh)',
          errorText: 'Select if you are importing machinery that could be contaminated with plant material (Welsh)',
          hintText: 'You will be exempt from providing a phytosanitary certificate if you can prove the goods have been thoroughly cleaned and inspected. (Welsh)',
        },
        Y501: {
          question: 'Are you importing trees over 3 metres in height? (Welsh)',
          errorText: 'Select if you are importing trees over 3 metres in height (Welsh)',
        },
        options: [
          {
            label: 'Yes (Welsh)',
          },
          {
            label: 'No (Welsh)',
          },
          {
            label: 'I\'m not sure (Welsh)',
          },
        ],
      },
      [MeasureType.CITES]: {
        question: 'Are the goods made from protected or endangered species? (Welsh)',
        errorText: 'Select if the goods are made from protected or endangered species (Welsh)',
        options: [
          {
            label: 'Yes (Welsh)',
          },
          {
            label: 'No (Welsh)',
          },
          {
            label: 'I\'m not sure (Welsh)',
          },
        ],
      },
      [MeasureType.ORGANICS]: {
        question: 'Are the goods organic? (Welsh)',
        errorText: 'Select if the goods are organic (Welsh)',
        options: [
          {
            label: 'Yes (Welsh)',
          },
          {
            label: 'No (Welsh)',
          },
          {
            label: 'I\'m not sure (Welsh)',
          },
        ],
      },
      [MeasureType.IAS]: {
        question: 'Are you importing non-native plants or animals listed as alien invasive species? (Welsh)',
        errorText: 'Select if you are importing non-native plants or animals listed as alien invasive species (Welsh)',
        options: [
          {
            label: 'Yes (Welsh)',
          },
          {
            label: 'No (Welsh)',
          },
          {
            label: 'I\'m not sure (Welsh)',
          },
        ],
      },
    },
    exportCommoditySearch: {
      question: 'What is the name or the commodity code of the goods? (Welsh)',
      error: 'Enter the name of the goods or a commodity code (Welsh)',
      label: 'Search for the goods by name or enter the export commodity code: (Welsh)',
      summaryText: 'What is a UK export commodity code? (Welsh)',
      summaryDetails: '<p>Commodity codes are numbers that classify the goods.</p>'
          + '<p>You must use the correct commodity code to:'
          + '<ul class="govuk-list govuk-list--bullet">'
          + '<li>complete export declarations</li>'
          + '<li>check licences</li>'
          + '<li>check if any restrictions apply</li>'
          + '</ul>'
          + '<p>If you cannot find the right commodity code, you can <a href="https://www.gov.uk/guidance/finding-commodity-codes-for-imports-or-exports"  target="_blank" rel="noopener noreferrer" class="govuk-link">ask HMRC for advice (opens in new tab)</a>. It can take several months for HMRC to classify goods. (Welsh)',
    },
    exportDeclarations: {
      question: 'Who will submit the declarations? (Welsh)',
      error: 'Select who will submit the customs declarations (Welsh)',
      hint: '<p class="govuk-hint">Declarations are needed for goods to cross the border. Inaccurate declarations can result in penalties or goods being delayed or destroyed. (Welsh)</p>'
        + '<p class="govuk-hint">You may need to pay for specialist software to complete declarations or you can get someone like a freight forwarder to submit them for you. (Welsh)</p>',
      yes: 'I will submit all or some of the declarations (Welsh)',
      no: 'Someone acting on my behalf will do this for me (Welsh)',
      notSure: 'I’m not sure (Welsh)',
    },
    exportTaskList: {
      title: (destinationCountryName: string): string => `Exporting goods to ${destinationCountryName}: what you need to do (Welsh)`,
      beforeTheGoodsAreSoldHeading: 'Before the goods are sold (Welsh)',
      checkYourExportDetailsSubheading: 'Check your answers (Welsh)',
      checkEligibilityLink: 'Review your export details (Welsh)',
      checkWhatRestrictionsApplyToTheGoodsSubheading: 'Check what restrictions apply to the goods (Welsh)',
      checkWhatLicencesCertificatesAndOtherRestrictionsApplyToTheGoodsLink: 'Check what licences, certificates and other restrictions apply to the goods (Welsh)',
      signUpToServicesSubheading: 'Sign up to services (Welsh)',
      checkWhatServicesYouNeedToRegisterWithLink: 'Check which services you need to register with (Welsh)',
      preparingToClearOriginBorderHeading: 'Before the goods arrive at the UK customs border (Welsh)',
      prepareCustomsDeclarationsOriginSubheading: 'Prepare documents and declarations for the UK (Welsh)',
      checkWhatInformationAndDocumentsYouMayNeedLink: 'Check what information and documents you need (Welsh)',
      checkWhatCustomsDeclarationsYouMayNeedToSubmitLink: 'Check which declarations you need to submit (Welsh)',
      preparingToClearDestinationBorderHeading: (destinationCountryName: string): string => `Find out about getting the goods through ${destinationCountryName}’s customs border (Welsh)`,
      preparingToClearDestinationBorderParagraph: 'You will be taken to another government service where the commodity code for the goods may be different. (Welsh)',
      checkHowToClearGoodsIntoDestinationLink: (destinationCountryName: string): string => `Check how to get goods into ${destinationCountryName} (opens in new tab) (Welsh)`,
      statusTags: {
        viewed: 'Viewed (Welsh)',
        toView: 'To view (Welsh)',
        cannotViewYet: 'Cannot view yet (Welsh)',
        notRequired: 'Not required (Welsh)',
      },
    },
    exportCountryDestination: {
      questionExporting: 'Which country are the goods being sent to? (Welsh)',
      error: 'Enter which country or territory you\'re exporting the goods to (Welsh)',
    },
    exportCheckLicencesAndRestrictions: {
      title: 'Check what licences, certificates and other restrictions apply to the goods (Welsh)',
      caption: 'Before the goods are sold (Welsh)',
      rulesThatApplyToYourGoods: {
        rulesThatApplyH2: 'Rules that apply to your goods (Welsh)',
        followTheRules: 'Follow the rules to find out: (Welsh)',
        followTheRulesList1: 'licences that you need to move the goods (Welsh)',
        followTheRulesList2: 'certificates that you must provide (Welsh)',
        followTheRulesList3: 'sanctions that make it illegal to trade with other countries (Welsh)',
        insetText: '<p>If you do not have the right documents or licences, you will not be able to export your goods.</p>'
        + '<p>Make sure you <a href="https://www.gov.uk/guidance/finding-commodity-codes-for-imports-or-exports" target="_blank" rel="noopener noreferrer" class="govuk-link">use the right commodity code and classify your goods correctly (opens in new tab)</a>.</p> (Welsh)',
        exemptionsH3: 'Exemptions: when rules are different or do not apply (Welsh)',
        exemptionsP1: 'Sometimes the rules are different or do not apply to specific goods or circumstances. The exemptions that appear after the rules tell you: (Welsh)',
        exemptionsList1: 'when the rules do not apply to your goods (Welsh)',
        exemptionsList2: 'any conditions you need to meet or evidence you need to show to prove the goods are exempt (Welsh)',
        detailsHeading: 'Document codes (Welsh)',
        detailsContent: '<p>The codes next to the rules or exemptions are the document codes that apply to your goods. You will need these document codes to complete the declaration. (Welsh)</p>',
        cdsContent: '<h4 class="govuk-heading-s">Customs Declaration Service (CDS) universal waiver (Welsh)</h4>'
        + '<p>Requirement for a licence is waived by entering the 999L document code and the document identifier CDS WAIVER in the additional documentation field for this commodity item. 999L can be used for CDS in a similar way to LIC99 on the CHIEF system, when a waiver may be applied. (Welsh)</p>',
        noMeasures: 'There are no export measures for this commodity on this date. (Welsh)',
      },
    },
    checkYourAnswers: {
      title: 'Check your answers (Welsh)',
    },
    exportOriginCountry: {
      question: 'Where are the goods departing from? (Welsh)',
      hint: 'Different rules and regulations currently apply to goods that are sent from Northern Ireland to the EU. (Welsh)',
      GB: 'Great Britain (England, Scotland and Wales) (Welsh)',
      XI: 'Northern Ireland (Welsh)',
      error: 'Select where the goods are departing from (Welsh)',
    },
    checkWhatServicesYouNeedToRegister: {
      title: 'Check which services you need to register with (Welsh)',
      caption: 'Sign up to services (Welsh)',
      hint: 'To export goods out of the UK, you need to: (Welsh)',
      guidanceLinks: [
        {
          text: 'get an EORI number (opens in new tab) (Welsh)',
          url: 'http://www.gov.uk/eori (Welsh)',
        }, {
          text: 'check if you should register for VAT (opens in new tab) (Welsh)',
          url: 'https://www.gov.uk/vat-registration/when-to-register?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5 (Welsh)',
        },
      ],
    },
    exportGoodsArrivalDate: {
      question: 'When will the goods arrive at the UK customs border? (Welsh)',
      p1: 'Enter a date within the next 12 months. (Welsh)',
      p2: 'Enter the exact date to find out which regulations apply to the goods. You can enter an approximate date and continue, but you must enter the exact date when you know it to get the most accurate results. (Welsh)',
      hint: 'For example, 27 3 2023 (Welsh)',
      errorInvalidDate:
        'Date must be a real date (Welsh)',
      errorDateInThePast: 'Date must be today or in the future (Welsh)',
      errorDateWithinYear: (datePlusOneYear: string): string => `Date must be before ${datePlusOneYear} (Welsh)`,
      errorMissingDate: 'Enter the date that the goods arrive at the UK customs border (Welsh)',
      errorMissingYear: 'The date that the goods arrive at the UK customs border must include a year (Welsh)',
      errorMissingMonth: 'The date that the goods arrive at the UK customs border must include a month (Welsh)',
      errorMissingDay: 'The date that the goods arrive at the UK customs border must include a day (Welsh)',
      errorInvalidDay: 'The date that the goods arrive at the UK customs border must be a real day (Welsh)',
      errorInvalidMonth: 'The date that the goods arrive at the UK customs border must be a real month (Welsh)',
      errorInvalidYear: 'The date that the goods arrive at the UK customs border must be a real year (Welsh)',
      errorDayNotNumber: 'Enter a day using numbers only (Welsh)',
      errorMonthNotNumber: 'Enter a month using numbers only (Welsh)',
      errorYearNotNumber: 'Enter a year using numbers only (Welsh)',
      errorMissingDayMonth: 'The date that the goods arrive at the UK customs border must include a day and month (Welsh)',
      errorMissingDayYear: 'The date that the goods arrive at the UK customs border must include a day and year (Welsh)',
      errorMissingMonthYear: 'The date that the goods arrive at the UK customs border must include a month and year (Welsh)',
    },
    movingGoodsFromNorthernIrelandToAnEUCountry: {
      title: 'Moving goods from Northern Ireland to an EU country (Welsh)',
      caption: 'Make sure you know the trading rules on doing business in Northern Ireland. (Welsh)',
      guidanceLinks: [
        {
          text: 'Learn more about moving goods into, out of, or through Northern Ireland (opens in new tab) (Welsh)',
          url: 'https://www.gov.uk/guidance/trading-and-moving-goods-in-and-out-of-northern-ireland (Welsh)',
        },
      ],
    },
    exportAdditionalCode: {
      question: 'Describe the goods you are exporting in more detail (Welsh)',
      hint: 'The commodity you have selected can be further classified by adding 4-digits to the end. Select one option. (Welsh)',
      error: 'Select a further classification for the commodity (Welsh)',
    },
    exportUserTypeTrader: {
      question: 'What are you responsible for? (Welsh)',
      goodsExportedToBeSold: 'I’m selling or exporting the goods (Welsh)',
      actingOnBehalfOfSeller: 'I’m acting on behalf of the seller or exporter (for example, a customs agent or freight forwarder) (Welsh)',
      neitherApply: 'Neither of the above apply (Welsh)',
      error: 'Select what are you responsible for (Welsh)',
    },
    exportGoodsIntent: {
      question: 'Why are the goods being sent from the UK? (Welsh)',
      error: 'Select what you are doing with the goods (Welsh)',
      hint: 'Select only one (Welsh)',
      goodsExportedToBeSoldForBusiness: 'The goods are being exported to be sold, processed or used by another business (Welsh)',
      goodsExportedTemporarilyForBusiness: 'The goods are being taken out of the UK by a business temporarily – for example, to exhibit at a trade fair (Welsh)',
      goodsSoldInLuggageForBusiness: 'The goods are being sold by a business, carried in luggage or by private vehicle, and are less than £1,500 in value or weigh less than 1,500kg (Welsh)',
      goodsPostedForPersonal: 'The goods are being sent through the post for personal use (Welsh)',
      dividerHeadingBusiness: '<h2 class=\'govuk-heading-s govuk-!-margin-top-6\'>For business use (Welsh)</h2>',
      dividerHeadingPersonal: '<h2 class=\'govuk-heading-s govuk-!-margin-top-4\'>Or for personal use (Welsh)</h2>',
    },
    exportProhibitionsAndRestrictions: {
      title: (destinationCountry: string): string => `Exporting goods to ${destinationCountry}: what you need to do (Welsh)`,
      prohibitionsAndRestrictions: 'Prohibitions and restrictions (Welsh)',
      p1: 'Export controls apply  to certain goods. You may need an export licence to send these goods from the UK. (Welsh)',
      link: 'Learn more about prohibitions and restrictions (opens in new tab). (Welsh)',
    },
    checkInformationAndDocuments: {
      title: 'Check what information and documents you need (Welsh)',
      caption: 'Prepare UK documents and declarations (Welsh)',
      commercialDocuments: 'Commercial documents (Welsh)',
      commercialDocumentsP1: 'You must provide the right paperwork to present at the UK customs border and <a href="https://www.gov.uk/guidance/archiving-your-trade-documents" target="_blank" rel="noopener noreferrer" class="govuk-link">keep a record of any documents (opens in new tab)</a>. (Welsh)',
      commercialDocumentsP2: 'Documents and information you’ll need to give to the buyer, carrier or business acting on your behalf include: (Welsh)',
      commercialDocumentsL1: 'a commercial invoice describing the content of the goods and demand for payment (Welsh)',
      commercialDocumentsL2: 'a packing list providing information about the goods such as the actual weight,  how they are packed and the carton numbers (Welsh)',
      commercialDocumentsL3: 'proof of origin for any goods exported to a country with a UK trade agreement and which attract a reduced rate of Customs Duty (Welsh)',
      commercialDocumentsP3: 'You must keep records of all procedures such as warehousing to make sure you <a href="https://www.gov.uk/guidance/vat-exports-dispatches-and-supplying-goods-abroad" target="_blank" rel="noopener noreferrer" class="govuk-link">pay the right amount of VAT (opens in new tab)</a>. (Welsh)',
      shippingDocuments: 'Shipping documents (Welsh)',
      shippingDocumentsP1: 'The carrier or business acting on your behalf must also have the right transport documents such as: (Welsh)',
      shippingDocumentsL1: 'a bill of lading for goods sent by sea (Welsh)',
      shippingDocumentsL2: 'an air waybill for goods sent by air (Welsh)',
    },
    exportCheckDeclarations: {
      title: 'Check which declarations you need to submit  (Welsh)',
      makingDeclaration: 'Making an export declaration  (Welsh)',
      makingDeclarationP1: 'You must declare the goods before they can be sent from the UK. Declaring goods can be complicated, so you may want to <a href="https://www.gov.uk/guidance/appoint-someone-to-deal-with-customs-on-your-behalf" target="_blank" rel="noopener noreferrer" class="govuk-link">get someone to deal with customs for you (opens in new tab)</a>.  (Welsh)',
      exportDeclarations: 'Export declarations  (Welsh)',
      exportDeclarationsP1: 'You will need to <a href="https://www.gov.uk/guidance/making-a-full-export-declaration" target="_blank" rel="noopener noreferrer" class="govuk-link">make a full export declaration (opens in new tab)</a>, or, if you’ve applied and got permission to do so, you can <a href="https://www.gov.uk/guidance/using-simplified-declarations-for-exports" target="_blank" rel="noopener noreferrer" class="govuk-link">make a simplified declaration for exports (opens in new tab)</a>.  (Welsh)',
      exitSummary: 'Exit summary declaration  (Welsh)',
      exitSummaryP1: 'If your export declaration does not include safety and security information, you will need to <a href="https://www.gov.uk/guidance/find-out-when-to-make-an-exit-summary-declaration" target="_blank" rel="noopener noreferrer" class="govuk-link">submit a separate exit summary declaration (opens in new tab)</a>.  (Welsh)',
      exitSummaryP2: 'It is the legal responsibility of the transport operator to make sure the UK customs authority is provided with pre-departure safety and security information.   (Welsh)',
      submitDeclaration: 'How to submit a declaration  (Welsh)',
      submitDeclarationP1: 'To make declarations yourself, your business must be established in the UK. If you are not established in the UK you must get someone to make the declarations for you.  (Welsh)',
      submitDeclarationP2: 'To make declarations yourself, you will need to <a href="https://www.gov.uk/guidance/get-access-to-the-customs-declaration-service" target="_blank" rel="noopener noreferrer" class="govuk-link">subscribe to the Customs Declaration Service (opens in new tab)</a> or <a href="https://www.gov.uk/guidance/apply-to-access-customs-handling-of-import-and-export-freight-c1800" target="_blank" rel="noopener noreferrer" class="govuk-link">get access to the Customs Handling of Import and Export Freight (CHIEF) system (opens in new tab)</a>.  (Welsh)',
      submitDeclarationP3: 'If goods are travelling through Great Britain or Northern Ireland to other countries, <a href="https://www.gov.uk/government/collections/using-common-or-union-transit-to-move-goods-into-through-and-out-of-the-uk" target="_blank" rel="noopener noreferrer" class="govuk-link">check the common transit rules (opens in new tab)</a> to find out if you can move your goods more quickly without the need to do multiple declarations.  (Welsh)',
    },
  },
  common: {
    header: {
      serviceName: 'Check how to import or export goods (Welsh)',
      beta: 'BETA (Welsh)',
      betaBanner: (feedbackLink: string, referrerUrl: string): string => `This is a new service – your <a class="govuk-link" href="${feedbackLink}&referrerUrl=${referrerUrl}">feedback</a> will help us to improve it. (Welsh)`,
    },
    cookies: {
      header: "Cookies on 'Check how to import or export goods'",
      p1:
        'We use some essential cookies to make our services work.\n'
        + '\n'
        + 'We would like to set additional cookies so we can remember your settings, understand how people use our'
        + ' services and make improvements. (Welsh)',
      acceptAdditionalCookies: 'Accept additional cookies (Welsh)',
      rejectAdditionalCookies: 'Reject additional cookies (Welsh)',
      viewCookies: 'View Cookies (Welsh)',
      setCookiePreferences: 'You’ve set your cookie preferences. (Welsh)',
      goBack: 'Go back to the page you were looking at. (Welsh)',
      acceptedCookies: 'You have accepted additional cookies. (Welsh)',
      rejectedCookies: 'You have rejected additional cookies. (Welsh)',
      changeCookies: (cookiesPage: string): string => `<a href="${cookiesPage}">You can change your cookie settings at any time</a>. (Welsh)`,
    },
    errors: {
      error: 'Error (Welsh)',
      problem: 'There is a problem (Welsh)',
      defaultMessage: 'Try again later. (Welsh)',
      404: {
        title: 'Page not found (Welsh)',
        message: `<p>If you typed the web address, check it is correct.</p>
        <p>If you pasted the web address, check you copied the entire address.</p> (Welsh)`,
      },
      500: {
        title: 'Sorry, there is a problem with the service (Welsh)',
        message: `<p>Try again later.</p>
          <p>We have not saved your answers. When the service is available, you will have to start again.</p> (Welsh)`,
      },
    },
    buttons: {
      continue: 'Continue (Welsh)',
      back: 'Back (Welsh)',
      home: 'Home (Welsh)',
      cancel: 'Cancel (Welsh)',
      backToResults: 'Back to results summary (Welsh)',
    },
    footer: {
      cookies: 'Cookies (Welsh)',
      accessibilityStatement: 'Accessibility statement (Welsh)',
      toggle: 'English (Welsh)',
      privacyNotice: 'Privacy (Welsh)',
      itSupport: 'Help (Welsh)',
    },
    accessibility: {
      opensNewTab: '(opens in new tab) (Welsh)',
      warning: 'Warning (Welsh)',
      followingLinksOpensInNewTab: 'The following links open in a new tab. (Welsh)',
      defaultCountrySelectLabel: 'Select a country (Welsh)',
    },
    notificationBanner: {
      success: 'Success (Welsh)',
    },
    feedback: {
      getHelp: 'Help and support (Welsh)',
      general: 'General enquiries about importing or exporting (Welsh)',
      technical: 'Enquiries about this service or report a technical issue (Welsh)',
    },
    session: {
      expire: 'Your session has timed out (Welsh)',
      message: 'Your session has timed out due to inactivity.<br /><br /><a href="/" class="govuk-button" role="button">Start again</a> (Welsh)',
    },
    tradeDetails: {
      detailsLink: 'Trade details (Welsh)',
      change: 'Change (Welsh)',
      commodityCode: 'Commodity code (Welsh)',
      exportDate: 'Export date (Welsh)',
      countryOfDeparture: 'Country of departure (Welsh)',
      goodsGoingInto: 'Goods going into (Welsh)',
      classification: 'Classification (Welsh)',
    },
    numbers: {
      1: 'one (Welsh)',
      2: 'two (Welsh)',
      3: 'three (Welsh)',
      4: 'four (Welsh)',
      5: 'five (Welsh)',
      6: 'six (Welsh)',
      7: 'seven (Welsh)',
      8: 'eight (Welsh)',
      9: 'nine (Welsh)',
      10: 'ten (Welsh)',
      11: 'eleven (Welsh)',
      12: 'twelve (Welsh)',
      13: 'thirteen (Welsh)',
      14: 'fourteen (Welsh)',
      15: 'fifteen (Welsh)',
      16: 'sixteen (Welsh)',
      17: 'seventeen (Welsh)',
      18: 'eighteen (Welsh)',
      19: 'nineteen (Welsh)',
      20: 'twenty (Welsh)',
    },
  },
};

export default Translation;
