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

/* eslint-disable */
// add js-enabled class
if(document.body.className) {
  document.body.className = document.body.className + 'js-enabled';
} else {
  document.body.className = 'js-enabled';
}

// initialize all GOVUKFrontend
window.GOVUKFrontend.initAll();

// printbutton
(function () {
  const printButton = document.getElementsByClassName('printButton');
  for (var i = 0; i <  printButton.length; i++) {
    if (printButton[i]) {
      printButton[i].onclick = function() {
        window.print();
      }
    }
  }
})();

// handles back button using JS
(function () {
  const jsBackButton = document.getElementsByClassName('js-back-button');
  for (var i = 0; i <   jsBackButton.length; i++) {
    if ( jsBackButton[i]) {
       jsBackButton[i].onclick = function(e) {
         e.preventDefault();
         window.history.back();
      }
    }
  }
})();
