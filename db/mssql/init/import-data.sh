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

# for i in {1..50};
# do
#     /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 8H7g6F5d -d master -i $DIR/run.sql
#     if [ $? -eq 0 ]
#     then
#         echo -e "${Green}setup.sql completed${NC}"
#         break
#     else
#         echo "${LightPurple}not ready yet...${NC}"
#         sleep 1
#     fi
# done

# https://docs.docker.com/compose/startup-order/
# host="$1"
# shift
# cmd="$@"

echo -e "${Green}Starting ${BrownOrange}test ${Green}- now"

until /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 8H7g6F5d -d master -i $DIR/run.sql; do
  >&2 echo -e "${Green}Mssql is ${BrownOrange}unavailable ${Green}- sleeping"
  sleep 2
done
  
>&2 echo -e "${LightBlue}Mssql is up - ${Red}executing command${NC}"
# exec $cmd

echo -e "${Green}Ending ${BrownOrange}test ${Green}- now"

# echo test

# export MY_DIR="${PWD:2}"

# ls

# exec docker-entrypoint.sh

# exec "$@"
# cd /usr/src/app
# /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 8H7g6F5d -d master -i run.sql

# Sqlcmd: Error: Microsoft ODBC Driver 17 for SQL Server : Login timeout expired.
