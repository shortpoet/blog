#!/bin/bash
set -e

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PARENT=$(dirname $DIR)
env_file="$PARENT/.env"
source $env_file
source "$PARENT/colors.cfg"
filename=$(basename ${BASH_SOURCE})

echo -e "${Cyan}The ${Yellow}${COMPOSE_PROJECT_NAME} ${filename} ${Cyan}script has been executed"

if [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    echo -e "${Green}Running under ${LightBlue}GNU/Linux"
    POSTGRES_HOST=172.17.0.1
    PGVOLUME=/var/lib/postgresql/pgdata
    echo -e "${Yellow}Setting POSTGRES_HOST to ${LightBlue}${POSTGRES_HOST}"
    echo -e "${Yellow}Setting PGVOLUME to ${LightBlue}${PGVOLUME}"
    
    # Do something under GNU/Linux platform
else
    echo -e "${Green}Not running under ${LightBlue}GNU/Linux"
    POSTGRES_HOST=db.postgres
    PGVOLUME=/var/lib/postgresql/data
    echo -e "${Yellow}Setting POSTGRES_HOST to ${LightBlue}${POSTGRES_HOST}"
    echo -e "${Yellow}Setting PGVOLUME to ${LightBlue}${PGVOLUME}"
fi
# export POSTGRES_HOST=$POSTGRES_HOST

perl -i -pe "s/POSTGRES_HOST=.*/POSTGRES_HOST=${POSTGRES_HOST}/g" "${env_file}"
# replacement string contains '/' which is separator causing error:
    # unknown regexp modifier "/v" at -e line 1, at end of line
    # use different separator '#'
perl -i -pe "s#PGVOLUME=.*#PGVOLUME=${PGVOLUME}#g" "${env_file}"

grep -n "POSTGRES_HOST=.*" "${env_file}" | xargs echo -e "${Green}Current value and line number =>${LightBlue}"
grep -n "PGVOLUME=.*" "${env_file}" | xargs echo -e "${Green}Current value and line number =>${LightBlue}"

docker-compose up

# echo -e "Current value and line number => `grep -n "POSTGRES_HOST=.*" "${env_file}"`"