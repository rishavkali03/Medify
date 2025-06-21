from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr

class HealthMetricBase(BaseModel):
    type: str
    value: float
    unit: str
    notes: Optional[str] = None

class HealthMetricCreate(HealthMetricBase):
    pass

class HealthMetric(HealthMetricBase):
    timestamp: datetime

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    full_name: Optional[str] = None
    password: Optional[str] = None

class User(UserBase):
    id: str
    is_active: bool
    created_at: datetime
    health_metrics: List[HealthMetric] = []
    password_hash: Optional[str] = None
    

    class Config:
        from_attributes = True 
