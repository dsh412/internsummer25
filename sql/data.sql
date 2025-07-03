CREATE TABLE IF NOT EXISTS nhl_data.players (
    playerId INT PRIMARY KEY,
    isActive BOOLEAN,
    currentTeamId INT,
    currentTeamAbbrev VARCHAR(10),
    teamLogo VARCHAR(100),
    sweaterNumber INT,
    position VARCHAR(5),
    headshot VARCHAR(100),
    heroImage VARCHAR(100),
    heightInInches INT,
    heightInCentimeters INT,
    weightInPounds INT,
    weightInKilograms INT,
    birthDate VARCHAR(10),
    birthCountry VARCHAR(10),
    shootsCatches VARCHAR(5),
    playerSlug VARCHAR(100),
    inTop100AllTime INT,
    inHHOF INT,
)

CREATE TABLE IF NOT EXISTS nhl_data.fullTeamName (
    playerId INT REFERENCES players(playerId),
    language_code VARCHAR(10),
    team_name VARCHAR(100),
    PRIMARY KEY (playerId, language_code),
)

/* Insert default: "Edmonton Oilers", fr : "Oilers d'Edmonton" **/

CREATE TABLE IF NOT EXISTS nhl_data.teamCommonName (
    playerId INT REFERENCES players(playerId),
    language_code VARCHAR(10),
    team_name VARCHAR(100),
    PRIMARY KEY (playerId, language_code),
)

/* Insert default: "Oilers" **/

CREATE TABLE IF NOT EXISTS nhl_data.teamPlaceNameWithPreposition (
    playerId INT REFERENCES players(playerId),
    language_code VARCHAR(10),
    team_name VARCHAR(100),
    PRIMARY KEY (playerId, language_code),
)

/* Insert default: "Edmonton", fr : "d'Edmonton" **/

CREATE TABLE IF NOT EXISTS nhl_data.firstName (
    playerId INT REFERENCES players(playerId),
    language_code VARCHAR(10),
    player_first_name VARCHAR(100),
    PRIMARY KEY (playerId, language_code),
)

/* Insert default: "Connor" **/

CREATE TABLE IF NOT EXISTS nhl_data.lastName (
    playerId INT REFERENCES players(playerId),
    language_code VARCHAR(10),
    player_last_name VARCHAR(100),
    PRIMARY KEY (playerId, language_code),
)

/* Insert default: "McDavid" **/

CREATE TABLE IF NOT EXISTS nhl_data.badges (
    playerId INT REFERENCES players(playerId),
    badgeId INT,
    PRIMARY KEY (playerId, badgeId),
)

CREATE TABLE IF NOT EXISTS nhl_data.logoURL (
    badgeId INT REFERENCES badges(badgeId),
    language_code VARCHAR(10),
    logo_url VARCHAR(100),
    PRIMARY KEY (badgeId, language_code),
)

CREATE TABLE IF NOT EXISTS nhl_data.badgetitle (
    badgeId INT REFERENCES badges(badgeId),
    language_code VARCHAR(10),
    badge_title VARCHAR(100),
    PRIMARY KEY (badgeId, language_code),
)

CREATE TABLE IF NOT EXISTS nhl_data.birthCity (
    playerId INT REFERENCES players(playerId),
    language_code VARCHAR(10),
    city VARCHAR(100),
    PRIMARY KEY (playerId, language_code),
)

CREATE TABLE IF NOT EXISTS nhl_data.birthStateProvince (
    playerId INT REFERENCES players(playerId),
    language_code VARCHAR(10),
    stateProvince VARCHAR(100),
    PRIMARY KEY (playerId, language_code),
)

CREATE TABLE IF NOT EXISTS nhl_data.draftDetails (
    playerId INT REFERENCES players(playerId),
    draftId INT,
    year INT,
    teamAbbrev VARCHAR(5),
    round INT,
    pickInRound INT,
    overallPick INT,
    PRIMARY KEY(playerId, draftId),
)