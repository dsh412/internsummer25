DROP TABLE IF EXISTS games CASCADE;

CREATE TABLE games (
    game_id BIGINT PRIMARY KEY,
    season VARCHAR(10),
    game_type VARCHAR(10),
    game_date DATE,
    home_team_id INT,
    away_team_id INT,
    home_score INT,
    away_score INT,
    status VARCHAR(50),
    FOREIGN KEY (home_team_id) REFERENCES teams(team_id),
    FOREIGN KEY (away_team_id) REFERENCES teams(team_id)
);
