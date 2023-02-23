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

export const tradeRowDataOutputDeclarant = [{
  superHeader: 'Before you start importing',
  content: [
    {
      header: 'Prepare your business for importing',
      headerLinkText: 'Link text prepare your business for importing',
      signpostingStepsAsHtml: '<p class="govuk-body">declaringTraderContent</p>\n',
      externalLink: null,
      relatedTo: 'DOCUMENTATION',
      complexMeasuresAsHtml: '\n'
          + '    <p class="govuk-body">measure description</p>\n'
          + '\n'
          + '    \n'
          + '     \n'
          + '      <p class="govuk-body">Follow the rules that apply to import your goods.</p>\n'
          + '      \n'
          + '        <h3 class="govuk-heading-m">Rules that apply to your goods</h3>\n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">N851</h4>\n'
          + '  <p class="govuk-body">CERTIFICATE description1 <a href="https://www.somelink.com" target="_blank" rel="noopener noreferrer">https://www.somelink.com (opens in new tab)</a></p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">N852</h4>\n'
          + '  <p class="govuk-body">CERTIFICATE description2</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">N852</h4>\n'
          + '  <p class="govuk-body">MULTI_CERTIFICATE prefix</p><p class="govuk-body">MULTI_CERTIFICATE description</p>\n'
          + '\n'
          + '    \n'
          + '        <h3 class="govuk-heading-m">When rules are different or do not apply</h3>\n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">N852</h4>\n'
          + '  <p class="govuk-body">EXCEPTION description</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">N852</h4>\n'
          + '  <p class="govuk-body">THRESHOLD description</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">Y058</h4>\n'
          + '  <p class="govuk-body">THRESHOLD_CERTIFICATE description</p>\n'
          + '\n'
          + '    \n'
          + '  \n'
          + ' ',
    }],
}];

export const tradeRowDataOutputDeclarantNoMeasureOptions = [{
  superHeader: 'Before you start importing',
  content: [{
    header: 'Prepare your business for importing',
    headerLinkText: 'Link text prepare your business for importing',
    externalLink: null,
    relatedTo: 'DOCUMENTATION',
    signpostingStepsAsHtml: '<p class="govuk-body">declaringTraderContent</p>\n',
    complexMeasuresAsHtml: '\n    <p class="govuk-body">measure description</p>\n\n    \n     \n ',
  }],
}];

export const tradeRowDataOutputNonDeclarantNoMeasureOptions = [{
  superHeader: 'Before you start importing',
  content: [{
    header: 'Prepare your business for importing',
    headerLinkText: 'Link text prepare your business for importing',
    externalLink: null,
    relatedTo: 'DOCUMENTATION',
    signpostingStepsAsHtml: '<p class="govuk-body">nonDeclaringTraderContent</p>\n',
    complexMeasuresAsHtml: '\n    <p class="govuk-body">measure description</p>\n\n    \n     \n ',
  }],
}];

export const tradeRowDataOutputAgentNoMeasureOptions = [{
  superHeader: 'Before you start importing',
  content: [{
    header: 'Prepare your business for importing',
    headerLinkText: 'Link text prepare your business for importing',
    externalLink: null,
    relatedTo: 'DOCUMENTATION',
    signpostingStepsAsHtml: '<p class="govuk-body">agentContent</p>\n',
    complexMeasuresAsHtml: '\n    <p class="govuk-body">measure description</p>\n\n    \n     \n ',
  }],
}];

export const tradeRowDataOutputNonDeclarant = [{
  superHeader: 'Before you start importing',
  content: [{
    header: 'Prepare your business for importing',
    headerLinkText: 'Link text prepare your business for importing',
    externalLink: null,
    relatedTo: 'DOCUMENTATION',
    signpostingStepsAsHtml: '<p class="govuk-body">nonDeclaringTraderContent</p>\n',
    complexMeasuresAsHtml: '\n'
          + '    <p class="govuk-body">measure description</p>\n'
          + '\n'
          + '    \n'
          + '     \n'
          + '      <p class="govuk-body">Follow the rules that apply to import your goods.</p>\n'
          + '      \n'
          + '        <h3 class="govuk-heading-m">Rules that apply to your goods</h3>\n'
          + '        \n'
          + '  <p class="govuk-body">CERTIFICATE description1 <a href="https://www.somelink.com" target="_blank" rel="noopener noreferrer">https://www.somelink.com (opens in new tab)</a></p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        \n'
          + '  <p class="govuk-body">CERTIFICATE description2</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        \n'
          + '  <p class="govuk-body">MULTI_CERTIFICATE prefix</p><p class="govuk-body">MULTI_CERTIFICATE description</p>\n'
          + '\n'
          + '    \n'
          + '        <h3 class="govuk-heading-m">When rules are different or do not apply</h3>\n'
          + '        \n'
          + '  <p class="govuk-body">EXCEPTION description</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        \n'
          + '  <p class="govuk-body">THRESHOLD description</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        \n'
          + '  <p class="govuk-body">THRESHOLD_CERTIFICATE description</p>\n'
          + '\n'
          + '    \n'
          + '  \n'
          + ' ',
  }],
}];

export const tradeRowDataOutputNonDeclarantWithOne999LMeasure = [{
  superHeader: 'Before you start importing',
  content: [{
    header: 'Prepare your business for importing',
    headerLinkText: 'Link text prepare your business for importing',
    externalLink: null,
    relatedTo: 'DOCUMENTATION',
    signpostingStepsAsHtml: '<p class="govuk-body">nonDeclaringTraderContent</p>\n',
    complexMeasuresAsHtml: '\n'
          + '    <p class="govuk-body">measure 1 description</p>\n'
          + '\n'
          + '    \n'
          + '     \n'
          + '      <p class="govuk-body">Follow the rules that apply to import your goods.</p>\n'
          + '      \n'
          + '        <h3 class="govuk-heading-m">Rules that apply to your goods</h3>\n'
          + '        \n'
          + '  <p class="govuk-body">Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        <h3 class="govuk-heading-m">When rules are different or do not apply</h3>\n'
          + '        \n'
          + '  <p class="govuk-body">Y900 EXCEPTION description</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        \n'
          + '  \n'
          + '    \n'
          + '  \n'
          + ' \n'
          + '    <p class="govuk-body">measure 2 description</p>\n'
          + '\n'
          + '    \n'
          + '     \n'
          + '      <p class="govuk-body">Follow the rules that apply to import your goods.</p>\n'
          + '      \n'
          + '        <h3 class="govuk-heading-m">Rules that apply to your goods</h3>\n'
          + '        \n'
          + '  <p class="govuk-body">Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        \n'
          + '  \n'
          + '    \n'
          + '  \n'
          + ' ',
  }],
}];

