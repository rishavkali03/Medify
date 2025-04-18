from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class ChatMessageBase(BaseModel):
    sender: str
    text: Optional[str] = None
    file_path: Optional[str] = None
    audio_path: Optional[str] = None
    user_id: Optional[str] = None

class ChatMessageCreate(ChatMessageBase):
    pass

class ChatMessage(ChatMessageBase):
    id: str
    timestamp: datetime

    class Config:
        from_attributes = True 