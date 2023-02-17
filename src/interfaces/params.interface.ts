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

import { TaskStatuses } from '../features/common/taskList/interface';

export interface Params {
   commodity?: string;
   tradeType?: string;
   goodsIntent?: string;
   importDeclarations?: string;
   userTypeTrader?: string;
   destinationCountry?: string;
   originCountry?: string;
   importDateDay?: string;
   importDateMonth?: string;
   importDateYear?: string;
   additionalCode?: string;
   isEdit?: string;
   original?: string;
   originalImportDateDay?: string;
   originalImportDateMonth?: string;
   originalImportDateYear?: string;
   subheadingSuffix?: string;
   isSubheading?: string;
   editCancelled?: string;
   'additional-question'?: string;
   '710'?: string;
   '750'?: string;
   goodsPurpose?: string;
   exportGoodsIntent?: string;
   tradeDateDay?: string;
   tradeDateMonth?: string;
   tradeDateYear?: string;
   exportUserTypeTrader?: string;
   exportDeclarations?: string;
   hasAddionalCode?: string;
   hasNoMeasures?: boolean;
   error?: string;
   taskStatuses?: TaskStatuses;
   exportResponsibleForDeclaringGoods?: string;
 }

export default Params;
