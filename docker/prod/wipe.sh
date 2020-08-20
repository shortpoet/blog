#!/bin/bash
set -e

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PARENT=$(dirname $DIR)
filename=$(basename ${BASH_SOURCE})
dir_file="$(basename $PARENT)/$filename"
env_file="$PARENT/.env"
source $env_file
source "$PARENT/colors.cfg"

echo -e "${Cyan}The ${Yellow}${COMPOSE_PROJECT_NAME} ${dir_file} ${Cyan}script has been executed${NC}"

docker-compose -f docker-compose.prod.yml down --rmi local --remove-orphans --volumes

docker image rm vcc.client.prod vcc.server:ubuntu
