# Install Stage
FROM node:16-alpine AS installer

## Create app directory
WORKDIR /app

## A wildcard is used to ensure both package.json AND yarn.lock are copied
COPY package.json yarn.lock ./

## Install app dependencies
RUN yarn --production

COPY . .

# Builder Stage
FROM node:16-alpine AS builder

## Create app directory
WORKDIR /app

## Copy artifacts from installer
COPY --from=installer /app/. .

## Install development dependencies
RUN yarn

## Build application
RUN yarn build

## Create version file
ARG CI_COMMIT_SHORT_SHA
ARG CI_PIPELINE_ID
RUN echo "{\"commit\":\"$CI_COMMIT_SHORT_SHA\",\"build\":\"$CI_PIPELINE_ID\"}" > VERSION.json

# Run Stage
FROM node:16-alpine

RUN npm install -g pm2@5.1.2 && \
  npm install -g yarn@1.22.17 --force && \
  chmod +x /usr/local/bin/yarn

## Setup working directory
WORKDIR /app

ENV NO_COLOR=true

## Copy from installer, for production dependencies
COPY --from=installer /app/pm2.json .
COPY --from=installer /app/package.json .
COPY --from=installer /app/node_modules/. node_modules/.

## Copy static files from builder stage to be service by node server
COPY --from=builder /app/VERSION.json .
COPY --from=builder /app/dist/. dist/.

CMD [ "pm2-runtime", "start", "pm2.json" ]
