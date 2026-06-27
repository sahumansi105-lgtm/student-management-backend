🎓 Student Management System - Backend
📌 Overview

This is the backend for the Student Management System built using Node.js, Express.js, Prisma ORM, and PostgreSQL/MySQL.

It provides REST APIs for managing students with full CRUD operations, along with search and pagination support.

⚙️ Features
➕ Create Student
📄 Get All Students (with pagination)
🔍 Search Students by name
✏️ Update Student details
❌ Delete Student
🧾 Prisma ORM for database management
🛡️ Middleware-based architecture

🛠️ Tech Stack
Node.js
Express.js
Prisma ORM
PostgreSQL / MySQL
JavaScript (ES6)


📁 Project Structure
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

🚀 Setup Instructions

1️⃣ Clone repository
git clone https://github.com/sahumansi105-lgtm/student-management-backend
cd student-management-backend
2️⃣ Install dependencies
npm install
3️⃣ Setup environment variables

Create a .env file:

DATABASE_URL="your_database_url_here"
PORT=5000
4️⃣ Prisma setup
npx prisma generate
npx prisma migrate dev
5️⃣ Run server
npm run dev

Server runs at:

http://localhost:5000
🧠 Architecture Explanation
Routes → Define API endpoints
Controllers → Handle business logic
Prisma ORM → Handles database queries
Middleware → Handles authentication, errors, and validations
Server.js → Entry point of application

This separation ensures clean, scalable, and maintainable code.

📌 Assumptions Made
Pagination limit is fixed to 5 students per page
Search is implemented only on student name
Simple CRUD system without advanced role-based access control
No external authentication system required beyond basic middleware
File uploads handled using Express middleware

👨‍💻 Author
Built as part of Frontend Developer Assignment.
