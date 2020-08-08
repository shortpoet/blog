#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source "$DIR/colors.cfg"
echo -e "${Cyan}The ${Yellow}vcc client run ${Cyan}script has been executed"

docker run --rm -v ${PWD}/client:/usr/src/app -v notused:/usr/src/app/node_modules -p 4000:4000 vcc.client:alpine
