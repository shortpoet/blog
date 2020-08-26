#!/bin/bash

# set shell options
set -Eeu
set -o pipefail
shopt -s execfail

# az=`where az.cmd`

# $dir for imports
dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# config / env
registry_env_file=$dir/registry.env
# shellcheck source=$dir/registry.env
. $registry_env_file
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

# service_env_file=$dir/server.env
# # shellcheck source=$dir/server.env
# service_env_file=$dir/client.env
service_env_file=$1
# shellcheck source=$1
. "$service_env_file"



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
log "${GR}Creating container $CONTAINER${NC}" 2>&1
# save retval of pipe


cmd="az container create \
  --resource-group $RG \
  --name $CONTAINER \
  --image "$ACR_FULL/$IMAGE:$TAG" \
  --cpu 1 \
  --memory 1 \
  --registry-login-server $ACR_FULL \
  --registry-username $SP_APP_ID \
  --registry-password $SP_PASS \
  --dns-name-label $DNS_NAME_LABEL \
  --ports $PORTS \
  --environment-variables $ENV_VARS"

# log "$cmd"
TEST="$( $cmd 2>&1; printf :%s "${PIPESTATUS[*]}" )"
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

cmd="az container show \
-n $CONTAINER \
--query ipAddress.fqdn \
-o tsv \
-g $RG"

# log "$cmd"
TEST="$( $cmd 2>&1; printf :%s "${PIPESTATUS[*]}" )"
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
env_var='FQDN'
env_value=$TEST

log "$(set_env $env_var $env_value $service_env_file $log 2>&1)" 
# vs - the bottom doesn't redirect pipe 4
# set_env $env_var $env_value $service_env_file

cmd="az container show \
-n $CONTAINER \
--query ipAddress.ip \
-o tsv \
-g $RG"

# log "$cmd"
# TEST="$( $cmd 2>&1; printf :%s "${PIPESTATUS[*]}" )"
# declare -a PIPESTATUS2=( "${TEST##*:}" )  # make array w/ content after final colon
# if [[ -n "${TEST%:*}" ]]; then          # if there was original output
#   TEST="${TEST%:*}"                     # remove trailing results from $TEST
#   TEST="${TEST%$'\n'}"                  # remove trailing \n like plain $(…)
# else
#   TEST=""                               # no original output -> empty string
# fi

# # exit if fail
# log "$TEST"
# if [ ${PIPESTATUS2[*]} -eq 1 ]; then
#   exit;
# fi
# env_var='IP'
# env_value=$TEST

# log "$(set_env $env_var $env_value $service_env_file $log 2>&1)" 
# vs - the bottom doesn't redirect pipe 4
# set_env $env_var $env_value $service_env_file

# shellcheck source=$1
# . $service_env_file

if [[ $CONTAINER == *"server"* ]]; then
  log "Creating firewall rule${YL}$FIREWALL_RULE${NC} for ip ${LB}$TEST${NC} in $DB_SERVER"

  az sql server firewall-rule create -g $DB_RG -s $DB_SERVER -n $FIREWALL_RULE --start-ip-address $IP --end-ip-address $IP
fi



exit
