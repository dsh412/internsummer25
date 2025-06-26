DROP TABLE IF EXISTS teams CASCADE;

CREATE TABLE teams (
    team_id INT PRIMARY KEY,
    name VARCHAR(100),
    abbreviation VARCHAR(10),
    location_name VARCHAR(100),
    first_year_of_play VARCHAR(10),
    conference VARCHAR(50),
    division VARCHAR(50)
);
