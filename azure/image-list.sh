#!/bin/bash

set -e
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# shellcheck source=$DIR/dev.env
. $DIR/dev.env
# shellcheck source=$DIR/colors.cfg
. $DIR/colors.cfg
# shellcheck source=$DIR/log.sh
. $DIR/log.sh

filename=$(basename ${BASH_SOURCE[0]})
filename=`echo $filename | awk -F\. '{print $1}'`
log=$DIR/logs/$filename-$TARGET
env_file=$DIR/image.env

if [ -f $log ]; then
  cp $log "$log.bak"
fi

exec 3>&1 4>&2
trap 'exec 2>&4 1>&3' 0 1 2 3
exec 1>$log 2>&1

echo "=================================================================================" >&3
log "${CY}The ${YL}${COMPOSE_PROJECT_NAME} ${filename} ${CY}script has been executed${NC}"

log "${GR}Show images for repo $ACR in res grp $RG${NC}"

TEST="$( az acr repository list --name $ACR --output tsv 2>&1; printf :%s "${PIPESTATUS[*]}" )"
declare -a PIPESTATUS2=( "${TEST##*:}" )  # make array w/ content after final colon
if [[ -n "${TEST%:*}" ]]; then          # if there was original output
  TEST="${TEST%:*}"                     # remove trailing results from $TEST
  TEST="${TEST%$'\n'}"                  # remove trailing \n like plain $(…)
else
  TEST=""                               # no original output -> empty string
fi

# exit if fail
log "Setting ${YL}\$image${NC} to ${LB}$TEST${NC}" | sed -r "s/[\n\r\s\t]//g"
if [ ${PIPESTATUS2[*]} -eq 1 ]; then
  exit;
fi

# export image=$TEST
env_var='IMAGE'
env_value=$TEST

log "Setting ${YL}\$env_var${NC} to ${LB}${env_value}${NC}"

perl -i -pe "s#${env_var}=.*#${env_var}=${env_value}#g" "${env_file}"
log "Current value and line number => $(grep -n "${env_var}=.*" "${env_file}")"
