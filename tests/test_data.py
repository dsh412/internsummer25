import unittest
from src.data import *
from src.utils import *

class TestChat(unittest.TestCase):

    def setUp(self):
        rebuildTables()