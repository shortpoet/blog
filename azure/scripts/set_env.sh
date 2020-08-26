#!/bin/bash


dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# shellcheck source=$dir/colors.cfg
. $dir/colors.cfg
# shellcheck source=$dir/log.sh
. $dir/log.sh

set_env(){
  # set redirection
  env_var="$1"
  env_value="$2"
  env_file="$3"
  log="$4"
  exec 3>&1 4>&2
  trap 'exec 2>&4 1>&3' 0 1 2 3
  exec 1>$log 2>&1


  log "Setting ${YL}$env_var${NC} to ${LB}${env_value}${NC}"

  perl -i -pe "s#${env_var}=.*#${env_var}=${env_value}#g" "${env_file}"
  log "${GR}Current value and line number => ${LB}$(grep -n "${env_var}=.*" "${env_file}")${NC}"
}