export const tradeRowDataOutputDeclaringTraderWithOne999LMeasure = [{
  superHeader: 'Before you start importing',
  content: [{
    header: 'Prepare your business for importing',
    headerLinkText: 'Link text prepare your business for importing',
    externalLink: null,
    relatedTo: 'DOCUMENTATION',
    signpostingStepsAsHtml: '<p class="govuk-body">declaringTraderContent</p>\n',
    complexMeasuresAsHtml: '\n'
          + '    <p class="govuk-body">measure 1 description</p>\n'
          + '\n'
          + '    \n'
          + '     \n'
          + '      <p class="govuk-body">Follow the rules that apply to import your goods.</p>\n'
          + '      \n'
          + '        <h3 class="govuk-heading-m">Rules that apply to your goods</h3>\n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">C082</h4>\n'
          + '  <p class="govuk-body">Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        <h3 class="govuk-heading-m">When rules are different or do not apply</h3>\n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">Y900</h4>\n'
          + '  <p class="govuk-body">Y900 EXCEPTION description</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s ">999L waiver also applies</h4>\n'
          + '  \n'
          + '    \n'
          + '  \n'
          + ' \n'
          + '    <p class="govuk-body">measure 2 description</p>\n'
          + '\n'
          + '    \n'
          + '     \n'
          + '      <p class="govuk-body">Follow the rules that apply to import your goods.</p>\n'
          + '      \n'
          + '        <h3 class="govuk-heading-m">Rules that apply to your goods</h3>\n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">C082</h4>\n'
          + '  <p class="govuk-body">Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        <h3 class="govuk-heading-m">When rules are different or do not apply</h3>\n'
          + '        <h4 class="govuk-heading-s ">999L waiver also applies</h4>\n'
          + '  \n'
          + '    \n'
          + '  \n'
          + ' ',
  }],
}];

export const tradeRowDataOutputAgent = [{
  superHeader: 'Before you start importing',
  content: [{
    header: 'Prepare your business for importing',
    headerLinkText: 'Link text prepare your business for importing',
    signpostingStepsAsHtml: '<p class="govuk-body">agentContent</p>\n',
    externalLink: null,
    relatedTo: 'DOCUMENTATION',
    complexMeasuresAsHtml: '\n'
          + '    <p class="govuk-body">measure description</p>\n'
          + '\n'
          + '    \n'
          + '     \n'
          + '      <p class="govuk-body">Follow the rules that apply to import your goods.</p>\n'
          + '      \n'
          + '        <h3 class="govuk-heading-m">Rules that apply to your goods</h3>\n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">N851</h4>\n'
          + '  <p class="govuk-body">CERTIFICATE description1 <a href="https://www.somelink.com" target="_blank" rel="noopener noreferrer">https://www.somelink.com (opens in new tab)</a></p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">N852</h4>\n'
          + '  <p class="govuk-body">CERTIFICATE description2</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">N852</h4>\n'
          + '  <p class="govuk-body">MULTI_CERTIFICATE prefix</p><p class="govuk-body">MULTI_CERTIFICATE description</p>\n'
          + '\n'
          + '    \n'
          + '        <h3 class="govuk-heading-m">When rules are different or do not apply</h3>\n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">N852</h4>\n'
          + '  <p class="govuk-body">EXCEPTION description</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">N852</h4>\n'
          + '  <p class="govuk-body">THRESHOLD description</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">Y058</h4>\n'
          + '  <p class="govuk-body">THRESHOLD_CERTIFICATE description</p>\n'
          + '\n'
          + '    \n'
          + '  \n'
          + ' ',
  }],
}];

export const tradeRowDataOutputDeclarantMultipleMeasureOptions = [{
  superHeader: 'Before you start importing',
  content: [
    {
      header: 'Prepare your business for importing',
      headerLinkText: 'Link text prepare your business for importing',
      signpostingStepsAsHtml: '<p class="govuk-body">declaringTraderContent</p>\n',
      externalLink: null,
      relatedTo: 'DOCUMENTATION',
      complexMeasuresAsHtml: '\n'
          + '    <p class="govuk-body">measure description</p>\n'
          + '\n'
          + '    <p class="govuk-body">Follow the rules that apply to import your goods.</p>\n'
          + '     \n'
          + '      <h3 class="govuk-heading-m">You must meet one of these four conditions</h3>\n'
          + '      \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">C057</h4>\n'
          + '  <p class="govuk-body">C057 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">C079</h4>\n'
          + '  <p class="govuk-body">C079 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">C082</h4>\n'
          + '  <p class="govuk-body">C082 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">Y951</h4>\n'
          + '  <p class="govuk-body">Y951 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s ">999L waiver also applies</h4>\n'
          + '  \n'
          + '    \n'
          + '  \n'
          + '      <h3 class="govuk-heading-m">You must meet this condition</h3>\n'
          + '      \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">Y926</h4>\n'
          + '  <p class="govuk-body">Y926 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '  \n'
          + ' ',
    },
  ],
}];

export const tradeRowDataOutputDeclarantMultipleMeasureOptionsNo999l = [{
  superHeader: 'Before you start importing',
  content: [
    {
      header: 'Prepare your business for importing',
      headerLinkText: 'Link text prepare your business for importing',
      signpostingStepsAsHtml: '<p class="govuk-body">declaringTraderContent</p>\n',
      externalLink: null,
      relatedTo: 'DOCUMENTATION',
      complexMeasuresAsHtml: '\n'
          + '    <p class="govuk-body">measure description</p>\n'
          + '\n'
          + '    <p class="govuk-body">Follow the rules that apply to import your goods.</p>\n'
          + '     \n'
          + '      <h3 class="govuk-heading-m">You must meet one of these five conditions</h3>\n'
          + '      \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">C057</h4>\n'
          + '  <p class="govuk-body">C057 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">C079</h4>\n'
          + '  <p class="govuk-body">C079 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">C081</h4>\n'
          + '  <p class="govuk-body">C081 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">C082</h4>\n'
          + '  <p class="govuk-body">C082 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">Y951</h4>\n'
          + '  <p class="govuk-body">Y951 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '  \n'
          + '      <h3 class="govuk-heading-m">You must meet this condition</h3>\n'
          + '      \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">Y926</h4>\n'
          + '  <p class="govuk-body">Y926 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '  \n'
          + ' ',
    },
  ],
}];

