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

-- CREATE TABLE IF NOT EXISTS nhl_data.badges (
--     playerId INT REFERENCES players(playerId),
--     badgeId INT,
--     PRIMARY KEY (playerId, badgeId),
-- )

-- CREATE TABLE IF NOT EXISTS nhl_data.logoURL (
--     badgeId INT REFERENCES badges(badgeId),
--     language_code VARCHAR(10),
--     logo_url VARCHAR(100),
--     PRIMARY KEY (badgeId, language_code),
-- )

-- CREATE TABLE IF NOT EXISTS nhl_data.badgetitle (
--     badgeId INT REFERENCES badges(badgeId),
--     language_code VARCHAR(10),
--     badge_title VARCHAR(100),
--     PRIMARY KEY (badgeId, language_code),
-- )

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
    PRIMARY KEY (playerId, draftId),
)

CREATE TABLE IF NOT EXISTS nhl_data.careerTotals (
    playerId INT REFERENCES players(playerId),
    careerId INT,
    PRIMARY KEY (playerId, careerId),
)

CREATE TABLE IF NOT EXISTS nhl_data.careerRegularSeason (
    careerId INT REFERENCES careerTotals(careerId),
    careerRegularId INT,
    assists INT,
    avgToi VARCHAR(10),
    faceoffWinningPctg FLOAT,
    gameWinningGoals INT,
    gamesPlayed INT,
    goals INT,
    otGoals INT,
    pim INT,
    plusMinus INT,
    points INT,
    powerPlayGoals INT,
    powerPlayPoints INT,
    shootingPctg FLOAT,
    shothandedGoals INT,
    shothandedPoints INT,
    shots INT,
    PRIMARY KEY (careerId, careerRegularId),
)

CREATE TABLE IF NOT EXISTS nhl_data.careerPlayoffsSeason (
    careerId INT REFERENCES careerTotals(careerId),
    careerPlayoffId INT,
    assists INT,
    avgToi VARCHAR(10),
    faceoffWinningPctg FLOAT,
    gameWinningGoals INT,
    gamesPlayed INT,
    goals INT,
    otGoals INT,
    pim INT,
    plusMinus INT,
    points INT,
    powerPlayGoals INT,
    powerPlayPoints INT,
    shootingPctg FLOAT,
    shothandedGoals INT,
    shothandedPoints INT,
    shots INT,
    PRIMARY KEY (careerId, careerPlayoffId),   
)

-- CREATE TABLE IF NOT EXISTS nhl_data.last5Games (
--     playerId INT REFERENCES players(playerId),

-- )

CREATE TABLE IF NOT EXISTS nhl_data.seasonTotals (
    playerId INT REFERENCES players(playerId),
    seasonTotalId INT,
    PRIMARY KEY (playerId, seasonTotalId),
)

CREATE TABLE IF NOT EXISTS nhl_data.season (
    seasonTotalId INT REFERENCES seasonTotalId(seasonTotalId),
    assists INT,
    gameTypeId INT,
    gamePlayed INT,
    goals INT,
    leagueAbbrev VARCHAR(10),
    pim INT,
    points INT,
    season INT,
    sequence INT,
    teamName VARCHAR(100)
    PRIMARY KEY (seasonTotalId, season),
)

-- CREATE TABLE IF NOT EXISTS nhl_data.awards (
--     playerId INT REFERENCES players(playerId),
--     awardsId INT,
--     PRIMARY KEY (playerId, awardsId),
-- )

-- CREATE TABLE IF NOT EXISTS nhl_data.trophy (
--     awardsId INT REFERENCES awards(awardsId),
--     trophyId INT,

-- )

CREATE TABLE IF NOT EXISTS nhl_data.currentTeamRoster (
    playerId INT REFERENCES players(playerId),
    playerSlug VARCHAR(100) REFERENCES players(playerSlug),
)

CREATE TABLE IF NOT EXISTS nhl_data.teams (
    teamId INT PRIMARY KEY,
    easternStartTime DATE,
    gameDate VARCHAR(20),
    gameNumber INT,
    gameScheduleStateId INT,
    gameStateId INT,
    gameType INT,
    homeScore INT,
    homeTeamId INT,
    period INT,
    season INT,
    visitingScore INT,
    visitingTeamId INT,
)
