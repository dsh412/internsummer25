CREATE TABLE players (
    player_id INT PRIMARY KEY,
    full_name VARCHAR(100),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    birth_date DATE,
    nationality VARCHAR(50),
    height VARCHAR(10),
    weight INT,
    primary_position VARCHAR(10),
    shoots_catches VARCHAR(5),
    active BOOLEAN
);
