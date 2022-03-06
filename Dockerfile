FROM node:14-alpine as development

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install && npm run build

FROM node:14-alpine as production

ARG NODE_ENV=production

ARG ENV_TAG=development

ENV NODE_ENV=${NODE_ENV}

USER node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production --silent

COPY .env.${ENV_TAG} ./.env

COPY --chown=node:node --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/src/main"]

EXPOSE 8000