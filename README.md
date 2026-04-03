# Finance Data Processing and Access Control Dashboard - Backend

This is a production-quality backend system for managing financial records with robust Role-Based Access Control (RBAC).

## 🚀 Project Overview

This backend is designed with clean architecture, separation of concerns, and best practices. It allows multiple users to register, log in, and perform actions based on their assigned roles (Viewer, Analyst, Admin). Financial records are tracked with capabilities for sorting, filtering, and pagination, along with a comprehensive analytics dashboard.

## 🧱 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Authentication:** JWT (jsonwebtoken) & bcrypt.js
- **Validation:** express-validator
- **Security & Utilities:** express-rate-limit, cors, dotenv, morgan

## 📁 Folder Structure

```
src/
├── config/             # Database connection & configurations
├── controllers/        # Request handlers mapping routes to services
├── middleware/         # Auth, Roles, Error Handlers, Rate limiting
├── models/             # Mongoose schemas (User, Record)
├── routes/             # Express routes definition
├── services/           # Core business logic separate from controllers
├── utils/              # Helper functions (API Response, Async Handler)
├── validations/        # Express validators for input sanitization
├── app.js              # Express app setup with global middleware
└── server.js           # Entry point and DB connector
```

## 🛠️ Setup Instructions

1. **Clone the repository** (if applicable)
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Setup**:
   Copy `.env.example` to `.env` and fill in the values:
   ```bash
   cp .env.example .env
   ```
4. **Run the server**:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 🔐 Environment Variables

| Variable | Description | Default |
| -------- | ----------- | ------- |
| `PORT` | API Server Port | `5000` |
| `MONGODB_URI` | MongoDB Connection String | `mongodb://localhost:27017/finance_dashboard` |
| `JWT_SECRET` | Secret key for JWT signing | `super_secret_jwt_key_please_change_in_production` |
| `JWT_EXPIRE` | JWT Expiry time | `30d` |
| `NODE_ENV` | Environment Type | `development` |

## 👥 Role & Permission Table

| Feature \ Role | Viewer (Read-only) | Analyst (Analytics) | Admin (Full Access) |
| --- | :---: | :---: | :---: |
| Register / Login | ✅ | ✅ | ✅ |
| Change User Roles | ❌ | ❌ | ✅ |
| Deactivate Users | ❌ | ❌ | ✅ |
| View Financial Records | ✅ | ✅ | ✅ |
| Create Records | ❌ | ❌ | ✅ |
| Update Records | ❌ | ❌ | ✅ |
| Delete Records (Soft) | ❌ | ❌ | ✅ |
| View Dashboard Summary| ❌ | ✅ | ✅ |

---

## 🧪 API Endpoints & Examples

Base URL: `http://localhost:5000/api/v1`

### 1. **Authentication**

#### Register
`POST /users/register`
**Request:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "role": "admin"
}
```
**Response:**
```json
{
  "statusCode": 201,
  "data": { "_id": "...", "name": "Jane Doe", "role": "admin", ... },
  "message": "User registered successfully",
  "success": true
}
```

#### Login
`POST /users/login`
**Request:**
```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "statusCode": 200,
  "data": { 
     "user": { ... },
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
  },
  "message": "User logged in successfully",
  "success": true
}
```

### 2. **Financial Records**

#### Create Record (Admin Only)
`POST /records`
**Headers:** `Authorization: Bearer <TOKEN>`
**Request:**
```json
{
  "amount": 1500.50,
  "type": "income",
  "category": "freelance",
  "date": "2024-05-10T10:00:00.000Z",
  "note": "Web development client payment"
}
```

#### Get Records (All Roles)
`GET /records?page=1&limit=10&type=income&sortBy=amount&sortOrder=desc`
**Headers:** `Authorization: Bearer <TOKEN>`
*Supports: Pagination, Filtering (startDate, endDate, category, type), Searching (search), Sorting (sortBy, sortOrder)*

#### Delete Record (Soft Delete - Admin Only)
`DELETE /records/:id`
**Headers:** `Authorization: Bearer <TOKEN>`

### 3. **Dashboard (Analyst & Admin)**

#### Get Summary
`GET /dashboard/summary`
**Headers:** `Authorization: Bearer <TOKEN>`
**Response:**
```json
{
  "statusCode": 200,
  "data": {
    "overall": { "totalIncome": 5000, "totalExpense": 1200, "netBalance": 3800 },
    "categoryWise": [ ... ],
    "recentTransactions": [ ... ],
    "monthlyTrends": [ ... ]
  },
  "success": true
}
```

---

## ⚙️ Assumptions Made

1. Only an `admin` can assign new users a role other than `viewer`. However, the current logic allows selecting a role on registration for ease of testing. In a strict prod environment, registration gives only `viewer`, and `admin` updates it.
2. Deleted records are "Soft Deleted" meaning their `isDeleted` flag is set to `true`. They are excluded from queries but remain in the DB.
3. Monthly trends in the dashboard reflect the last 6 months of data for performance and readability reasons.

## 🔮 Future Improvements

1. **Docker Support:** Containerize the API & Database using Docker & Docker Compose for seamless cross-platform setups.
2. **Unit Tests:** Implement robust testing using `Jest` and `Supertest`.
3. **Redis Caching:** Cache the `/dashboard/summary` and `/records` GET requests using Redis to reduce load on MongoDB.
4. **File Uploads:** Allow users to attach receipt images (using Multer + AWS S3).
