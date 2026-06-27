# 🎓 Student Management System - Backend

## 📌 Overview
This is the backend for the Student Management System built using **Node.js, Express.js, Prisma ORM, and PostgreSQL/MySQL**.

It provides REST APIs for managing students with full CRUD operations, along with search and pagination support.

---

## ⚙️ Features
- ➕ Create Student
- 📄 Get All Students (with pagination)
- 🔍 Search Students by name
- ✏️ Update Student details
- ❌ Delete Student
- 🧾 Prisma ORM for database management
- 🛡️ Middleware-based architecture

---

## 🛠️ Tech Stack
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL / MySQL
- JavaScript (ES6)

## 📁 Project Structure
src/
├── config/
│   └── prisma.js
├── controllers/
│   ├── studentController.js
│   ├── authController.js
│   └── markController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── adminMiddleware.js
│   ├── errorMiddleware.js
│   └── uploadMiddleware.js
├── routes/
│   ├── studentRoutes.js
│   ├── authRoutes.js
│   └── markRoutes.js
├── uploads/
└── server.js

---

## 📁 Project Structure
