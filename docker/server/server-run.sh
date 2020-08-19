#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PARENT=$(dirname $DIR)
source "$PARENT/.env"
source "$PARENT/colors.cfg"
filename=$(basename ${BASH_SOURCE})

echo -e "${Cyan}The ${Yellow}${COMPOSE_PROJECT_NAME} ${filename} ${Cyan}script has been executed"

docker run --rm -v ${PWD}/server:/usr/src/app -v notused:/usr/src/app/node_modules -p 5000:5000 vcc.server:alpine
