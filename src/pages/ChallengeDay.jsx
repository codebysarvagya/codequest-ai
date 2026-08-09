import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock3,
  ExternalLink,
  GitBranch,
  Link as LinkIcon,
  Send,
  Target,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AICompanion from '../components/AICompanion.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import { challengeData } from '../data/challengeData.js'
import { completeDayMission } from '../utils/progressStore.js'

function ChallengeDay() {
  const { dayNumber = '12' } = useParams()
  const [githubUrl, setGithubUrl] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()

    if (!githubUrl.trim() || !linkedinUrl.trim()) {
      setError('Please add both proof links before submitting.')
      return
    }

    setError('')
    setSubmitted(true)

    // Save to local progress store
    completeDayMission(dayNumber, challengeData.xp, {
      githubUrl,
      linkedinUrl,
      submittedAt: new Date().toISOString(),
    })

    // Trigger celebratory confetti blast
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#5957d9', '#1f9d68', '#df8b19', '#e85d6e'],
      })
    } catch {
      // Ignore confetti errors
    }
  }

  return (
    <main className="cq-page pb-12">
      <header className="flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="grid size-10 place-items-center rounded-xl border border-[var(--cq-border)] bg-[var(--cq-surface)] text-[var(--cq-ink)]"
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--cq-muted)]">CodeQuest AI</p>
            <p className="text-sm font-black">Day {dayNumber} mission</p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--cq-brand-soft)] px-3 py-1.5 text-xs font-extrabold text-[var(--cq-brand)]">
          <Target size={14} /> {challengeData.difficulty}
        </div>
        <h1 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">{challengeData.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--cq-muted)]">{challengeData.brief}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-xl border border-[var(--cq-border)] bg-[var(--cq-surface)] px-3 py-2 text-sm font-bold text-[var(--cq-ink)]"><Clock3 size={16} className="text-[var(--cq-brand)]" /> {challengeData.duration}</span>
          <span className="inline-flex items-center gap-2 rounded-xl border border-[#ffe5bd]/40 bg-[var(--cq-warning-soft)] px-3 py-2 text-sm font-bold text-[var(--cq-ink)]"><Zap size={16} className="text-[var(--cq-warning)]" fill="currentColor" /> +{challengeData.xp} XP</span>
        </div>
      </motion.section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-5">
          <Card className="p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-[var(--cq-brand-soft)] text-[var(--cq-brand)]"><CheckCircle2 size={19} /></span>
              <h2 className="text-lg font-black text-[var(--cq-ink)]">By the end, you&apos;ll be able to</h2>
            </div>
            <ul className="mt-5 space-y-4">
              {challengeData.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 text-sm font-medium leading-6 text-[var(--cq-ink)]">
                  <Check className="mt-1 shrink-0 text-[var(--cq-success)]" size={17} strokeWidth={3} />
                  {outcome}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5 sm:p-6">
            <h2 className="text-lg font-black text-[var(--cq-ink)]">A calm way to approach it</h2>
            <ol className="mt-5 space-y-5">
              {challengeData.steps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--cq-brand)] text-xs font-black text-white">{index + 1}</span>
                  <p className="pt-0.5 text-sm leading-6 text-[var(--cq-muted)]">{step}</p>
                </li>
              ))}
            </ol>
          </Card>

          <AICompanion taskContext={challengeData} />
        </div>

        <aside>
          <Card className="sticky top-5 p-5 sm:p-6">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--cq-success-soft)] text-[var(--cq-success)]"><CheckCircle2 size={30} /></span>
                <h2 className="mt-4 text-xl font-black text-[var(--cq-ink)]">Mission submitted!</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--cq-muted)]">Your proof is saved for this demo. You earned +{challengeData.xp} XP.</p>
                <Link to="/dashboard" className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--cq-brand)] px-4 text-sm font-extrabold text-white">Back to dashboard <ArrowLeft size={16} /></Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex items-center gap-2"><Send size={19} className="text-[var(--cq-brand)]" /><h2 className="text-lg font-black text-[var(--cq-ink)]">Submit proof</h2></div>
                <p className="mt-2 text-sm leading-6 text-[var(--cq-muted)]">Share your build so your progress is visible and celebrated.</p>

                <label className="mt-5 block text-sm font-extrabold text-[var(--cq-ink)]" htmlFor="github-url">GitHub repository or commit</label>
                <div className="relative mt-2">
                  <GitBranch className="pointer-events-none absolute left-3 top-3 text-[var(--cq-muted)]" size={18} />
                  <input id="github-url" value={githubUrl} onChange={(event) => setGithubUrl(event.target.value)} placeholder="github.com/your-project" className="min-h-11 w-full rounded-xl border border-[var(--cq-border)] bg-[var(--cq-surface)] py-2 pl-10 pr-3 text-sm text-[var(--cq-ink)] outline-none transition placeholder:text-[var(--cq-muted)] focus:border-[var(--cq-brand)] focus:ring-3 focus:ring-[var(--cq-brand-soft)]" />
                </div>

                <label className="mt-5 block text-sm font-extrabold text-[var(--cq-ink)]" htmlFor="linkedin-url">LinkedIn post</label>
                <div className="relative mt-2">
                  <LinkIcon className="pointer-events-none absolute left-3 top-3 text-[#1578b8]" size={18} />
                  <input id="linkedin-url" value={linkedinUrl} onChange={(event) => setLinkedinUrl(event.target.value)} placeholder="linkedin.com/posts/..." className="min-h-11 w-full rounded-xl border border-[var(--cq-border)] bg-[var(--cq-surface)] py-2 pl-10 pr-3 text-sm text-[var(--cq-ink)] outline-none transition placeholder:text-[var(--cq-muted)] focus:border-[var(--cq-brand)] focus:ring-3 focus:ring-[var(--cq-brand-soft)]" />
                </div>

                {error && <p className="mt-3 text-sm font-bold text-[var(--cq-danger)]">{error}</p>}

                <Button type="submit" className="mt-6 w-full"><Send size={17} /> Submit today&apos;s work</Button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs font-semibold text-[var(--cq-muted)]"><ExternalLink size={13} /> Demo-only submission; no links leave your browser.</p>
              </form>
            )}
          </Card>
        </aside>
      </section>
    </main>
  )
}

export default ChallengeDay
