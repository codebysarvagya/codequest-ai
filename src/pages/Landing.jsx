import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Flame,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle.jsx'
import Button from '../components/ui/Button.jsx'

const benefits = [
  'One focused coding mission every day',
  'Build your GitHub streak with proof of work',
  'Learn with hints, not copy-paste answers',
]

function Landing() {
  return (
    <main className="cq-page overflow-hidden">
      <nav className="flex items-center justify-between py-2" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight text-[var(--cq-ink)]">
          <span className="grid size-9 place-items-center rounded-xl bg-[var(--cq-brand)] text-white">
            <Code2 size={20} strokeWidth={2.5} />
          </span>
          CodeQuest <span className="text-[var(--cq-brand)]">AI</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/dashboard" className="text-sm font-bold text-[var(--cq-muted)] hover:text-[var(--cq-brand)]">
            Preview
          </Link>
        </div>
      </nav>

      <section className="grid items-center gap-10 pb-12 pt-14 md:grid-cols-2 md:py-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#dedcff] bg-[var(--cq-brand-soft)] px-3 py-1.5 text-xs font-extrabold text-[var(--cq-brand)]"
          >
            <Sparkles size={14} />
            A 60-day coding journey
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="max-w-xl text-4xl font-black leading-[1.08] tracking-[-0.05em] text-[var(--cq-ink)] sm:text-5xl"
          >
            Turn daily code into a{' '}
            <span className="text-[var(--cq-brand)]">career-changing habit.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="mt-5 max-w-lg text-base leading-7 text-[var(--cq-muted)] sm:text-lg"
          >
            CodeQuest AI gives you a small, practical mission every day—then turns your consistency into XP, streaks, and a portfolio you can show.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="mt-7"
          >
            <Link to="/dashboard">
              <Button className="w-full sm:w-auto">
                Start your quest <ArrowRight size={17} />
              </Button>
            </Link>
            <p className="mt-3 text-xs font-medium text-[var(--cq-muted)]">No login needed for this demo.</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -right-8 -top-8 size-32 rounded-full bg-[#e5e3ff] blur-2xl" />
          <div className="relative rounded-[1.75rem] border border-[#dfe1ec] bg-[var(--cq-surface)] p-4 shadow-[0_20px_50px_rgba(36,36,91,0.12)] sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--cq-muted)]">Your quest</p>
                <h2 className="mt-1 text-xl font-black tracking-tight">Day 12 of 60</h2>
              </div>
              <span className="rounded-xl bg-[var(--cq-success-soft)] p-2.5 text-[var(--cq-success)]">
                <Trophy size={21} />
              </span>
            </div>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-[#ececf3]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '20%' }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-full rounded-full bg-[var(--cq-brand)]"
              />
            </div>
            <div className="mt-2 flex justify-between text-xs font-bold text-[var(--cq-muted)]">
              <span>12 days complete</span>
              <span>20%</span>
            </div>

            <div className="mt-6 rounded-2xl border border-[var(--cq-border)] bg-[var(--cq-brand-soft)] p-4">
              <div className="flex items-center gap-2 text-sm font-extrabold text-[var(--cq-brand)]">
                <Sparkles size={16} /> Today&apos;s mission
              </div>
              <p className="mt-2 text-base font-black text-[var(--cq-ink)]">Build a responsive todo app</p>
              <p className="mt-1 text-sm leading-5 text-[var(--cq-muted)]">Practice state, filters, and small wins that compound.</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[#ffe5bd]/40 bg-[var(--cq-warning-soft)] p-3">
                <Flame className="text-[var(--cq-warning)]" size={19} fill="currentColor" />
                <p className="mt-2 text-lg font-black text-[var(--cq-ink)]">12 days</p>
                <p className="text-xs font-semibold text-[var(--cq-muted)]">current streak</p>
              </div>
              <div className="rounded-2xl border border-[#dcece5]/40 bg-[var(--cq-success-soft)] p-3">
                <span className="text-lg font-black text-[var(--cq-success)]">+120</span>
                <p className="mt-2 text-lg font-black text-[var(--cq-ink)]">1,480 XP</p>
                <p className="text-xs font-semibold text-[var(--cq-muted)]">earned so far</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="border-t border-[var(--cq-border)] py-9">
        <p className="text-center text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--cq-muted)]">Made for student momentum</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-start gap-3 rounded-2xl border border-[var(--cq-border)] bg-[var(--cq-surface)] p-4 shadow-sm">
              <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--cq-success)]" size={19} />
              <p className="text-sm font-bold leading-5 text-[var(--cq-ink)]">{benefit}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Landing
