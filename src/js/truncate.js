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

/* eslint-disable no-param-reassign */

const details = document.querySelector('details');
const truncatedBlock = document.querySelectorAll('.truncated-block-container');
const showLabel = document.getElementsByClassName('truncated')[0].getAttribute('data-show-label');
const hideLabel = document.getElementsByClassName('truncated')[0].getAttribute('data-hide-label');

function toggleTruncatedText() {
  const truncated = this.getElementsByClassName('truncated')[0];
  const toggle = this.getElementsByClassName('truncated-block-toggle')[0];
  if (truncated.classList.contains('truncated-block')) {
    truncated.classList.remove('truncated-block');
    toggle.innerHTML = hideLabel;
  } else {
    truncated.classList.add('truncated-block');
    toggle.innerHTML = showLabel;
  }
}

function displayTruncatedToggle() {
  if (truncatedBlock) {
    truncatedBlock.forEach((div) => {
      const beforeElement = getComputedStyle(div.getElementsByClassName('truncated-block')[0], '::before').getPropertyValue('top');
      const afterElement = getComputedStyle(div.getElementsByClassName('truncated-block')[0], '::after').getPropertyValue('top');
      const truncatedBlockToggleButton = div.getElementsByClassName('truncated-block-toggle');

      if (beforeElement !== afterElement && !truncatedBlockToggleButton.length) {
        div.insertAdjacentHTML('beforeend', `<button class="truncated-block-toggle" hidden>${showLabel}</button>`);
      }
      if (truncatedBlockToggleButton.length > 0) {
        div.onclick = toggleTruncatedText;
      }
    });
  }
}

function truncatedText() {
  if (details && details.getAttribute('open')) {
    details.addEventListener('toggle', () => {
      displayTruncatedToggle();
    });
  } else {
    displayTruncatedToggle();
  }
}

truncatedText();
