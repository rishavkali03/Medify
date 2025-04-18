from pymongo import MongoClient
from typing import Generator
from app.core.config import settings

# Initialize MongoDB client once (singleton-style)
client = MongoClient(settings.MONGODB_URL)
db = client[settings.MONGODB_DB]

# Dependency to get database connection (sync)
def get_db() -> Generator:
    try:
        yield db
    finally:
        pass  # Cleanup not needed for MongoClient usually
