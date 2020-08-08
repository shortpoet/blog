#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source "$DIR/colors.cfg"
echo -e "${Cyan}The ${Yellow}vcc client run bash ${Cyan}script has been executed"

docker-compose run --rm vcc.client bash "$@"
