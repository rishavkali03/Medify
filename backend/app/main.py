from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient  # Changed from motor.motor_asyncio
from dotenv import load_dotenv
import os
from .api import chat, users, predict
from fastapi.staticfiles import StaticFiles

# Load environment variables
load_dotenv()

app = FastAPI(title="Health App API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection (synchronous)
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
MONGODB_DB = os.getenv("MONGODB_DB", "health_db")

# Using pymongo (synchronous)
client = MongoClient(MONGODB_URL)
db = client[MONGODB_DB]

app.mount("/responses", StaticFiles(directory="responses"), name="responses")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(predict.router, prefix="/api", tags=["disease"])

# Basic endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to Health App API"}
