# 🎉 Event Management REST API

A backend REST API for managing events and user registrations, built with **Node.js**, **Express**, and **PostgreSQL**.

---

## 📌 Objective

Design and implement an Event Management System to test backend skills including:

- ✅ Business logic implementation
- ✅ Edge case handling
- ✅ PostgreSQL relations
- ✅ RESTful API design
- ✅ Custom validation

---

## 🛠️ Tech Stack

- **Node.js + Express**
- **PostgreSQL**
- **Swagger (OpenAPI)**
- **JWT (Authentication via Cookies)**
- **dotenv, cookie-parser**
- **ESM Modules**

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/shyamkolge/Event-Management-
cd Event-Management-
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment
Create a .env file in the root directory:
```bash
PORT=3000
NODE_ENV="production"
JWT_SECRET=
DATABASE_URL=
```

### 4️⃣ Start PostgreSQL and Create Tables
Run the following SQL in your PostgreSQL client:
```bash
-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- Events Table
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  datetime TIMESTAMP,
  location VARCHAR(255),
  capacity INTEGER CHECK (capacity > 0 AND capacity <= 1000),
  createdby INTEGER REFERENCES users(id)
);

-- Registrations Table
CREATE TABLE event_registrations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  event_id INTEGER REFERENCES events(id),
  UNIQUE (user_id, event_id)
);
```
5️⃣ Run the Server
```bash
npm run dev

### The API will be available at:
http://localhost:3000

### Swagger UI will be available at:
http://localhost:3000/api-docs
```

### 🔐 Authentication Endpoints
📥 Register User
POST /api/v1/auth/register
```bash
Request Body:
{
  "name": "Ravi Sharma",
  "email": "ravi@example.com",
  "password": "pass1234"
}


Response:
{
  "success": true,
  "message": "User registered"
}
```
🔑 Login
POST /api/v1/auth/login
```bash
Request Body:
{
  "email": "ravi@example.com",
  "password": "pass1234"
}

Response:
{
  "success": true,
  "message": "Login successful"
}
```
🚪 Logout
GET /api/v1/auth/logout


### 🎯 Event Endpoints
⚠️ All event endpoints require authentication via cookie

###🆕 Create Event
POST /api/v1/event/create
```
Request Body:
{
  "title": "Tech Meetup",
  "datetime": "2025-08-10T10:00:00",
  "location": "Pune",
  "capacity": 200
}

Response:
{
  "success": true,
  "message": "Event created",
  "data": {
    "eventId": 1
  }
}
```
###📄 Get Event Details
GET /api/v1/event/getEventDetails/1
```
Response:
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Tech Meetup",
    "datetime": "2025-08-10T10:00:00",
    "location": "Pune",
    "capacity": 200,
    "registeredUsers": [
      {
        "id": 2,
        "name": "Priya Verma",
        "email": "priya@example.com"
      }
    ]
  }
}
```
###✅ Register for Event
POST /api/v1/event/1/register
```
Response:
{
  "success": true,
  "message": "User registered successfully"
}
```
###❌ Cancel Registration
GET /api/v1/event/1/cancel
```
Response:
{
  "success": true,
  "message": "Registration cancelled"
}
```
###📅 Upcoming Events
GET /api/v1/event/upcomingEvents
Returns events ordered by date (ASC), then location (alphabetically).

### 📊 Event Stats
GET /api/v1/event/stats/1
```
{
  "success": true,
  "data": {
    "totalRegistrations": 20,
    "remainingCapacity": 180,
    "percentageUsed": "10.00%"
  }
}
```
📏 Business Rules
✔ Capacity must be between 1 and 1000
✔ No duplicate event registrations
✔ Cannot register for past events
✔ Cannot register for full events
✔ All inputs validated
✔ Returns appropriate HTTP codes (400, 404, 409, etc.)

### 📄 API Documentation
Visit Swagger UI at:
```
http://localhost:3000/api-docs
```

