# AI-Powered Support Ticket Triage

A support triage app with a weighted keyword analyzer, Express + Prisma backend, SQLite persistence, Jest tests, and a focused React UI for submission and ticket history.

## Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: Prisma + SQLite
- Testing: Jest
- DevOps: Docker + Docker Compose

## Highlights

- Weighted scoring engine with category, urgency, and priority logic.
- Custom refund rule that escalates double-charge/refund tickets to P1.
- Simple ticket submission flow with result panel and latest-first history list.
- Jest unit tests for analyzer behavior.

## Quick Start

### Docker

```bash
docker-compose up --build
```

Open:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health: http://localhost:5000/health

### Local Development

Backend:

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:push
npm start
```

Run `npm run prisma:push` whenever the Prisma schema changes.

Frontend:

```bash
cd frontend
npm install
npm start
```

## API

### POST /tickets/analyze

Request:

```json
{ "message": "The payment system is down and customers cannot checkout" }
```

Response fields include:
- category
- priority
- urgency
- confidence
- keywords

### GET /tickets

Query params:
- limit
- skip
- category
- priority
- search

## Analyzer Logic

The engine uses weighted keyword scoring:

Keyword weights drive category selection, urgency words raise priority pressure, and a custom refund rule escalates double-charge/refund tickets to P1.

## Testing

```bash
cd backend
npm test
```

Coverage:
- Billing classification
- Urgency escalation
- Custom refund escalation rule

## Design Decisions

- Prisma keeps persistence simple and deterministic.
- Weighted keyword scoring is fast, explainable, and easy to test.
- MVC-style separation keeps the backend readable and extendable.

## Trade-offs

- No semantic understanding or ML model.
- Keyword matching can produce false positives.
- SQLite is ideal for a demo and local submission, not high-concurrency production use.

## Improvements

- Add authentication and role-based access.
- Add embeddings or a lightweight classifier.
- Deploy to AWS or another cloud platform.

## Demo Script

1. Introduce the support triage workflow.
2. Submit a normal ticket and show category, priority, and confidence.
3. Show the ticket history list updating after submission.
4. Submit a double-charge refund ticket and highlight the custom P1 escalation rule.
5. Run `npm test` to show the analyzer tests passing.
