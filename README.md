# kanban

This is an extension of a [course](https://vuejs-course.com/courses) by [@Lachlan19900](https://twitter.com/Lachlan19900).

It uses Vue 3 Composition API for the frontend and PostgreSQL, TypeORM, and Express for the backend.

Can be run using docker.

## usage

- install dependencies

```bash
yarn install
```

- launch rest api

```bash
yarn start:rest
```

- launch rest api

```bash
yarn start:graph
```

- run tests

```bash
yarn test
```

- setup docker containers using compose

```bash
./docker/build.sh
```

- run docker containers

```bash
docker-compose up
```

- take down containers and wipe docker volumes

```bash
./docker/wipe.sh
```

- shell into database

```bash
./docker/db-shell.sh
```

- run client tests in container

```bash
./docker/client-run-test.sh
```

- run server tests in container

```bash
./docker/server-run-test.sh
```

- shell into client using docker run

```bash
./docker/client-run-shell.sh
```

- or into running container using docker exec (use 'u' script for ubuntu)

```bash
./docker/client-a-shell.sh
```

## server setup

```bash
mkdir server && cd server
yarn init
yarn add --dev typeorm reflect-metadata @types/node pg
# yarn global add typeorm # optional as needed
typeorm init --database postgres
yarn add --dev ts-jest @types/jest express express-graphql graphql @types/cors @types/express @vue/test-utils@next class-validator cors ts-node-dev type-graphql vite
```

- mssql

```bash
yarn add --dev mssql
```

## vite

- make sure to add `<script type="module" src="/src/main.ts"></script>`
