begin;

create table posts (
  id serial primary key,
  title text not null,
  markdown text null,
  html text null,
  userId integer not null,
  created time not null,
);

create table users (
  id serial primary key,
  username text not null,
  password integer not null
);

alter table posts add foreign key (user_id) references users(id) on delete cascade;

commit;