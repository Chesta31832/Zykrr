import { analyzeTicketMessage } from '../services/ticketService.js'
import { createTicket, listTickets } from '../services/db.js'

const safeParseKeywords = (value) => {
  if (!value) {
    return []
  }

  try {
    return JSON.parse(value)
  } catch {
    return []
  }
}

const normalizeTicket = (ticket) => ({
  id: ticket.id,
  message: ticket.message,
  category: ticket.category,
  priority: ticket.priority,
  urgency: ticket.urgency,
  confidence: ticket.confidence,
  keywords: safeParseKeywords(ticket.keywords),
  createdAt: ticket.createdAt,
})

export const analyzeTicket = async (req, res, next) => {
  try {
    const message = String(req.body?.message || '').trim()

    if (!message) {
      return res.status(400).json({ error: 'Message required' })
    }

    const analysis = analyzeTicketMessage(message)
    const saved = await createTicket({ message, ...analysis })

    res.json(normalizeTicket(saved))
  } catch (error) {
    next(error)
  }
}

export const getTickets = async (req, res, next) => {
  try {
    const rawLimit = Number(req.query.limit ?? 50)
    const rawSkip = Number(req.query.skip ?? 0)
    const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 100) : 50
    const skip = Number.isFinite(rawSkip) ? Math.max(rawSkip, 0) : 0
    const { category, priority, search } = req.query

    const tickets = await listTickets({ limit, skip, category, priority, search })
    res.json(tickets.map(normalizeTicket))
  } catch (error) {
    next(error)
  }
}
