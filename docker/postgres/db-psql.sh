#!/bin/bash

# https://stackoverflow.com/questions/965053/extract-filename-and-extension-in-bash
# filename=$(basename -- "$fullfile")
# extension="${filename##*.}"
# filename="${filename%.*}"

dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PARENT=$(dirname $dir)
env_file="$PARENT/.env"
source $env_file
source "$PARENT/colors.cfg"
filename=$(basename ${BASH_SOURCE})
echo -e "${CY}The ${YL}${COMPOSE_PROJECT_NAME} ${filename} ${CY}script has been executed"

winpty docker exec -it "${COMPOSE_PROJECT_NAME}_db.${PROVIDER}_1" psql -U ${POSTGRES_USER} ${POSTGRES_DB} "$@"
