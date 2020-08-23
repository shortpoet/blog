#!/bin/bash

# set shell options
set -Eeu
set -o pipefail
shopt -s execfail

# az=`where az.cmd`

# $dir for imports
dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# config / env
project_env_file=$dir/project.env
# shellcheck source=$dir/project.env
. $project_env_file
# shellcheck source=$dir/colors.cfg
. $dir/colors.cfg
# shellcheck source=$dir/log.sh
. $dir/log.sh
# shellcheck source=$dir/set_env.sh
. $dir/set_env.sh

# local vars
filename=$(basename ${BASH_SOURCE[0]})
filename=`echo $filename | awk -F\. '{print $1}'`
log=$dir/logs/$filename-$TARGET
image_env_file=$dir/image.env

# backup logfile
if [ -f $log ]; then
  cp $log "$log.bak"
fi

# set redirection
exec 3>&1 4>&2
trap 'exec 2>&4 1>&3' 0 1 2 3
exec 1>$log 2>&1

# header
echo "=================================================================================" >&3
log "${CY}The ${YL}${COMPOSE_PROJECT_NAME} ${filename} ${CY}script has been executed${NC}"

# get acr reg id
log "${GR}Getting acr registry id${NC}" 2>&1
# save retval of pipe
TEST="$(az acr show --name $ACR --query id --output tsv 2>&1; printf :%s "${PIPESTATUS[*]}" )"
declare -a PIPESTATUS2=( "${TEST##*:}" )  # make array w/ content after final colon
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

# set_env in file
env_var='ACR_REGISTRY_ID'
env_value=$TEST
log "$(set_env $env_var $env_value $project_env_file $log 2>&1)" 

# Create the service principal with rights scoped to the registry.
# Default permissions are for docker pull access. Modify the '--role'
# argument value as desired:
# acrpull:     pull only
# acrpush:     push and pull
# owner:       push, pull, and assign roles
log "${GR}Getting service principal password${NC}" 2>&1
log "${GR}ACR reg is: ${LB}$ACR_REGISTRY_ID${NC}" 2>&1
# resource env file in case first time setting val
# shellcheck source=$dir/project.env
. $project_env_file

# az ad sp create-for-rbac  --debug --name http://--scopes --role owner --query password --output tsv

# TEST="$(az ad sp create-for-rbac --name http://$SERVICE_PRINCIPAL_NAME --scopes ${ACR_REGISTRY_ID} --role $SP_ROLE --query password --output tsv 2>&1; printf :%s "${PIPESTATUS[*]}" )"
# if exists use this otherwise throws error
TEST="$(az ad sp create-for-rbac --skip-assignment --scopes ${ACR_REGISTRY_ID} --role $SP_ROLE --query password --output tsv 2>&1; printf :%s "${PIPESTATUS[*]}" )"
# save retval of pipe
declare -a PIPESTATUS2=( "${TEST##*:}" )  # make array w/ content after final colon
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

# set_env in file
env_var='SP_PASS'
env_value=$TEST
log "$(set_env $env_var $env_value $project_env_file $log 2>&1)" 


log "${GR}Getting service principal app id${NC}" 2>&1
# save retval of pipe
TEST="$(az ad sp show --id http://$SERVICE_PRINCIPAL_NAME --query appId --output tsv 2>&1; printf :%s "${PIPESTATUS[*]}" )"
declare -a PIPESTATUS2=( "${TEST##*:}" )  # make array w/ content after final colon
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

# set_env in file
env_var='SP_APP_ID'
env_value=$TEST
log "$(set_env $env_var $env_value $project_env_file $log 2>&1)" 

# Output the service principal's credentials; use these in your services and
# applications to authenticate to the container registry.
log "${PP}Service principal ID: ${LG}$SP_APP_ID${NC}"
log "${PP}Service principal password: ${LG}${SP_PASS:?Must be assigned}{NC}"

exit