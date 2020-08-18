#!/bin/sh
set -e

source colors.cfg
filename=$(basename $0)

echo -e "${Cyan}The ${Yellow}${COMPOSE_PROJECT_NAME} ${filename} ${Cyan}script has been executed"

# https://docs.docker.com/compose/startup-order/
host="$1"
shift
cmd="$@"

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U "$POSTGRES_USER" "$POSTGRES_DB" -c '\q'; do
  >&2 echo -e "${Green}Postgres is ${BrownOrange}unavailable ${Green}- sleeping"
  sleep 2
done
  
>&2 echo -e "${LightBlue}Postgres is up - ${Red}executing command${NC}"
exec $cmd

# while ! nc -z rabbitmq 5672; do sleep 3; done

# exec "$@"
