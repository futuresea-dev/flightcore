FROM node:lts-slim AS build
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM httpd:2.4 AS runtime
COPY --from=build /app/apps/frontend/dist /usr/local/apache2/htdocs/
EXPOSE 80