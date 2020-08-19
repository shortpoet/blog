

-- Database: vcc

-- -- https://dba.stackexchange.com/questions/11893/force-drop-db-while-others-may-be-connected
\c postgres
UPDATE pg_database SET datallowconn = 'false' WHERE datname = 'shortpoetdb';
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'shortpoetdb';
DROP DATABASE shortpoetdb;
DROP DATABASE vcc_test;

-- env vars create primary db
-- must do this before creating schema with that USER
-- on docker we are logged in as test from beginning
CREATE DATABASE shortpoetdb;
GRANT ALL ON DATABASE shortpoetdb TO test;
CREATE DATABASE vcc_test;
GRANT ALL ON DATABASE vcc_test TO test;

-- ####
-- don't forget to connect to test before creating schema or seeding

\i init/01-create-schema.sql
\i init/02-create-user.sql
\i init/03-seed-data.sql