export const tradeRowDataOutputNonDeclarantMultipleMeasureOptions = [{
  superHeader: 'Before you start importing',
  content: [
    {
      header: 'Prepare your business for importing',
      headerLinkText: 'Link text prepare your business for importing',
      signpostingStepsAsHtml: '<p class="govuk-body">nonDeclaringTraderContent</p>\n',
      externalLink: null,
      relatedTo: 'DOCUMENTATION',
      complexMeasuresAsHtml: '\n'
          + '    <p class="govuk-body">measure description</p>\n'
          + '\n'
          + '    <p class="govuk-body">Follow the rules that apply to import your goods.</p>\n'
          + '     \n'
          + '      <h3 class="govuk-heading-m">You must meet one of these four conditions</h3>\n'
          + '      \n'
          + '        \n'
          + '        \n'
          + '  <p class="govuk-body">C057 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        \n'
          + '  <p class="govuk-body">C079 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        \n'
          + '  <p class="govuk-body">C082 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        \n'
          + '  <p class="govuk-body">Y951 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        \n'
          + '  \n'
          + '    \n'
          + '  \n'
          + '      <h3 class="govuk-heading-m">You must meet this condition</h3>\n'
          + '      \n'
          + '        \n'
          + '        \n'
          + '  <p class="govuk-body">Y926 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '  \n'
          + ' ',
    },
  ],
}];

export const tradeRowDataOutputAgentMultipleMeasureOptions = [{
  superHeader: 'Before you start importing',
  content: [
    {
      header: 'Prepare your business for importing',
      headerLinkText: 'Link text prepare your business for importing',
      signpostingStepsAsHtml: '<p class="govuk-body">agentContent</p>\n',
      externalLink: null,
      relatedTo: 'DOCUMENTATION',
      complexMeasuresAsHtml: '\n'
          + '    <p class="govuk-body">measure description</p>\n'
          + '\n'
          + '    <p class="govuk-body">Follow the rules that apply to import your goods.</p>\n'
          + '     \n'
          + '      <h3 class="govuk-heading-m">You must meet one of these four conditions</h3>\n'
          + '      \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">C057</h4>\n'
          + '  <p class="govuk-body">C057 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">C079</h4>\n'
          + '  <p class="govuk-body">C079 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">C082</h4>\n'
          + '  <p class="govuk-body">C082 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">Y951</h4>\n'
          + '  <p class="govuk-body">Y951 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s ">999L waiver also applies</h4>\n'
          + '  \n'
          + '    \n'
          + '  \n'
          + '      <h3 class="govuk-heading-m">You must meet this condition</h3>\n'
          + '      \n'
          + '        \n'
          + '        <h4 class="govuk-heading-s govuk-!-margin-bottom-0">Y926</h4>\n'
          + '  <p class="govuk-body">Y926 Overlay</p>\n'
          + '\n'
          + '    \n'
          + '  \n'
          + ' ',
    },
  ],
}];

