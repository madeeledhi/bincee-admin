echo "Initiating client build ..."

echo "1/1) Building client scripts ..."
NODE_ENV=production CONFIG=production webpack --config webpack.production.config.js --progress

echo "Client building complete."
