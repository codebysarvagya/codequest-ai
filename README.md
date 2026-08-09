# CodeQuest AI 🚀

> Transforming passive coding content into a structured, gamified 60-Day Coding Quest with an AI-powered Socratic Coding Mentor.

## 🎯 Problem Statement

**Problem Statement 1 — Redesign ABTalks**

Traditional coding-learning platforms often provide content but lack a structured journey, motivation, progress visibility, and personalized guidance.

CodeQuest AI redesigns the learning experience as a **60-Day Coding Quest**, where students complete daily coding missions, track their progress, earn XP and badges, and receive personalized guidance from an AI Coding Companion.

---

## ✨ Key Features

### 🎮 Gamified Learning Dashboard
- 60-Day coding journey
- Daily missions and progress tracking
- XP and level progression
- Current streak tracking
- Student ranking/standing
- Achievement badges

### 🗓️ 60-Day Quest Roadmap
- Visual day-by-day learning journey
- Completed, active, and upcoming missions
- Progress-focused learning experience

### 🤖 AI Coding Companion
- Real Gemini-powered AI mentor
- Custom question input
- Quick guidance options:
  - Explain Task
  - Roadmap
  - Hint
- Context-aware responses based on the current coding challenge
- Socratic mentoring approach
- Designed to guide students instead of directly giving copy-paste solutions

### 🎉 Mission Completion Experience
- Mission completion feedback
- XP reward and visual celebration
- Confetti interaction for completed challenges

### 🏆 Achievement System
- Earnable badges
- Locked/unlocked badge states
- Interactive badge viewing

### 💾 Progress Persistence
- Student progress is maintained using browser local storage
- Progress can persist across page refreshes

### 🌙 Dark Mode
- Theme toggle for a more modern coding experience

### 📱 Responsive UI
- Mobile-first responsive design
- Optimized experience across desktop and mobile screens

---

## 🤖 AI Companion Architecture

The AI Companion uses a serverless architecture:

```text
Student
   ↓
React AICompanion Component
   ↓
POST /api/companion
   ↓
Vercel Serverless Function
   ↓
Google Gemini API
   ↓
AI-generated Socratic Guidance
   ↓
React UI
