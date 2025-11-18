import os
from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.responses import Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from crud import create_review, get_all_reviews
from schemas import ReviewOut
from conversation_state import get_state, set_state, clear_state

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def twiml_message(text: str):
    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>{text}</Message>
</Response>"""
    return Response(content=xml, media_type="application/xml")

@app.post("/webhook")
async def whatsapp_webhook(request: Request, db: Session = Depends(get_db)):
    form = await request.form()
    from_number = form.get("From")
    body = (form.get("Body") or "").strip()

    if not from_number:
        raise HTTPException(status_code=400, detail="Missing From")

    contact_number = from_number.replace("whatsapp:", "").strip()

    state = get_state(contact_number)

    if not state:
        set_state(contact_number, {"stage": "awaiting_product"})
        return twiml_message("Which product is this review for?")

    stage = state.get("stage")

    if stage == "awaiting_product":
        state["product_name"] = body
        state["stage"] = "awaiting_name"
        set_state(contact_number, state)
        return twiml_message("What's your name?")

    if stage == "awaiting_name":
        state["user_name"] = body
        state["stage"] = "awaiting_review"
        set_state(contact_number, state)
        return twiml_message(f"Please send your review for {state.get('product_name')}.")

    if stage == "awaiting_review":
        review_text = body
        r = create_review(
            db,
            contact_number,
            state["user_name"],
            state["product_name"],
            review_text
        )
        clear_state(contact_number)
        return twiml_message(f"Thanks {state['user_name']} -- your review for {state['product_name']} has been recorded.")

    clear_state(contact_number)
    set_state(contact_number, {"stage": "awaiting_product"})
    return twiml_message("Let's start again. Which product is this review for?")

@app.get("/api/reviews", response_model=list[ReviewOut])
def api_get_reviews(db: Session = Depends(get_db)):
    return get_all_reviews(db)

@app.get("/")
def root():
    return {"status": "ok"}
