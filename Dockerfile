FROM node:14-alpine3.14

RUN npm install -g npm

ENV PORT 8080
# ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH

RUN apk update && \
    addgroup -g 1001 -S appuser && \
    adduser -u 1001 -S appuser -G appuser && \
    mkdir -p /home/appuser /app && \
    chown -R appuser:appuser /home/appuser && \
    chown -R appuser:appuser /app

WORKDIR /app

ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn install --pure-lockfile && \
    ln -s /tmp/node_modules /app/node_modules

COPY . .

RUN cd /app && yarn build:ci

EXPOSE $PORT

USER appuser

CMD ["yarn", "start"]
