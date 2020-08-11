#!/bin/bash
set -e

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PARENT=$(dirname $DIR)
env_file="$PARENT/.env"
source $env_file
source "$DIR/colors.cfg"
filename=$(basename ${BASH_SOURCE})

echo -e "${Cyan}The ${Yellow}${COMPOSE_PROJECT_NAME} ${filename} ${Cyan}script has been executed"

if [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    echo -e "${Green}Running under ${LightBlue}GNU/Linux"
    POSTGRES_HOST=172.17.0.1
    echo -e "${Yellow}Setting POSTGRES_HOST to ${LightBlue}${POSTGRES_HOST}"
    
    # Do something under GNU/Linux platform
else
    echo -e "${Green}Not running under ${LightBlue}GNU/Linux"
    POSTGRES_HOST=host.docker.internal
    echo -e "${Yellow}Setting POSTGRES_HOST to ${LightBlue}${POSTGRES_HOST}"
fi
# export POSTGRES_HOST=$POSTGRES_HOST

perl -i -pe "s/POSTGRES_HOST=.*/POSTGRES_HOST=${POSTGRES_HOST}/g" "${env_file}"

grep -n "POSTGRES_HOST=.*" "${env_file}" | xargs echo -e "Current value and line number =>"

docker-compose up

# echo -e "Current value and line number => `grep -n "POSTGRES_HOST=.*" "${env_file}"`"