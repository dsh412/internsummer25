CREATE TABLE player (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO player (name) VALUES ('Connor'), ('Sidney');