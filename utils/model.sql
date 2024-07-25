create table if not exists employee (
    id serial primary key,
    name text not null,
    division text not null,
    salary int not null
);

create table if not exists manager (
    id serial primary key,
    name text not null,
    password text not null
);