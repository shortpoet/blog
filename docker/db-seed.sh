#!/bin/bash

# https://stackoverflow.com/questions/965053/extract-filename-and-extension-in-bash
# filename=$(basename -- "$fullfile")
# extension="${filename##*.}"
# filename="${filename%.*}"

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PARENT=$(dirname $DIR)
source "$PARENT/.env"
source "$DIR/colors.cfg"
filename=$(basename ${BASH_SOURCE})
echo -e "${Cyan}The ${Yellow}${COMPOSE_PROJECT_NAME} ${filename} ${Cyan}script has been executed"

winpty docker exec -it kanban_db_1 psql -U test kanban -a -f sql/seed_data.sql "$@"
