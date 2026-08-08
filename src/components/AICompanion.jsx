import { motion } from 'framer-motion'
import { BrainCircuit, Lightbulb, ListChecks, MessageCircleQuestion } from 'lucide-react'
import { useState } from 'react'

const guidance = {
  explain: {
    label: 'Explain the task',
    icon: MessageCircleQuestion,
    title: 'What you are really building',
    message: 'This mission is about managing UI state. Your app holds a list of tasks, and the screen changes based on whether a task is complete and which filter the student chooses.',
  },
  roadmap: {
    label: 'Give me a roadmap',
    icon: ListChecks,
    title: 'Build in this order',
    message: '1. Make a tiny static layout. 2. Store two sample tasks in state. 3. Add the complete toggle. 4. Add one filter at a time. 5. Test the empty state on mobile.',
  },
  hint: {
    label: 'I need a hint',
    icon: Lightbulb,
    title: 'A small nudge',
    message: 'Try keeping one activeFilter value such as “all”, “active”, or “completed”. Before rendering, make a derived list from your tasks using that value. You have got this.',
  },
}

function AICompanion() {
  const [selected, setSelected] = useState('explain')
  const response = guidance[selected]

  return (
    <section className="rounded-[var(--cq-radius-md)] border border-[#dedcff] bg-[var(--cq-brand-soft)] p-5" aria-labelledby="ai-companion-title">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--cq-brand)] text-white"><BrainCircuit size={21} /></span>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--cq-brand)]">CodeQuest AI companion</p>
          <h2 id="ai-companion-title" className="mt-1 font-black">Stuck? Get guidance, not the answer.</h2>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="AI guidance options">
        {Object.entries(guidance).map(([key, item]) => {
          const Icon = item.icon
          const isSelected = key === selected

          return (
            <button key={key} type="button" onClick={() => setSelected(key)} className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-extrabold transition ${isSelected ? 'bg-[var(--cq-brand)] text-white shadow-sm' : 'bg-white text-[var(--cq-brand)] hover:bg-[#f7f6ff]'}`}>
              <Icon size={14} /> {item.label}
            </button>
          )
        })}
      </div>

      <motion.div key={selected} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-xl border border-white/80 bg-white/70 p-4">
        <h3 className="text-sm font-black text-[var(--cq-ink)]">{response.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#4543a4]">{response.message}</p>
      </motion.div>
    </section>
  )
}

export default AICompanion
