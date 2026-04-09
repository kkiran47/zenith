# Modern Task Manager (Full-Stack)

A premium, full-stack Task Manager application built with Node.js, Express, React, and Tailwind CSS. Featuring a glassmorphic UI, smooth animations, and persistent data storage.

## 🚀 Features

- **Premium UI**: Modern glassmorphism design with a dark violet theme.
- **Smooth Animations**: Powered by Framer Motion for layout transitions and interactions.
- **Full CRUD**: Create, Read, Update (Toggle Status + Edit Title), and Delete tasks.
- **Filters**: Quickly switch between All, Pending, and Completed tasks.
- **Data Persistence**: Tasks are saved in a local JSON file in the backend.
- **Responsive**: Fully optimized for mobile and desktop screens.
- **Error Handling**: Real-time feedback for server connection issues and validation.

## 🛠 Tech Stack

### Backend
- **Node.js** & **Express**
- **JSON File Storage** (Persistence)
- **UUID** (Unique task IDs)
- **Cors** & **Body-Parser**

### Frontend
- **React 19** (Vite)
- **Tailwind CSS v4**
- **Axios** (API communication)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)

## 📁 Folder Structure

```text
/
├── backend/
│   ├── controllers/   # Request logic
│   ├── data/          # JSON data store
│   ├── models/        # Data access layer
│   ├── routes/        # API endpoints
│   ├── server.js      # Main entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/       # API service
    │   ├── components/# Reusable UI components
    │   ├── App.jsx    # Main application logic
    │   ├── index.css  # Styles & Tailwind config
    │   └── main.jsx   # React entry point
    └── package.json
```

## ⚙️ How to Run

### Prerequisites
- Node.js (v18+)
- npm

### 1. Setup Backend
```bash
cd backend
npm install
npm start
```
The backend will run on `http://localhost:5000`.

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`. Open this URL in your browser.

## 📝 API Endpoints

- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Create a new task (body: `{ "title": "string" }`)
- `PATCH /tasks/:id` - Update status or title (body: `{ "completed": boolean, "title": "string" }`)
- `DELETE /tasks/:id` - Remove a task
