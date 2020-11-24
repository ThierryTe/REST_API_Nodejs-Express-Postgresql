CREATE DATABASE todos_database;

-- \c todos_database

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);