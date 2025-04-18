from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseModel):
    # MongoDB Configuration
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    MONGODB_DB: str = os.getenv("MONGODB_DB", "arogyamarg")
    MONGODB_USER_COLLECTION: str = os.getenv("MONGODB_USER_COLLECTION", "users")
    MONGODB_CHAT_COLLECTION: str = os.getenv("MONGODB_CHAT_COLLECTION", "chats")
    MONGODB_HEALTH_METRICS_COLLECTION: str = os.getenv("MONGODB_HEALTH_METRICS_COLLECTION", "health_metrics")

    # Security
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

settings = Settings() 