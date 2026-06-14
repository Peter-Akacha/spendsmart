# SpendSmart — AI-Powered Personal Finance Tracker

A full-stack expense tracking app with AI-powered categorization, built with React, Node.js, and Python.

## Tech Stack
- **Frontend:** React.js, Chart.js, CSS3
- **Backend:** Node.js, Express, REST API
- **AI:** Python (expense categorization)
- **Database:** MongoDB
- **Auth:** JWT

## Project Structure
```
spendsmart/
├── frontend/         # React app
│   └── src/
│       ├── components/
│       │   ├── Auth/
│       │   ├── Dashboard/
│       │   ├── Expenses/
│       │   ├── Charts/
│       │   └── Layout/
│       ├── pages/
│       ├── context/
│       ├── utils/
│       └── styles/
└── backend/          # Node.js API
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── utils/
```

## Getting Started

### 1. Clone & Install
```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && npm install

# Python AI service
pip install -r requirements.txt
```

### 2. Environment Variables
Copy `.env.example` to `.env` in both frontend and backend folders.

### 3. Run
```bash
# Backend (port 5000)
cd backend && npm run dev

# Frontend (port 3000)
cd frontend && npm start
```

## Features
- 📊 Visual spending dashboard with charts
- 🤖 AI auto-categorization of expenses
- 🔐 JWT authentication
- 📁 Export reports as PDF
- 📱 Fully responsive design
