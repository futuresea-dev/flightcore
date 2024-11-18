#!/bin/bash

ENV_FILE=".env"
PRODUCTION_ENV_FILE=".env.production"
DEVELOPMENT_ENV_FILE=".env.development"
PRERELEASE_ENV_FILE=".env.prerelease"

# Check if .env file exists
if [ ! -f "$ENV_FILE" ]; then
    # Check if NODE_ENV is set
    if [ -z "$NODE_ENV" ]; then
        echo "NODE_ENV is not set. Using development environment."
        NODE_ENV="development"
    fi

    # Check NODE_ENV value
    case "$NODE_ENV" in
        production)
            # Use .env.production file
            cp "$PRODUCTION_ENV_FILE" "$ENV_FILE"
        ;;
        prerelease)
            # Use .env.prerelease file
            cp "$PRERELEASE_ENV_FILE" "$ENV_FILE"
        ;;
        *)
            # Use .env.development file
            cp "$DEVELOPMENT_ENV_FILE" "$ENV_FILE"
        ;;
    esac
fi


exit 0