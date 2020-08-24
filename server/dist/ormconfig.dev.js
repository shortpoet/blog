"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

console.log("$# ORM CONFIG @7"); // console.log(require('dotenv').config())

require("dotenv").config(); // require("dotenv").config(require('path').resolve(__dirname, '..'));
// console.log(require('path').resolve(__dirname, '..'));
// https://stackoverflow.com/questions/26973484/how-do-i-setup-the-dotenv-file-in-node-js#43973629
// https://github.com/typeorm/typeorm/issues/510


console.log("$# DOCKER @7");
console.log(process.env.DOCKER);
console.log("$# PROVIDER @7");
console.log(process.env.PROVIDER);
var postgresHost = process.env.DOCKER === "1" ? process.env.POSTGRES_HOST : process.env.POSTGRES_HOST_LOCAL;
var mssqlHost = process.env.DOCKER === "1" ? process.env.MSSQL_HOST : process.env.MSSQL_HOST_LOCAL;
var azureHost = process.env.DOCKER === "1" ? process.env.AZURE_HOST : process.env.AZURE_HOST_LOCAL; // console.log("$# POSTGRES_HOST @7");
// console.log(postgresHost);

var postgresConfig = {
  "type": "postgres",
  "host": postgresHost,
  "port": 5432,
  "username": process.env.POSTGRES_USER,
  "password": process.env.POSTGRES_PASSWORD,
  "database": process.env.POSTGRES_DB,
  "synchronize": false,
  "logging": true
};
var mssqlConfig = {
  "type": "mssql",
  "host": mssqlHost,
  "username": process.env.MSSQL_USER,
  "password": process.env.MSSQL_PASSWORD,
  "database": process.env.MSSQL_DB,
  "synchronize": false,
  "logging": true
};
var azureConfig = {
  "type": "mssql",
  "host": azureHost,
  "username": process.env.AZURE_USER,
  "password": process.env.AZURE_PASSWORD,
  "database": process.env.AZURE_DB,
  "synchronize": false,
  "logging": true
};
var config = process.env.PROVIDER === 'postgres' ? postgresConfig : process.env.PROVIDER === 'mssql' ? mssqlConfig : process.env.PROVIDER === 'azure' ? azureConfig : {};
module.exports = _objectSpread({}, config, {
  "entities": ["src/entity/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
});