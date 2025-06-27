CREATE TABLE IF NOT EXISTS nhl_data.players
(
    player_id integer NOT NULL,
    full_name character varying(100) COLLATE pg_catalog."default",
    first_name character varying(50) COLLATE pg_catalog."default",
    last_name character varying(50) COLLATE pg_catalog."default",
    birth_date date,
    nationality character varying(50) COLLATE pg_catalog."default",
    height character varying(10) COLLATE pg_catalog."default",
    weight integer,
    primary_position character varying(10) COLLATE pg_catalog."default",
    shoots_catches character varying(5) COLLATE pg_catalog."default",
    active boolean,
    CONSTRAINT players_pkey PRIMARY KEY (player_id)
)

CREATE TABLE IF NOT EXISTS nhl_data.teams
(
    team_id integer NOT NULL,
    name character varying(100) COLLATE pg_catalog."default",
    abbreviation character varying(10) COLLATE pg_catalog."default",
    location_name character varying(100) COLLATE pg_catalog."default",
    first_year_of_play character varying(10) COLLATE pg_catalog."default",
    conference character varying(50) COLLATE pg_catalog."default",
    division character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT teams_pkey PRIMARY KEY (team_id)
)

CREATE TABLE IF NOT EXISTS nhl_data.games
(
    game_id bigint NOT NULL,
    season character varying(10) COLLATE pg_catalog."default",
    game_type character varying(10) COLLATE pg_catalog."default",
    game_date date,
    home_team_id integer,
    away_team_id integer,
    home_score integer,
    away_score integer,
    status character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT games_pkey PRIMARY KEY (game_id),
    CONSTRAINT games_away_team_id_fkey FOREIGN KEY (away_team_id)
        REFERENCES nhl_data.teams (team_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT games_home_team_id_fkey FOREIGN KEY (home_team_id)
        REFERENCES nhl_data.teams (team_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

INSERT INTO players (
    player_id, full_name, first_name, last_name, birth_date,
    nationality, height, weight, primary_position,
    shoots_catches, active
) VALUES
(101, 'Leon Draisaitl', 'Leon', 'Draisaitl', '1995-10-27', 'Germany', '6-2', 208, 'C', 'L', TRUE),
(102, 'Igor Shesterkin', 'Igor', 'Shesterkin', '1995-12-30', 'Russia', '6-1', 183, 'G', 'L', TRUE),
(103, 'David Pastrnak', 'David', 'Pastrnak', '1996-05-25', 'Czech Republic', '6-0', 195, 'RW', 'R', TRUE),
(104, 'Roman Josi', 'Roman', 'Josi', '1990-06-01', 'Switzerland', '6-1', 201, 'D', 'L', TRUE),
(105, 'Jonathan Toews', 'Jonathan', 'Toews', '1988-04-29', 'Canada', '6-2', 201, 'C', 'L', FALSE),
(106, 'Marc-Andre Fleury', 'Marc-Andre', 'Fleury', '1984-11-28', 'Canada', '6-2', 185, 'G', 'L', TRUE),
(107, 'Rasmus Dahlin', 'Rasmus', 'Dahlin', '2000-04-13', 'Sweden', '6-3', 207, 'D', 'L', TRUE),
(108, 'Tage Thompson', 'Tage', 'Thompson', '1997-10-30', 'USA', '6-6', 220, 'C', 'R', TRUE),
(109, 'Jesper Bratt', 'Jesper', 'Bratt', '1998-07-30', 'Sweden', '5-10', 175, 'LW', 'L', TRUE),
(110, 'Tuukka Rask', 'Tuukka', 'Rask', '1987-03-10', 'Finland', '6-3', 176, 'G', 'L', FALSE);

INSERT INTO teams (
    team_id, name, abbreviation, location_name,
    first_year_of_play, conference, division
) VALUES
(1, 'Toronto Maple Leafs', 'TOR', 'Toronto', '1917', 'Eastern', 'Atlantic'),
(2, 'Montreal Canadiens', 'MTL', 'Montreal', '1917', 'Eastern', 'Atlantic'),
(3, 'Boston Bruins', 'BOS', 'Boston', '1924', 'Eastern', 'Atlantic'),
(4, 'New York Rangers', 'NYR', 'New York', '1926', 'Eastern', 'Metropolitan'),
(5, 'Chicago Blackhawks', 'CHI', 'Chicago', '1926', 'Western', 'Central'),
(6, 'Detroit Red Wings', 'DET', 'Detroit', '1926', 'Eastern', 'Atlantic'),
(7, 'Edmonton Oilers', 'EDM', 'Edmonton', '1979', 'Western', 'Pacific'),
(8, 'Vancouver Canucks', 'VAN', 'Vancouver', '1970', 'Western', 'Pacific'),
(9, 'Los Angeles Kings', 'LAK', 'Los Angeles', '1967', 'Western', 'Pacific'),
(10, 'Colorado Avalanche', 'COL', 'Colorado', '1979', 'Western', 'Central');

INSERT INTO games (
    game_id, season, game_type, game_date,
    home_team_id, away_team_id,
    home_score, away_score, status
) VALUES
(1000000001, '2024-25', 'Regular', '2024-10-12', 1, 2, 4, 3, 'Final'),
(1000000002, '2024-25', 'Regular', '2024-10-13', 3, 4, 2, 2, 'OT Final'),
(1000000003, '2024-25', 'Regular', '2024-10-14', 5, 6, 1, 5, 'Final'),
(1000000004, '2024-25', 'Regular', '2024-10-15', 2, 3, 3, 4, 'SO Final'),
(1000000005, '2024-25', 'Regular', '2024-10-16', 1, 4, 6, 2, 'Final'),
(1000000006, '2024-25', 'Regular', '2024-10-17', 6, 2, 2, 3, 'Final'),
(1000000007, '2024-25', 'Playoffs', '2025-04-20', 3, 1, 1, 2, 'Final'),
(1000000008, '2024-25', 'Playoffs', '2025-04-21', 4, 5, 0, 4, 'Final'),
(1000000009, '2024-25', 'Playoffs', '2025-04-23', 2, 6, 3, 1, 'Final'),
(1000000010, '2024-25', 'Playoffs', '2025-04-25', 1, 3, 5, 3, 'Final');
