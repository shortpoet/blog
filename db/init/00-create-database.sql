-- Database: vcc

-- -- https://dba.stackexchange.com/questions/11893/force-drop-db-while-others-may-be-connected
-- UPDATE pg_database SET datallowconn = 'false' WHERE datname = 'vcc';
-- SELECT pg_terminate_backend(pid)
-- FROM pg_stat_activity
-- WHERE datname = 'vcc';
-- DROP DATABASE vcc;
-- DROP DATABASE vcc_test;

-- env vars create primary db
-- must do this before creating schema with that USER
-- on docker we are logged in as test from beginning
CREATE DATABASE vcc;
CREATE DATABASE vcc_test;
GRANT ALL ON DATABASE vcc TO test;
GRANT ALL ON DATABASE vcc_test TO test;
