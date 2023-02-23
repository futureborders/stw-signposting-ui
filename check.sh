#!/usr/bin/env bash

curl -sL https://rpm.nodesource.com/setup_14.x | bash -

# There is currently an issue with installing nodejs this way
# whereby 'Package does not match intended download. Suggestion: run yum --enablerepo=nodesource clean metadata'
# tracked at https://github.com/nodesource/distributions/issues/1290.
# For the time being lets install an older version.
yum clean all
yum install nodejs - || yum install nodejs-14.17.1-1nodesource -y
npm install -g n
curl -o- -L https://yarnpkg.com/install.sh | bash
export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
yarn install
yarn lint
yarn build
yarn test:ci
