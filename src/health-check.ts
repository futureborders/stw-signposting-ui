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

enum HealthCheckState {
  UP = 'UP',
  DOWN = 'DOWN',
}

// We can add extra checks inside this function as required (e.g. to check connections to downstream services)
const onHealthCheck = async (): Promise<any> => ({
  status: HealthCheckState.UP,
  timestamp: Date.now(),
});

export { onHealthCheck, HealthCheckState };
