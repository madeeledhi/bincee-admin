#!/bin/bash -x

echo "1/7) Compile sources ..."
NODE_ENV=production webpack --config webpack.server.config.js --progress

echo "2/7) Stopping existing node process ..."
forever stop vizdev

echo "3/7) Starting node process ..."
NODE_ENV=production CONFIG=staging forever start --uid "vizdev" --append -c "node server/dist/build.js" .

echo "Deployment complete"
