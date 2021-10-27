tsc=./node_modules/typescript/lib/tsc
node $tsc --build src/web/tsconfig.prod.json
node ./dist/tools/ImportJsFolder.js
echo "Compiled in $SECONDS seconds."