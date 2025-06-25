import unittest
from src.data import *
from src.utils import *

class TestChat(unittest.TestCase):

    def setUp(self):
        rebuildTables()
        exec_sql_file("migrations/players.sql")
        exec_sql_file("migrations/teams.sql")
        exec_sql_file("migrations/games.sql")