-- liquibase formatted sql

-- changeset your_name:1
CREATE TABLE "UsersKotlin" (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- rollback DROP TABLE users;