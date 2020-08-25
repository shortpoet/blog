#!/bin/bash

set -Eeu
set -o pipefail
shopt -s execfail

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# shellcheck source=$dir/registry.env
. $dir/registry.env
# shellcheck source=$dir/colors.cfg
. $dir/colors.cfg
# shellcheck source=$dir/log.sh
. $dir/log.sh

filename=$(basename "${BASH_SOURCE[0]}")
filename=$(echo "$filename" | awk -F\. '{print $1}')
logfile="$dir/logs/$filename-${TARGET:?'Set this in env file'}"
service_env_file=$1
# shellcheck source=$1
. $service_env_file

image=$(echo "$SOURCE" | grep -oP '.*?(?=\:)')
# uncomment to make fail due to double ':'
# image=$source
version=$TAG
# shellcheck disable=SC2154
target=$ACR_FULL/$image:$version

if [ -f "$logfile" ]; then
  cp "$logfile" "$logfile.bak"
fi

exec 3>&1 4>&2
trap 'exec 2>&4 1>&3' 0 1 2 3
# exec 2>&1>"$# logfile"
#  ^-- SC2069: To redirect stdout+stderr, 2>&1 must be last (or use '{ cmd > file; } 2>&1' to clarify).
exec 1>"$logfile" 2>&1

echo "=================================================================================" >&3
log "${CY}The ${YL}${COMPOSE_PROJECT_NAME} ${filename} ${CY}script has been executed${NC}"

# apply tag
log "${GR}Apply tag to image $SOURCE with version $version${NC}"

# https://stackoverflow.com/questions/41716616/get-exit-codes-of-a-pipe-when-output-is-assigned-to-variable-command-substituti/44314883#44314883
# save retval of pipe
TEST="$( docker tag "$SOURCE" "$target" 2>&1; printf :%s "${PIPESTATUS[*]}" )"
declare -a PIPESTATUS2=( "${TEST##*:}" )  # make array w/ content after final colon
#                        ^-- SC2206: Quote to prevent word splitting/globbing, or split robustly with mapfile or read -a.
if [[ -n "${TEST%:*}" ]]; then          # if there was original output
  TEST="${TEST%:*}"                     # remove trailing results from $TEST
  TEST="${TEST%$'\n'}"                  # remove trailing \n like plain $(…)
else
  TEST=""                               # no original output -> empty string
fi

# exit if fail
log "$TEST"
if [ "${PIPESTATUS2[*]}" -eq 1 ]; then
  exit;
fi

log "${PP}Push $target to acr${NC}"

TEST="$( docker push "$target" 2>&1; printf :%s "${PIPESTATUS[*]}" )"
declare -a PIPESTATUS2=( "${TEST##*:}" )  # make array w/ content after final colon
if [[ -n "${TEST%:*}" ]]; then          # if there was original output
  TEST="${TEST%:*}"                     # remove trailing results from $TEST
  TEST="${TEST%$'\n'}"                  # remove trailing \n like plain $(…)
else
  TEST=""                               # no original output -> empty string
fi

log "$TEST"
if [ "${PIPESTATUS2[*]}" -eq 1 ]; then
  exit;
fi

log "${PP}Remove $target from local docker${NC}"

TEST="$( docker rmi "$target" 2>&1; printf :%s "${PIPESTATUS[*]}" )"
declare -a PIPESTATUS2=( "${TEST##*:}" )  # make array w/ content after final colon
if [[ -n "${TEST%:*}" ]]; then          # if there was original output
  TEST="${TEST%:*}"                     # remove trailing results from $TEST
  TEST="${TEST%$'\n'}"                  # remove trailing \n like plain $(…)
else
  TEST=""                               # no original output -> empty string
fi

log "$TEST"
if [ "${PIPESTATUS2[*]}" -eq 1 ]; then
  exit;
fi

exit



# some stuff I tried

# false | true
# echo "${PIPESTATUS[0]} ${PIPESTATUS[1]}"
# keep track of the last executed command

# trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# # echo an error message before exiting
# trap 'echo "\"${last_command}\" command filed with exit code $?."' EXIT

# log $(exec docker tag $source $target 3>&2) #prints error only to console
# log $(docker tag $source $target 2>&1) #prints error to both but doesn't exit on fail

