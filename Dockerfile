FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY ./package.json .
RUN npm i

FROM base AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 5000
CMD npm run start-prod
