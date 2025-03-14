# Mini Expense Tracker with Intelligent Insights

## Overview
This is a **Mini Expense Tracker** application that allows users to securely authenticate, manage their expenses, and gain insights into their spending patterns. The frontend is built using **ReactJS**, while the backend is implemented using **Node.js with Express and MongoDB (Mongoose ORM)**.

## Features
### 1️⃣ Authentication (JWT + HTTP-only Cookies)
- Users can **register** with their first name, last name, email, and password.
- Secure **login** with JWT authentication stored in **HTTP-only cookies**.
- **Logout** functionality to invalidate tokens.
- Handles **token expiry gracefully**, including refresh tokens.

### 2️⃣ Expense Management (CRUD)
- Users can **add, update, delete, and view expenses**.
- Each expense includes:
  - **Amount** (numeric, required)
  - **Category** (e.g., Food, Travel, etc.)
  - **Date** (required)
  - **Description** (optional)
- **Pagination and Filtering**:
  - Expenses are **paginated** for performance.
  - Users can filter by **date range** and **category**.

### 3️⃣ Spending Insights
- API endpoint calculates:
  - **Total spending per category**.
  - **Percentage distribution of expenses** across categories.
- Insights are displayed using **charts (Bar/Pie chart)** in the frontend.
- Efficient backend logic ensures smooth handling of large datasets.

### 4️⃣ Frontend (ReactJS + Vite + TailwindCSS)
- **Login/Register Page:** Handles JWT authentication securely.
- **Dashboard Page:**
  - Lists expenses with pagination & filters.
  - Displays spending insights in a **chart**.
- **Add/Edit Expense Page:** A simple form to manage expenses.
- **Delete Expense:** Users can remove expenses if needed.
- **Fully responsive UI** for mobile and desktop.

## Tech Stack
### 🔹 Frontend:
- **ReactJS** + Vite
- **TailwindCSS** (for styling)
- **React Router** (for navigation)
- **Recharts** (for data visualization)

### 🔹 Backend:
- **Node.js** + Express
- **MongoDB** (using Mongoose ORM)
- **JWT Authentication** (with HTTP-only cookies)
- **Redis** (for session management, optional)

### 🔹 Deployment:
- **Frontend:** Vercel
- **Backend:** Render / AWS
- **Database:** MongoDB Atlas

## API Endpoints
### 🔐 Authentication
| Method | Endpoint            | Description         |
|--------|---------------------|---------------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login & get JWT    |
| POST   | `/api/auth/logout`   | Logout & clear JWT |

### 💰 Expense Management
| Method | Endpoint          | Description             |
|--------|------------------|-------------------------|
| POST   | `/api/expenses`   | Add a new expense      |
| GET    | `/api/expenses`   | Get all expenses (paginated & filtered) |
| PUT    | `/api/expenses/:id` | Update an expense     |
| DELETE | `/api/expenses/:id` | Delete an expense     |

### 📊 Spending Insights
| Method | Endpoint           | Description                          |
|--------|-------------------|----------------------------------|
| GET    | `/api/insights`   | Get total spending per category |

## Installation & Setup
### 🛠 Backend Setup
```bash
cd backend
npm install
npm start
```

### 🛠 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 🔐 Environment Variables (.env)
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

---
🚀 **Live Demo:** [https://erino-assignment-hpl60p81j-prateek-fsts-projects.vercel.app/]  

