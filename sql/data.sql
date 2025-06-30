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
    badges ARRAY REFERENCES badges(playerId),
    teamLogo VARCHAR(100) NOT NUll,
    sweaterNumber INTEGER NOT NULL,
    position VARCHAR(10) NOT NULL,
    headshot VARCHAR(100) NOT NULL,
    heroImage VARCHAR(100) NOT NULL,
    heightInInches INTEGER NOT NULL,
    heightInCentimeters INTEGER NOT NULL,
    weightInPounds INTEGER NOT NULL,
    weightInKilograms INTEGER NOT NULL,
    birthDate VARCHAR(50) NOT NULL,
    birthCity VARCHAR(100) REFERENCES birthCity(playerId),
    birthStateProvince VARCHAR(100) REFERENCES birthStateProvince(playerId),
    birthCountry VARCHAR(10) NOT NULL,
    shootsCatches VARCHAR(10) NOT NULL,
    draftDetails VARCHAR(100) REFERENCES draftDetails(playerId),
    playerSlug VARCHAR(100) NOT NULL,
    inTOP100AllTime INTEGER NOT NULL,
    inHHOF INTEGER NOT NULL,
    /* stats */
)

CREATE TABLE IF NOT EXISTS nhl_data.fullTeamName
(
    teamId INTEGER NOT NULL,
    default VARCHAR(100) NOT NULL,
    fr VARCHAR(100) NOT NULL,
)

CREATE TABLE IF NOT EXISTS nhl_data.teamCommonName
(
    teamId INTEGER NOT NULL,
    default VARCHAR(100) NOT NULL,
)

CREATE TABLE IF NOT EXISTS nhl_data.teamPlaceNameWithPreposition
(
    teamId INTEGER NOT NULL,
    default VARCHAR(100) NOT NULL,
    fr VARCHAR(100) NOT NULL,
)

CREATE TABLE IF NOT EXISTS nhl_data.firstName
(
    playerId INTEGER NOT NULL,
    default VARCHAR(100) NOT NULL,
)

CREATE TABLE IF NOT EXISTS nhl_data.lastName
(
    playerId INTEGER NOT NULL,
    default VARCHAR(100) NOT NULL,
)

CREATE TABLE IF NOT EXISTS nhl_data.badges
(
    playerId INTEGER NOT NULL,
    logoURL VARCHAR(100) REFERENCES logoURL(playerId),
    title VARCHAR(100) REFERENCES badgeTitle(playerId),
)

CREATE TABLE IF NOT EXISTS nhl_data.logoURL
(
    playerId INTEGER NOT NULL,
    default VARCHAR(100) NOT NULL,
    fr VARCHAR(100) NOT NULL,
)

CREATE TABLE IF NOT EXISTS nhl_data.badgeTitle
(
    playerId INTEGER NOT NULL,
    default VARCHAR(100) NOT NULL,
    fr VARCHAR(100) NOT NULL,
)

CREATE TABLE IF NOT EXISTS nhl_data.birthCity
(
    playerId INTEGER NOT NULL,
    default VARCHAR(100),
)

CREATE TABLE IF NOT EXISTS nhl_data.birthStateProvince
(
    playerId INTEGER NOT NULL,
    default VARCHAR(100),
)

CREATE TABLE IF NOT EXISTS nhl_data.draftDetails
(
    playerId INTEGER NOT NULL,
    year INTEGER NOT NULL,
    teamAbbrev VARCHAR(10) NOT NULL,
    round INTEGER NOT NULL,
    pickInRound INTEGER NOT NULL,
    overallPick INTEGER NOT NULL,
)
