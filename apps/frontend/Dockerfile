# Use a lightweight Node.js image
FROM node:lts-slim

# Set PNPM environment variables
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

# Enable Corepack and prepare PNPM
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set the working directory for the workspace
WORKDIR /workspace

# Copy workspace-level files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# Install workspace dependencies
RUN pnpm install --frozen-lockfile

# Copy the entire workspace into the container
COPY . .

# Change to the frontend app directory
WORKDIR /workspace/apps/frontend

# Install frontend-specific dependencies
RUN pnpm install --filter=@flightcore/frontend --frozen-lockfile

# Build the frontend app
RUN pnpm run build:production

# Expose the port for the frontend app
EXPOSE 4321

# Start the SSR app
CMD ["node", "dist/server/entry.mjs"]
