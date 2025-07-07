from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2
from dotenv import load_dotenv
import os

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
def get_data():
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

        

if __name__ == '__main__':
    app.run(debug=True)
