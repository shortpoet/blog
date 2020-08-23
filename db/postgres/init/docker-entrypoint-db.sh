#!/bin/bash
set -e
# NC="\033[0m" # No Color
# BK="\033[0;30m"
# RD="\033[0;31m"
# GR="\033[0;32m"
# BO="\033[0;33m"
# BL="\033[0;34m"
# PP="\033[0;35m"
# CY="\033[0;36m"
# LA="\033[0;37m"
# DA="\033[1;30m"
# LightRed="\033[1;31m"
# LightGreen="\033[1;32m"
# YL="\033[1;33m"
# LB="\033[1;34m"
# LP="\033[1;35m"
# LC="\033[1;36m"
# White="\033[1;37m"

# this throws bad substitution error
# also weird that there was no way to source colors file
# might be because it's run from another script
# was because this image uses ubuntu or something that uses bash not sh

source docker-entrypoint-initdb.d/colors.cfg
filename=$(basename ${BASH_SOURCE[0]})
# filename=docker-entrypoint-db.sh


echo -e "${CY}The ${YL}${COMPOSE_PROJECT_NAME} ${filename} ${CY}script has been executed"

# echo test

# export MY_DIR="${PWD:2}"

# ls

# exec docker-entrypoint.sh

# exec "$@"
