FROM node:24.7-alpine3.21 AS base

WORKDIR /usr/src/app

RUN npm i -g pnpm

FROM base AS build

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM base AS release

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/src/db/migrations ./src/db/migrations

CMD ["pnpm", "start:prod"]
