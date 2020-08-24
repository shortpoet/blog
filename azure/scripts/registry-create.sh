#!/bin/bash
# Send both stdout/stderr to a /root/aws-ec2-debian.log file
# Works with Ubuntu Linux too.
# Use exec for FD and trap it using the trap
# See bash man page for more info
# Author:  nixCraft under GPL v2.x+
# ---------------------------------------------
# https://stackoverflow.com/questions/17998978/removing-colors-from-output
# https://stackoverflow.com/questions/6744006/can-i-use-sed-to-manipulate-a-variable-in-bash
# https://www.cyberciti.biz/faq/redirecting-stderr-to-stdout/
# https://unix.stackexchange.com/questions/42728/what-does-31-12-23-do-in-a-script
# https://serverfault.com/questions/103501/how-can-i-fully-log-all-bash-scripts-actions
# https://www.gnu.org/software/bash/manual/bash.html#Redirections
# https://stackoverflow.com/questions/3515208/can-colorized-output-be-captured-via-shell-redirect

set -e
dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# shellcheck source=$dir/registry.env
. $dir/registry.env
# shellcheck source=$dir/colors.cfg
. $dir/colors.cfg
# shellcheck source=$dir/log.sh
. $dir/log.sh

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
log "${GR}Creating Resource group $RG${NC}"
az group create --location northcentralus --name $RG

# # Create registry
log "${GR}Creating Registry${NC}"
az acr create --resource-group $RG --name $ACR --sku Basic
