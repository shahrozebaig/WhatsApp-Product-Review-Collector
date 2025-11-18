from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ReviewOut(BaseModel):
    id: int
    contact_number: str
    user_name: Optional[str]
    product_name: Optional[str]
    product_review: str
    created_at: datetime

    class Config:
        orm_mode = True
