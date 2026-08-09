export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY environment variable is not configured.',
    })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    const { mode = 'explain', userQuery = '', taskContext = {} } = body

    const systemPrompt = `You are CodeQuest AI, a Socratic Coding Mentor for Indian college students participating in a 60-day coding challenge.
Your goal is to guide students to learn and solve problems on their own.
CRITICAL RULE: Never provide full copy-paste code solutions. Provide conceptual explanations, step-by-step roadmaps, hints, and encouragement.
Format your output as a single valid JSON object with exact keys:
- "title": A short punchy title (3-6 words)
- "message": Clear, structured, encouraging advice (2-4 sentences max)`

    const promptText = `
Task Title: ${taskContext.title || 'React State & UI Task'}
Task Brief: ${taskContext.brief || 'Build a responsive interface'}
Guidance Mode Requested: ${mode}
Student Question / Context: ${userQuery || mode}
`

    // Candidate model IDs in order of preference (Flash series)
    const modelsToTry = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash']
    let apiResponse = null
    let lastErrorText = ''

    for (const model of modelsToTry) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
      try {
        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemPrompt }],
            },
            contents: [
              {
                parts: [{ text: promptText }],
              },
            ],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.7,
            },
          }),
        })

        if (response.ok) {
          apiResponse = response
          break
        } else {
          lastErrorText = await response.text()
          console.warn(`Gemini model ${model} failed with status ${response.status}: ${lastErrorText}`)
        }
      } catch (err) {
        lastErrorText = err.message
        console.warn(`Fetch error for Gemini model ${model}:`, err)
      }
    }

    if (!apiResponse) {
      console.error('All Gemini API model attempts failed. Last error:', lastErrorText)
      return res.status(502).json({ error: 'Gemini API call failed', details: lastErrorText })
    }

    const data = await apiResponse.json()
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!candidateText) {
      return res.status(500).json({ error: 'Empty response received from Gemini' })
    }

    // Strip potential markdown code fences (e.g., ```json ... ```)
    const cleanedText = candidateText.replace(/^```(?:json)?\s*|\s*```$/gi, '').trim()

    let parsed
    try {
      parsed = JSON.parse(cleanedText)
    } catch {
      parsed = {
        title: 'CodeQuest AI Guidance',
        message: cleanedText,
      }
    }

    return res.status(200).json({
      title: parsed.title || 'CodeQuest AI Guidance',
      message: parsed.message || cleanedText,
    })
  } catch (error) {
    console.error('Companion endpoint error:', error)
    return res.status(500).json({ error: error.message || 'Internal server error' })
  }
}
