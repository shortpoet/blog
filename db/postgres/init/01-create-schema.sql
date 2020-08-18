-- ####
-- don't forget to connect to test before creating schema or seeding

\connect shortpoetdb test

CREATE SCHEMA "vcc";

CREATE TABLE "vcc"."content_posts" (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  markdown TEXT NULL,
  html TEXT NULL,
  user_id INTEGER NOT NULL,
  created TIMESTAMP NOT NULL
);

COMMENT ON TABLE "vcc"."content_posts" IS
'This holds blog posts for vue composition course db.';


CREATE TABLE "vcc"."admin_users" (
  id serial primary key,
  username TEXT NOT NULL,
  password TEXT CHECK(CHAR_LENGTH(password) > 9) NOT NULL
);

CREATE UNIQUE INDEX users_username_idx ON "vcc"."admin_users"(username);

COMMENT ON TABLE "vcc"."admin_users" IS
'This holds users for vue composition course db.';

ALTER TABLE "vcc"."content_posts" ADD FOREIGN KEY (user_id) REFERENCES "vcc"."admin_users"(id) ON DELETE CASCADE ON UPDATE NO ACTION;

\connect vcc_test test

CREATE SCHEMA "vcc";

CREATE TABLE "vcc"."content_posts" (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  markdown TEXT NULL,
  html TEXT NULL,
  user_id INTEGER NOT NULL,
  created TIMESTAMP NOT NULL
);

COMMENT ON TABLE "vcc"."content_posts" IS
'This holds blog posts for vue composition course db.';


CREATE TABLE "vcc"."admin_users" (
  id serial primary key,
  username TEXT NOT NULL,
  password TEXT CHECK(CHAR_LENGTH(password) > 9) NOT NULL
);

CREATE UNIQUE INDEX users_username_idx ON "vcc"."admin_users"(username);

COMMENT ON TABLE "vcc"."admin_users" IS
'This holds users for vue composition course db.';

ALTER TABLE "vcc"."content_posts" ADD FOREIGN KEY (user_id) REFERENCES "vcc"."admin_users"(id) ON DELETE CASCADE ON UPDATE NO ACTION;
