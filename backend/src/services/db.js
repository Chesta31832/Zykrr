import { PrismaClient } from '@prisma/client'

process.env.DATABASE_URL ||= 'file:./prisma/dev.db'

export const prisma = new PrismaClient()

export const createTicket = async (data) => {
  return prisma.ticket.create({ data })
}

const buildWhere = ({ category, priority, search }) => {
  const where = {}

  if (category) {
    where.category = category
  }

  if (priority) {
    where.priority = priority
  }

  if (search) {
    where.message = {
      contains: search,
    }
  }

  return where
}

export const listTickets = async ({ limit, skip, category, priority, search }) => {
  const where = buildWhere({ category, priority, search })

  return prisma.ticket.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip,
  })
}
