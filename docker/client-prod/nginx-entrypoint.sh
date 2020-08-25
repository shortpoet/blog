#!/bin/bash
source colors.cfg
# filename=$(basename ${BASH_SOURCE})
filename=$(basename "${BASH_SOURCE[0]}")

echo -e "${CY}The ${YL}${COMPOSE_PROJECT_NAME} ${filename} ${CY}script has been executed"

#!/bin/bash
# https://stackoverflow.com/questions/37403759/what-is-the-meaning-of-d-in-this-bash-command

if [ ! -d "/app/dist" ] 
then
  npm run build:docker

  echo -e "${LC}Build finished...";

  pwd
  ls

  echo -e "${LR}Delete node_modules folder";

  rm -rf node_modules

  echo -e "${LG}START COPY";

  cp -rf  /app/dist/. /usr/share/nginx/html/

  echo -e "${PP}END COPY${NC}";
  
  echo -e "${YL}Node env is: ${NODE_ENV}${NC}";

  echo -e "${LP}Docker is: ${DOCKER}${NC}";

  echo -e "${LP}API is: ${VUE_APP_API}${NC}";

  # cat /etc/nginx/conf.d/default.conf
fi