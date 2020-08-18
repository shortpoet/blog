console.log("$# ORM CONFIG @7");
// console.log(require('dotenv').config())
require("dotenv").config();
// require("dotenv").config(require('path').resolve(__dirname, '..'));
// console.log(require('path').resolve(__dirname, '..'));
// https://stackoverflow.com/questions/26973484/how-do-i-setup-the-dotenv-file-in-node-js#43973629

// https://github.com/typeorm/typeorm/issues/510
console.log("$# DOCKER @7");
console.log(process.env.DOCKER);
const host = process.env.DOCKER == 1 
  ? process.env.POSTGRES_HOST
  : process.env.POSTGRES_HOST_LOCAL
console.log("$# POSTGRES_HOST @7");
console.log(host);

const config = process.env.PROVIDER == 'postgres'
  ? {
    "type": "postgres",
    "host": process.env.DOCKER == 1 
       ? process.env.POSTGRES_HOST
       : process.env.POSTGRES_HOST_LOCAL,
    "port": 5432,
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "synchronize": false,
    "logging": true, 
  }
  : {
    "type": "postgres",
    "host": process.env.DOCKER == 1 
       ? process.env.POSTGRES_HOST
       : process.env.POSTGRES_HOST_LOCAL,
    "port": 5432,
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "synchronize": false,
    "logging": true, 
  }

module.exports = {
    ...config,
  "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
};
