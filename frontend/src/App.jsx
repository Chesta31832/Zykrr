import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, Sparkles } from 'lucide-react'
import TicketForm from './components/TicketForm'
import ResultPanel from './components/ResultPanel'
import TicketList from './components/TicketList'

export default function App() {
  const [lastResult, setLastResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleAnalyzeSuccess = (result) => {
    setLastResult(result)
    setError(null)
    setRefreshKey((previous) => previous + 1)
  }

  const handleAnalyzeError = (errorMsg) => {
    setError(errorMsg)
    setLastResult(null)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-50 font-sans selection:bg-cyan-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-sky-600/10 blur-[120px]" />
      </div>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/60 backdrop-blur-2xl"
      >
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Triage<span className="text-cyan-400">AI</span>
              </h1>
              <p className="text-sm font-medium text-slate-400">Support ticket classification and priority triage</p>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <AnimatePresence mode="popLayout">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-8 overflow-hidden rounded-2xl border border-rose-500/20 bg-rose-500/10 shadow-2xl shadow-rose-500/10 backdrop-blur-xl"
            >
              <div className="flex items-start gap-4 p-5">
                <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-rose-400" />
                <div>
                  <h3 className="text-sm font-bold text-rose-200">Analysis Failed</h3>
                  <p className="mt-1 text-sm text-rose-300/80">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <TicketForm onSuccess={handleAnalyzeSuccess} onError={handleAnalyzeError} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <ResultPanel result={lastResult} loading={loading} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <TicketList triggerRefresh={refreshKey} onLoading={setLoading} />
          </motion.div>
        </div>
      </main>
    </div>
  )
}
