#!/bin/bash

set -e
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

. $DIR/dev.conf
. $DIR/colors.cfg

filename=$(basename ${BASH_SOURCE[0]})
filename=`echo $filename | awk -F\. '{print $1}'`
log=$DIR/logs/$filename-$target

if [ -f $log ]; then
  cp $log "$log.bak"
fi

exec 3>&1 4>&2
trap 'exec 2>&4 1>&3' 0 1 2 3
exec 1>$log 2>&1

# log message
log(){
	local m="$@"
	echo -e "*** ${m} ***" >&3
	echo "=================================================================================" >&3
  local r="$@"
	echo "================================================================================="
	echo -e "*** $r ***" | sed -r "s/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[mGK]//g"
	echo "================================================================================="
}

echo "=================================================================================" >&3
log "${Cyan}The ${Yellow}${COMPOSE_PROJECT_NAME} ${filename} ${Cyan}script has been executed${NC}"

log "${Green}Display full login server name for acr $rg${NC}"
# login server = acr_full
acr_full=$(az acr show --name $acr --query loginServer --output tsv) 
# options
# --output -o: Output format.  Allowed values: json, jsonc, none, table, tsv, yaml, yamlc.  Default: json.

log "${Purple}The login server is ${LightPurple}$acr_full${NC}" 2>&1

log "${Green}Logging in${NC}" 2>&1
# save retval of pipe
TEST="$( az acr login --name $acr --verbose 2>&1; printf :%s "${PIPESTATUS[*]}" )"
declare -a PIPESTATUS2=( ${TEST##*:} )  # make array w/ content after final colon
if [[ -n "${TEST%:*}" ]]; then          # if there was original output
  TEST="${TEST%:*}"                     # remove trailing results from $TEST
  TEST="${TEST%$'\n'}"                  # remove trailing \n like plain $(…)
else
  TEST=""                               # no original output -> empty string
fi

# exit if fail
log "$TEST"
if [ ${PIPESTATUS2[*]} -eq 1 ]; then
  exit;
fi
