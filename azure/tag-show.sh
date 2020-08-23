#!/bin/bash

echo hello
set -e
dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# shellcheck source=$dir/project.env
. $dir/project.env
# shellcheck source=$dir/colors.cfg
. $dir/colors.cfg
# shellcheck source=$dir/log.sh
. $dir/log.sh
# shellcheck source=$dir/set_env.sh
. $dir/set_env.sh

filename=$(basename ${BASH_SOURCE[0]})
filename=`echo $filename | awk -F\. '{print $1}'`
env_file=$dir/image.env

# shellcheck source=$dir/image.env
. $env_file

# shellcheck source=$dir/colors.cfg
log=$dir/logs/$filename-$TARGET

if [ -f $log ]; then
  cp $log "$log.bak"
fi

exec 3>&1 4>&2
trap 'exec 2>&4 1>&3' 0 1 2 3
exec 1>$log 2>&1

echo "=================================================================================" >&3
log "${CY}The ${YL}${COMPOSE_PROJECT_NAME} ${filename} ${CY}script has been executed${NC}"

log "${GR}Show tags for image ${PP}$IMAGE ${GR}in res grp ${PP}$RG${NC}"

TEST="$( az acr repository show-tags --name $ACR --repository $IMAGE --output tsv 2>&1; printf :%s "${PIPESTATUS[*]}" )"
declare -a PIPESTATUS2=( "${TEST##*:}" )  # make array w/ content after final colon
if [[ -n "${TEST%:*}" ]]; then          # if there was original output
  TEST="${TEST%:*}"                     # remove trailing results from $TEST
  TEST="${TEST%$'\n'}"                  # remove trailing \n like plain $(…)
else
  TEST=""                               # no original output -> empty string
fi

# exit if fail
log "${YL}Tag${NC} is ${LB}$TEST${NC}" | sed -r "s/[\r\n\s\t]//g"
if [ "${PIPESTATUS2[*]}" -eq 1 ]; then
  exit;
fi
# export image=$TEST
env_var='TAG'
env_value=$TEST

log "Setting ${YL}\$${env_var}{NC} to ${LB}$TEST${NC}" | sed -r "s/[\r\n\s\t]//g"

set_env $env_var $env_value $env_file

exit