#!/bin/bash

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
. $DIR/colors.cfg
filename=$(basename ${BASH_SOURCE[0]})

echo -e "${Cyan}The ${Yellow}${COMPOSE_PROJECT_NAME} ${filename} ${Cyan}script has been executed"

# cmd='sqlcmd -S localhost -U test -P  -d shortpoetdb -q ":exit(select count(*) from vcc.admin_users)"'
# echo "command is $cmd"

# RESULT=`sqlcmd -S localhost -U test -P  -d shortpoetdb -q ":exit(select count(*) from vcc.admin_users)"`
# until RESULT=`sqlcmd -S localhost -U test -P  -d shortpoetdb -q "set nocount on; select count(*) from vcc.admin_users" -h -1`; do
# echo xxxxxxx
# done
# if [ "$RESULT" == "4" ]; then
#     echo YES
# fi

RESULT=`sqlcmd -h -1 -t 1 -S localhost -U test -P  -d shortpoetdb -Q "set nocount on; select count(*) from vcc.admin_users"`
for i in $RESULT; do
  echo $i
done

if [ $RESULT -gt 0 ]; then
  echo "Result is $RESULT"
else
  echo "No result"
fi



# sqlcmd -S localhost -U test -P  -d shortpoetdb -q ":exit(select count(*) from vcc.admin_users)"

# query=":exit(select count(*) from vcc.admin_users)"

# cmd='sqlcmd -S localhost -U test -P  -d shortpoetdb -q "'"$query"'"'
# cmd='sqlcmd -S localhost -U test -P  -d shortpoetdb -q $1'
# cmd="sqlcmd -S localhost -U test -P  -d shortpoetdb -q \":exit(select count(*) from vcc.admin_users)\""
# cmd=(sqlcmd -S localhost -U test -P  -d shortpoetdb -q ":exit(select count(*) from vcc.admin_users)")
# cmd="$(sqlcmd -S localhost -U test -P  -d shortpoetdb -q "$query")"


# $(cmd)
# $cmd """$query"""

# exec $cmd

# ($cmd)

# if ('sqlcmd -S localhost -U test -P  -d shortpoetdb -q ":exit(select count(*) from vcc.admin_users)"'); then
#   echo -e "${Green}Starting ${BrownOrange}test ${Green}- now"
# fi


echo -e "${Green}Ending ${BrownOrange}test ${Green}- now"
  
# >&2 echo -e "${LightBlue}Mssql is up - ${Red}executing command${NC}"



# exec $cmd
