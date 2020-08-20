source colors.cfg
filename=$(basename ${BASH_SOURCE})

echo -e "${Cyan}The ${Yellow}${COMPOSE_PROJECT_NAME} ${filename} ${Cyan}script has been executed"

#!/bin/bash

if [ ! -d "/app/dist" ] 
then
    npm run build

    echo "${LightCyan}Build finished...";

    echo "${LightGreen}Delete node_modules folder";

    rm -rf node_modules

    echo "${LightRed}START COPY";

    cp -rf  /app/dist/. /usr/share/nginx/html/

    echo "${Red}END COPY${NC}";
fi