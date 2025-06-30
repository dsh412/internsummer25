CREATE TABLE IF NOT EXISTS nhl_data.players
(
    playerId INTEGER NOT NULL,
    isActive BOOLEAN NOT NULL,
    currentTeamID INTEGER NOT NULL,
    currentTeamAbbrev VARCHAR(10) NOT NULL,
    fullTeamName VARCHAR(100) REFERENCES fullTeamName(currentTeamID),
    teamCommonName VARCHAR(100) REFERENCES teamCommonName(currentTeamID),
    teamPlaceNameWithPreposition VARCHAR(100) REFERENCES teamPlaceNameWithPreposition(currentTeamID),
    firstName VARCHAR(100) REFERENCES firstName(playerId),
    lastName VARCHAR(100) REFERENCES lastName(playerId),
    badges 
)

CREATE TABLE IF NOT EXISTS nhl_data.fullTeamName
(
    teamId INTEGER NOT NULL
    default VARCHAR(100) NOT NULL,
    fr VARCHAR(100) NOT NULL,
)

CREATE TABLE IF NOT EXISTS nhl_data.teamCommonName
(
    teamId INTEGER NOT NULL
    default VARCHAR(100) NOT NULL,
)

CREATE TABLE IF NOT EXISTS nhl_data.teamPlaceNameWithPreposition
(
    teamId INTEGER NOT NULL
    default VARCHAR(100) NOT NULL,
    fr VARCHAR(100) NOT NULL,
)

CREATE TABLE IF NOT EXISTS nhl_data.firstName
(
    playerId INTEGER NOT NULL
    default VARCHAR(100) NOT NULL,
)

CREATE TABLE IF NOT EXISTS nhl_data.lastName
(
    playerId INTEGER NOT NULL
    default VARCHAR(100) NOT NULL,
)
