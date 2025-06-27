from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

conn = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="Penguins11$",
    host="localhost",
    port="5432"
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

if __name__ == '__main__':
    app.run(debug=True)
