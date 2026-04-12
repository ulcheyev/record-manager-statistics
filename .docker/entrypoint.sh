#!/bin/sh
set -eu

envsubst \
  '${BASE_PATH} \
   ${RM_BASE_PATH} \
   ${API_URL} \
   ${AUTH_URL} \
   ${REALM} \
   ${CLIENT_ID} \
   ${APP_TITLE} \
   ${APP_MODE}' \
  < /etc/nginx/runtime-env.template.js \
  > /var/www/runtime-env.js

exec "$@"