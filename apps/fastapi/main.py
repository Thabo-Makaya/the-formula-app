
from fastapi import FastAPI

from services.spotify_service import fetch_and_cache as spotify_fetch_and_cache
from services.youtube_service import fetch_and_cache as youtube_fetch_and_cache

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "ok", "message": "FastAPI microservices ready (stubbed)"}
