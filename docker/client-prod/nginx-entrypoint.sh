source colors.cfg
filename=$(basename ${BASH_SOURCE})

echo -e "${Cyan}The ${Yellow}${COMPOSE_PROJECT_NAME} ${filename} ${Cyan}script has been executed"

#!/bin/bash
# https://stackoverflow.com/questions/37403759/what-is-the-meaning-of-d-in-this-bash-command

if [ ! -d "/app/dist" ] 
then
  npm run build:docker

  echo -e "${LightCyan}Build finished...";

  pwd
  ls

  echo -e "${LightRed}Delete node_modules folder";

  rm -rf node_modules

  echo -e "${LightGreen}START COPY";

  cp -rf  /app/dist/. /usr/share/nginx/html/

  echo -e "${Purple}END COPY${NC}";
fi