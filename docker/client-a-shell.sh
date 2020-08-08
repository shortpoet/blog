#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source "$DIR/colors.cfg"
echo -e "${Cyan}The ${Yellow}vcc client (alpine) shell ${Cyan}script has been executed"

winpty docker exec -it vuejs-composition-course_vcc.client_1 sh "$@"
