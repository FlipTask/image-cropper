#!/bin/bash

ENV_FILE_PATH=./env/prod.env

echo "[INFO] Using $ENV_FILE_PATH"

# sourcing env vars from env file
ENV_ARGS=$(egrep -v '^#' ${ENV_FILE_PATH} | xargs)


echo "[INFO] Deploying Container >>>";

docker-compose down;

echo $ENV_ARGS

eval $ENV_ARGS docker-compose config

eval $ENV_ARGS  docker-compose up -d