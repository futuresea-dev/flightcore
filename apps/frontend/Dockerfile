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

# Install dotenvx
RUN curl -sfS https://dotenvx.sh/install.sh | sh

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm run build:production  

EXPOSE 4321

CMD ["dotenvx", "run", "-f", ".env.production", "--", "node", "/app/apps/frontend/dist/server/entry.mjs"]