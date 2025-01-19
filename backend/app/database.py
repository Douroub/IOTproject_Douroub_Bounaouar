from pymongo import MongoClient

class Database:
    def __init__(self, uri="mongodb://localhost:27017/", db_name="iot_voting"):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]

    def insert_vote(self, vote_data):
        self.db.votes.insert_one(vote_data)

    def get_votes(self):
        return list(self.db.votes.find({}))

    def insert_session(self, session_data):
        self.db.sessions.insert_one(session_data)

    def get_sessions(self):
        return list(self.db.sessions.find({}))

# Exemple d'utilisation :
# db = Database()
# db.insert_vote({"question": "Your question?", "options": ["A", "B", "C"]})
