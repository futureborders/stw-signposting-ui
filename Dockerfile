# Build stage
FROM node:16-alpine AS build

ENV PATH /app/node_modules/.bin:$PATH
ENV YARN_CACHE_FOLDER /tmp/.yarn/cache

RUN mkdir /build && \
    mkdir /app

WORKDIR /build

COPY . .

RUN yarn install --immutable && \
    yarn build:ci

RUN cp -r yarn.lock package.json src dist public .well-known /app/

WORKDIR /app

RUN yarn install --immutable --production

# Production stage
FROM node:16-alpine

ENV PORT 8080

RUN apk update && \
    addgroup -g 1001 -S appuser && \
    adduser -u 1001 -S appuser -G appuser && \
    mkdir -p /home/appuser /app && \
    chown -R appuser:appuser /home/appuser && \
    chown -R appuser:appuser /app

WORKDIR /app

COPY --from=build --chown=appuser:appuser /app/ /app/

EXPOSE $PORT

USER appuser

CMD ["yarn", "start:dist"]
