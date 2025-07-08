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

@app.route('/api/import')
def put_data():
    inputs = [ 
        "WPG", "WSH", "VGK", "TOR", "DAl", "LAK", "TBL", "COL", "EDM", "CAR", "FLA",
        "OTT", "MIN", "STL", "CGY", "NJD", "MTL", "VAN", "UTA", "CBJ", "DET", "NYR",
        "NYI", "PIT", "ANA", "BUF", "SEA", "BOS", "PHI", "NSH", "CHI", "SJS"
    ]

    ids = []

    for term in inputs:
        response = requests.get(f"https://api-nhle.com/v1/roster/{term}/current")
        response.raise_for_status()
        data = response.json()

        forwards = data.get("forwards", [])

        for item in forwards:
            if "id" in item:
                ids.append(item["id"])

        defensemen = data.get("defensemen", [])
        
        for item in defensemen:
            if "id" in item:
                ids.append(item["id"])

        goalies = data.get("goalies", [])

        for item in goalies:
            if "id" in item:
                ids.append(item["id"])

    for player in ids:
        response = request.get(f"https://api-web.nhle.com/v1/player/{player}/landing")
        response.raise_for_status()
        data = response.json()

        playerId = data.get("playerId")
        isActive = data.get("isActive")
        currentTeamId = data.get("currentTeamId")
        currentTeamAbbrev = data.get("currentTeamAbbrev")
        teamLogo = data.get("teamLogo")
        sweaterNumber = data.get("sweaterNumber")
        position = data.get("position")
        headshot = data.get("headshot")
        heroImage = data.get("heroImage")
        heightInInches = data.get("heightInInches")
        heightInCentimeters = data.get("heightInCentimeters")
        weightInPounds = data.get("weightInPounds")
        weightInKilograms = data.get("weightInKilograms")
        birthDate = data.get("birthDate")
        birthCountry = data.get("birthCountry")
        shootsCatches = data.get("shootsCatches")
        playerSlug = data.get("playerSlug")
        inTop100AllTime = data.get("inTop100AllTime")
        inHHOF = data.get("inHHOF")

        sql = f"INSERT INTO nhl_data.players (playerId, isActive, currentTeamId, currentTeamAbbrev, 
        teamLogo, sweaterNumber, position, headshot, heroImage, heightInInches, heightInCentimeters, 
        weightInPounds, weightInKilograms, birthDate, birthCountry, shootsCatches, playerSlug, inTop100AllTime, 
        inHHOF) VALUES ({playerId}, {isActive}, {currentTeamId}, '{currentTeamAbbrev}', '{teamLogo}', {sweaterNumber}, 
        '{position}','{headshot}', '{heroImage}', {heightInInches}, {heightInCentimeters}, {weightInPounds}, {weightInKilograms},
        '{birthDate}', '{birthCountry}', '{shootsCatches}', '{playerSlug}', {inTop100AllTime}, {inHHOF});"

        cur = conn.cursor()
        cur.execute(sql)
        cur.close()

if __name__ == '__main__':
    app.run(debug=True)
