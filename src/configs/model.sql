CREATE TYPE userRole AS ENUM ('employee', 'manager');
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS manager (
    serial SERIAL PRIMARY KEY,
    id UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    name TEXT NOT NULL,
    name_business TEXT NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS employee (
    serial SERIAL PRIMARY KEY,
    id UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    manager_id UUID NOT NULL,
    picture_url TEXT,
    birth_date DATE,
    nik_number TEXT,
    address TEXT,
    salary INT,
    division TEXT
);

CREATE TABLE IF NOT EXISTS login_logs (
    serial SERIAL PRIMARY KEY,
    role userRole NOT NULL,
    uid TEXT NOT NULL,
    time TIMESTAMP NOT NULL DEFAULT NOW()
);

-- drop table
DROP TABLE IF EXISTS employee, manager, login_logs;