FROM node:lts-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
ENV HOST=0.0.0.0
ENV PORT=10005
EXPOSE 10005
# COPY /app/node_modules /app/node_modules
# COPY /app/dist /app/dist

CMD node ./app/apps/frontend/server/entry.mjs