export const translation = {
  page: {
    manageThisTrade: {
      rules: 'Rules that apply to your goods',
      exceptions: 'When rules are different or do not apply',
      multiCertificatePrefix: 'MULTI_CERTIFICATE prefix',
      condition: 'You must meet this condition',
      multipleConditions: (amount: string): string => `You must meet one of these ${amount} conditions`,
      code: 'Code',
      followRules: 'followRules text',
      followRulesExport: 'followRules export text',
      waiverApplies: 'waiver also applies',
      '999L': {
        header: 'Customs Declaration Service (CDS) universal waiver',
        body: 'Requirement for a licence is waived by entering the 999L document code and the document identifier CDS WAIVER in the additional documentation field for this commodity item. 999L can be used for CDS in a similar way to LIC99 on the CHIEF system, when a waiver may be applied.',
      },
    },
    calculateCustomsDutyImportVat: {
      tariffs: 'Tariffs',
      taxes: 'Taxes',
      measureType: 'Measure type',
      quota: 'Quota order number',
      additionalCode: 'Additional code',
      value: 'Value',
      awaitingData: 'Awaiting data.',
    },
  },
  common: {
    accessibility: {
      opensNewTab: '(opens in new tab)',
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
  },
};

export const mockedRestrictiveMeasures = {
  data: {
    measures: [
      {
        id: '410',
        measureTypeSeries: 'B',
        descriptionOverlay: '## Veterinary controls',
        description: '## Veterinary controls',
        measureOptions: [
          {
            options: [
              {
                certificateCode: 'N853',
                type: 'CERTIFICATE',
                descriptionOverlay: 'descriptionOverlay N853',
              },
              {
                certificateCode: 'C084',
                type: 'EXCEPTION',
                descriptionOverlay: 'descriptionOverlay C084',
              },
              {
                certificateCode: 'Y058',
                type: 'THRESHOLD_CERTIFICATE',
                descriptionOverlay: 'descriptionOverlay Y058',
              },
            ],
          },
        ],
        measureType: 'RESTRICTIVE',
      },
      {
        id: '350',
        measureTypeSeries: 'B',
        descriptionOverlay: '## Animal Health Certificate',
        description: '## Animal Health Certificate',
        measureOptions: [
          {
            options: [
              {
                certificateCode: '9120',
                type: 'CERTIFICATE',
                descriptionOverlay: 'descriptionOverlay 9120',
              },
              {
                certificateCode: '999L',
                type: 'EXCEPTION',
                descriptionOverlay: 'descriptionOverlay 999L',
              },
            ],
          },
        ],
        measureType: 'RESTRICTIVE',
      },
      {
        id: '710',
        measureTypeSeries: 'B',
        descriptionOverlay: '## CITES: import control',
        description: '## CITES: import control',
        measureOptions: [
          {
            options: [
              {
                certificateCode: 'C400',
                type: 'CERTIFICATE',
                descriptionOverlay: 'descriptionOverlay C400',
              },
              {
                certificateCode: '999L',
                type: 'EXCEPTION',
                descriptionOverlay: 'National Document: CDS universal waiver',
              },
              {
                certificateCode: 'Y900',
                type: 'EXCEPTION',
                descriptionOverlay: 'descriptionOverlay Y900',
              },
            ],
          },
        ],
        measureType: 'RESTRICTIVE',
      },
      {
        id: '750',
        measureTypeSeries: 'B',
        descriptionOverlay: '## Organic goods: import control',
        description: '## Organic goods: import control',
        measureOptions: [
          {
            options: [
              {
                certificateCode: 'C644',
                type: 'CERTIFICATE',
                descriptionOverlay: 'descriptionOverlay C644',
              },
              {
                certificateCode: 'Y929',
                type: 'EXCEPTION',
                descriptionOverlay: 'descriptionOverlay Y929',
              },
            ],
          },
        ],
        measureType: 'RESTRICTIVE',
      },
    ],
  },
};

export const mockedRestrictiveMeasuresWithProhibitions = {
  data: {
    measures: [
      {
        id: '715',
        measureTypeSeries: 'B',
        descriptionOverlay: 'Some Measure heading 1',
        measureOptions: [
          {
            options: [
              {
                certificateCode: 'C400',
                type: 'CERTIFICATE',
                descriptionOverlay: 'Other certificates: Presentation of the required "CITES" certificate',
              },
              {
                certificateCode: '999L',
                type: 'EXCEPTION',
                descriptionOverlay: 'National Document: CDS universal waiver',
              },
              {
                certificateCode: 'Y900',
                type: 'EXCEPTION',
                descriptionOverlay: 'Particular provisions: Declared goods do not belong to the Washington Convention (CITES)',
              },
            ],
          },
        ],
      },
      {
        measureTypeId: '278',
        id: '278',
        measureTypeSeries: 'A',
        legalAct: 'X1904110',
        description: '## Some prohibition description',
        measureType: 'PROHIBITIVE',
      },
    ],
  },
};

export const mockedTradeRowsData = {
  commodityCode: '00000000',
  commodityDescription: 'commodityDescription',
  signpostingContents: [
    {
      superHeader: {
        orderIndex: 1,
        description: 'Before you start importing',
        explanatoryText: 'Some intro text 1',
      },
      headers: [
        {
          header: {
            id: 100,
            orderIndex: 1,
            description: 'Prepare your business for importing',
            explanatoryText: null,
            linkText: 'Link text prepare your business for importing',
            externalLink: null,
            relatedTo: 'DOCUMENTATION',
          },
          steps: [
            {
              id: 28,
              nonDeclaringTraderContent: 'nonDeclaringTraderContent',
              declaringTraderContent: 'declaringTraderContent',
              agentContent: 'agentContent',
            },

          ],
          measures: [
            {
              id: '1',
              descriptionOverlay: 'measure description',
              subtext: 'measure subtext',
              measureOptions: [
                {
                  options: [
                    {
                      type: 'THRESHOLD_CERTIFICATE',
                      descriptionOverlay: 'THRESHOLD_CERTIFICATE description',
                      certificateCode: 'Y058',
                      thresholdDescription: 'Or if your goods weigh 2.0 Kilograms or less',
                    },
                    {
                      type: 'CERTIFICATE',
                      descriptionOverlay: 'CERTIFICATE description1 (<a href="https://www.somelink.com">https://www.somelink.com</a>)',
                      subtext: 'CERTIFICATE subtext1',
                      certificateCode: 'N851',
                    },
                    {
                      type: 'CERTIFICATE',
                      descriptionOverlay: 'CERTIFICATE description2',
                      subtext: 'CERTIFICATE subtext2',
                      certificateCode: 'N852',
                    },
                    {
                      type: 'MULTI_CERTIFICATE',
                      descriptionOverlay: 'MULTI_CERTIFICATE description',
                      subtext: 'MULTI_CERTIFICATE subtext',
                      certificateCode: 'N852',
                    },
                    {
                      type: 'EXCEPTION',
                      descriptionOverlay: 'EXCEPTION description',
                      subtext: 'EXCEPTION subtext',
                      certificateCode: 'N852',
                    },
                    {
                      type: 'THRESHOLD',
                      descriptionOverlay: 'THRESHOLD description',
                      subtext: 'THRESHOLD subtext',
                      certificateCode: 'N852',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  prohibitions: [],
  commodityHierarchy: [],
};

export const mockedTradeRowsDataWithOne999LMeasure = {
  commodityCode: '00000000',
  commodityDescription: 'commodityDescription',
  signpostingContents: [
    {
      superHeader: {
        orderIndex: 1,
        description: 'Before you start importing',
        explanatoryText: 'Some intro text 1',
      },
      headers: [
        {
          header: {
            id: 100,
            orderIndex: 1,
            description: 'Prepare your business for importing',
            explanatoryText: null,
            linkText: 'Link text prepare your business for importing',
            externalLink: null,
            relatedTo: 'DOCUMENTATION',
          },
          steps: [
            {
              id: 28,
              nonDeclaringTraderContent: 'nonDeclaringTraderContent',
              declaringTraderContent: 'declaringTraderContent',
              agentContent: 'agentContent',
            },

          ],
          measures: [
            {
              id: '1',
              descriptionOverlay: 'measure 1 description',
              subtext: 'measure subtext',
              measureOptions: [
                {
                  options: [
                    {
                      certificateCode: 'C082',
                      type: 'CERTIFICATE',
                      descriptionOverlay: 'Overlay',
                    },
                    {
                      type: 'EXCEPTION',
                      descriptionOverlay: '999L EXCEPTION description',
                      subtext: 'EXCEPTION subtext',
                      certificateCode: '999L',
                    },
                    {
                      type: 'EXCEPTION',
                      descriptionOverlay: 'Y900 EXCEPTION description',
                      subtext: 'EXCEPTION subtext',
                      certificateCode: 'Y900',
                    },
                  ],
                },
              ],
            },
            {
              id: '2',
              descriptionOverlay: 'measure 2 description',
              subtext: 'measure subtext',
              measureOptions: [
                {
                  options: [
                    {
                      certificateCode: 'C082',
                      type: 'CERTIFICATE',
                      descriptionOverlay: 'Overlay',
                    },
                    {
                      type: 'EXCEPTION',
                      descriptionOverlay: '999L EXCEPTION description',
                      subtext: 'EXCEPTION subtext',
                      certificateCode: '999L',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  prohibitions: [],
  commodityHierarchy: [],
};

export const mockedTradeRowsDataNoMeasureOptions = {
  commodityCode: '00000000',
  commodityDescription: 'commodityDescription',
  signpostingContents: [
    {
      superHeader: {
        orderIndex: 1,
        description: 'Before you start importing',
        explanatoryText: 'Some intro text 1',
      },
      headers: [
        {
          header: {
            id: 100,
            orderIndex: 1,
            description: 'Prepare your business for importing',
            explanatoryText: null,
            linkText: 'Link text prepare your business for importing',
            externalLink: null,
            relatedTo: 'DOCUMENTATION',
          },
          steps: [
            {
              id: 28,
              nonDeclaringTraderContent: 'nonDeclaringTraderContent',
              declaringTraderContent: 'declaringTraderContent',
              agentContent: 'agentContent',
            },

          ],
          measures: [
            {
              id: '1',
              descriptionOverlay: 'measure description',
              subtext: 'measure subtext',
            },
          ],
        },
      ],
    },
  ],
  prohibitions: [],
  commodityHierarchy: [],
};

export const mockedTradeRowsDataMultipleMeasureOptions = {
  commodityCode: '00000000',
  commodityDescription: 'commodityDescription',
  signpostingContents: [
    {
      superHeader: {
        orderIndex: 1,
        description: 'Before you start importing',
        explanatoryText: 'Some intro text 1',
      },
      headers: [
        {
          header: {
            id: 100,
            orderIndex: 1,
            description: 'Prepare your business for importing',
            explanatoryText: null,
            linkText: 'Link text prepare your business for importing',
            externalLink: null,
            relatedTo: 'DOCUMENTATION',
          },
          steps: [
            {
              id: 28,
              nonDeclaringTraderContent: 'nonDeclaringTraderContent',
              declaringTraderContent: 'declaringTraderContent',
              agentContent: 'agentContent',
            },

          ],
          measures: [
            {
              id: '1',
              descriptionOverlay: 'measure description',
              subtext: 'measure subtext',
              measureOptions: [
                {
                  options: [
                    {
                      certificateCode: '999L',
                      type: 'EXCEPTION',
                      descriptionOverlay: '999L Overlay',
                    },
                    {
                      certificateCode: 'C082',
                      type: 'CERTIFICATE',
                      descriptionOverlay: 'C082 Overlay',
                    },
                    {
                      certificateCode: 'C057',
                      type: 'CERTIFICATE',
                      descriptionOverlay: 'C057 Overlay',
                    },
                    {
                      certificateCode: 'C079',
                      type: 'CERTIFICATE',
                      descriptionOverlay: 'C079 Overlay',
                    },
                    {
                      certificateCode: 'Y951',
                      type: 'EXCEPTION',
                      descriptionOverlay: 'Y951 Overlay',
                    },
                  ],
                },
                {
                  options: [
                    {
                      certificateCode: 'Y926',
                      type: 'EXCEPTION',
                      descriptionOverlay: 'Y926 Overlay',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  prohibitions: [],
  commodityHierarchy: [],
};

export const mockedTradeRowsDataMultipleMeasureOptionsNo999l = {
  commodityCode: '00000000',
  commodityDescription: 'commodityDescription',
  signpostingContents: [
    {
      superHeader: {
        orderIndex: 1,
        description: 'Before you start importing',
        explanatoryText: 'Some intro text 1',
      },
      headers: [
        {
          header: {
            id: 100,
            orderIndex: 1,
            description: 'Prepare your business for importing',
            explanatoryText: null,
            linkText: 'Link text prepare your business for importing',
            externalLink: null,
            relatedTo: 'DOCUMENTATION',
          },
          steps: [
            {
              id: 28,
              nonDeclaringTraderContent: 'nonDeclaringTraderContent',
              declaringTraderContent: 'declaringTraderContent',
              agentContent: 'agentContent',
            },

          ],
          measures: [
            {
              id: '1',
              descriptionOverlay: 'measure description',
              subtext: 'measure subtext',
              measureOptions: [
                {
                  options: [
                    {
                      certificateCode: 'C081',
                      type: 'CERTIFICATE',
                      descriptionOverlay: 'C081 Overlay',
                    },
                    {
                      certificateCode: 'C082',
                      type: 'CERTIFICATE',
                      descriptionOverlay: 'C082 Overlay',
                    },
                    {
                      certificateCode: 'C057',
                      type: 'CERTIFICATE',
                      descriptionOverlay: 'C057 Overlay',
                    },
                    {
                      certificateCode: 'C079',
                      type: 'CERTIFICATE',
                      descriptionOverlay: 'C079 Overlay',
                    },
                    {
                      certificateCode: 'Y951',
                      type: 'EXCEPTION',
                      descriptionOverlay: 'Y951 Overlay',
                    },
                  ],
                },
                {
                  options: [
                    {
                      certificateCode: 'Y926',
                      type: 'EXCEPTION',
                      descriptionOverlay: 'Y926 Overlay',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  prohibitions: [],
  commodityHierarchy: [],
};

export const mockedTradeDataWithHeaders = {
  data: {
    commodityCode: '8419600000',
    commodityDescription: 'Some commodity description',
    measures: [
      {
        id: '20101505',
        tradeType: 'IMPORT',
        measureType: {
          id: '277',
          description: 'Import prohibition',
          seriesId: 'A',
        },
        geographicalArea: {
          id: '1011',
          description: 'ERGA OMNES',
        },
        measureConditions: [],
      },
      {
        id: '20140916',
        tradeType: 'IMPORT',
        measureType: {
          id: '724',
          description: 'Import control of fluorinated greenhouse gases',
          seriesId: 'B',
        },
        geographicalArea: {
          id: '1011',
          description: 'ERGA OMNES',
        },
        measureConditions: [
          {
            id: '20115258',
            conditionCode: 'C',
            condition: 'Some condition',
            documentCode: 'Y951',
            requirement: 'Some requirement',
            action: 'Import/export allowed after control',
            dutyExpression: '',
            measureConditionType: 'EXCEPTION',
          },
        ],
      },
    ],
    signpostingContents: [
      {
        superHeader: {
          orderIndex: 1,
          description: 'superHeader 1',
          explanatoryText: 'superHeader 1 explanatoryText',
        },
        headers: [
          {
            header: {
              id: 4,
              orderIndex: 1,
              description: 'Import controls description',
              explanatoryText: null,
              linkText: 'Import controls linkText',
              externalLink: null,
              relatedTo: 'IMPORT_CONTROLS',
            },
            steps: [],
            measures: [
              {
                id: '724',
                descriptionOverlay: 'Some descriptionOverlay',
                subtext: null,
                measureOptions: [
                  {
                    options: [
                      {
                        certificateCode: 'Y926',
                        type: 'EXCEPTION',
                        descriptionOverlay: 'Some descriptionOverlay',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            header: {
              id: 2,
              orderIndex: 2,
              description: 'Calculate the Customs Duty and Import VAT description',
              explanatoryText: null,
              linkText: 'Calculate duty linkText',
              externalLink: null,
              relatedTo: 'CALCULATE_DUTY',
            },
            steps: [
              {
                id: 5,
                stepDescription: null,
                stepHowtoDescription: null,
                stepUrl: null,
                nonDeclaringTraderContent: 'Some nonDeclaringTraderContent',
                declaringTraderContent: 'Some declaringTraderContent',
                agentContent: 'Some agentContent',
              },
            ],
            measures: [],
          },
          {
            header: {
              id: 1,
              orderIndex: 3,
              description: 'Import registration description',
              explanatoryText: null,
              linkText: 'Import registration linkText',
              externalLink: null,
              relatedTo: 'IMPORT_REGISTRATION',
            },
            steps: [
              {
                id: 1,
                stepDescription: null,
                stepHowtoDescription: null,
                stepUrl: null,
                nonDeclaringTraderContent: 'Some nonDeclaringTraderContent',
                declaringTraderContent: 'Some declaringTraderContent',
                agentContent: 'Some agentContent',
              },
            ],
            measures: [],
          },
        ],
      },
      {
        superHeader: {
          orderIndex: 2,
          description: 'superHeader 2',
          explanatoryText: 'superHeader 2 explanatoryText',
        },
        headers: [
          {
            header: {
              id: 5,
              orderIndex: 1,
              description: 'Import documentation description',
              explanatoryText: null,
              linkText: 'Import documentation linkText',
              externalLink: null,
              relatedTo: 'IMPORT_DOCUMENTATION',
            },
            steps: [
              {
                id: 7,
                stepDescription: null,
                stepHowtoDescription: null,
                stepUrl: null,
                nonDeclaringTraderContent: 'Some nonDeclaringTraderContent',
                declaringTraderContent: 'Some declaringTraderContent',
                agentContent: 'Some agentContent',
              },
            ],
            measures: [],
          },
          {
            header: {
              id: 10,
              orderIndex: 2,
              description: 'Ens declaration description',
              explanatoryText: null,
              linkText: 'Ens declarationlinkText',
              externalLink: 'https://www.some-externalLink1.com',
              relatedTo: 'ENS_DECLARATION',
            },
            steps: [],
            measures: [],
          },
          {
            header: {
              id: 6,
              orderIndex: 3,
              description: 'Import declaration description',
              explanatoryText: null,
              linkText: 'Import declaration linkText',
              externalLink: 'https://www.some-externalLink2.com',
              relatedTo: 'IMPORT_DECLARATION',
            },
            steps: [
              {
                id: 9,
                stepDescription: null,
                stepHowtoDescription: null,
                stepUrl: null,
                nonDeclaringTraderContent: 'Some nonDeclaringTraderContent',
                declaringTraderContent: 'Some declaringTraderContent',
                agentContent: 'Some agentContent',
              },
            ],
            measures: [],
          },
        ],
      },
    ],
    prohibitions: [],
    commodityHierarchy: [
      {
        id: '16',
        description: 'Some description',
        type: 'SECTION',
      },
      {
        id: '8400000000',
        description: 'Some description',
        type: 'CHAPTER',
      },
      {
        id: '8419000000',
        description: 'Some description',
        type: 'HEADING',
      },
    ],
  },
};

export const mockedTradeDataWithMeasures = {
  data: {
    commodityCode: '8419600000',
    commodityDescription: 'Some commodity description',
    measures: [
      {
        id: '20168318',
        tradeType: 'IMPORT',
        measureType: { id: '410', description: 'Veterinary control', seriesId: 'B' },
        geographicalArea: { id: '1008', description: 'All third countries' },
        measureConditions: [
          {
            id: '20145719',
            conditionCode: 'B',
            condition: 'B: Presentation of a certificate/licence/document',
            documentCode: 'N853',
            requirement: 'some text',
            action: 'Import/export allowed after control',
            dutyExpression: '',
            measureConditionType: 'CERTIFICATE',
          },
          {
            id: '20145720',
            conditionCode: 'B',
            condition: 'B: Presentation of a certificate/licence/document',
            documentCode: 'C084',
            requirement: 'some text',
            action: 'Import/export allowed after control',
            dutyExpression: '',
            measureConditionType: 'EXCEPTION',
          },
          {
            id: '20145722',
            conditionCode: 'B',
            condition: 'B: Presentation of a certificate/licence/document',
            documentCode: '999L',
            requirement: 'some text',
            action: 'Import/export allowed after control',
            dutyExpression: '',
            measureConditionType: 'EXCEPTION',
          },
          {
            id: '20145721',
            conditionCode: 'B',
            condition: 'B: Presentation of a certificate/licence/document',
            documentCode: '',
            requirement: null,
            action: 'Import/export not allowed after control',
            dutyExpression: '',
            measureConditionType: 'NEGATIVE',
          },
        ],
      },
      {
        id: '20172980',
        tradeType: 'IMPORT',
        measureType: {
          id: '350',
          description: 'Animal Health Certificate',
          seriesId: 'B',
        },
        geographicalArea: { id: '1011', description: 'ERGA OMNES' },
        measureConditions: [
          {
            id: '20167053',
            conditionCode: 'B',
            condition: 'B: Presentation of a certificate/licence/document',
            documentCode: '999L',
            requirement: 'some text',
            action: 'Entry into free circulation allowed',
            dutyExpression: '',
            measureConditionType: 'EXCEPTION',
          },
          {
            id: '20167051',
            conditionCode: 'B',
            condition: 'B: Presentation of a certificate/licence/document',
            documentCode: '',
            requirement: null,
            action: 'The entry into free circulation is not allowed',
            dutyExpression: '',
            measureConditionType: 'NEGATIVE',
          },
          {
            id: '20167052',
            conditionCode: 'B',
            condition: 'B: Presentation of a certificate/licence/document',
            documentCode: '9120',
            requirement: 'some text',
            action: 'Entry into free circulation allowed',
            dutyExpression: '',
            measureConditionType: 'CERTIFICATE',
          },
        ],
      },
      {
        id: '20179089',
        tradeType: 'IMPORT',
        measureType: {
          id: '750',
          description: 'Import control of organic products',
          seriesId: 'B',
        },
        geographicalArea: { id: '1011', description: 'ERGA OMNES' },
        measureConditions: [
          {
            id: '20180229',
            conditionCode: 'B',
            condition: 'B: Presentation of a certificate/licence/document',
            documentCode: 'Y929',
            requirement: 'some text',
            action: 'Import/export allowed after control',
            dutyExpression: '',
            measureConditionType: 'EXCEPTION',
          },
          {
            id: '20180228',
            conditionCode: 'B',
            condition: 'B: Presentation of a certificate/licence/document',
            documentCode: 'C644',
            requirement: 'some text',
            action: 'Import/export allowed after control',
            dutyExpression: '',
            measureConditionType: 'CERTIFICATE',
          },
          {
            id: '20180230',
            conditionCode: 'B',
            condition: 'B: Presentation of a certificate/licence/document',
            documentCode: '',
            requirement: null,
            action: 'Import/export not allowed after control',
            dutyExpression: '',
            measureConditionType: 'NEGATIVE',
          },
        ],
      },
    ],
    signpostingContents: [
      {
        superHeader: {
          orderIndex: 1,
          description: 'superHeader 1',
          explanatoryText: 'superHeader 1 explanatoryText',
        },
        headers: [
          {
            header: {
              id: 4,
              orderIndex: 1,
              description: 'Import controls description',
              explanatoryText: null,
              linkText: 'Import controls linkText',
              externalLink: null,
              relatedTo: 'IMPORT_CONTROLS',
            },
            steps: [],
            measures: [
              {
                id: '724',
                descriptionOverlay: 'Some descriptionOverlay',
                subtext: null,
                measureOptions: [
                  {
                    options: [
                      {
                        certificateCode: 'Y926',
                        type: 'EXCEPTION',
                        descriptionOverlay: 'Some descriptionOverlay',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            header: {
              id: 2,
              orderIndex: 2,
              description: 'Calculate the Customs Duty and Import VAT description',
              explanatoryText: null,
              linkText: 'Calculate duty linkText',
              externalLink: null,
              relatedTo: 'CALCULATE_DUTY',
            },
            steps: [
              {
                id: 5,
                stepDescription: null,
                stepHowtoDescription: null,
                stepUrl: null,
                nonDeclaringTraderContent: 'Some nonDeclaringTraderContent',
                declaringTraderContent: 'Some declaringTraderContent',
                agentContent: 'Some agentContent',
              },
            ],
            measures: [],
          },
          {
            header: {
              id: 1,
              orderIndex: 3,
              description: 'Import registration description',
              explanatoryText: null,
              linkText: 'Import registration linkText',
              externalLink: null,
              relatedTo: 'IMPORT_REGISTRATION',
            },
            steps: [
              {
                id: 1,
                stepDescription: null,
                stepHowtoDescription: null,
                stepUrl: null,
                nonDeclaringTraderContent: 'Some nonDeclaringTraderContent',
                declaringTraderContent: 'Some declaringTraderContent',
                agentContent: 'Some agentContent',
              },
            ],
            measures: [],
          },
        ],
      },
      {
        superHeader: {
          orderIndex: 2,
          description: 'superHeader 2',
          explanatoryText: 'superHeader 2 explanatoryText',
        },
        headers: [
          {
            header: {
              id: 5,
              orderIndex: 1,
              description: 'Import documentation description',
              explanatoryText: null,
              linkText: 'Import documentation linkText',
              externalLink: null,
              relatedTo: 'IMPORT_DOCUMENTATION',
            },
            steps: [
              {
                id: 7,
                stepDescription: null,
                stepHowtoDescription: null,
                stepUrl: null,
                nonDeclaringTraderContent: 'Some nonDeclaringTraderContent',
                declaringTraderContent: 'Some declaringTraderContent',
                agentContent: 'Some agentContent',
              },
            ],
            measures: [],
          },
          {
            header: {
              id: 10,
              orderIndex: 2,
              description: 'Ens declaration description',
              explanatoryText: null,
              linkText: 'Ens declarationlinkText',
              externalLink: 'https://www.some-externalLink1.com',
              relatedTo: 'ENS_DECLARATION',
            },
            steps: [],
            measures: [],
          },
          {
            header: {
              id: 6,
              orderIndex: 3,
              description: 'Import declaration description',
              explanatoryText: null,
              linkText: 'Import declaration linkText',
              externalLink: 'https://www.some-externalLink2.com',
              relatedTo: 'IMPORT_DECLARATION',
            },
            steps: [
              {
                id: 9,
                stepDescription: null,
                stepHowtoDescription: null,
                stepUrl: null,
                nonDeclaringTraderContent: 'Some nonDeclaringTraderContent',
                declaringTraderContent: 'Some declaringTraderContent',
                agentContent: 'Some agentContent',
              },
            ],
            measures: [],
          },
        ],
      },
    ],
    prohibitions: [],
    commodityHierarchy: [
      {
        id: '16',
        description: 'Some description',
        type: 'SECTION',
      },
      {
        id: '8400000000',
        description: 'Some description',
        type: 'CHAPTER',
      },
      {
        id: '8419000000',
        description: 'Some description',
        type: 'HEADING',
      },
    ],
  },
};

export const mockedAdditionalCodeData = {
  data: {
    data: [
      { code: '4200', description: 'Procyon lotor' },
      { code: '4201', description: 'Canis lupus' },
      { code: '4202', description: 'Martes zibellina' },
    ],
  },
};

export const mockedInvalidDestinationError = {
  data: {
    data: {
      validationErrors: [
        {
          fieldName: 'destinationCountry',
          message: 'must not be null',
        },
      ],
    },
  },
};

export const mockedOriginCountryError = {
  data: {
    data: {
      validationErrors: [
        {
          fieldName: 'originCountry',
          message: 'must match "^\\w{2}$',
        },
      ],
    },
  },
};

export const mockedAdditionalCodeError = {
  data: {
    data: {
      validationErrors: [
        {
          fieldName: 'additionalCode',
          message: 'must match "^\\d{4}$"',
        },
      ],
    },
  },
};

export const mockedImportDateError = {
  data: {
    data: {
      validationErrors: [
        {
          fieldName: 'importDate',
          message: 'some date error',
        },
      ],
    },
  },
};

export const mockedInvalidTradeTypeError = {
  data: {
    data: {
      validationErrors: [
        {
          fieldName: 'tradeType',
          message: 'some tradeType error',
        },
      ],
    },
  },
};

export const mockedTariffAndTaxesData = {
  data: {
    tariffs: [
      {
        measureTypeId: '103',
        text: 'Third country duty',
        subtext: null,
        value: '8.00 %',
        additionalCode: { code: 'VATZ', description: 'VAT zero rate' },
        geographicalArea: {
          id: '1011',
          description: 'ERGA OMNES',
        },
        quota: null,
      },
      {
        measureTypeId: '103',
        text: 'Tariff preference',
        subtext: null,
        value: '3.50 %',
        additionalCode: null,
        geographicalArea: {
          id: 'MA',
          description: 'Morocco',
        },
        quota: null,
      },
      {
        measureTypeId: '103',
        text: 'Preferential tariff quota',
        subtext: null,
        value: '0.00 %',
        additionalCode: null,
        geographicalArea: {
          id: 'MA',
          description: 'Morocco',
        },
        quota: {
          number: '051104',
        },
      },
      {
        measureTypeId: '103',
        text: 'Preferential tariff quota',
        subtext: null,
        value: null,
        additionalCode: null,
        geographicalArea: {
          id: 'MA',
          description: 'Morocco',
        },
        quota: {
          number: '051193',
        },
      },
    ],
    taxes: [
      {
        measureTypeId: '305',
        text: 'Value added tax',
        subtext: null,
        value: '0.00 %',
        additionalCode: {
          code: 'VATZ',
          description: 'VAT zero rate',
        },
      },
      {
        measureTypeId: '305',
        text: 'Value added tax',
        subtext: null,
        value: '0.00 %',
        additionalCode: null,
      },
    ],
  },
};

export const mockedTariffAndTaxesDataResponse = {
  headersTariffs: [
    { text: 'Measure type', classes: 'govuk-!-width-one-quarter' },
    {
      text: 'Quota order number',
      classes: 'govuk-!-width-one-quarter',
    },
    { text: 'Additional code', classes: 'govuk-!-width-one-quarter' },
    {
      text: 'Value',
      format: 'numeric',
      classes: 'govuk-!-width-one-quarter',
    },
  ],
  headersTaxes: [
    { text: 'Measure type', classes: 'govuk-!-width-one-quarter' },
    { text: 'Additional code', classes: 'govuk-!-width-one-quarter' },
    {
      text: 'Value',
      format: 'numeric',
      classes: 'govuk-!-width-one-quarter',
    },
  ],
  rowsTariffs: [
    [
      { html: 'Third country duty', attributes: { 'data-id': 'tariffs-measure-type-0' } },
      { html: '-', attributes: { 'data-id': 'tariffs-quota-0' } },
      { html: '<strong>VATZ</strong><br />VAT zero rate', attributes: { 'data-id': 'tariffs-additional-code-0' } },
      { html: '8.00 %', format: 'numeric', attributes: { 'data-id': 'tariffs-value-0' } },
    ],
    [
      { html: 'Tariff preference for Morocco', attributes: { 'data-id': 'tariffs-measure-type-1' } },
      { html: '-', attributes: { 'data-id': 'tariffs-quota-1' } },
      { html: '-', attributes: { 'data-id': 'tariffs-additional-code-1' } },
      { html: '3.50 %', format: 'numeric', attributes: { 'data-id': 'tariffs-value-1' } },
    ],
    [
      { html: 'Preferential tariff quota for Morocco', attributes: { 'data-id': 'tariffs-measure-type-2' } },
      { html: '051104', attributes: { 'data-id': 'tariffs-quota-2' } },
      { html: '-', attributes: { 'data-id': 'tariffs-additional-code-2' } },
      { html: '0.00 %', format: 'numeric', attributes: { 'data-id': 'tariffs-value-2' } },
    ],
    [
      { html: 'Preferential tariff quota for Morocco', attributes: { 'data-id': 'tariffs-measure-type-3' } },
      { html: '051193', attributes: { 'data-id': 'tariffs-quota-3' } },
      { html: '-', attributes: { 'data-id': 'tariffs-additional-code-3' } },
      { html: 'Conditional', format: 'numeric', attributes: { 'data-id': 'tariffs-value-3' } },
    ],
  ],
  rowsTaxes: [
    [
      { html: 'Value added tax', attributes: { 'data-id': 'taxes-measure-type-0' } },
      { html: '<strong>VATZ</strong><br />VAT zero rate', attributes: { 'data-id': 'taxes-additional-code-0' } },
      { html: '0.00 %', format: 'numeric', attributes: { 'data-id': 'taxes-value-0' } },
    ],
    [
      { html: 'Value added tax', attributes: { 'data-id': 'taxes-measure-type-1' } },
      { html: '-', attributes: { 'data-id': 'taxes-additional-code-1' } },
      { html: '0.00 %', format: 'numeric', attributes: { 'data-id': 'taxes-value-1' } },
    ],
  ],
};

export const mockedTariffAndTaxesDataEmptyColumns = {
  data: {
    tariffs: [
      {
        text: 'Third country duty',
        subtext: null,
        value: '8.00 %',
        additionalCode: null,
        geographicalArea: {
          id: '1011',
          description: 'ERGA OMNES',
        },
        quota: null,
      },
      {
        text: 'Tariff preference',
        subtext: null,
        value: '3.50 %',
        additionalCode: null,
        geographicalArea: {
          id: 'MA',
          description: 'Morocco',
        },
        quota: null,
      },
    ],
    taxes: [
      {
        measureTypeId: '305',
        text: 'Value added tax',
        subtext: null,
        value: '0.00 %',
        additionalCode: {
          code: 'VATZ',
          description: 'VAT zero rate',
        },
      },
      {
        measureTypeId: '305',
        text: 'Value added tax',
        subtext: null,
        value: null,
        additionalCode: null,
      },
    ],
  },
};

export const mockedTariffAndTaxesDataEmptyColumnsResponse = {
  headersTariffs: [
    { text: 'Measure type', classes: 'govuk-!-width-one-quarter' },
    {
      text: 'Value',
      format: 'numeric',
      classes: 'govuk-!-width-one-quarter',
    },
  ],
  headersTaxes: [
    { text: 'Measure type', classes: 'govuk-!-width-one-quarter' },
    { text: 'Additional code', classes: 'govuk-!-width-one-quarter' },
    {
      text: 'Value',
      format: 'numeric',
      classes: 'govuk-!-width-one-quarter',
    },
  ],
  rowsTariffs: [
    [
      { html: 'Third country duty', attributes: { 'data-id': 'tariffs-measure-type-0' } },
      { html: '8.00 %', format: 'numeric', attributes: { 'data-id': 'tariffs-value-0' } },
    ],
    [
      { html: 'Tariff preference for Morocco', attributes: { 'data-id': 'tariffs-measure-type-1' } },
      { html: '3.50 %', format: 'numeric', attributes: { 'data-id': 'tariffs-value-1' } },
    ],
  ],
  rowsTaxes: [
    [
      { html: 'Value added tax', attributes: { 'data-id': 'taxes-measure-type-0' } },
      { html: '<strong>VATZ</strong><br />VAT zero rate', attributes: { 'data-id': 'taxes-additional-code-0' } },
      { html: '0.00 %', format: 'numeric', attributes: { 'data-id': 'taxes-value-0' } },
    ],
    [
      { html: 'Value added tax', attributes: { 'data-id': 'taxes-measure-type-1' } },
      { html: '-', attributes: { 'data-id': 'taxes-additional-code-1' } },
      { html: 'Conditional', format: 'numeric', attributes: { 'data-id': 'taxes-value-1' } },
    ],
  ],
};

export const mockedTariffAndTaxesDataNoTariff = {
  data: {
    tariffs: [],
    taxes: [
      {
        measureTypeId: '305',
        text: 'Value added tax',
        subtext: null,
        value: '5.00 %',
        additionalCode: {
          code: 'VATZ',
          description: 'VAT zero rate',
        },
      },
    ],
  },
};

export const mockedTariffAndTaxesDataNoTax = {
  data: {
    tariffs: [
      {
        text: 'Third country duty',
        subtext: null,
        value: '8.00 %',
        additionalCode: null,
        geographicalArea: {
          id: '1011',
          description: 'ERGA OMNES',
        },
        quota: null,
      },
    ],
    taxes: [],
  },
};
