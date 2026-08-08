import { motion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  BookOpen,
  ChevronRight,
  CircleCheck,
  Flame,
  Home,
  LockKeyhole,
  Medal,
  Sparkles,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card.jsx'
import { dashboardScenarios } from '../data/dashboardData.js'

function Dashboard() {
  const [scenario, setScenario] = useState('active')
  const [showAllBadges, setShowAllBadges] = useState(false)
  const student = dashboardScenarios[scenario]
  const progress = Math.round((student.currentDay / student.totalDays) * 100)
  const levelProgress = Math.round((student.xp / student.nextLevelXp) * 100)

  return (
    <main className="cq-page pb-28">
      <header className="flex items-center justify-between py-2">
        <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight text-[var(--cq-ink)]">
          <span className="grid size-9 place-items-center rounded-xl bg-[var(--cq-brand)] text-white">
            <BookOpen size={19} />
          </span>
          CodeQuest <span className="text-[var(--cq-brand)]">AI</span>
        </Link>
        <span className="grid size-9 place-items-center rounded-full bg-[#edecff] text-sm font-black text-[var(--cq-brand)]">A</span>
      </header>

      <section className="mt-8">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-bold text-[var(--cq-muted)]"
        >
          Tuesday, your quest is waiting
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-1 text-3xl font-black tracking-[-0.04em] sm:text-4xl"
        >
          Hey {student.studentName}, keep the fire going.
        </motion.h1>
      </section>

      <section className="mt-5 rounded-xl border border-[var(--cq-border)] bg-white p-3" aria-label="Student state preview">
        <p className="text-xs font-extrabold text-[var(--cq-muted)]">Preview real student states</p>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-0.5">
          {Object.entries(dashboardScenarios).map(([key, item]) => (
            <button key={key} type="button" onClick={() => setScenario(key)} className={`shrink-0 rounded-lg px-3 py-2 text-xs font-extrabold transition ${scenario === key ? 'bg-[var(--cq-brand)] text-white' : 'bg-[#f1f2f7] text-[var(--cq-muted)]'}`}>
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-7 grid gap-4 sm:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-[#ffe5bd] bg-[var(--cq-warning-soft)] p-4 shadow-none">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-[var(--cq-muted)]">Current streak</p>
              <Flame className="text-[var(--cq-warning)]" size={22} fill="currentColor" />
            </div>
            <p className="mt-4 text-3xl font-black">{student.currentStreak} days</p>
            <p className="mt-1 text-xs font-bold text-[var(--cq-muted)]">{student.streakMessage}</p>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="p-4 shadow-none">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-[var(--cq-muted)]">Quest progress</p>
              <CircleCheck className="text-[var(--cq-success)]" size={21} />
            </div>
            <p className="mt-4 text-3xl font-black">{progress}%</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#ececf3]">
              <div className="h-full rounded-full bg-[var(--cq-success)]" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-xs font-bold text-[var(--cq-muted)]">Day {student.currentDay} of {student.totalDays}</p>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-[#dedcff] bg-[var(--cq-brand-soft)] p-4 shadow-none">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-[var(--cq-muted)]">Your standing</p>
              <Medal className="text-[var(--cq-brand)]" size={21} />
            </div>
            <p className="mt-4 text-3xl font-black">{student.rankLabel}</p>
            <p className="mt-1 text-xs font-bold text-[var(--cq-muted)]">{student.standingMessage}</p>
          </Card>
        </motion.div>
      </section>

      <section className="mt-7">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-black tracking-tight">Today&apos;s mission</h2>
          <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[var(--cq-brand)]"><Sparkles size={14} /> Day {student.currentDay}</span>
        </div>
        <Card className="overflow-hidden p-5">
          <div className="flex gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--cq-brand)] text-white">
              <Zap size={22} fill="currentColor" />
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--cq-muted)]">{student.mission.duration}</p>
              <h3 className="mt-1 text-xl font-black tracking-tight">{student.mission.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--cq-muted)]">{student.mission.description}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {student.mission.skills.map((skill) => (
              <span key={skill} className="rounded-full bg-[#f1f2f7] px-3 py-1.5 text-xs font-bold text-[var(--cq-muted)]">{skill}</span>
            ))}
          </div>
          <Link to={`/day/${student.currentDay}`} className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--cq-brand)] px-4 text-sm font-extrabold text-white transition hover:bg-[var(--cq-brand-dark)]">
            Start mission <ArrowRight size={17} />
          </Link>
        </Card>
      </section>

      <section className="mt-7 grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--cq-muted)]">Level 3</p>
              <h2 className="mt-1 text-lg font-black">{student.levelName}</h2>
            </div>
            <Award className="text-[var(--cq-brand)]" size={26} />
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#ececf3]">
            <div className="h-full rounded-full bg-[var(--cq-brand)]" style={{ width: `${levelProgress}%` }} />
          </div>
          <p className="mt-2 text-xs font-bold text-[var(--cq-muted)]">{student.xp.toLocaleString()} / {student.nextLevelXp.toLocaleString()} XP to Level 4</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black">Recent badges</h2>
            <button
              type="button"
              onClick={() => setShowAllBadges((isOpen) => !isOpen)}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-extrabold text-[var(--cq-brand)] hover:bg-[var(--cq-brand-soft)]"
              aria-expanded={showAllBadges}
            >
              {showAllBadges ? 'Close' : 'View all'}
              <ChevronRight size={18} className={showAllBadges ? 'rotate-90 transition-transform' : 'transition-transform'} />
            </button>
          </div>
          <div className="mt-4 flex gap-3">
            {student.achievements.map((achievement) => (
              <div key={achievement.label} className="min-w-0 flex-1 text-center">
                <span className={`mx-auto grid size-11 place-items-center rounded-2xl ${achievement.earned ? 'bg-[var(--cq-success-soft)] text-[var(--cq-success)]' : 'bg-[#f1f2f7] text-[#abb0c0]'}`}>
                  {achievement.earned ? <Award size={21} /> : <LockKeyhole size={18} />}
                </span>
                <p className="mt-2 truncate text-xs font-bold text-[var(--cq-muted)]">{achievement.label}</p>
              </div>
            ))}
          </div>
          {showAllBadges && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-5 space-y-2 border-t border-[var(--cq-border)] pt-4"
            >
              {student.achievements.map((achievement) => (
                <div key={`${achievement.label}-detail`} className="flex items-center justify-between gap-3 rounded-xl bg-[#f7f7fb] px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    {achievement.earned ? <Award size={16} className="text-[var(--cq-success)]" /> : <LockKeyhole size={15} className="text-[#abb0c0]" />}
                    <span className="text-sm font-bold">{achievement.label}</span>
                  </div>
                  <span className={`text-xs font-extrabold ${achievement.earned ? 'text-[var(--cq-success)]' : 'text-[var(--cq-muted)]'}`}>
                    {achievement.earned ? 'Unlocked' : 'Keep going'}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </Card>
      </section>

      <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-[var(--cq-border)] bg-white/95 px-6 py-3 backdrop-blur sm:hidden" aria-label="Mobile navigation">
        <div className="mx-auto flex max-w-sm items-center justify-around">
          <Link to="/dashboard" className="grid place-items-center gap-1 text-[var(--cq-brand)]"><Home size={20} fill="currentColor" /><span className="text-[10px] font-extrabold">Home</span></Link>
          <Link to={`/day/${student.currentDay}`} className="grid place-items-center gap-1 text-[var(--cq-muted)]"><Zap size={20} /><span className="text-[10px] font-extrabold">Mission</span></Link>
          <span className="grid place-items-center gap-1 text-[var(--cq-muted)]"><Award size={20} /><span className="text-[10px] font-extrabold">Badges</span></span>
        </div>
      </nav>
    </main>
  )
}

export default Dashboard
