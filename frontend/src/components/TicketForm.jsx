import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, MessageSquareText } from 'lucide-react'
import { analyzeTicket } from '../api'

export default function TicketForm({ onSuccess, onError }) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!message.trim()) {
      onError('Please enter a ticket message')
      return
    }

    setLoading(true)
    try {
      const result = await analyzeTicket(message)
      onSuccess(result)
      setMessage('')
    } catch (error) {
      onError(error)
    } finally {
      setLoading(false)
    }
  }

  const isValid = message.trim().length >= 10;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-3xl p-[1px] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      
      <form onSubmit={handleSubmit} className="relative rounded-3xl bg-zinc-900/80 p-6 sm:p-8 backdrop-blur-3xl shadow-2xl">
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Live Intake
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Submit Ticket</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Describe the issue clearly. Our AI engine will automatically classify it and assign the correct priority based on severity.
          </p>
        </div>
        
        <div className="mb-8">
          <label htmlFor="message" className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
            <MessageSquareText className="h-4 w-4 text-slate-400" />
            Message Details <span className="text-cyan-400">*</span>
          </label>
          <div className={`relative rounded-2xl transition-all duration-300 ${isFocused ? 'ring-2 ring-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-slate-900/80' : 'border border-white/10 bg-zinc-950/50 hover:border-white/20'}`}>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Example: My customer data was accidentally deleted from the database..."
              disabled={loading}
              className="w-full resize-none bg-transparent px-5 py-4 text-slate-100 placeholder:text-slate-600 outline-none"
              rows="5"
            />
          </div>
          <div className="flex justify-between items-center mt-3 px-1">
            <p className={`text-xs font-medium transition-colors ${message.length === 0 ? 'text-slate-500' : message.length < 10 ? 'text-cyan-400' : 'text-emerald-400'}`}>
              <span className="font-mono">{message.length}</span> / 1000 characters
            </p>
            {isValid && (
              <motion.p initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Ready
              </motion.p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !isValid}
          className="group relative w-full overflow-hidden rounded-2xl bg-cyan-600 px-6 py-4 font-bold text-white transition-all hover:bg-cyan-500 disabled:bg-zinc-800/80 disabled:text-slate-500 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(6,182,212,0.2)] disabled:shadow-none"
        >
          {!loading && isValid && (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          )}
          <span className="relative flex items-center justify-center gap-2">
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="tracking-wide">Analyzing...</span>
              </>
            ) : (
              <>
                <span className="tracking-wide text-[15px]">Analyze Ticket</span>
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </span>
        </button>
      </form>
    </motion.div>
  )
}
