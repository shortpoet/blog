#!/bin/bash

# https://stackoverflow.com/questions/965053/extract-filename-and-extension-in-bash
# filename=$(basename -- "$fullfile")
# extension="${filename##*.}"
# filename="${filename%.*}"

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PARENT=$(dirname $DIR)
env_file="$PARENT/.env"
source $env_file
source "$DIR/colors.cfg"
filename=$(basename ${BASH_SOURCE})
echo -e "${Cyan}The ${Yellow}${COMPOSE_PROJECT_NAME} ${filename} ${Cyan}script has been executed"

winpty docker exec -it "${COMPOSE_PROJECT_NAME}_db_1" psql -U ${POSTGRES_USER} ${POSTGRES_DB} "$@"
