#!/usr/bin/env bash

wget https://rpm.nodesource.com/pub_16.x/el/7/x86_64/nodejs-16.17.0-1nodesource.x86_64.rpm
yum clean all
yum install -y ./nodejs-16.17.0-1nodesource.x86_64.rpm
npm install -g n
curl -o- -L https://yarnpkg.com/install.sh | bash
export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
yarn install --frozen-lockfile
yarn lint
yarn build
yarn test:ci
