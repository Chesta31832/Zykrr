import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ticketRoutes from './routes/ticketRoutes.js'
import { prisma } from './services/db.js'

dotenv.config()

const app = express()
const port = Number(process.env.BACKEND_PORT || 5000)

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Support Ticket Triage API is running' })
})

app.use('/tickets', ticketRoutes)

app.use((err, _req, res, _next) => {
  console.error(err)
  const status = err.status || 500
  res.status(status).json({ error: err.message || 'Internal server error' })
})

async function start() {
  try {
    await prisma.$connect()
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
    console.error('Failed to start server', error)
    process.exit(1)
  }
}

start()

export default app
