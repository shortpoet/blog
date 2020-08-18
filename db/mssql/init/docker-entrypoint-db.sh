#!/bin/bash
set -e
# NC="\033[0m" # No Color
# Black="\033[0;30m"
# Red="\033[0;31m"
# Green="\033[0;32m"
# BrownOrange="\033[0;33m"
# Blue="\033[0;34m"
# Purple="\033[0;35m"
# Cyan="\033[0;36m"
# LightGray="\033[0;37m"
# DarkGray="\033[1;30m"
# LightRed="\033[1;31m"
# LightGreen="\033[1;32m"
# Yellow="\033[1;33m"
# LightBlue="\033[1;34m"
# LightPurple="\033[1;35m"
# LightCyan="\033[1;36m"
# White="\033[1;37m"

# this throws bad substitution error
# also weird that there was no way to source colors file
# might be because it's run from another script
# was because this image uses ubuntu or something that uses bash not sh

source docker-entrypoint-initdb.d/colors.cfg
filename=$(basename ${BASH_SOURCE[0]})
# filename=docker-entrypoint-db.sh


echo -e "${Cyan}The ${Yellow}${COMPOSE_PROJECT_NAME} ${filename} ${Cyan}script has been executed"

# echo test

# export MY_DIR="${PWD:2}"

# ls

# exec docker-entrypoint.sh

# exec "$@"
