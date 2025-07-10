# 📝 Fullstack To-Do List Application

A full-featured **To-Do List web app** with secure **user authentication** and **personalized task management**, built using:

- 🌐 **Frontend**: Next.js
- 🐍 **Backend**: Flask (Python)
- 🗃 **Database**: MySQL (via SQLAlchemy with PyMySQL)

---

## 🚀 Features

### 👤 User Authentication
- 🔐 **User Registration, Login & Logout** system using **Flask Sessions**
- 🛡 Passwords are securely **hashed and stored** in the database (never plain text)
- 🚫 Access control:
  - Logged-in users are **redirected away** from login/register pages
  - Non-authenticated users are **blocked from accessing the To-Do dashboard**

### ✅ To-Do Management
- 📋 **Add**, **Update**, **Delete**, and **View** to-dos — all linked to the logged-in user
- ⏳ Each to-do item has a **status**: `Pending` or `Completed`, which can be updated with a single click
- 🔔 Smart and clean **toast notifications** (toasters) for:
  - Success actions (like adding or updating)
  - Error cases (like invalid input or session expiration)

---

## 🧑‍💻 Tech Stack

| Layer       | Tech                                 |
|-------------|--------------------------------------|
| **Frontend** | Next.js (React-based framework)       |
| **Backend**  | Flask (Python)                        |
| **Database** | MySQL (via SQLAlchemy + PyMySQL)      |
| **Styling**  | Tailwind CSS                          |
| **State**    | Flask session, React state management |

---

## 🌐 Project Structure
To-Do-List/
├── backend/
│ ├── app/
│ │ ├── models/ # SQLAlchemy models (User, Todo)
│ │ ├── routes/ # Auth and To-Do API endpoints
│ │ └── init.py # Flask app creation
│ ├── run.py # Entry point for backend
│ └── requirements.txt # Python dependencies
│
├── frontend/
│ ├── src/app/components/ # UI Components: Todo, Login, Register
│ ├── src/app/pages/ # Pages: login, register, todo dashboard
│ ├── public/ # Static assets
│ └── next.config.mjs # Next.js config
│
└── README.md

---

## 🔐 Security Highlights

- ✅ Passwords are **hashed using Werkzeug**
- ✅ Users **cannot spoof sessions** to access other users' to-dos
- ✅ Proper **route-level access protection** on both frontend and backend

---
