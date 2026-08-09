import { motion } from 'framer-motion'
import {
  BrainCircuit,
  Lightbulb,
  ListChecks,
  Loader2,
  MessageCircleQuestion,
  Send,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'

const guidance = {
  explain: {
    label: 'Explain the task',
    icon: MessageCircleQuestion,
    title: 'What you are really building',
    message:
      'This mission is about managing UI state. Your app holds a list of tasks, and the screen changes based on whether a task is complete and which filter the student chooses.',
  },
  roadmap: {
    label: 'Give me a roadmap',
    icon: ListChecks,
    title: 'Build in this order',
    message:
      '1. Make a tiny static layout. 2. Store two sample tasks in state. 3. Add the complete toggle. 4. Add one filter at a time. 5. Test the empty state on mobile.',
  },
  hint: {
    label: 'I need a hint',
    icon: Lightbulb,
    title: 'A small nudge',
    message:
      'Try keeping one activeFilter value such as “all”, “active”, or “completed”. Before rendering, make a derived list from your tasks using that value. You have got this.',
  },
}

function AICompanion({ taskContext }) {
  const [selectedMode, setSelectedMode] = useState('explain')
  const [customQuery, setCustomQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(guidance.explain)
  const [isLiveAi, setIsLiveAi] = useState(false)

  async function handleFetchGuidance(mode, queryText = '') {
    setSelectedMode(mode)
    setIsLoading(true)

    try {
      const res = await fetch('/api/companion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          userQuery: queryText,
          taskContext: taskContext || {
            title: 'Build a responsive todo app',
            brief: 'Turn a familiar idea into a polished, responsive experience.',
          },
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        const detailMsg = data.details || data.error || `HTTP ${res.status}`
        console.error('AI Companion Server Error:', { status: res.status, error: data.error, details: data.details })
        setResponse({
          title: `AI Companion Error (HTTP ${res.status})`,
          message: detailMsg,
        })
        setIsLiveAi(false)
        return
      }

      if (data.title && data.message) {
        setResponse({ title: data.title, message: data.message })
        setIsLiveAi(true)
      } else {
        throw new Error('Invalid response structure from server')
      }
    } catch (err) {
      console.error('AI Companion Fetch Exception:', err)
      const fallback = guidance[mode] || {
        title: 'Socratic Mentor Hint',
        message:
          'Break the problem into small pieces. First define your React state, then map through your items carefully.',
      }
      setResponse(fallback)
      setIsLiveAi(false)
    } finally {
      setIsLoading(false)
    }
  }

  function handleCustomSubmit(e) {
    e.preventDefault()
    if (!customQuery.trim() || isLoading) return
    handleFetchGuidance('custom', customQuery)
  }

  return (
    <section
      className="rounded-[var(--cq-radius-md)] border border-[#dedcff] bg-[var(--cq-brand-soft)] p-5"
      aria-labelledby="ai-companion-title"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--cq-brand)] text-white">
            <BrainCircuit size={21} />
          </span>
          <div>
            <p className="flex items-center gap-1 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--cq-brand)]">
              CodeQuest AI companion
              {isLiveAi && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--cq-brand)] px-2 py-0.5 text-[10px] text-white">
                  <Sparkles size={10} /> Live Gemini
                </span>
              )}
            </p>
            <h2 id="ai-companion-title" className="mt-1 font-black">
              Stuck? Get guidance, not the answer.
            </h2>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="AI guidance options">
        {Object.entries(guidance).map(([key, item]) => {
          const Icon = item.icon
          const isSelected = key === selectedMode

          return (
            <button
              key={key}
              type="button"
              disabled={isLoading}
              onClick={() => handleFetchGuidance(key)}
              className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-extrabold transition cursor-pointer disabled:opacity-50 ${
                isSelected
                  ? 'bg-[var(--cq-brand)] text-white shadow-sm'
                  : 'bg-[var(--cq-surface)] text-[var(--cq-brand)] border border-[var(--cq-border)] hover:bg-[var(--cq-canvas)]'
              }`}
            >
              <Icon size={14} /> {item.label}
            </button>
          )
        })}
      </div>

      <form onSubmit={handleCustomSubmit} className="mt-3 flex gap-2">
        <input
          type="text"
          value={customQuery}
          onChange={(e) => setCustomQuery(e.target.value)}
          placeholder="Ask AI Companion a custom question..."
          className="min-h-10 flex-1 rounded-xl border border-[var(--cq-border)] bg-[var(--cq-surface)] px-3.5 text-xs font-semibold text-[var(--cq-ink)] outline-none transition placeholder:text-[var(--cq-muted)] focus:border-[var(--cq-brand)]"
        />
        <button
          type="submit"
          disabled={isLoading || !customQuery.trim()}
          className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-[var(--cq-brand)] px-4 text-xs font-extrabold text-white transition hover:bg-[var(--cq-brand-dark)] disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={13} />}
          Ask
        </button>
      </form>

      <div className="mt-2.5 flex flex-wrap gap-1.5 items-center">
        <span className="text-[11px] font-bold text-[var(--cq-muted)]">Try asking:</span>
        {[
          'What is useState?',
          'How do I filter arrays?',
          'Mobile layout tips',
          'Debugging advice',
        ].map((q) => (
          <button
            key={q}
            type="button"
            disabled={isLoading}
            onClick={() => {
              setCustomQuery(q)
              handleFetchGuidance('custom', q)
            }}
            className="rounded-lg border border-[var(--cq-border)] bg-[var(--cq-surface)] px-2.5 py-1 text-[11px] font-bold text-[var(--cq-brand)] transition hover:bg-[var(--cq-canvas)] cursor-pointer disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      <motion.div
        key={selectedMode + response.title}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 rounded-xl border border-[var(--cq-border)] bg-[var(--cq-surface)] p-4 relative"
      >
        {isLoading ? (
          <div className="flex items-center gap-2.5 py-3 text-xs font-extrabold text-[var(--cq-brand)]">
            <Loader2 size={18} className="animate-spin" />
            <span>Consulting Gemini 3.5 Flash mentor...</span>
          </div>
        ) : (
          <>
            <h3 className="text-sm font-black text-[var(--cq-ink)]">{response.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--cq-ink)]">{response.message}</p>
          </>
        )}
      </motion.div>
    </section>
  )
}

export default AICompanion

