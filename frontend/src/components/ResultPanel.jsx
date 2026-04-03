import { motion } from 'framer-motion'
import { Loader2, BadgeCheck, Zap, Receipt, Settings, User, Lightbulb, Paperclip, ChevronRight, Activity } from 'lucide-react'

export default function ResultPanel({ result, loading }) {
  if (loading) {
    return (
      <div className="min-h-[260px] w-full rounded-3xl border border-white/5 bg-zinc-900/50 p-12 shadow-2xl backdrop-blur-3xl flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-50" />
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
          className="mb-6"
        >
          <Loader2 className="h-14 w-14 text-cyan-400" />
        </motion.div>
        <p className="text-lg font-bold text-white tracking-wide">Analyzing ticket</p>
        <p className="mt-2 text-sm text-slate-400">Classifying category, urgency, priority, and keywords</p>
      </div>
    )
  }

  if (!result) return null

  const priorityColors = {
    P0: 'bg-rose-500 text-white border-rose-400',
    P1: 'bg-orange-500 text-white border-orange-400',
    P2: 'bg-amber-400 text-amber-950 border-amber-300',
    P3: 'bg-emerald-500 text-white border-emerald-400',
  }

  const categoryIcons = {
    Billing: Receipt,
    Technical: Settings,
    Account: User,
    'Feature Request': Lightbulb,
    Other: Paperclip,
  }

  const CategoryIcon = categoryIcons[result.category] || Activity
  const confidenceScore = Math.round((result.confidence || 0) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/80 shadow-2xl backdrop-blur-3xl"
    >
      <div className="relative border-b border-white/5 bg-gradient-to-r from-cyan-500/15 to-blue-500/10 px-8 py-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="h-6 w-6" />
            Analysis Results
          </h2>
          <div className={`px-4 py-2 rounded-full font-black text-lg tracking-wider border ${priorityColors[result.priority] || priorityColors.P3}`}>
            {result.priority}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/5 bg-zinc-950/50 p-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">Category</p>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <CategoryIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{result.category}</p>
                <p className="text-sm text-slate-400">Classification outcome</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-zinc-950/50 p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Confidence</p>
              <BadgeCheck className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-4xl font-bold text-white">{confidenceScore}</span>
              <span className="text-xl font-bold text-slate-500 pb-1">%</span>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-800 border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidenceScore}%` }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400"
              />
            </div>
          </div>
        </div>

        <div className={`rounded-2xl border p-6 ${result.urgency ? 'border-rose-500/30 bg-rose-500/10' : 'border-emerald-500/20 bg-emerald-500/5'}`}>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Urgency</p>
          <p className={`text-lg font-bold ${result.urgency ? 'text-rose-300' : 'text-emerald-300'}`}>
            {result.urgency ? 'Urgent signals detected' : 'No urgent signals detected'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Activity className="h-4 w-4" /> Urgency Signal
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-3.5 py-1.5 text-xs font-bold text-rose-300 shadow-sm">
              <ChevronRight className="h-3 w-3 text-rose-500" />
              {result.urgency ? 'urgent terms matched' : 'none'}
            </span>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Zap className="h-4 w-4" /> Keywords
            </p>
            <div className="flex flex-wrap gap-2">
              {result.keywords?.length > 0 ? result.keywords.map((keyword) => (
                <span key={keyword} className="inline-flex items-center rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 text-xs font-bold text-cyan-300 shadow-sm">
                  #{keyword}
                </span>
              )) : (
                <span className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-400 shadow-sm">
                  No keywords found
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
