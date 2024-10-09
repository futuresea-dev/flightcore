FROM node:lts-slim

ARG PUBLIC_BOOKING_IFRAME_SRC
ARG CONTACT_WEBHOOK_URL
ARG CONTACT_WEBHOOK_TOKEN_KEY
ARG CONTACT_WEBHOOK_TOKEN_VALUE

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

EXPOSE 4321

CMD ["node", "./app/dist/server/entry.mjs"]