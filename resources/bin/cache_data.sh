#!/bin/bash

cd $(dirname $0)/../..
mkdir -p data
ids=$(grep 'id: ' resources/js/config.js | sed -r 's/[^0-9]//g' | tr '\n' ' ')
for id in $ids; do
  curl -sfL "http://www.velib.paris/service/stationdetails/paris/$id" > /tmp/datavelib
  if [ "$?" -eq 0 ] && grep '<?xml ' /tmp/datavelib > /dev/null; then
    php -r 'echo json_encode(simplexml_load_file("/tmp/datavelib"));' > data/$id 2> /dev/null
  fi
done
