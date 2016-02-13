drop table if exists videos;
create table entries (
  id integer primary key autoincrement,
  timeviewed double not null
);

drop table if exists users;
create table entries (
  id integer primary key autoincrement,
  timeviewed double not null
);
