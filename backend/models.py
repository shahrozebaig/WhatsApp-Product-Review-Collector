from sqlalchemy import Column, Integer, Text, DateTime
from sqlalchemy.sql import func
from database import Base

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    contact_number = Column(Text, nullable=False)
    user_name = Column(Text, nullable=True)
    product_name = Column(Text, nullable=True)
    product_review = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
