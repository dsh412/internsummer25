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

if __name__ == '__main__':
    app.run(debug=True)
