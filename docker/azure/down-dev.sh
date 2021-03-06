#!/bin/bash
set -e

dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PARENT=$(dirname $dir)
filename=$(basename ${BASH_SOURCE})
dir_file="$(basename $dir)/$filename"
env_file="$PARENT/.env"
source $env_file
source "$PARENT/colors.cfg"

echo -e "${CY}The ${YL}${COMPOSE_PROJECT_NAME} ${dir_file} ${CY}script has been executed${NC}"

docker-compose -f docker-compose.dev.azure.yml down --rmi local --remove-orphans --volumes
