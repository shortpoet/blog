#!/bin/bash

set -e
dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# shellcheck source=$dir/registry.env
. $dir/registry.env
# shellcheck source=$dir/colors.cfg
. $dir/colors.cfg
# shellcheck source=$dir/log.sh
. $dir/log.sh
service_env_file=$1
# shellcheck source=$1
. "$service_env_file"

filename=$(basename ${BASH_SOURCE[0]})
# remove extension
# filename=`echo $filename | grep -oP '.*?(?=\.)'`
filename=`echo $filename | awk -F\. '{print $1}'`
log=$dir/logs/$filename-$TARGET

if [ -f $log ]; then
  cp $log "$log.bak"
fi

exec 3>&1 4>&2
trap 'exec 2>&4 1>&3' 0 1 2 3
exec 1>$log 2>&1

echo "=================================================================================" >&3
log "${CY}The ${YL}${COMPOSE_PROJECT_NAME} ${filename} ${CY}script has been executed${NC}"

# Create a resource group.
log "${GR}Deleting container ${BL}$CONTAINER in $1 from $ACR_FULL${NC}"
az container delete -y --name "$CONTAINER" --resource-group "$RG" 

log "Deleting firewall rule ${YL}$FIREWALL_RULE${NC} in $service_env_file"

az sql server firewall-rule delete -g $DB_RG -s $DB_SERVER -n $FIREWALL_RULE
