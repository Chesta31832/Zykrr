import { Router } from 'express'
import { analyzeTicket, getTickets } from '../controllers/ticketController.js'

const router = Router()

router.post('/analyze', analyzeTicket)
router.get('/', getTickets)

export default router
