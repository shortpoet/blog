#!/bin/bash
set -e

# this throws bad substitution error
# also weird that there was no way to source colors file
# might be because it's run from another script
# was because this image uses ubuntu or something that uses bash not sh
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
. $DIR/colors.cfg
filename=$(basename ${BASH_SOURCE[0]})
# filename=docker-entrypoint-db.sh

echo -e "${Cyan}The ${Yellow}${COMPOSE_PROJECT_NAME} ${filename} ${Cyan}script has been executed"

/opt/mssql/bin/sqlservr & $DIR/import-data.sh

# echo test

# export MY_DIR="${PWD:2}"

# ls

# exec docker-entrypoint.sh

# exec "$@"
