#!/bin/bash

# https://stackoverflow.com/questions/965053/extract-filename-and-extension-in-bash
# extension="${filename##*.}"
# filename="${filename%.*}"


DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PARENT=$(dirname $DIR)
source "$PARENT/.env"
source "$DIR/colors.cfg"
filename=$(basename ${BASH_SOURCE})
echo -e "${Cyan}The ${Yellow}${COMPOSE_PROJECT_NAME} ${filename} ${Cyan}script has been executed"
echo -e "${Green}The parent dir is ${Yellow}${PARENT} ${Green}and project name is ${Cyan}${COMPOSE_PROJECT_NAME}${NC}"

# winpty docker run --rm \
#   --env-file docker.env \
#   --name kanban_db_1 \
#   -v "${PWD}/sql/create_schema.sql:/docker-entrypoint-initdb.d/create_schema.sql:ro" \
#   -v "${PWD}/postgres-data:/var/lib/postgresql/data" \
#   --network "${COMPOSE_PROJECT_NAME}_${COMPOSE_PROJECT_NAME}net" \
#   -p 5432:5432 postgres:12 \

# https://github.com/quay/clair/issues/134

# https://github.com/entropic-dev/entropic/issues/190
# https://github.com/entropic-dev/entropic/issues/190#issuecomment-499733956

# sudo netstat -ntlp | grep 5432


# sudo docker run --name postgresql -itd --restart always \
#   --publish 5432:5432 \
#   --volume /srv/docker/postgresql:/var/lib/postgresql \
#   --env 'PG_TRUST_LOCALNET=true' \
#   --env 'PG_PASSWORD=1234' \
#   --env 'DB_USER=mypgsql' --env 'DB_PASS=1234' \
#   --env 'DB_NAME=myDB' \
#   sameersbn/postgresql:9.4-18