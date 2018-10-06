#!/bin/bash -x

echo "1/3) Compile sources ..."
NODE_ENV=production webpack --config webpack.server.config.js --progress

echo "2/3) Starting node process ..."
NODE_ENV=production CONFIG=staging node server/dist/build.js

echo "Deployment complete"
