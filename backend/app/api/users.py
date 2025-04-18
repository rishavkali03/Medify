from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from pymongo import MongoClient
from bson import ObjectId
import os

router = APIRouter()

# MongoDB connection (sync)
client = MongoClient(os.getenv("MONGODB_URL"))
db = client[os.getenv("MONGODB_DB")]

# Models
class UserBase(BaseModel):
    username: str
    email: str
    password: str

    class Config:
        orm_mode = True

class User(UserBase):
    id: str

class HealthMetric(BaseModel):
    type: str
    value: float
    unit: str
    notes: str = None

# User endpoints
@router.post("/register")
def register(user: UserBase):
    try:
        # Check if user exists
        existing_user = db.users.find_one({
            "$or": [
                {"username": user.username},
                {"email": user.email}
            ]
        })
        if existing_user:
            raise HTTPException(status_code=400, detail="Username or email already exists")
        
        # Create new user
        user_dict = user.dict()
        result = db.users.insert_one(user_dict)
        return {"message": "User registered successfully", "user_id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login")
def login(username: str, password: str):
    try:
        user = db.users.find_one({
            "username": username,
            "password": password
        })
        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        return {
            "message": "Login successful",
            "user_id": str(user["_id"]),
            "username": user["username"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[User])
def get_users():
    users = db.users.find()
    return [
        User(
            id=str(user["_id"]),
            username=user["username"],
            email=user["email"],
            password=user["password"]
        ) for user in users
    ]

@router.get("/{user_id}", response_model=User)
def get_user(user_id: str):
    try:
        user = db.users.find_one({"_id": ObjectId(user_id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return User(
        id=str(user["_id"]),
        username=user["username"],
        email=user["email"],
        password=user["password"]
    )

@router.post("/{user_id}/metrics")
def add_health_metric(user_id: str, metric: HealthMetric):
    try:
        user = db.users.find_one({"_id": ObjectId(user_id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$push": {"health_metrics": metric.dict()}}
    )
    
    return {"message": "Health metric added successfully"}
