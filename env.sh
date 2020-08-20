export COMPOSE_PROJECT_NAME=vcc
# https://stackoverflow.com/a/55449975/12658653
# https://stackoverflow.com/questions/48546124/what-is-linux-equivalent-of-host-docker-internal
# https://stackoverflow.com/questions/394230/how-to-detect-the-os-from-a-bash-script
# https://stackoverflow.com/questions/29377853/how-to-use-environment-variables-in-docker-compose
# https://gist.github.com/Vad1mo/9ab63f28239515d4dafd
# host.docker.internal to map localhost to 0.0.0.0 and avoid port used by daemon
# POSTGRES_HOST=host.docker.internal
# linux workaround also works on windows
POSTGRES_HOST=172.17.0.1
# this is the db on the host itself
# POSTGRES_HOST=host.docker.internal
POSTGRES_HOST_LOCAL=localhost
# uses service name
# POSTGRES_HOST=db.postgres
# # https://github.com/quay/clair/issues/134
# https://github.com/entropic-dev/entropic/issues/190
# https://github.com/entropic-dev/entropic/issues/190#issuecomment-499733956
# https://stackoverflow.com/a/42742217/12658653
# PGDATA=/var/lib/postgresql/data/postgres-data
# doesn't work because needs to be one up to be included in chown in entrypoint
PGDATA=/var/lib/postgresql/postgres-data

# docker
DOCKER=1
PROVIDER=mssql
export COMPOSE_PROJECT_NAME=vcc
# postgres
POSTGRES_HOST=db.postgres
POSTGRES_HOST_LOCAL=localhost
POSTGRES_USER=test
POSTGRES_PASSWORD=test
POSTGRES_DB=shortpoetdb
POSTGRES_PORT=5432
PGDATA=/var/lib/postgresql/postgres-data
PGVOLUME=/var/lib/postgresql/data
# mssql
MSSQL_HOST=db.mssql
MSSQL_HOST_LOCAL=localhost
MSSQL_USER=test
MSSQL_PASSWORD=
SA_PASSWORD=
MSSQL_DB=shortpoetdb
MSSQL_PORT=1433
ACCEPT_EULA=Y
# redis
REDIS_PORT=6379
REDIS_SERVICE=redis