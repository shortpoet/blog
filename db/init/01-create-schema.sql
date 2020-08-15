-- ####
-- don't forget to connect to test before creating schema or seeding

\connect vcc test

CREATE SCHEMA "content";

CREATE TABLE "content"."posts" (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  markdown TEXT NULL,
  html TEXT NULL,
  user_id INTEGER NOT NULL,
  created TIMESTAMP NOT NULL
);

COMMENT ON TABLE "content"."posts" IS
'This holds blog posts for vue composition course db.';

CREATE SCHEMA "admin";

CREATE TABLE "admin"."users" (
  id serial primary key,
  username TEXT NOT NULL,
  password TEXT CHECK(CHAR_LENGTH(password) > 9) NOT NULL
);

CREATE UNIQUE INDEX users_username_idx ON "admin"."users"(username);

COMMENT ON TABLE "admin"."users" IS
'This holds users for vue composition course db.';

ALTER TABLE "content"."posts" ADD FOREIGN KEY (user_id) REFERENCES "admin"."users"(id) ON DELETE CASCADE ON UPDATE NO ACTION;

\connect vcc_test test

CREATE SCHEMA "content";

CREATE TABLE "content"."posts" (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  markdown TEXT NULL,
  html TEXT NULL,
  user_id INTEGER NOT NULL,
  created TIMESTAMP NOT NULL
);

COMMENT ON TABLE "content"."posts" IS
'This holds blog posts for vue composition course test db.';

CREATE SCHEMA "admin";

CREATE TABLE "admin"."users" (
  id serial primary key,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE UNIQUE INDEX users_username_idx ON "admin"."users"(username);

COMMENT ON TABLE "admin"."users" IS
'This holds users for vue composition course test db.';

ALTER TABLE "content"."posts" ADD FOREIGN KEY (user_id) REFERENCES "admin"."users"(id) ON DELETE CASCADE ON UPDATE NO ACTION;
