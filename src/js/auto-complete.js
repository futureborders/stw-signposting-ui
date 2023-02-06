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

/* eslint-disable */

(function () {
  // initialize accessibleAutocomplete
  accessibleAutocomplete.enhanceSelectElement({
    defaultValue: '',
    selectElement: document.querySelector('#location-picker'),
    tNoResults: () => document.getElementsByTagName('html')[0].getAttribute('lang') === 'cy' ? 'Dim canlyniadau wedi’u canfod' : 'No results found',
  });

  function checkOption(label) {
    var result = [];
    var sel = document.querySelector('#location-picker-select');
    var opts = sel.options;

    for(var i = 0; i < opts.length; i++) {
      result.push(opts[i].innerText)
    }
    return result.filter( o => o === label ).length > 0;
  }

  document.querySelector('#location-picker').addEventListener('blur', (event) => {
    if (event.target.value === '' || !checkOption(event.target.value)){
      document.querySelector('#location-picker-select').value = '';
    }
  });

  if(document.querySelector('.govuk-form-group--error')){
    document.querySelector('#location-picker').value = '';
    document.querySelector('#location-picker-select').value = '';
  }
})();
