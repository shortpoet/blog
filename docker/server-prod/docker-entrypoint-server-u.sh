#!/bin/bash
set -e

if [ "${DOCKER}" == "1" ]; then
  filename=$(basename $0)
  source colors.cfg

else
  dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
  PARENT=$(dirname $dir)
  source "$PARENT/.env"
  source "$PARENT/colors.cfg"
  filename=$(basename ${BASH_SOURCE})
  echo $PROVIDER
fi

. ~/.bashrc

echo -e "${CY}The ${YL}${COMPOSE_PROJECT_NAME} ${filename} ${CY}script has been executed"

yarn start

# cmd="$@"

# exec $cmd

# while ! nc -z rabbitmq 5672; do sleep 3; done

# exec "$@"
