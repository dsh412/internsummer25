import unittest
from src.data import *
from src.utils import *

class TestChat(unittest.TestCase):

    def setUpTest(self):
        rebuildTables()
        exec_sql_file("schema/test/players.sql")
        exec_sql_file("schema/test/teams.sql")
        exec_sql_file("schema/test/games.sql")