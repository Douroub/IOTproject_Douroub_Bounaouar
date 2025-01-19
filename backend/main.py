from fastapi import FastAPI
from app.database import Database
from app.mqtt_manager import MQTTManager
from app.vote_manager import VoteManager

app = FastAPI()

# Initialisation
db = Database()
mqtt_manager = MQTTManager()
vote_manager = VoteManager(db)

mqtt_manager.connect()

# Routes
@app.get("/")
def root():
    return {"message": "Welcome to the IoT Voting System"}

@app.post("/create_session/")
def create_session(session_data: dict):
    vote_manager.create_session(session_data)
    return {"status": "Session created", "data": session_data}

@app.post("/create_vote/")
def create_vote(session_id: str, vote_data: dict):
    vote_manager.create_vote(session_id, vote_data)
    mqtt_manager.publish(f"session/{session_id}/vote", "New vote created")
    return {"status": "Vote created", "data": vote_data}

@app.get("/get_votes/")
def get_votes(session_id: str):
    votes = vote_manager.get_votes(session_id)
    return {"status": "Votes fetched", "data": votes}
