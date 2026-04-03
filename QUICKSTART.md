# Quick Start Guide

## What You Need

- Node.js 18+
- Docker and Docker Compose
- PowerShell on Windows

## Run with Docker

From the repository root:

```bash
docker-compose up --build
```

Open:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health: http://localhost:5000/health

## Run Locally

### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm start
```

### Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm start
```

The frontend runs on http://localhost:3000 and uses the backend at http://localhost:5000.

## Run Tests

From the backend folder:

```bash
cd backend
npm test
```

Expected result: all Jest analyzer tests pass.

## What You Can Demo

1. Submit a ticket such as: `The payment system is down and customers need an urgent refund`
2. Show the category, priority, confidence, and keywords returned by the analyzer
3. Submit: `my account is hacked` to show the Security rule and P0 escalation
4. Scroll through the dashboard history
5. Use search, category filters, priority filters, and pagination
6. Show the KPI cards and Recharts charts

## API Endpoints

- `POST /tickets/analyze`
- `GET /tickets`
- `GET /tickets/stats`
- `GET /health`

## Current Status

- Backend: Node.js + Express + Prisma + SQLite
- Frontend: React + Vite + Tailwind CSS + Recharts
- Tests: Jest
- Deployment: Docker + Docker Compose
