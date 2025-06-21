from fastapi import APIRouter, HTTPException, Depends, Header, Query
from pydantic import BaseModel
from typing import List
from pymongo import MongoClient
from bson import ObjectId
import os
from app.core.auth import hash_password, verify_password, create_access_token, decode_access_token
from app.schemas.user import UserCreate

router = APIRouter()

# MongoDB connection (sync)
client = MongoClient(os.getenv("MONGODB_URL"))
db = client[os.getenv("MONGODB_DB")]

# Models
class UserBase(BaseModel):
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

class LoginRequest(BaseModel):
    email: str
    password: str

# User endpoints
@router.post("/register")
def register(user: UserCreate):
    # Check if email or username already exists
    if db.users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    if db.users.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already taken")

    user_dict = user.dict()
    user_dict["password"] = hash_password(user_dict["password"])
    
    result = db.users.insert_one(user_dict)
    
    # Create token with user ID and username
    access_token = create_access_token(data={"sub": str(result.inserted_id), "username": user.username})

    return {
        "message": "User registered successfully",
        "user_id": str(result.inserted_id),
        "username": user.username,
        "access_token": access_token,
    }

@router.get("/verify-email")
def verify_email(token: str = Query(...)):
    payload = decode_access_token(token)
    if not payload or not payload.get("verify"):
        raise HTTPException(status_code=400, detail="Invalid or expired verification token")
    user_id = payload.get("sub")
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.get("is_verified"):
        return {"message": "Email already verified."}
    db.users.update_one({"_id": ObjectId(user_id)}, {"$set": {"is_verified": True}})
    return {"message": "Email verified successfully."}

@router.post("/login")
def login(request: LoginRequest):
    user = db.users.find_one({"email": request.email})
    if not user or not verify_password(request.password, user.get("password")):
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    # Create token with user ID and username
    access_token = create_access_token(data={"sub": str(user["_id"]), "username": user["username"]})

    return {
        "message": "Login successful",
        "access_token": access_token,
        "user_id": str(user["_id"]),
        "username": user["username"],
    }

def get_current_user(Authorization: str = Header(...)):
    if not Authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    token = Authorization.split(" ", 1)[1]
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    user_id = payload.get("sub")
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/", response_model=List[User])
def get_users(current_user: dict = Depends(get_current_user)):
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
def get_user(user_id: str, current_user: dict = Depends(get_current_user)):
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
def add_health_metric(user_id: str, metric: HealthMetric, current_user: dict = Depends(get_current_user)):
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
