from src.utils import *

def rebuildTables():
    conn = connect()
    cur = conn.cursor()
    exec_sql_file("migrations/players.sql")
    exec_sql_file("migrations/teams.sql")
    exec_sql_file("migrations/games.sql")
    conn.commit()
    conn.close()