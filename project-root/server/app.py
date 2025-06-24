from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os

app = Flask(__name__)
CORS(app)

conn = psycopg2.connect(
    host="localhost",
    database="postgres",
    user="postgres",
    password="Penguins11$"
)
cur = conn.cursor()

@app.route("/api/data", methods=["GET"])
def get_data():
    cur.execute("SELECT * FROM player;")
    rows = cur.fetchall()
    return jsonify(rows)

if __name__ == "__main__":
    app.run(debug=True)