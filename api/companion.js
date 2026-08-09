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

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`

    const apiResponse = await fetch(geminiUrl, {
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

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text()
      console.error('Gemini API Error Response:', errorText)
      return res.status(502).json({
        error: 'Gemini API call failed',
        status: apiResponse.status,
        details: errorText,
      })
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
