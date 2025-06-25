from src.utils import *

def rebuildTables():
    conn = connect()
    cur = conn.cursor()
    conn.commit()
    conn.close()