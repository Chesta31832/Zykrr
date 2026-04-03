import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, BadgeCheck, Clock, Paperclip, Receipt, Settings, ShieldAlert, Lightbulb, User } from 'lucide-react'
import { getTickets } from '../api'

const PAGE_SIZE = 10

export default function TicketList({ triggerRefresh, onLoading }) {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)
      setError(null)

      try {
        onLoading?.(true)
        const ticketData = await getTickets({ limit: PAGE_SIZE, skip: 0 })
        setTickets(ticketData)
      } catch (err) {
        setError(err.message || String(err))
      } finally {
        setLoading(false)
        onLoading?.(false)
      }
    }

    fetchTickets()
  }, [triggerRefresh])

  const categoryIcon = {
    Billing: Receipt,
    Technical: Settings,
    Account: User,
    'Feature Request': Lightbulb,
    Other: Paperclip,
  }

  const formatDate = (dateValue) => {
    const date = new Date(dateValue)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const priorityClass = (priority) => {
    if (priority === 'P0') return 'bg-rose-500 text-white border-rose-400'
    if (priority === 'P1') return 'bg-orange-500 text-white border-orange-400'
    if (priority === 'P2') return 'bg-amber-400 text-amber-950 border-amber-300'
    return 'bg-emerald-500 text-white border-emerald-400'
  }

  return (
    <div className="rounded-3xl border border-white/5 bg-zinc-900/40 p-6 sm:p-8 shadow-2xl backdrop-blur-3xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-500/20 bg-slate-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-300">
          Recent Tickets
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">History</h2>
          <p className="max-w-2xl text-sm text-slate-400 leading-relaxed">
            Previously analyzed tickets appear here, newest first.
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-6 py-4 font-semibold text-rose-200 flex items-center gap-3">
              <ShieldAlert className="h-5 w-5" /> {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="mb-6 h-12 w-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-500"
          />
          <p className="font-bold tracking-widest uppercase text-xs text-slate-400">Loading records</p>
        </div>
      ) : tickets.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="h-24 w-24 rounded-full bg-slate-800/50 flex items-center justify-center mb-6 border border-white/5 shadow-inner">
            <Activity className="h-10 w-10 text-slate-500" />
          </div>
          <p className="text-xl font-bold text-slate-200">No records found</p>
          <p className="mt-2 text-sm text-slate-400 max-w-sm">Analyze a ticket to see it listed here.</p>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="space-y-4"
        >
          {tickets.map((ticket) => {
            const Icon = categoryIcon[ticket.category] || Activity

            return (
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                key={ticket.id}
                className="group rounded-2xl border border-white/5 bg-zinc-950/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-900/80 cursor-default shadow-lg"
              >
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-white/5 text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors border border-white/5">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-cyan-300 transition-colors">
                        {ticket.category}
                      </span>
                    </div>
                    <p className="mb-4 text-[17px] font-semibold text-slate-100 leading-snug pr-4">
                      {ticket.message}
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-400">
                      <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                        <BadgeCheck className="h-4 w-4 text-emerald-400" />
                        <span className="text-slate-300">
                          Confidence: <span className="text-emerald-400 font-bold">{(ticket.confidence * 100).toFixed(0)}%</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                        <Clock className="h-4 w-4 text-cyan-400" />
                        <span className="text-slate-300">{formatDate(ticket.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 items-end">
                    <div className={`px-4 py-1.5 rounded-full font-bold text-sm border ${priorityClass(ticket.priority)}`}>
                      {ticket.priority}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </div>
  )
}