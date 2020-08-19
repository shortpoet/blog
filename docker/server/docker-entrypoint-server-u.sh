#!/bin/bash
set -e


if [ "${DOCKER}" == "1" ]; then
  filename=$(basename $0)
  source colors.cfg

else
  DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
  PARENT=$(dirname $DIR)
  source "$PARENT/.env"
  source "$PARENT/colors.cfg"
  filename=$(basename ${BASH_SOURCE})
  echo $PROVIDER
fi

. ~/.bashrc

# source colors.cfg
# filename=$(basename $0)


# DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
# PARENT=$(dirname $DIR)
# source "$PARENT/.env"
# source "$PARENT/colors.cfg"
# filename=$(basename ${BASH_SOURCE})
# echo $PROVIDER

echo -e "${Cyan}The ${Yellow}${COMPOSE_PROJECT_NAME} ${filename} ${Cyan}script has been executed"

# https://docs.docker.com/compose/startup-order/
host="$1"
echo -e "${LightPurple}Host is $host${NC}"
shift
cmd="$@"

if [ "${PROVIDER}" == "postgres" ]; then
  echo -e "${Green}Running under ${LightBlue}Postgres"
  until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U "$POSTGRES_USER" "$POSTGRES_DB" -c '\q'; do
  >&2 echo -e "${Green}Postgres is ${BrownOrange}unavailable ${Green}- sleeping"
  sleep 2
done

# https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-configure-docker?view=sql-server-ver15
# The IP address in the connection string is the IP address of the host machine that is running the container.
else
  echo -e "${Green}Running under ${LightBlue}Sql Server"
  # sqlcmd -?
  # sqlcmd -S db.mssql -U test -P 8H7g6F5d -d shortpoetdb -q "Select * from vcc.admin_users"
  # sqlcmd -S 192.168.1.108 -U test -P 8H7g6F5d -d shortpoetdb -q "Select * from vcc.admin_users"
  until sqlcmd -S db.mssql -U test -P 8H7g6F5d -d shortpoetdb -q "Select * from vcc.admin_users"; do
  >&2 echo -e "${Green}Mssql is ${BrownOrange}unavailable ${Green}- sleeping"
  sleep 2
done
fi

>&2 echo -e "${LightBlue}${PROVIDER} Database is up - ${Red}executing command${NC}"
exec $cmd

# while ! nc -z rabbitmq 5672; do sleep 3; done

# exec "$@"
