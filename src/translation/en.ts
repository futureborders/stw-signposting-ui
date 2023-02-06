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
/* istanbul ignore file */

import { MeasureType } from '../interfaces/enums.interface';

const Translation = {
  page: {
    startPage: {
      whenService: {
        p1: 'Use this service to check what you need to have in place during the import or export process:',
        l1: 'before you buy or sell the goods',
        l2: 'when you move the goods across the UK border',
        l3: 'after the goods arrive',
      },
      whatService: {
        p1: 'The service will help you:',
        l1: 'understand the rules, licences or certificates that apply to your goods',
        l2: 'pay the right tax and duty for your goods',
        l3: 'register your business for trading',
        l4: 'declare your goods to clear the UK border',
        l5: 'keep the right invoices and records',
      },
      beforeStart: {
        h2: 'Before you start',
        p1: 'You’ll need to know:',
        l1: 'where the goods are coming from or going to',
        l2: 'the commodity code of your goods',
        p2: 'If you do not have the commodity code for your goods, you’ll be able to search for it in the service. You’ll need to know what your goods are made of to get the correct information.',
      },
      startButton: 'Start now',
      alsoAvailable: (toggledLanguagePath: string): string => `This service is also available in <a href="${toggledLanguagePath}">Welsh (Cymraeg)</a>.`,
    },
    typeOfTrade: {
      question: 'Are the goods going to be imported or exported?',
      label: 'Select import or export',
      import: 'Import (bring goods into the UK)',
      export: 'Export (send goods from the UK)',
      error: 'Select if you want to import or export goods',
      followDifferentRules: 'There is specific guidance if you are <a href="https://www.gov.uk/guidance/trading-and-moving-goods-in-and-out-of-northern-ireland" target="_blank" rel="noopener noreferrer" class="govuk-link">moving goods in and out of Northern Ireland (opens in new tab)</a>.',
      availableInWelsh: 'This service is partially available in Welsh.',
    },
    goodsIntent: {
      question: 'Why are the goods being brought into the UK?',
      error: 'Select why are the goods being brought into the UK',
      hint: 'Select only one',
      bringGoodsToSellForBusiness: 'The goods are being brought in to be sold, processed or used in a business',
      bringGoodsInLuggageForBusiness: 'The goods are being sold by a business, and either carried in accompanied luggage or a small vehicle carrying up to 9 people and weighing 3.5 tonnes or less',
      bringGoodsTemporarilyForBusiness: 'The goods are being brought into the UK temporarily for business use, for example, to be repaired or forwarded on to another country',
      bringGoodsThroughPostForPersonal: 'The goods are being brought in through the post for personal use',
      bringGoodsInLuggageForPersonal: 'The goods are being brought in by luggage for personal use',
      movingToUkWithBelongingsForPersonal: 'The goods are personal belongings and being moved to the UK',
      dividerHeadingBusiness: '<h2 class=\'govuk-heading-s govuk-!-margin-top-8\'>For business use</h2>',
      dividerHeadingPersonal: '<h2 class=\'govuk-heading-s govuk-!-margin-top-8\'>For personal use</h2>',
    },
    identifyUserType: {
      question: 'What are you responsible for?',
      yes: 'I’m buying or importing the goods',
      no: 'I’m acting on behalf of the buyer or importer (for example, a customs agent or freight forwarder)',
      neither: 'Neither of the above apply',
      error: 'Select what are you responsible for',
    },
    importDeclarations: {
      question: 'Who will submit the import declaration?',
      error: 'Select who will submit the declaration',
      hint: '<p class="govuk-hint">Declarations are needed for goods to cross the border. Inaccurate declarations can result in penalties, goods being delayed or seized.</p>'
        + '<p class="govuk-hint">You may need to pay for specialist software to complete declarations or you can get someone like a freight forwarder to submit them for you.</p>',
      yes: 'I will complete all or some of the declaration',
      no: 'Someone acting on my behalf will do this for me (for example, a customs agent or freight forwarder)',
      notSure: 'I’m not sure',
    },
    importDate: {
      question: 'When will the goods arrive at the UK border?',
      p1: 'Enter a date that is within the next 12 months. If you enter an approximate date you must return to this service and enter the exact date because regulations which affect the goods can change.',
      hint: 'For example, 12 9 2022',
      errorInvalidDate:
        'Date must be a real date',
      errorDateInThePast: 'Date must be today or in the future',
      errorDateWithinYear: (datePlusOneYear: string): string => `Date must be before ${datePlusOneYear}`,
      errorMissingDate: 'Enter the date that the goods will be imported',
      errorMissingYear: 'The date that the goods will be imported must include a year',
      errorMissingMonth: 'The date that the goods will be imported must include a month',
      errorMissingDay: 'The date that the goods will be imported must include a day',
      errorInvalidDay: 'The date that the goods will be imported must be a real day',
      errorInvalidMonth: 'The date that the goods will be imported must be a real month',
      errorInvalidYear: 'The date that the goods will be imported must be a real year',
      errorDayNotNumber: 'Enter a day using numbers only',
      errorMonthNotNumber: 'Enter a month using numbers only',
      errorYearNotNumber: 'Enter a year using numbers only',
      errorMissingDayMonth: 'The date that the goods will be imported must include a day and month',
      errorMissingDayYear: 'The date that the goods will be imported must include a day and year',
      errorMissingMonthYear: 'The date that the goods will be imported must include a month and year',
    },
    importGoods: {
      question: 'What is the name or the commodity code of the goods?',
      summaryDetails: '<p>Commodity codes for imports are 10-digit numbers that classify the goods.</p>'
        + '<p>You must use the correct commodity code to:</p>'
        + '<ul class="govuk-list govuk-list--bullet">'
        + '<li>complete the import declaration</li>'
        + '<li>check licences, certificates and any restrictions that apply</li>'
        + '<li>pay the correct Customs Duties and import VAT, if applicable</li>'
        + '</ul>'
        + '<p>If you cannot find the right commodity code, you can <a href="https://www.gov.uk/guidance/ask-hmrc-for-advice-on-classifying-your-goods" target="_blank" rel="noopener noreferrer">ask HMRC for help (opens in new tab)</a>.</p>',
      warning: 'It is your responsibility to ensure the commodity codes entered at the border are correct. Declaring an inaccurate commodity code at the border may result in penalties.',
      label: 'Search for the goods by name or enter the import commodity code:',
      errors: {
        required: 'Enter the name of the goods or a commodity code',
        mustBeNumber: 'Commodity code must be a number, like 0304410010',
        digits: 'Commodity code must be 10 digits',
        commodityNotFound:
          'This code is not valid. Enter a valid commodity code',
      },
      summaryText: 'What is a commodity code for imports?',
    },
    searchResults: {
      title: 'Search results',
      subTitle: (category: string): string => `Search results within category ${category}`,
      searched: (searchTerm: string): string => `You searched for '<strong>${searchTerm}</strong>'.`,
      noResults: (searchTerm: string): string => `No results for '<strong>${searchTerm}</strong>'.`,
      searchInsetText: 'Select the commodity code for your goods. If it is not displayed you can refine your search using the list below.',
      category: 'Category',
      description: 'Product description',
      searchAgain: 'Search again',
      search: 'Search',
      commodityCode: 'Commodity code',
      contents: 'Contents',
      termAppears: (term: string, length: number, group: string): string => `The term '<strong>${term}</strong>' appears in <strong>${length}</strong> ${group}.`,
      noResultsMatchingH2: 'There are no results matching your query. Please search again and consider:',
      noResultsMatchingL1: 'Searching what the item is used for or made from',
      noResultsMatchingL2: 'Broadening your search criteria',
      noResultsMatchingL3: 'Checking your spelling',
      noResultsMatchingL4: 'Browsing the <a href="https://www.trade-tariff.service.gov.uk/a-z-index/a">A-Z of Classified Goods</a> on the Online Trade Tariff',
      heading: {
        heading: 'Commodity',
        matching: 'Categories matching',
        group: 'categories',
        groupSingular: 'category',
        ofGroup: 'categories',
      },
      chapter: {
        heading: 'Category',
      },
      commodity: {
        matching: 'Commodities matching',
        group: 'commodities',
        groupSingular: 'commodity',
        ofGroup: 'commodities',
      },
    },
    destinationCountry: {
      question: 'Where are the goods arriving?',
      hint: 'Different rules and regulations currently apply to goods that arrive into Northern Ireland from the EU.',
      error: 'Select where the goods are arriving',
      origin: 'Country of origin: ',
      importingIntoUK: (originCountry: string): string => `You may need to follow different import rules if you are importing goods into ${originCountry}.`,
      assumedText: (originCountry: string, importToCountry: string): string => `Because you selected <strong>${originCountry}</strong> as the country of origin of the goods, it is assumed that the country you are importing to is <strong>${importToCountry}</strong>.`,
      changeOriginCountryLink: 'Change country of origin',
    },
    importCountryOrigin: {
      question: 'What is the country of origin of the goods?',
      hint: 'Country of origin refers to the country where the goods were mostly or wholly manufactured, grown or modified. It is used for labelling purposes and affects duty rates.',
      error: 'Enter the country of origin of the goods',
      label: 'Enter the country of origin',
      warning: '<p class="govuk-!-font-weight-bold">This service only provides guidance on country of origin. You must enter both country of departure and country of origin in the import declaration.</p><p class="govuk-!-font-weight-bold">If the country of origin is different to the country of departure when the goods are declared at the border, the regulations, tax and duties may differ from the guidance on this service. <a href="https://www.gov.uk/guidance/check-your-goods-meet-the-rules-of-origin" target="_blank">Check if the goods meet the rules of origin (opens in new tab)</a>.</p>'
    },
    northernIrelandAndEUTrading: {
      title: 'Moving goods from EU countries to Northern Ireland',
      body: 'Make sure you know the trading rules on doing business in Northern Ireland.',
      learnMore:
        '<a href="https://www.gov.uk/guidance/trading-and-moving-goods-in-and-out-of-northern-ireland" target="_blank" rel="noopener noreferrer">Learn more about moving goods in and out of Northern Ireland (opens in new tab)</a>',
    },
    calculateCustomsDutyImportVat: {
      customsDutyImportVat: 'Customs Duty and Import VAT',
      importIntoNorthernIreland: (link: string): string => `If you need to import into Northern Ireland, please refer to the <a href="${link}" class="govuk-link" target="_blank" rel="noopener noreferrer">Online Trade Tariff Tax and Duty Calculator (opens in new tab)</a> to determine the taxes and duties you should pay.`,
      customsDuty: 'Customs Duty',
      tariffs: 'Tariffs',
      awaitingData: 'Awaiting data.',
      importVat: 'Import VAT',
      taxes: 'Taxes',
      quota: 'Quota order number',
      additionalCode: 'Additional code',
      measureType: 'Measure type',
      value: 'Value',
      findOutMore: 'Find out more about:',
      to: 'to',
      guidanceLinks: [
        {
          text: 'VAT rates on goods and services',
          url: 'https://www.gov.uk/guidance/rates-of-vat-on-different-goods-and-services',
        }, {
          text: 'how to claim back VAT on imported goods',
          url: 'https://www.gov.uk/guidance/vat-imports-acquisitions-and-purchases-from-abroad',
        }, {
          text: 'how to apply for a refund or waiver on import duties',
          url: 'https://www.gov.uk/guidance/refunds-and-waivers-on-customs-debt',
        }, {
          text: 'if you can delay duty payments',
          url: 'https://www.gov.uk/guidance/check-if-you-can-delay-customs-duty-and-import-vat',
        }, {
          text: 'excise duty rates',
          url: 'https://www.gov.uk/government/collections/rates-and-allowances-hm-revenue-and-customs#excise-duties',
        },
      ],
    },
    prohibitions: {
      header: 'Prohibitions and restrictions',
      p1: 'Prohibitions and restrictions are legal provisions that engage customs to carry out checks in the context of the enforcement of many different policies aiming at the safety and security of the United Kingdom.',
      link: '<a href="https://www.gov.uk/government/publications/uk-trade-tariff-import-prohibitions-and-restrictions/uk-trade-tariff-import-prohibitions-and-restrictions" target="_blank" rel="noopener noreferrer">Learn more about prohibitions and restrictions (opens in new tab)</a>',
    },
    accessibility: {
      header: 'Accessibility statement for Check How to Import or Export Goods service',
      summary: {
        p1: 'This accessibility statement explains how accessible this service is, what to do if you have difficulty using it, and how to report accessibility problems with the service.',
        p2: 'This service is part of the wider GOV.UK website. There is a <a class="govuk-link" href="https://www.gov.uk/help/accessibility">separate accessibility statement for the main GOV.UK website</a>.',
        p3: 'This page only contains information about the Check How to Import or Export Goods service, available at https://check-how-to-import-export-goods.service.gov.uk/.',
      },
      usingThisService: {
        header: 'Using this service',
        p1: 'The Check How to Import or Export Goods service allows you to check what you need to have in place during the import or export process. The service will help you to understand the rules, licences or certificates that apply to your goods, to pay the right tax and duty for your goods, register your business for trading and declare your goods to clear the UK border.',
        p2: 'This service is run by HM Revenue and Customs (HMRC). We want as many people as possible to be able to use this service. This means you should be able to:',
        l1: 'change colours, contrast levels and fonts',
        l2: 'zoom in up to 300% without the text spilling off the screen',
        l3: 'get from the start of the service to the end using just a keyboard',
        l4: 'get from the start of the service to the end using speech recognition software',
        l5: 'listen to the service using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)',
        p3: 'We have also made the text in the service as simple as possible to understand.',
        p4: '<a class="govuk-link" href="https://mcmw.abilitynet.org.uk">AbilityNet has advice</a> on making your device easier to use if you have a disability.',
      },
      howAccessible: {
        header: 'How accessible this service is',
        p1: 'This service is partially compliant with the <a class="govuk-link" href="https://www.w3.org/TR/WCAG21/">Web Content Accessibility Guidelines version 2.1 AA standard</a>.',
        p2: 'Some people may find parts of this service difficult to use:',
        list: [
          'All the filter search result pages have the same title which makes it difficult to distinguish between them',
        ],
      },
      reportingProblems: {
        header: 'Reporting accessibility problems with this service',
        p1: 'We are always looking to improve the accessibility of this service. If you find any problems that are not listed on this page or think we are not meeting accessibility requirements, <a class="govuk-link" href="https://www.tax.service.gov.uk/contact/accessibility-unauthenticated?service=STW-GS" target="_blank">report the accessibility problem (opens in a new tab)</a>.',
      },
      notHappy: {
        header: 'If you are not happy with our response',
        p1: 'The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the \'accessibility regulations\'). If you are not happy with how we respond to your complaint, <a class="govuk-link" href="https://www.equalityadvisoryservice.com/">contact the Equality Advisory and Support Service (EASS)</a> or the <a class="govuk-link" href="https://www.equalityni.org/Home">Equality Commission for Northern Ireland (ECNI)</a> if you live in Northern Ireland.',
      },
      technicalInformation: {
        header: 'Technical information about this service’s accessibility',
        p1: 'HMRC is committed to making this service accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.',
        p2: 'This service is partially compliant with the  <a class="govuk-link" href="https://www.w3.org/TR/WCAG21/">Web Content Accessibility Guidelines version 2.1 AA standard</a>, due to the non-compliances listed below.',
        nonAccessibleContent: {
          header: 'Non‐accessible content',
          p1: 'The content listed below is non-accessible for the following reasons.',
          listHeading: 'Non‐compliance with the accessibility regulations',
          list: [
            'All the filter search result page titles are identical. This fails WCAG 2.1 success criterion 2.4.2 Page titled. This has been fixed and is awaiting retest.',
          ],
        },
      },
      howWeTested: {
        header: 'How we tested this service',
        p1: 'The service was last tested on 8 July 2022 and was checked for compliance with WCAG 2.1 AA.',
        p2: 'The service was built using parts that were tested by the <a class="govuk-link" href="https://www.digitalaccessibilitycentre.org/">Digital Accessibility Centre</a>. The full service was tested by HMRC and included disabled users.',
        p3: 'This page was prepared on 14 July 2021. It was last updated on 14 July 2022.',
      },
    },
    cookies: {
      header: 'Cookie settings',
      save: 'Save changes',
      measure: {
        header: 'Cookies that measure website use',
        p1: 'We use Google Analytics to measure how you use the website so we can improve it based on user needs. We do not allow Google to use or share the data about how you use this site.',
        p2: 'Google Analytics sets cookies that store anonymised information about:',
        l1: 'how you got to the site',
        l2: 'what you click on while you’re visiting the site',
        question: 'Do you want to allow cookies that measure website use?',
        use: 'Yes',
        dontUse: 'No',
        table: 'Google Analytics sets the following cookies:',
        caption: 'Google Analytics cookies',
        gaId: 'These help us count how many people visit this site by tracking if you’ve visited before',
        gaIdExpire: '2 years',
        ga: 'These help us count how many people visit this site by tracking if you’ve visited before',
        gaExpire: '2 years',
        ua: 'These help us count how many people visit this site by tracking if you’ve visited before',
        uaExpire: '2 years',
        guId: 'These help us count how many people visit this site by tracking if you’ve visited before',
        guIdExpire: '24 hours',
      },
      settings: {
        header: 'Cookies that remember your settings',
        question:
          'Do you want to allow cookies that remember settings on the site?',
        p1: 'These cookies do things like remember your preferences and the choices you make, to personalise your experience of using the site.',
        table: 'We use the following cookies to remember your settings:',
        use: 'Yes',
        dontUse: 'No',
        caption: 'Settings cookies',
        preferences: 'Stores the cookies preferences of this site',
        preferencesExpire: '28 days',
        language: 'Stores the language settings',
        languageExpire: '28 days',
      },
      necessary: {
        header: 'Strictly necessary cookies',
        table:
          'We use the following cookies to save values that you have entered into forms for validation purposes.',
        caption: 'Validation cookies',
        validation:
          'Saves validation values and messages so they can be displayed in forms and stores a user session',
        validationExpire: '24 hours',
        signature:
          'A signature cookie is generated using a secret key and is used to prevent tampering',
        signatureExpire: '24 hours',
      },
      tableHeaders: {
        name: 'Name',
        purpose: 'Purpose',
        expires: 'Expires',
      },
    },
    privacy: {
      header:
        'Privacy notice for ‘Check how to import or export goods’ service',
      thePurpose: 'The purpose of this document',
      summary:
        'This privacy notice sets out the personal data that is collected by the ‘Check how to import or export goods’ service, how we use personal data and for what purposes. You should read the <a href="https://www.gov.uk/government/publications/data-protection-act-dpa-information-hm-revenue-and-customs-hold-about-you" class="govuk-link">HMRC Privacy Notice</a> alongside this privacy notice.',
      yourData: {
        headeData: 'The personal data we hold about you',
        p1: 'For the purposes of collecting feedback to help improve the ‘Check How to Import or Export Goods’ service, we will (optionally) process the following personal data:',
        lData1: 'name',
        lData2: 'email address',
        lData3: 'details of your feedback or support issue',
        headerAnalytics: 'For web analytics:',
        lAnalytics1: 'information about the device (for example phone or laptop) you used',
        lAnalytics2: 'how you got to our service',
        lAnalytics3: 'which links you click',
        lAnalytics4: 'time spent on the service',
        webAnalytics: 'Web analytics data is anonymised: it does not include data where the identity can be derived.',
        headerSupport: 'For online and telephone support:',
        lSupport1: 'name',
        lSupport2: 'email address',
        lSupport3: 'telephone number',
        lSupport4: 'details of your support issue',
      },
      legalBasis: {
        header: 'The legal basis for using your data',
        p1: 'The legal basis for processing your personal data is:',
        l1: 'for web analytics: because you consent to us doing so.',
        l2: 'for collecting feedback: on a ‘public task’ basis, as laid out in <a href="https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/lawful-basis-for-processing/public-task/" class="govuk-link">UK GDPR Article 6(1)(e)</a>.',
      },
      transactionMonitoring: {
        header: 'Transaction monitoring',
        p1: 'In order to protect your data and our services, we operate transaction monitoring capabilities. This records how you connect to our systems, and what you do whilst you are on them.',
      },
      sharedData: {
        header: 'Data sharing',
        p1: 'We will, in some circumstances and where the law allows, share your data with other government departments where it is necessary for the performance of our functions as a government department. This includes:',
        l1: 'Department for International Trade if you need telephone support',
        l2: 'Department for International Trade, in order to track usage of this service in conjunction with DIT’s Check How to Export Goods Service with a view to improving the quality of both services (anonymised data only)',
        l3: 'Cabinet Office for transaction monitoring',
      },
      transferOfInformation: {
        header: 'Transfer of information outside the UK',
        p1: 'As anonymised usage data for the ‘Check How to Import or Export Goods’ service is shared with our web analytics provider, it may be transferred and stored securely outside the UK.',
        p2: 'When we do so, we’ll make sure that we’ll meet our obligations under the UK GDPR and DPA 2018.',
      },
      dataSecurity: {
        header: 'Data security',
        p1: 'We have put in place measures to protect the security of your information.',
        p2: 'We treat the security of your data very seriously. We have strict security standards, and all our staff and other people who process personal data on our behalf get regular training about how to keep information safe.',
        p3: 'We have put in place appropriate technical, physical and managerial procedures to safeguard and secure the information we collect about you.',
        p4: 'In addition, we limit access to your personal information to those persons, or agents who have a business or legal need to do so.',
        p5: 'We have taken measures to make sure an adequate level of security for personal information processed via our website.',
        p6: 'We have put in place procedures to deal with any suspected data security breach and will notify you and the regulator of a suspected breach where we are legally required to do so.',
      },
      retention: {
        header: 'Data retention',
        subheading: 'How long we’ll use your information',
        p1: 'We will only retain your personal information for only as long as it is necessary for us to do so for the purposes for which we are using it and in line with our published <a href="https://www.gov.uk/government/publications/hmrc-records-management-and-retention-and-disposal-policy" class="govuk-link">records management and retention and disposal policy</a>.',
        p2: 'If you supply personal information in order to request a response to feedback or queries submitted about the service, then your personal information will be stored only as long as is required to respond successfully to the query, after which time it will be deleted.',
        p3: 'In some circumstances we’ll anonymise your personal information so that it can no longer be associated with you, in which case we will use such information without further notice to you.',
      },
      youRights: {
        header: 'Rights of access, correction, erasure, and restriction',
        p1: 'You have a number of <a href="https://www.gov.uk/government/publications/data-protection-act-dpa-information-hm-revenue-and-customs-hold-about-you/data-protection-act-dpa-information-hm-revenue-and-customs-hold-about-you#rights" class="govuk-link">rights</a> in relation to the processing of your personal information by HMRC.',
      },
      complaints: {
        header: 'Contact HMRC or make a complaint',
        p1: 'You <a href="https://www.gov.uk/government/publications/data-protection-act-dpa-information-hm-revenue-and-customs-hold-about-you/data-protection-act-dpa-information-hm-revenue-and-customs-hold-about-you#contact-dpo" class="govuk-link">can contact</a> us if you have questions about this privacy notice or want to make a complaint.',
        p2: 'If you want to request a copy of your personal data follow HMRC’s subject access <a href="https://www.gov.uk/guidance/hmrc-subject-access-request" class="govuk-link">request guidance</a>.',
      },
      changes: {
        header: 'Changes to the privacy notice',
        p1: 'We keep our privacy notices under regular review. If there are any changes we will update this page to tell you, for example, about any new uses of personal data.',
        p2: 'Check this page to make sure you are aware of what information we collect, how we use it and the circumstances we may share it with other organisations.',
      },
    },
    additionalQuestions: {
      [MeasureType.PHYTOSANITARY]: {
        Y251: {
          question: 'Are you importing botanic goods to be used in plaiting or braiding?',
          errorText: 'Select if you are importing botanic goods to be used in plaiting or braiding',
        },
        Y252: {
          question: 'Are you importing botanic goods that are fresh, chilled or whole?',
          errorText: 'Select if you are importing botanic goods that are fresh, chilled or whole',
        },
        Y253: {
          question: 'Are you importing passion fruit?',
          errorText: 'Select if you are importing passion fruit',
        },
        Y256: {
          question: 'Are you importing mangosteens?',
          errorText: 'Select if you are importing mangosteens',
        },
        Y067: {
          question: 'Are you importing machinery that could be contaminated with plant material?',
          errorText: 'Select if you are importing machinery that could be contaminated with plant material',
          hintText: 'You will be exempt from providing a phytosanitary certificate if you can prove the goods have been thoroughly cleaned and inspected.',
        },
        Y501: {
          question: 'Are you importing trees over 3 metres in height?',
          errorText: 'Select if you are importing trees over 3 metres in height',
        },
        options: [
          {
            label: 'Yes',
          },
          {
            label: 'No',
          },
          {
            label: 'I\'m not sure',
          },
        ],
      },
      [MeasureType.CITES]: {
        question: 'Are the goods made from protected or endangered species?',
        errorText: 'Select if the goods are made from protected or endangered species',
        options: [
          {
            label: 'Yes',
          },
          {
            label: 'No',
          },
          {
            label: 'I\'m not sure',
          },
        ],
      },
      [MeasureType.ORGANICS]: {
        question: 'Are the goods organic?',
        errorText: 'Select if the goods are organic',
        options: [
          {
            label: 'Yes',
          },
          {
            label: 'No',
          },
          {
            label: 'I\'m not sure',
          },
        ],
      },
      [MeasureType.IAS]: {
        question: 'Are you importing non-native plants or animals listed as alien invasive species?',
        errorText: 'Select if you are importing non-native plants or animals listed as alien invasive species',
        options: [
          {
            label: 'Yes',
          },
          {
            label: 'No',
          },
          {
            label: 'I\'m not sure',
          },
        ],
      },
    },
    exportCommoditySearch: {
      question: 'What is the name or the commodity code of the goods?',
      error: 'Enter the name of the goods or a commodity code',
      label: 'Search for the goods by name or enter the export commodity code:',
      warning: 'It is your responsibility to ensure the commodity codes entered at the border are correct. Declaring an inaccurate commodity code at the border may result in penalties.',
      summaryText: 'What is a commodity code for exports?',
      summaryDetails: '<p>Commodity codes are numbers that classify the goods.</p>'
          + '<p>You must use the right commodity code to:'
          + '<ul class="govuk-list govuk-list--bullet">'
          + '<li>complete export declarations</li>'
          + '<li>check licences, certificates and any other restrictions that apply</li>'
          + '</ul>'
          + '<p>If you cannot find the right commodity code, you can <a href="https://www.gov.uk/guidance/finding-commodity-codes-for-imports-or-exports"  target="_blank" rel="noopener noreferrer" class="govuk-link">ask HMRC for advice (opens in new tab)</a>.',
    },
    exportDeclarations: {
      question: 'Who will submit the export declarations?',
      error: 'Select who will submit the declaration',
      hint: '<p class="govuk-hint">Declarations are needed for goods to cross the border. Inaccurate declarations can result in penalties or goods being delayed or destroyed.</p>'
        + '<p class="govuk-hint">You may need to pay for specialist software to complete declarations or you can get someone like a freight forwarder to submit them for you.</p>',
      yes: 'I will submit all or some of the declarations',
      no: 'Someone acting on my behalf will do this for me',
      notSure: 'I’m not sure',
    },
    taskList: {
      viewAllAnswers: 'View all your answers',
      import: {
        noMeasures: 'There are no import measures for this commodity on this date.',
      },
      export: {
        title: (destinationCountryName: string): string => `Exporting goods to ${destinationCountryName}: what you need to do`,
        noMeasures: 'There are no export measures for this commodity on this date.',
      },
      calculateTaxAandDutyHeading: 'Calculate tax and duty',
      checkHowMuchVatImportDutyAndExciseToPay: 'Check how much VAT, Import duty and Excise duty to pay',
      checkHowMuchVatTopay: 'Check how much VAT to pay',
      checkHowMuchImportDutyToPay: 'Check how much Import duty to pay',
      checkHowMuchExciseDutyToPay: 'Check how much Excise duty to pay',
      checkHowMuchVatAndImportDutyToPay: 'Check how much VAT and Import duty to pay',
      checkHowMuchVatAndExciseDutyToPay: 'Check how much VAT and Excise duty to pay',
      checkHowMuchImportDutyAndExciseDutyToPay: 'Check how much Import duty and Excise duty to pay',
      beforeTheGoodsAreSoldHeading: 'Before the goods are sold',
      checkWhatRestrictionsApplyToTheGoodsSubheading: 'Check what restrictions apply to the goods',
      checkWhatLicencesCertificatesAndOtherRestrictionsApplyToTheGoodsLink: 'Check what licences, certificates and other restrictions apply to the goods',
      signUpToServicesSubheading: 'Sign up to services',
      checkWhatServicesYouNeedToRegisterWithLink: 'Check which services you need to register with',
      preparingToClearOriginBorderHeading: 'Before the goods arrive at the UK border',
      prepareCustomsDeclarationsOriginSubheading: 'Prepare documents and declarations for the UK',
      checkWhatInformationAndDocumentsYouMayNeedLink: 'Check what information and documents you need',
      preparingToClearDestinationBorderHeading: (destinationCountryName: string): string => `Find out about getting the goods through ${destinationCountryName}’s customs border`,
      preparingToClearDestinationBorderParagraph: 'You will be taken to another government service where the commodity code for the goods may be different.',
      checkHowToClearGoodsIntoDestinationLink: (destinationCountryName: string): string => `Check how to get goods into ${destinationCountryName} (opens in new tab)`,
      statusTags: {
        viewed: 'Viewed',
        toView: 'To view',
        cannotViewYet: 'Cannot view yet',
        notRequired: 'Not required',
      },
    },
    exportCountryDestination: {
      questionExporting: 'Which country are the goods being sent to?',
      error: 'Enter which country or territory you\'re exporting the goods to',
    },
    exportCheckLicencesAndRestrictions: {
      rulesThatApplyToYourGoods: {
        followTheRules: 'Follow the rules to find out:',
        followTheRulesList1: 'licences that you need to move the goods',
        followTheRulesList2: 'certificates that you must provide',
        followTheRulesList3: 'sanctions that make it illegal to trade with other countries',
        insetText: '<p>If you do not have the right documents or licences, you will not be able to export your goods.</p>'
        + '<p class="govuk-!-display-none-print">Make sure you <a href="https://www.gov.uk/guidance/finding-commodity-codes-for-imports-or-exports" target="_blank" rel="noopener noreferrer" class="govuk-link">use the right commodity code and classify your goods correctly (opens in new tab)</a>.</p>',
        exemptionsH3: 'Exemptions: when rules are different or do not apply',
        exemptionsP1: 'Sometimes the rules are different or do not apply to specific goods or circumstances. The exemptions that appear after the rules tell you:',
        exemptionsList1: 'when the rules do not apply to your goods',
        exemptionsList2: 'any conditions you need to meet or evidence you need to show to prove the goods are exempt',
        detailsHeading: 'Document codes',
        detailsContent: '<p>The codes next to the rules or exemptions are the document codes that apply to your goods. You will need these document codes to complete the declaration.</p>',
      },
    },
    checkYourAnswers: {
      title: 'Check your answers',
      warning: 'The guidance you will be shown is based solely on the answers you provide. It is your responsibility to ensure all information is accurate. Providing inaccurate information may lead to delays and penalties at the customs border.',
    },
    exportOriginCountry: {
      question: 'Where are the goods departing from?',
      error: 'Select where the goods are departing from',
      warning: '<p class="govuk-!-font-weight-bold">You will need to state both the country of departure and the country of origin (where the goods are wholly or mostly manufactured, grown or modified) in the customs declaration.</p>'
        + '<p class="govuk-!-font-weight-bold">If the country of origin is different to the country of departure when you declare the goods at the customs border, the regulations may differ from the guidance on this service.'
        + ' <a href="https://www.gov.uk/guidance/sending-goods-to-an-overseas-customer-using-rules-of-origin" target="_blank" rel="noopener noreferrer" class="govuk-link">Check if the goods meet the rules of origin (opens in new tab)</a>.</p>',
      rules: 'different rules apply to goods sent to the EU from Northern Ireland'
    },
    checkWhatServicesYouNeedToRegister: {
      hint: 'To export goods out of the UK, you need to:',
      guidanceLinks: [
        {
          text: 'get an EORI number (opens in new tab)',
          url: 'http://www.gov.uk/eori',
        }, {
          text: 'check if you should register for VAT (opens in new tab)',
          url: 'https://www.gov.uk/vat-registration/when-to-register?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5',
        },
      ],
    },
    exportGoodsArrivalDate: {
      question: 'When will the goods arrive at the UK border?',
      p1: 'Enter a date that is within the next 12 months. If you enter an approximate date you must return to this service and enter the exact date because regulations which affect the goods can change.',
      hint: 'For example, 27 3 2023',
      errorInvalidDate:
        'Date must be a real date',
      errorDateInThePast: 'Date must be today or in the future',
      errorDateWithinYear: (datePlusOneYear: string): string => `Date must be before ${datePlusOneYear}`,
      errorMissingDate: 'Enter the date that the goods arrive at the UK border',
      errorMissingYear: 'The date that the goods arrive at the UK border must include a year',
      errorMissingMonth: 'The date that the goods arrive at the UK border must include a month',
      errorMissingDay: 'The date that the goods arrive at the UK border must include a day',
      errorInvalidDay: 'The date that the goods arrive at the UK border must be a real day',
      errorInvalidMonth: 'The date that the goods arrive at the UK border must be a real month',
      errorInvalidYear: 'The date that the goods arrive at the UK border must be a real year',
      errorDayNotNumber: 'Enter a day using numbers only',
      errorMonthNotNumber: 'Enter a month using numbers only',
      errorYearNotNumber: 'Enter a year using numbers only',
      errorMissingDayMonth: 'The date that the goods arrive at the UK border must include a day and month',
      errorMissingDayYear: 'The date that the goods arrive at the UK border must include a day and year',
      errorMissingMonthYear: 'The date that the goods arrive at the UK border must include a month and year',
    },
    movingGoodsFromNorthernIrelandToAnEUCountry: {
      title: 'Moving goods from Northern Ireland to an EU country',
      caption: 'Make sure you know the trading rules on doing business in Northern Ireland.',
      guidanceLinks: [
        {
          text: 'Learn more about moving goods into, out of, or through Northern Ireland (opens in new tab)',
          url: 'https://www.gov.uk/guidance/trading-and-moving-goods-in-and-out-of-northern-ireland',
        },
      ],
    },
    exportUserTypeTrader: {
      question: 'What are you responsible for?',
      goodsExportedToBeSold: 'I’m selling or exporting the goods',
      actingOnBehalfOfSeller: 'I’m acting on behalf of the seller or exporter (for example, a customs agent or freight forwarder)',
      neitherApply: 'Neither of the above apply',
      error: 'Select what are you responsible for',
    },
    exportGoodsIntent: {
      question: 'Why are the goods being sent from the UK?',
      error: 'Select what you are doing with the goods',
      hint: 'Select only one',
      goodsExportedToBeSoldForBusiness: 'The goods are being exported to be sold, processed or used by another business',
      goodsExportedTemporarilyForBusiness: 'The goods are being taken out of the UK by a business temporarily – for example, to exhibit at a trade fair',
      goodsSoldInLuggageForBusiness: 'The goods are being sold by a business, carried in luggage or by private vehicle, and are less than £1,500 in value or weigh less than 1,500kg',
      goodsPostedForPersonal: 'The goods are being sent through the post for personal use',
      dividerHeadingBusiness: '<h2 class=\'govuk-heading-s govuk-!-margin-top-6\'>For business use</h2>',
      dividerHeadingPersonal: '<h2 class=\'govuk-heading-s govuk-!-margin-top-4\'>For personal use</h2>',
    },
    exportProhibitionsAndRestrictions: {
      title: (destinationCountry: string): string => `Exporting goods to ${destinationCountry}: what you need to do`,
      prohibitionsAndRestrictions: 'Prohibitions and restrictions',
      p1: 'Export controls apply  to certain goods. You may need an export licence to send these goods from the UK.',
      link: 'Learn more about prohibitions and restrictions (opens in new tab).',
    },
    checkInformationAndDocuments: {
      caption: 'Prepare UK documents and declarations',
      commercialDocuments: 'Commercial documents',
      commercialDocumentsP1: 'You must provide the right paperwork to present at the UK customs border and <a href="https://www.gov.uk/guidance/archiving-your-trade-documents" target="_blank" rel="noopener noreferrer" class="govuk-link">keep a record of any documents (opens in new tab)</a>.',
      commercialDocumentsP2: 'Documents and information you’ll need to give to the buyer, carrier or business acting on your behalf include:',
      commercialDocumentsL1: 'a commercial invoice describing the content of the goods and demand for payment',
      commercialDocumentsL2: 'a packing list providing information about the goods such as the actual weight,  how they are packed and the carton numbers',
      commercialDocumentsL3: 'proof of origin for any goods exported to a country with a UK trade agreement and which attract a reduced rate of Customs Duty',
      commercialDocumentsP3: 'You must keep records of all procedures such as warehousing to make sure you <a href="https://www.gov.uk/guidance/vat-exports-dispatches-and-supplying-goods-abroad" target="_blank" rel="noopener noreferrer" class="govuk-link">pay the right amount of VAT (opens in new tab)</a>.',
      shippingDocuments: 'Shipping documents',
      shippingDocumentsP1: 'The carrier or business acting on your behalf must also have the right transport documents such as:',
      shippingDocumentsL1: 'a bill of lading for goods sent by sea',
      shippingDocumentsL2: 'an air waybill for goods sent by air',
    },
    checkDeclarations: {
      common: {
        title: 'Check which declarations you need to submit',
        healthWarning: 'It is the legal responsibility of the transport operator to make sure the UK customs authority is provided with pre-departure safety and security information. ',
        submitDeclarationP1: 'To make declarations yourself, your business must be established in the UK. If you are not established in the UK you must get someone to make the declarations for you.',
        submitDeclarationP2: 'To make declarations yourself, you will need to <a href="https://www.gov.uk/guidance/get-access-to-the-customs-declaration-service" target="_blank" rel="noopener noreferrer" class="govuk-link">subscribe to the Customs Declaration Service (opens in new tab)</a> or <a href="https://www.gov.uk/guidance/apply-to-access-customs-handling-of-import-and-export-freight-c1800" target="_blank" rel="noopener noreferrer" class="govuk-link">get access to the Customs Handling of Import and Export Freight (CHIEF) system (opens in new tab)</a>.',
        insetText: 'If goods are travelling through Great Britain (England, Scotland and Wales) or Northern Ireland to other countries, <a href="https://www.gov.uk/guidance/check-if-you-can-use-transit-to-move-goods-to-the-eu-and-common-transit-countries" target="_blank" rel="noopener noreferrer" class="govuk-link">check the common transit rules (opens in new tab)</a> to find out if you can move goods more quickly without the need to do multiple declarations.',
        otherDeclarations: 'Other declarations you may need to submit',
      },
      export: {
        declarations: 'Export declarations',
        declarationsP1: 'You must declare the goods before they can be sent from the UK. Declaring goods can be complicated, so you may want to <a href="https://www.gov.uk/guidance/appoint-someone-to-deal-with-customs-on-your-behalf" target="_blank" rel="noopener noreferrer" class="govuk-link">get someone to deal with customs for you (opens in new tab)</a>.',
        makingDeclaration: 'Making an export declaration',
        makingDeclarationP1: 'You will need to <a href="https://www.gov.uk/guidance/making-a-full-export-declaration" target="_blank" rel="noopener noreferrer" class="govuk-link">make a full export declaration (opens in new tab)</a>, or, if you’ve applied and got permission to do so, you can <a href="https://www.gov.uk/guidance/using-simplified-declarations-for-exports" target="_blank" rel="noopener noreferrer" class="govuk-link">make a simplified declaration for exports (opens in new tab)</a>.',
        submitDeclaration: 'How to submit an export declaration',
        otherDeclarationsP1: 'You may need to make an exit summary declaration depending on where the goods are going to. Check if you need to <a href="https://www.gov.uk/guidance/find-out-when-to-make-an-exit-summary-declaration" target="_blank" rel="noopener noreferrer" class="govuk-link">make an exit summary declaration (opens in new tab)</a>.',
      },
      import: {
        declarations: 'Import declarations',
        declarationsP1: 'Goods sent to the UK from abroad may need to be declared. Declaring goods can be complicated so you may want to <a href="https://www.gov.uk/guidance/check-what-you-need-to-consider-before-getting-someone-to-deal-with-customs-for-you" target="_blank" rel="noopener noreferrer" class="govuk-link">get someone to deal with customs for you (opens in new tab)</a>.',
        makingDeclaration: 'Making an import declaration',
        makingDeclarationP1: 'You will need to <a href="https://www.gov.uk/guidance/making-a-full-import-declaration" target="_blank" rel="noopener noreferrer" class="govuk-link">make a full import declaration (opens in new tab)</a> or if you’ve applied and got permission to do so, you can <a href="https://www.gov.uk/guidance/using-simplified-declarations-for-exports" target="_blank" rel="noopener noreferrer" class="govuk-link">make a simplified declaration for imports (opens in new tab)</a>.',
        submitDeclaration: 'How to submit an import declaration',
        otherDeclarationsP1: 'You may need to make an entry summary declaration depending on where the goods are sent from. Check if you need to <a href="https://www.gov.uk/guidance/check-if-you-need-to-make-an-entry-summary-declaration" target="_blank" rel="noopener noreferrer" class="govuk-link">make an entry summary declaration (opens in new tab)</a>.',
      },
    },
  },
  common: {
    additionalCode: {
      questionExport: 'Describe the goods you are exporting in more detail',
      questionImport: 'Describe the goods you are importing in more detail',
      hint: 'The commodity you have selected can be further classified by adding 4-digits to the end. Select one option.',
      error: 'Select a further classification for the commodity',
    },
    measures: {
      printDisclaimer:
        'Information is likely subject to change over time. Return to this service for the latest information.',
      summaryImport: 'Importing goods into the UK: what you need to do',
      and: 'and',
      enterBox44: (measureOptionCertificateCode: string): string => `Enter <strong>${measureOptionCertificateCode}</strong> in Box 44 of your import declaration.`,
      rules: 'Rules that apply to your goods',
      exceptions: 'When rules are different or do not apply',
      followRules: 'Follow the rules that apply to import your goods.',
      followRulesExport: 'Follow the rules that apply to export your goods.',
      multiCertificatePrefix: 'Provide both of these documents:',
      showLabel: 'Show full classification',
      hideLabel: 'Hide full classification',
      noMeasuresOrRestrictions: (country: string): string => `<p class="govuk-heading-s">There are no measures or restrictions for importing this commodity into the UK from ${country}.</p><p class="govuk-body">Please check back later, as the rules may change.</p>`,
      condition: 'You must meet this condition',
      multipleConditions: (amount: string): string => `You must meet one of these ${amount} conditions`,
      code: 'Code',
      calculateTaxAndDuties: 'Calculate tax and duties',
      waiverApplies: (certificateCode: string): string => `${certificateCode} waiver applies`,
      waiverAlsoApplies: (certificateCode: string): string => `${certificateCode} waiver also applies`,
      calculateNow: 'Calculate now',
      commoditySummaryDetailsLink: 'Import details',
      importDeclarationsNotRequired: 'No import declaration is needed for these goods',
      calculateImportVat: 'Calculate the Import VAT',
      noCustomsDutyToPay: 'There is no Customs Duty to pay',
      noImportVatToPay: 'There is no Import VAT to pay',
      '999L': {
        header: 'Customs Declaration Service (CDS) Licence Waiver',
        body: 'The use of 999L allows a CDS waiver code to be declared for prohibited and restricted goods, allowing declarants to confirm that the goods are not subject to specific licencing measures. You must enter ‘CDS Waiver’ in the additional documentation field for this commodity item.\n\nThis waiver cannot be used for goods that are imported/exported or moved to/from Northern Ireland.',
      },
      readyToImport: 'When the goods are ready to import',
      checkWhatInformation: 'Check what information and documents you may need',
      entrySummaryDeclaration: 'Find out how to make an entry summary declaration (ENS)',
      makeAnimportDeclaration: 'Find out how to make an import declaration',
      subsidary: {
        'check-licences-certificates-and-other-restrictions': 'Check licences, certificates and other restrictions',
        'calculate-the-customs-duty-and-import-vat': 'Calculate the Customs Duty and Import VAT',
        'register-to-bring-goods-across-the-border': 'Check which services you need to register with',
        'check-what-information-and-documents-you-may-need': 'Check what information and documents you may need',
      },
      measureOptionSubtype: {
        PRICE_BASED: 'Price threshold applies',
        VOLUME_BASED: 'Volume threshold applies',
        UNIT_BASED: 'Unit threshold applies',
        WEIGHT_BASED: 'Weight threshold applies',
        PRICE_PER_UNIT_BASED: (unit: string): string => `Price / ${unit} threshold applies`,
      },
      thresholdConditionsApply: 'Threshold conditions apply:',
      /* eslint-disable */
      checkLicensesAndCertificates: {
        non_declaring_trader: (): string => `## Rules that apply to your goods

Follow the rules to find out:

- licences that you need to move the goods
- certificates that you must provide
- controls or restrictions on goods entering the country
- sanctions that make it illegal to trade with other countries

:::+
If you do not have the right documents or licences, you will not be able to import your goods.

Make sure you [use the right commodity code and classify your goods correctly](https://www.gov.uk/guidance/finding-commodity-codes-for-imports-or-exports).
:::

### Exemptions: when rules are different or do not apply

Sometimes the rules are different or do not apply to specific goods or circumstances. The exemptions that appear after the rules tell you:

- when the rules do not apply to your goods
- any conditions you need to meet or evidence you need to show to prove the goods are exempt`,
        declaring_trader: (showSdsContent?: string): string => `## Rules that apply to your goods

Follow the rules to find out:

- licences that you need to move the goods
- certificates that you must provide
- controls or restrictions on goods entering the country
- sanctions that make it illegal to trade with other countries

:::+
If you do not have the right documents or licences, you will not be able to import your goods.

Make sure you [use the right commodity code and classify your goods correctly](https://www.gov.uk/guidance/finding-commodity-codes-for-imports-or-exports).
:::

### Exemptions: when rules are different or do not apply

Sometimes the rules are different or do not apply to specific goods or circumstances. The exemptions that appear after the rules tell you:

- when the rules do not apply to your goods
- any conditions you need to meet or evidence you need to show to prove the goods are exempt

+++ Document codes
The codes next to the rules or exemptions are the document codes that apply to your goods. You will need these document codes to complete the import declaration.
${showSdsContent}
+++`,
        intermediary: (showSdsContent?: string): string => `## Rules that apply to the goods

Follow the rules to find out:

- licences that your importer needs to move the goods
- certificates that the seller must provide
- controls or restrictions on goods entering the country
- sanctions that make it illegal to trade with other countries

:::+
If you do not have the right documents or licences, you will not be able to import the goods.

Make sure you [use the right commodity code and classify the goods correctly](https://www.gov.uk/guidance/finding-commodity-codes-for-imports-or-exports).
:::

### Exemptions: when rules are different or do not apply

Sometimes the rules are different or do not apply to specific goods or circumstances. The exemptions that appear after the rules tell you:

- when the rules do not apply to your goods
- any conditions you need to meet or evidence you need to show to prove the goods are exempt

+++ Document codes
The codes next to the rules or exemptions are the document codes that apply to your goods. You will need these document codes to complete the import declaration.
${showSdsContent}
+++`,
      },
      /* eslint-enable */
      whichDocumentsAreNeeded: {
        non_declaring_trader: 'Make sure you know what information you need to supply and the accompanying documents required to bring your goods into the country.\n\n'
          + 'Missing or inaccurate documents can increase risks, lead to delays and extra costs, or prevent your goods from crossing the border.\n\n'
          + '[Find out which documents are needed for goods to travel](https://www.gov.uk/guidance/international-trade-paperwork-the-basics)\n\n'
          + '[Read about trade contracts and incoterms](https://www.great.gov.uk/advice/prepare-for-export-procedures-and-logistics/international-trade-contracts-and-incoterms/)',
        declaring_trader: 'Make sure you know what information you need to supply and the accompanying documents required to bring your goods into the country.\n\n'
          + 'Missing or inaccurate documents can increase risks, lead to delays and extra costs, or prevent your goods from crossing the border.\n\n'
          + '[Find out which documents are needed for goods to travel](https://www.gov.uk/guidance/international-trade-paperwork-the-basics)\n\n'
          + '[Read about trade contracts and incoterms](https://www.great.gov.uk/advice/prepare-for-export-procedures-and-logistics/international-trade-contracts-and-incoterms/)',
        intermediary: 'Make sure you know what information you and your importer need to supply and the accompanying documents required to bring the goods into the country.\n\n'
          + 'Missing or inaccurate documents can increase risks, lead to delays and extra costs, or prevent goods from crossing the border.\n\n'
          + '[Find out which documents are needed for goods to travel](https://www.gov.uk/guidance/international-trade-paperwork-the-basics)\n\n'
          + '[Read about trade contracts and incoterms](https://www.great.gov.uk/advice/prepare-for-export-procedures-and-logistics/international-trade-contracts-and-incoterms/)',
      },
      calculateCustomsDutyImportVat: {
        non_declaring_trader: '## Work out the duty, VAT and excise you need to pay\n'
          + 'How much VAT and Customs Duty you pay depends on the [value of the goods you’re importing](https://www.gov.uk/guidance/how-to-value-your-imports-for-customs-duty-and-trade-statistics?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5)\n\n'
          + 'Calculate how much import duty, VAT and excise you need to pay.',
        declaring_trader: '## Work out the duty, VAT and excise you need to pay\n'
          + 'How much VAT and Customs Duty you pay depends on the [value of the goods you’re importing](https://www.gov.uk/guidance/how-to-value-your-imports-for-customs-duty-and-trade-statistics?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5)\n\n'
          + 'Calculate how much import duty, VAT and excise you need to pay.',
        intermediary: '## Work out the duty, VAT and excise you need to pay\n'
          + 'How much VAT and Customs Duty your importer pays depends on the [value of the goods you’re importing](https://www.gov.uk/guidance/how-to-value-your-imports-for-customs-duty-and-trade-statistics?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5)\n\n'
          + 'Calculate how much import duty, VAT and excise your importer needs to pay.',
      },
      registerToBringGoodsAcrossTheBorder: {
        non_declaring_trader: 'To bring goods into the UK, you need to:\n\n'
          + '- [get an EORI number](http://www.gov.uk/eori)\n'
          + '- [check if you should register for VAT](https://www.gov.uk/vat-registration/when-to-register?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5)',
        declaring_trader: 'To bring goods into the UK, you need to:\n\n'
          + '- [get an EORI number](http://www.gov.uk/eori)\n'
          + '- [check if you should register for VAT](https://www.gov.uk/vat-registration/when-to-register?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5)',
        intermediary: 'To bring goods into the UK, your importer needs to:\n\n'
          + '- [get an EORI number](http://www.gov.uk/eori)\n'
          + '- [check if they should register for VAT](https://www.gov.uk/vat-registration/when-to-register?step-by-step-nav=849f71d1-f290-4a8e-9458-add936efefc5)',
      },
    },
    header: {
      serviceName: 'Check how to import or export goods',
      beta: 'BETA',
      betaBanner: (feedbackLink: string, referrerUrl: string): string => `This is a new service – your <a class="govuk-link" href="${feedbackLink}&referrerUrl=${referrerUrl}">feedback</a> will help us to improve it.`,
    },
    cookies: {
      header: "Cookies on 'Check how to import or export goods'",
      p1:
        'We use some essential cookies to make our services work.\n'
        + '\n'
        + 'We would like to set additional cookies so we can remember your settings, understand how people use our'
        + ' services and make improvements.',
      acceptAdditionalCookies: 'Accept additional cookies',
      rejectAdditionalCookies: 'Reject additional cookies',
      viewCookies: 'View Cookies',
      setCookiePreferences: 'You’ve set your cookie preferences.',
      goBack: 'Go back to the page you were looking at.',
      acceptedCookies: 'You have accepted additional cookies.',
      rejectedCookies: 'You have rejected additional cookies.',
      changeCookies: (cookiesPage: string): string => `<a href="${cookiesPage}">You can change your cookie settings at any time</a>.`,
      hideMessage: 'Hide this message',
    },
    errors: {
      error: 'Error',
      problem: 'There is a problem',
      defaultMessage: 'Try again later.',
      404: {
        title: 'Page not found',
        message: `<p>If you typed the web address, check it is correct.</p>
        <p>If you pasted the web address, check you copied the entire address.</p>`,
      },
      500: {
        title: 'Sorry, there is a problem with the service',
        message: `<p>Try again later.</p>
          <p>We have not saved your answers. When the service is available, you will have to start again.</p>`,
      },
    },
    buttons: {
      continue: 'Continue',
      back: 'Back',
      home: 'Home',
      cancel: 'Cancel',
      backToResults: 'Back to results summary',
      print: 'Print this page',
    },
    footer: {
      cookies: 'Cookies',
      accessibilityStatement: 'Accessibility statement',
      privacyNotice: 'Privacy policy',
      termsAndConditions: 'Terms and conditions',
      help: 'Help using GOV.UK',
      contact: 'Contact',
      welshLanguageServices: 'Rhestr o Wasanaethau Cymraeg',
      itSupport: 'Help',
      contentLicence: 'All content is available under the <a class="govuk-footer__link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" target="_blank">Open Government Licence v3.0</a>, except where otherwise stated',
      copyright: '© Crown copyright',
      supportLinks: 'Support links'
    },
    accessibility: {
      opensNewTab: '(opens in new tab)',
      warning: 'Warning',
      followingLinksOpensInNewTab: 'The following links open in a new tab.',
      defaultCountrySelectLabel: 'Select a country',
      skipLink: 'Skip to main content',
    },
    notificationBanner: {
      success: 'Success',
    },
    feedback: {
      getHelp: 'Help and support',
      general: 'General enquiries about importing or exporting',
      technical: 'Enquiries about this service or report a technical issue',
    },
    labels: {
      date: {
        day: 'Day',
        month: 'Month',
        year: 'Year',
      },
    },
    session: {
      expire: 'Your session has timed out',
      message: 'Your session has timed out due to inactivity.<br /><br /><a href="/" class="govuk-button" role="button">Start again</a>',
    },
    tradeDetails: {
      summaryLinkText: {
        import: 'Import summary',
        export: 'Export summary',
      },
      change: 'Change',
      commodityCode: 'Commodity code',
      exportDate: 'Export date',
      countryOfDeparture: 'Country of departure',
      goodsGoingInto: 'Goods going into',
      classification: 'Classification',
      goodsComingInto: 'Goods coming into',
      countryOfOrigin: 'Country of origin',
      importDate: 'Import date',
    },
    numbers: {
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
      6: 'six',
      7: 'seven',
      8: 'eight',
      9: 'nine',
      10: 'ten',
      11: 'eleven',
      12: 'twelve',
      13: 'thirteen',
      14: 'fourteen',
      15: 'fifteen',
      16: 'sixteen',
      17: 'seventeen',
      18: 'eighteen',
      19: 'nineteen',
      20: 'twenty',
    },
    countries: {
      GB: 'Great Britain (England, Scotland and Wales)',
      XI: 'Northern Ireland',
      AD: 'Andorra',
      AE: 'United Arab Emirates',
      AF: 'Afghanistan',
      AG: 'Antigua and Barbuda',
      AI: 'Anguilla',
      AL: 'Albania',
      AM: 'Armenia',
      AO: 'Angola',
      AQ: 'Antarctica',
      AR: 'Argentina',
      AS: 'American Samoa',
      AT: 'Austria',
      AU: 'Australia',
      AW: 'Aruba',
      AZ: 'Azerbaijan',
      BA: 'Bosnia and Herzegovina',
      BB: 'Barbados',
      BD: 'Bangladesh',
      BE: 'Belgium',
      BF: 'Burkina Faso',
      BG: 'Bulgaria',
      BH: 'Bahrain',
      BI: 'Burundi',
      BJ: 'Benin',
      BL: 'Saint Barthélemy',
      BM: 'Bermuda',
      BN: 'Brunei',
      BO: 'Bolivia',
      BQ: 'Bonaire, Sint Eustatius and Saba',
      BR: 'Brazil',
      BS: 'The Bahamas',
      BT: 'Bhutan',
      BV: 'Bouvet Island',
      BW: 'Botswana',
      BY: 'Belarus',
      BZ: 'Belize',
      CA: 'Canada',
      CC: 'Cocos (Keeling) Islands',
      CD: 'Congo (Democratic Republic)',
      CF: 'Central African Republic',
      CG: 'Congo',
      CH: 'Switzerland',
      CI: 'Ivory Coast',
      CK: 'Cook Islands',
      CL: 'Chile',
      CM: 'Cameroon',
      CN: 'China',
      CO: 'Colombia',
      CR: 'Costa Rica',
      CU: 'Cuba',
      CV: 'Cabo Verde',
      CW: 'Curaçao',
      CX: 'Christmas Island',
      CY: 'Cyprus',
      CZ: 'Czechia',
      DE: 'Germany',
      DJ: 'Djibouti',
      DK: 'Denmark',
      DM: 'Dominica',
      DO: 'Dominican Republic',
      DZ: 'Algeria',
      EC: 'Ecuador',
      EE: 'Estonia',
      EG: 'Egypt',
      EH: 'Western Sahara',
      ER: 'Eritrea',
      ES: 'Spain',
      ET: 'Ethiopia',
      FI: 'Finland',
      FJ: 'Fiji',
      FK: 'Falkland Islands',
      FM: 'Micronesia',
      FO: 'Faroe Islands',
      FR: 'France',
      GA: 'Gabon',
      GD: 'Grenada',
      GE: 'Georgia',
      GH: 'Ghana',
      GI: 'Gibraltar',
      GL: 'Greenland',
      GM: 'The Gambia',
      GN: 'Guinea',
      GQ: 'Equatorial Guinea',
      GR: 'Greece',
      GS: 'South Georgia and South Sandwich Islands',
      GT: 'Guatemala',
      GU: 'Guam',
      GW: 'Guinea-Bissau',
      GY: 'Guyana',
      HK: 'Hong Kong',
      HM: 'Heard Island and McDonald Islands',
      HN: 'Honduras',
      HR: 'Croatia',
      HT: 'Haiti',
      HU: 'Hungary',
      ID: 'Indonesia',
      IE: 'Ireland',
      IL: 'Israel',
      IN: 'India',
      IO: 'British Indian Ocean Territory',
      IQ: 'Iraq',
      IR: 'Iran',
      IS: 'Iceland',
      IT: 'Italy',
      JM: 'Jamaica',
      JO: 'Jordan',
      JP: 'Japan',
      KE: 'Kenya',
      KG: 'Kyrgyzstan',
      KH: 'Cambodia',
      KI: 'Kiribati',
      KM: 'Comoros',
      KN: 'St Kitts and Nevis',
      KP: 'North Korea',
      KR: 'South Korea',
      KW: 'Kuwait',
      KY: 'Cayman Islands',
      KZ: 'Kazakhstan',
      LA: 'Laos',
      LB: 'Lebanon',
      LC: 'St Lucia',
      LI: 'Liechtenstein',
      LK: 'Sri Lanka',
      LR: 'Liberia',
      LS: 'Lesotho',
      LT: 'Lithuania',
      LU: 'Luxembourg',
      LV: 'Latvia',
      LY: 'Libya',
      MA: 'Morocco',
      MD: 'Moldova',
      ME: 'Montenegro',
      MG: 'Madagascar',
      MH: 'Marshall Islands',
      MK: 'North Macedonia',
      ML: 'Mali',
      MM: 'Myanmar (Burma)',
      MN: 'Mongolia',
      MO: 'Macao',
      MP: 'Northern Mariana Islands',
      MR: 'Mauritania',
      MS: 'Montserrat',
      MT: 'Malta',
      MU: 'Mauritius',
      MV: 'Maldives',
      MW: 'Malawi',
      MX: 'Mexico',
      MY: 'Malaysia',
      MZ: 'Mozambique',
      NA: 'Namibia',
      NC: 'New Caledonia',
      NE: 'Niger',
      NF: 'Norfolk Island',
      NG: 'Nigeria',
      NI: 'Nicaragua',
      NL: 'Netherlands',
      NO: 'Norway',
      NP: 'Nepal',
      NR: 'Nauru',
      NU: 'Niue',
      NZ: 'New Zealand',
      OM: 'Oman',
      PA: 'Panama',
      PE: 'Peru',
      PF: 'French Polynesia',
      PG: 'Papua New Guinea',
      PH: 'Philippines',
      PK: 'Pakistan',
      PL: 'Poland',
      PM: 'Saint Pierre and Miquelon',
      PN: 'Pitcairn, Henderson, Ducie and Oeno Islands',
      PS: 'Occupied Palestinian Territories',
      PT: 'Portugal',
      PW: 'Palau',
      PY: 'Paraguay',
      QA: 'Qatar',
      RO: 'Romania',
      RU: 'Russia',
      RW: 'Rwanda',
      SA: 'Saudi Arabia',
      SB: 'Solomon Islands',
      SC: 'Seychelles',
      SD: 'Sudan',
      SE: 'Sweden',
      SG: 'Singapore',
      SH: 'Saint Helena, Ascension and Tristan da Cunha',
      SI: 'Slovenia',
      SK: 'Slovakia',
      SL: 'Sierra Leone',
      SM: 'San Marino',
      SN: 'Senegal',
      SO: 'Somalia',
      SR: 'Suriname',
      SS: 'South Sudan',
      ST: 'Sao Tome and Principe',
      SV: 'El Salvador',
      SX: 'Sint Maarten (Dutch part)',
      SY: 'Syria',
      SZ: 'Eswatini',
      TC: 'Turks and Caicos Islands',
      TD: 'Chad',
      TF: 'French Southern Territories',
      TG: 'Togo',
      TH: 'Thailand',
      TJ: 'Tajikistan',
      TK: 'Tokelau',
      TL: 'East Timor',
      TM: 'Turkmenistan',
      TN: 'Tunisia',
      TO: 'Tonga',
      TR: 'Turkey',
      TT: 'Trinidad and Tobago',
      TV: 'Tuvalu',
      TW: 'Taiwan',
      TZ: 'Tanzania',
      UA: 'Ukraine',
      UG: 'Uganda',
      UM: 'United States Minor Outlying Islands',
      US: 'United States',
      UY: 'Uruguay',
      UZ: 'Uzbekistan',
      VA: 'Vatican City',
      VC: 'St Vincent',
      VE: 'Venezuela',
      VG: 'British Virgin Islands',
      VI: 'United States Virgin Islands',
      VN: 'Vietnam',
      VU: 'Vanuatu',
      WF: 'Wallis and Futuna',
      WS: 'Samoa',
      XC: 'Ceuta',
      XK: 'Kosovo',
      XL: 'Melilla',
      XS: 'Serbia',
      YE: 'Yemen',
      ZA: 'South Africa',
      ZB: 'Belgian Continental Shelf',
      ZD: 'Danish Continental Shelf',
      ZE: 'Irish Continental Shelf',
      ZF: 'French Continental Shelf',
      ZG: 'German Continental Shelf',
      ZH: 'Netherlands Continental Shelf',
      ZM: 'Zambia',
      ZN: 'Norwegian Continental Shelf',
      ZU: 'United Kingdom Continental Shelf',
      ZW: 'Zimbabwe',
    },
  },
};

export default Translation;
