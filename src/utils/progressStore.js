const STORAGE_KEY = 'cq_student_progress'

const INITIAL_PROGRESS = {
  completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  totalXp: 1250,
  currentStreak: 12,
  submissions: {},
}

export function getProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch {
    // Fallback if localStorage is disabled
  }
  return INITIAL_PROGRESS
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Fallback if localStorage is disabled
  }
}

export function completeDayMission(dayNumber, xpEarned = 100, submissionData = {}) {
  const current = getProgress()
  const dayNum = Number(dayNumber)
  const isNewCompletion = !current.completedDays.includes(dayNum)

  const updated = {
    ...current,
    completedDays: isNewCompletion
      ? [...current.completedDays, dayNum].sort((a, b) => a - b)
      : current.completedDays,
    totalXp: isNewCompletion ? current.totalXp + xpEarned : current.totalXp,
    currentStreak: isNewCompletion ? current.currentStreak + 1 : current.currentStreak,
    submissions: {
      ...current.submissions,
      [dayNum]: submissionData,
    },
  }

  saveProgress(updated)
  return updated
}

export function resetProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Fallback if localStorage is disabled
  }
  return INITIAL_PROGRESS
}
