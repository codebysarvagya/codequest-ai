import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('cq_theme') || 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('cq_theme', theme)
    } catch {
      // Ignore localStorage errors
    }
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`grid size-9 cursor-pointer place-items-center rounded-xl border border-[var(--cq-border)] bg-[var(--cq-surface)] text-[var(--cq-ink)] transition hover:border-[var(--cq-brand)] ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} className="text-amber-400" />}
    </button>
  )
}
