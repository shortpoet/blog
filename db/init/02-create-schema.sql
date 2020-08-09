\connect vcc

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
'This holds blog posts for vue composition course.';

CREATE SCHEMA "admin";

CREATE TABLE "admin"."users" (
  id serial primary key,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);

COMMENT ON TABLE "admin"."users" IS
'This holds users for vue composition course.';

ALTER TABLE "content"."posts" ADD FOREIGN KEY (user_id) REFERENCES "admin"."users"(id) ON DELETE CASCADE ON UPDATE NO ACTION;
