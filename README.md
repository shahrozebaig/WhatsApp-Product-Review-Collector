# 🚀 ReviewWave – WhatsApp Product Review Collector

A stunning full-stack application that collects product reviews via **WhatsApp** using **Twilio** and displays them on a modern **React UI** with **breathtaking 3D animated backgrounds**.

Transform customer feedback into beautiful visual experiences! 💬✨

[![Deploy on Render](https://img.shields.io/badge/Deploy-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com)
[![Made with React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)

---

## 🌟 What This App Does

✅ **Users send product review messages on WhatsApp**  
✅ **Intelligent bot conversation flow:**
   1. 📦 **Product Name** - "Which product would you like to review?"
   2. 👤 **Your Name** - "What's your name?"
   3. ⭐ **Your Review** - "Please share your review"

✅ **Saves reviews into PostgreSQL database**  
✅ **React frontend displays:**
   - 👤 User name
   - 📦 Product name
   - 💬 Review text
   - ⏰ Timestamp

---

## ✨ Mp4


[screen-capture.webm](https://github.com/user-attachments/assets/4e796ea9-20fc-4ecf-b868-2dab5c8c6d18)


---

## 🏗️ Project Structure

```
ReviewWave/
│
├── backend/
│   ├── main.py                    #
│   ├── models.py                  
│   ├── database.py                
│   ├── schemas.py                 
│   ├── crud.py                    
│   ├── conversation_state.py     
│   └── requirements.txt           
│
├── frontend/
│   ├── src/
│   │   ├── App.js               
│   │   ├── components/
│   │   │   ├── ReviewsList.js    
│   │   └── services/
│   │       └── api.js           
│   ├── package.json
│   └── README.md
│
└── README.md                      
```
---

## ⚙️ Backend Setup (Local)

### **1. Navigate to Backend Directory**
```bash
cd backend
```

### **2. Install Dependencies**
```bash
pip install -r requirements.txt
```

### **3. Configure Database**
Create a `.env` file or set environment variable:
```env
DATABASE_URL=postgresql://username:password@host:port/dbname
```
> **Note:** If `DATABASE_URL` is not set, the app automatically falls back to SQLite for local development.

### **4. Run Backend Server**
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### **5. Access the API**
- 🌐 **Main:** http://localhost:8000
- 📚 **API Docs:** http://localhost:8000/docs (Interactive Swagger UI)
- 📖 **ReDoc:** http://localhost:8000/redoc

---

## 💬 Twilio WhatsApp Configuration

### **Step 1: Setup WhatsApp Sandbox**
1. Go to [Twilio Console](https://console.twilio.com/)
2. Navigate to **Messaging** → **Try it Out** → **Send a WhatsApp message**
3. Copy your sandbox phone number

### **Step 2: Configure Webhook**
Set the webhook URL to your deployed backend:
```
URL: https://your-backend.onrender.com/webhook
Method: POST
```

### **Step 3: Join Sandbox**
1. Send the join code to the Twilio sandbox number on WhatsApp
2. You'll receive a confirmation message

### **Step 4: Test the Bot**
Send any message (e.g., `hi`) to start the review flow!

---

## 🧪 End-to-End Testing

### **Complete Testing Flow:**

1. **📱 Open WhatsApp**
   - Find your Twilio sandbox number
   - Send message: `hi`

2. **🤖 Interact with Bot**
   - Answer: "Laptop" (product name)
   - Answer: "John Doe" (your name)
   - Answer: "Great product, highly recommended!" (review)

3. **✅ Confirmation**
   - Bot confirms review saved
   - Check backend logs if needed

4. **🌐 View on Frontend**
   - Open your frontend URL
   - Refresh page if needed
   - See your review in the beautiful animated table!

5. **🎉 Success!**
   - Review appears with timestamp
   - Background animations running smoothly

---

## 📊 Database Schema

### **Reviews Table**
| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER | Primary key (auto-increment) |
| `product_name` | VARCHAR(255) | Name of the product |
| `user_name` | VARCHAR(255) | Name of the reviewer |
| `review_text` | TEXT | Complete review content |
| `created_at` | TIMESTAMP | Auto-generated timestamp |

---

## 🔌 API Endpoints

### **Backend REST API**

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| `GET` | `/` | Health check | `{"message": "ReviewWave API"}` |
| `GET` | `/reviews` | Get all reviews | Array of review objects |
| `POST` | `/webhook` | Twilio webhook | Conversation response |

### **Example API Response:**
```json
{
  "reviews": [
    {
      "id": 1,
      "product_name": "Laptop",
      "user_name": "John Doe",
      "review_text": "Great product, highly recommended!",
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---


