#!/bin/bash

ENV_FILE=".env"
PRODUCTION_ENV_FILE=".env.production"
DEVELOPMENT_ENV_FILE=".env.development"

# Check if .env file exists
if [ ! -f "$ENV_FILE" ]; then
  # Check NODE_ENV value
  if [ "$NODE_ENV" = "production" ]; then
    # Use .env.production file
    cp "$PRODUCTION_ENV_FILE" "$ENV_FILE"
  else
    # Use .env.development file
    cp "$DEVELOPMENT_ENV_FILE" "$ENV_FILE"
  fi
fi

# Load environment variables from .env file
set -o allexport
source "$ENV_FILE"
set +o allexport