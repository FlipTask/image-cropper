#!/bin/bash

npm ci;

npm run install;

npm rebuild node-sass;

npm build;

echo "------ Building Docker Image -------";

docker-compose build --no-cache