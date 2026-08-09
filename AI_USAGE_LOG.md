# AI Usage Log

This project was developed through an AI-assisted workflow using
Codex/ChatGPT and Antigravity as development assistants, with VS Code
used as the local development environment.

AI tools were used for architecture planning, code generation,
codebase inspection, debugging, API integration, testing,
documentation, and deployment troubleshooting.

All generated changes were reviewed and tested by the team before
being integrated into the project.

---

## Development Record

### 1. Project Foundation

**AI Assistance:** Codex/ChatGPT + Antigravity

**Prompt Intent:**  
Set up a minimal React + Vite JavaScript project with Tailwind CSS,
React Router, Lucide React, Framer Motion, and routes for `/`,
`/dashboard`, and `/day/:dayNumber`.

**Result:**  
Created the application foundation, route configuration, page
placeholders, and scalable `src` folder structure.

---

### 2. Design System

**AI Assistance:** Codex/ChatGPT + Antigravity

**Prompt Intent:**  
Create a clean, mobile-first visual language for CodeQuest AI.

**Result:**  
Added shared design tokens, reusable UI components, responsive
layouts, buttons, cards, focus states, spacing, and visual styling.

---

### 3. Landing Page

**AI Assistance:** Codex/ChatGPT + Antigravity

**Prompt Intent:**  
Build a motivating landing page for a 60-day coding journey,
optimized for mobile and desktop users.

**Result:**  
Added the landing experience, mission preview, XP/streak visuals,
calls to action, Lucide icons, and Framer Motion transitions.

---

### 4. Dashboard & Challenge Experience

**AI Assistance:** Codex/ChatGPT + Antigravity

**Prompt Intent:**  
Build a realistic student dashboard and complete challenge-day
experience using structured demo data.

**Result:**  
Added:

- Student progress tracking
- XP and level progression
- Current streak
- Mission progress
- Achievement badges
- Mission CTA
- Challenge Day experience
- Proof-of-work submission flow
- Client-side validation
- Different student-state previews

---

### 5. AI Companion — Initial Version

**AI Assistance:** Codex/ChatGPT + Antigravity

**Prompt Intent:**  
Add an AI Coding Companion that could guide students through
coding challenges using explanations, roadmaps, and hints without
directly providing complete solutions.

**Result:**  
Initially implemented a local/static AI Companion using predefined
guidance responses.

This provided a reliable demo fallback while the real AI integration
was being developed.

---

### 6. Interactive Achievement System

**AI Assistance:** Codex/ChatGPT + Antigravity

**Prompt Intent:**  
Make achievement badges interactive and provide more information
about unlocked and locked achievements.

**Result:**  
Enhanced achievement data with:

- Badge descriptions
- XP rewards
- Unlock conditions
- Locked/unlocked states
- Interactive badge details
- Animated modal experience

---

## 7. Real Gemini-Powered AI Companion

**AI Assistance:** Codex/ChatGPT + Antigravity

**Prompt Intent:**  
Replace the initial static AI responses with a real Gemini-powered
AI mentor while keeping the API key secure and maintaining a safe
fallback experience.

**Result:**  

Implemented a Vercel Serverless API route:

`/api/companion`

The architecture became:

Student → React AICompanion → `/api/companion`
→ Vercel Serverless Function → Gemini API → AI Response

The AI Companion supports:

- Custom student questions
- Explain Task
- Roadmap
- Hint
- Current challenge context
- Loading states
- Socratic mentor instructions
- Fallback guidance if the API is unavailable

The Gemini API key is stored server-side using the
`GEMINI_API_KEY` Vercel environment variable.

The key is never exposed in client-side code.

---

## 8. Gemini API Debugging & Deployment

**AI Assistance:** Antigravity

**Prompt Intent:**  
Debug repeated static responses from the AI Companion after the
Gemini API integration was deployed.

**Result:**  

Investigated:

- Vercel Serverless Function behaviour
- Environment variable configuration
- Gemini API model endpoints
- HTTP 500/502 errors
- API request payloads
- Frontend error handling
- Vercel deployment behaviour

The frontend was also updated to surface server-side errors instead
of silently hiding API failures behind the static fallback response.

This made debugging production API issues significantly easier.

---

## 9. Gemini Response Parsing Fix

**AI Assistance:** Antigravity

**Prompt Intent:**  
Fix cases where Gemini returned valid JSON surrounded by Markdown
code fences or additional conversational text.

**Result:**  

Improved the response parser to:

- Detect the first `{`
- Detect the last `}`
- Extract the JSON object
- Parse only the required response
- Remove unnecessary Markdown/code-fence content
- Provide a safe fallback parser when required

This ensured that users see clean AI guidance instead of raw JSON
or Markdown formatting.

---

## 10. Final AI Companion

**Result:**  

The final AI Companion provides real AI-generated coding mentorship
through the Gemini API while preserving the original Socratic mentor
behaviour.

The mentor is instructed to:

- Explain concepts
- Break problems into smaller steps
- Provide hints
- Provide roadmaps
- Encourage student reasoning
- Avoid complete copy-paste solutions

The current implementation is designed specifically for the
CodeQuest AI student-learning experience.

---

# Why We Used Antigravity

Antigravity was used as an AI development assistant during the
hackathon because of the limited development time and the need to
iterate quickly across multiple files.

It helped with:

1. Codebase inspection
2. Architecture understanding
3. Implementation planning
4. Multi-file code changes
5. React component development
6. API integration
7. Gemini API debugging
8. Vercel Serverless Function implementation
9. Error diagnosis
10. Response parsing fixes
11. Build and lint verification
12. Deployment troubleshooting
13. Git workflow assistance
14. Documentation preparation

Antigravity was not treated as a replacement for development
understanding. The team reviewed, tested, and validated the generated
changes before accepting them.

---

# AI Usage Philosophy

AI tools were used to accelerate development while keeping the
developers involved in:

- Understanding the implementation
- Reviewing generated changes
- Testing functionality
- Debugging issues
- Making architectural decisions
- Verifying deployment behaviour

The final project was tested locally and through the deployed
environment before submission.

---

# Verification Performed

The project was repeatedly verified during development using:

```powershell
npm run build
npm run lint
node --check api/companion.js

