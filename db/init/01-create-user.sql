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

GRANT ALL ON DATABASE vcc TO test;
