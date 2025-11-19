# 🚀 ReviewWave – WhatsApp Product Review Collector

This project is a full-stack system that collects customer product reviews through WhatsApp using the Twilio API, processes the conversation with a FastAPI backend, stores all submitted reviews in a PostgreSQL database, and displays them on a modern React web interface. It automates the entire review collection workflow, allowing users to submit product details and feedback through a simple WhatsApp chat, while the frontend presents the stored reviews in a clean, animated dashboard. The application demonstrates seamless integration between messaging automation, backend logic, database management, and a polished UI, all deployed on Render for real-time access.

Transform customer feedback into beautiful visual experiences! 💬✨

---

## LIVE URL 

https://whatsapp-product-review-collector-1.onrender.com/

**The website normally shows all the reviews properly, but if there hasn’t been any interaction for a long time, it may stop displaying them. This happens because the backend and WhatsApp/Twilio connection can become inactive after a long gap. Once the system goes idle, it won’t load the reviews until a new request or interaction is made.**

## Loom Video

https://www.loom.com/share/1eeb472221df47a8afd44ad9d2f91c10

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

## ScreenShots
<img width="2259" height="1618" alt="Screenshot 2025-11-19 003154" src="https://github.com/user-attachments/assets/e14ffb5b-8054-40cd-8edc-9f912303e0ef" />

<img width="2251" height="1617" alt="Screenshot 2025-11-19 003212" src="https://github.com/user-attachments/assets/9acd3a13-ab6c-4de0-8946-7a558386e150" />

<img width="2761" height="1514" alt="Screenshot 2025-11-19 095502" src="https://github.com/user-attachments/assets/e4e81dde-6470-4b28-b8c2-33243cc51979" />

---

## System Architecture

<img width="1938" height="498" alt="image" src="https://github.com/user-attachments/assets/b27c18c0-2863-4a09-9cea-e36d264ede88" />

---
## 🏗️ Project Structure

```
ReviewWave/
│
├── backend/
│   ├── main.py                    
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
   - See your review in the table!

5. **🎉 Success!**
   - Review appears with timestamp
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


