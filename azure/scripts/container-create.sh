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
# shellcheck source=$dir/image.env
. $image_env_file
container_env_file=$dir/container.env
# shellcheck source=$dir/image.env
. $container_env_file



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
log "${GR}Creating container${NC}" 2>&1
# save retval of pipe
env_vars="NGINX_PORT=80"
cmd="az container create --resource-group $RG --name $CONTAINER --image "$ACR_FULL/$IMAGE:$TAG" --cpu 1 --memory 1 --registry-login-server $ACR_FULL --registry-username $SP_APP_ID --registry-password $SP_PASS --dns-name-label shortpoet-blog --ports 80 --environment-variables $env_vars"
log "$cmd"
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

# set_env in file
env_var='ACR_REGISTRY_ID'
env_value=$TEST
log "$(set_env $env_var $env_value $project_env_file $log 2>&1)" 

# docker run -p 80:80 --env-file ./.env shortpoet.azurecr.io/blog.client.prod:v1


exit