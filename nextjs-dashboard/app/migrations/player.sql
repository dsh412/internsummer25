DROP TABLE IF EXISTS player;

CREATE TABLE player (
    playerId SERIAL PRIMARY KEY,
    isActive BOOLEAN NOT NULL,
    currentTeamId TEXT,
    currentTeamAbbrev TEXT,
    /** full team name (default and fr) */
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    sweaterNumber INTEGER NOT NULL,
    position CHARACTER NOT NULL,
    heightInInches INTEGER NOT NULL,
    heightInCentimeters INTEGER NOT NULL,
    weightInPounds INTEGER NOT NULL,
    weightInKilograms INTEGER NOT NULL,
    birthDate DATE NOT NULL,
    birthCountry TEXT NOT NULL,
    shootsCatches CHARACTER NOT NULL,
    /** draft details ( multi response ) */
    /** player slug */
    /** inHHOF ( listed as a zero, could be boolean ) */
    /** career totals, seasons totals, awards ( multi response ) */
)