# log "${GR}Apply tag to image $source with version $version${NC}"
# log $(exec docker tag $source $target 3>&2) #prints error only to console
# log $(docker tag $source $target 2>&1) #prints error to both but doesn't exit on fail

# # log $(docker tag $source $target 2>&1)   #prints error to both AND exits on fail
# log $($cmd 2>&1) # && if [ ${PIPESTATUS[0]} -eq 1 ] ; then echo "#### nein ####"; fi;  #prints error to both AND exits on fail
# log $(docker tag $source $target 2>&1) #prints error to both AND exits on fail
# # log $(docker tag $source $target 2>&1) && if [ $? == 1 ] ; then exit; fi;  #prints error to both AND exits on fail
# # docker tag $source $target 2>&1 | tee $log # prints gibberish to log
# log ${PIPESTATUS[0]} # prints 0 because log function was successful
# # log ${PIPESTATUS[1]} # prints 0 because log function was successful
# tester(){
#   local cmd="$@"
#   echo $cmd >&3
#   log `$cmd` 2>&1
#   TEST="$( $cmd 2>&1; printf :%s "${PIPESTATUS[*]}" )"
#   declare -a PIPESTATUS2=( ${TEST##*:} )  # make array w/ content after final colon
#   if [[ -n "${TEST%:*}" ]]; then          # if there was original output
#     TEST="${TEST%:*}"                     # remove trailing results from $TEST
#     TEST="${TEST%$'\n'}"                  # remove trailing \n like plain $(…)
#   else
#     TEST=""                               # no original output -> empty string
#   fi
#   log `$cmd` 2>$1 # weirdly does a double `ls`
#   # log "$TEST" 2>&1
#   return ${PIPESTATUS[*]}
# }
# log `tester "docker tag $source $target"`

# cmd=$(docker tag $source $target)
# log $?
# cmd=`docker tag $source $target` 
# cmd="docker tag $source $target"

# https://stackoverflow.com/questions/1221833/pipe-output-and-capture-exit-status-in-bash
# mkfifo pipe
# $logfile < pipe & 
# `docker tag $source $target` 2>&1 > pipe

# cat pipe
# if [ $? -eq 1 ]; then
#   exit;
# fi
# echo $?

# mkfifo pipe
# $cmd 2>&1
# cat pipe
# rc=$?
# log $rc

# if [ $rc -eq 1 ]; then
#   exit;
# fi

# {
#   echo "=================================================================================" >&3
#   log "${CY}The ${YL}${COMPOSE_PROJECT_NAME} ${filename} ${CY}script has been executed${NC}"

#   log "${GR}Apply tag to image $source with version $version${NC}"

#   # docker tag $source $target 2>&3 #prints error to console
#   docker tag $source $target

#   log "${PP}Push $target to acr${NC}"
# } 2>&1 | tee $log

 # https://unix.stackexchange.com/questions/14270/get-exit-status-of-process-thats-piped-to-another/73180?newreg=25ff4ed1c4ed4f58b38b0bf9729b8741
# { { { { docker tag $source $target; echo $? >&5; } | log >&6; } 5>&1; } | { read xs; exit $xs; } } 6>&1


# { 
#   { 
#     { 
#       { docker tag $source $target;
#         echo $? >&5;
#       } | log >&6;
#     } 5>&1;
#   } | { read xs; exit $xs; }
# } 6>&1




# TAG="docker tag $source $target"
# # TAG="$( docker tag $source $target )"
# TAG_STAT=$?
# # # exit if fail
# log `$TAG`
# # if [ $TAG_STAT -eq 1 ]; then
# #   exit;
# # fi

# log "${PP}Push $target to acr${NC}"

# PUSH="$( docker push $target 2>&1)"
# PUSH_STAT=$?

# docker tag blog.client.prod:latest shortpoet.azurecr.io/blog.client.prod:v1

# docker tag blog.client.prod:latest blog.client.test:v1 && echo $?

# from tag-show.sh
# log "Setting ${YL}\$tag${NC} to ${LB}$TEST${NC}" #| sed -r "s/[[:space:]]//g"
# not sure why the export won't work here
# export tag=`echo $TEST | sed -r "s/[[:space:]]//g"`
# export tag=$TEST
# log $tag
