from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2
from dotenv import load_dotenv
import os
import requests

app = Flask(__name__)
CORS(app)

load_dotenv()

pg_user = os.getenv("PGUSER")
pg_password = os.getenv("PGPASSWORD")
pg_database = os.getenv("PGDATABASE")
pg_host = os.getenv("PGHOST")
pg_port = os.getenv("PGPORT")

conn = psycopg2.connect(
    dbname=pg_database,
    user=pg_user,
    password=pg_password,
    host=pg_host,
    port=pg_port
)

@app.route('/api/players')
def get_players():
    cur = conn.cursor()
    cur.execute("SELECT * FROM nhl_data.players;")
    rows = cur.fetchall()
    columns = [desc[0] for desc in cur.description]
    data = [dict(zip(columns, row)) for row in rows]
    cur.close()
    return jsonify(data)

@app.route('/api/teams')
def get_teams():
    cur = conn.cursor()
    cur.execute("SELECT * FROM nhl_data.teams;")
    rows = cur.fetchall()
    columns = [desc[0] for desc in cur.description]
    data = [dict(zip(columns, row)) for row in rows]
    cur.close()
    return jsonify(data)

@app.route('/api/games')
def get_games():
    cur = conn.cursor()
    cur.execute("SELECT * FROM nhl_data.games;")
    rows = cur.fetchall()
    columns = [desc[0] for desc in cur.description]
    data = [dict(zip(columns, row)) for row in rows]
    cur.close()
    return jsonify(data)

@app.route('/api/testChart')
def get_pie():
    cur = conn.cursor()
    cur.execute("SELECT full_name, weight FROM nhl_data.players;")
    rows = cur.fetchall()
    columns = [desc[0] for desc in cur.description]
    data = [dict(zip(columns, row)) for row in rows]
    cur.close()
    return jsonify(data)

class Player:
    def __init__(self, data):
        self.playerId = data.get("playerId")
        self.isActive = data.get("isActive")
        self.currentTeamId = data.get("currentTeamId")
        self.currentTeamAbbrev = data.get("currentTeamAbbrev")
        self.teamLogo = data.get("teamLogo")
        self.sweaterNumber = data.get("sweaterNumber")
        self.position = data.get("position")
        self.headshot = data.get("headshot")
        self.heroImage = data.get("heroImage")
        self.heightInInches = data.get("heightInInches")
        self.heightInCentimeters = data.get("heightInCentimeters")
        self.weightInPounds = data.get("weightInPounds")
        self.weightInKilograms = data.get("weightInKilograms")
        self.birthDate = data.get("birthDate")
        self.birthCountry = data.get("birthCountry")
        self.shootsCatches = data.get("shootsCatches")
        self.playerSlug = data.get("playerSlug")
        self.inTop100AllTime = data.get("inTop100AllTime")
        self.inHHOF = data.get("inHHOF")

    def to_tuple(self):
        return (
            self.playerId, self.isActive, self.currentTeamId, self.currentTeamAbbrev,
            self.teamLogo, self.sweaterNumber, self.position, self.headshot, self.heroImage,
            self.heightInInches, self.heightInCentimeters, self.weightInPounds, self.weightInKilograms,
            self.birthDate, self.birthCountry, self.shootsCatches, self.playerSlug,
            self.inTop100AllTime, self.inHHOF
        )

@app.route('/api/import')
def put_data():
    teams = [
        "WPG", "WSH", "VGK", "TOR", "DAl", "LAK", "TBL", "COL", "EDM", "CAR", "FLA",
        "OTT", "MIN", "STL", "CGY", "NJD", "MTL", "VAN", "UTA", "CBJ", "DET", "NYR",
        "NYI", "PIT", "ANA", "BUF", "SEA", "BOS", "PHI", "NSH", "CHI", "SJS"
    ]

    player_ids = []

    for team in teams:
        res = requests.get(f"https://api-web.nhle.com/v1/roster/{team}/current")
        res.raise_for_status()
        data = res.json()

        for group in ["forwards", "defensemen", "goalies"]:
            player_ids.extend([p["id"] for p in data.get(group, []) if "id" in p])

    players = []

    for pid in player_ids:
        res = requests.get(f"https://api-web.nhle.com/v1/player/{pid}/landing")
        res.raise_for_status()
        player_data = res.json()
        players.append(Player(player_data))

    cur = conn.cursor()

    for p in players:
        cur.execute("""
            INSERT INTO nhl_data.players (
                playerId, isActive, currentTeamId, currentTeamAbbrev,
                teamLogo, sweaterNumber, position, headshot, heroImage, 
                heightInInches, heightInCentimeters, weightInPounds, weightInKilograms, 
                birthDate, birthCountry, shootsCatches, playerSlug, inTop100AllTime, inHHOF
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, p.to_tuple())

    conn.commit()
    cur.close()

    return {"status": "success", "players_imported": len(players)}

@app.route('/api/g')
def put_games():
    res = requests.get(f"https://api.nhle.com/stats/rest/en/game")
    data = res.json
    return data

if __name__ == '__main__':
    app.run(debug=True)
