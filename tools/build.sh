#!/bin/bash
# env file
ENV_FILE_PATH=./.env

echo "[INFO] Using $ENV_FILE_PATH"

# sourcing env vars from env file
ENV_ARGS=$(egrep -v '^#' ${ENV_FILE_PATH} | xargs)

# logging env for dramatic effect
node -e "console.log('[INFO] ENV VARS \n',' ${ENV_ARGS}'.split(' ').join('\n --> '))"

echo "[INFO] Evaluating docker-compose"

# logging docker-compose.yml file with .env vars
eval $ENV_ARGS docker-compose config

echo "[INFO] Building Docker Image >>>";
echo "[INFO] Running command docker-compose build --no-cache"
echo "[INFO] For more info visit https://docs.docker.com/compose/reference/build"

# running build process by passing ENV_ARGS as arguments
# # --no-cache https://docs.docker.com/compose/reference/build
# eval $ENV_ARGS docker-compose build --no-cache