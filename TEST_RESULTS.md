# Test Results - Support Ticket Triage System

## Test Run Date

April 3, 2026

## Environment

- OS: Windows
- Backend: Node.js + Express + Prisma + SQLite
- Frontend: React + Vite + Tailwind CSS + Recharts
- Tests: Jest

## Results Summary

### Backend Unit Tests

Command:

```bash
cd backend
npm test
```

Result:

- Test Suites: 1 passed
- Tests: 3 passed, 0 failed
- Status: 100% passing

### Test Coverage

The current Jest suite covers:

- Billing classification
- Urgency escalation
- Custom Security rule

## Verified Runtime Checks

### Backend Health

Command:

```bash
GET http://localhost:5000/health
```

Result:

- Status: ok
- Message: Support Ticket Triage API is running

### Analyze Endpoint

Command:

```bash
POST http://localhost:5000/tickets/analyze
```

Sample input:

```json
{ "message": "my account is hacked" }
```

Result:

- Category: Security
- Priority: P0
- Confidence: 0.95
- Data loss risk: true

### Stats Endpoint

Command:

```bash
GET http://localhost:5000/tickets/stats
```

Result:

- Returns total ticket count
- Returns P0 count
- Returns category counts
- Returns priority counts

### Frontend Build

Command:

```bash
cd frontend
npm run build
```

Result:

- Build completed successfully
- Vite emitted a chunk-size warning because the dashboard bundle is large

## Notes

- The old Python/pytest results are no longer relevant.
- The current verified test surface is Jest on the backend plus a successful frontend production build.
