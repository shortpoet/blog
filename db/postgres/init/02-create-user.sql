-- Role: test
-- DROP ROLE test;

-- CREATE ROLE test WITH
--   LOGIN
--   NOSUPERUSER
--   INHERIT
--   NOCREATEDB
--   NOCREATEROLE
--   NOREPLICATION
--   ENCRYPTED PASSWORD 'md505a671c66aefea124cc08b76ea6d30bb';

-- env vars create role
-- uncomment for local
-- https://stackoverflow.com/questions/10352695/grant-all-on-a-specific-schema-in-the-db-to-a-group-role-in-postgresql

-- \connect shortpoetdb postgres

GRANT USAGE ON SCHEMA "vcc" TO test;
GRANT USAGE ON SCHEMA "vcc" TO test;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA "vcc" TO test;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA "vcc" TO test;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA "vcc" TO test;

-- \connect vcc_test postgres
\connect vcc_test test

GRANT USAGE ON SCHEMA "vcc" TO test;
GRANT USAGE ON SCHEMA "vcc" TO test;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA "vcc" TO test;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA "vcc" TO test;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA "vcc" TO test;
