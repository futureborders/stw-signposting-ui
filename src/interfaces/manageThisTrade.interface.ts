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

export interface Heading {
  text: string;
}

export interface Content {
  html: string;
}

export interface ContentEntity {
  header: string;
  headerLinkText: string;
  signpostingStepsAsHtml: string;
  complexMeasuresAsHtml: string;
}

export interface ManageThisTradeRows {
  superHeader: string;
  content?: (ContentEntity)[] | null;
}

export interface Prohibitions {
  measureTypeId: string;
  legalAct: string;
  description: string;
}

export interface ProhibitionDescriptions {
  description: string;
}

export interface SignpostingContent {
  id: number;
  stepDescription?: null;
  stepHowtoDescription?: null;
  stepUrl?: null;
  nonDeclaringTraderContent?: string;
  declaringTraderContent?: string;
  agentContent?: string;
}
