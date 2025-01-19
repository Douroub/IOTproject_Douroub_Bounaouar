class VoteManager:
    def __init__(self, db):
        self.db = db

    def create_session(self, session_data):
        self.db.insert_session(session_data)

    def get_sessions(self):
        return self.db.get_sessions()

    def create_vote(self, session_id, vote_data):
        vote_data["session_id"] = session_id
        self.db.insert_vote(vote_data)

    def get_votes(self, session_id):
        return [vote for vote in self.db.get_votes() if vote.get("session_id") == session_id]

# Exemple d'utilisation :
# from database import Database
# db = Database()
# vote_manager = VoteManager(db)
# vote_manager.create_session({"session_id": "12345", "status": "active"})
# vote_manager.create_vote("12345", {"question": "Your question?", "options": ["A", "B"]})
