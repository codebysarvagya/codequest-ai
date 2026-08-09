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

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`

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

    let title = 'CodeQuest AI Guidance'
    let message = ''

    // Extract JSON substring if Gemini included conversational text or markdown code fences
    const firstBrace = candidateText.indexOf('{')
    const lastBrace = candidateText.lastIndexOf('}')

    let parseSuccess = false

    if (firstBrace !== -1 && lastBrace > firstBrace) {
      const jsonCandidate = candidateText.substring(firstBrace, lastBrace + 1)
      try {
        const parsed = JSON.parse(jsonCandidate)
        if (parsed && typeof parsed === 'object') {
          if (parsed.title) title = String(parsed.title).trim()
          if (parsed.message) message = String(parsed.message).trim()
          if (title && message) parseSuccess = true
        }
      } catch {
        // Substring parse failed, proceed to fallback cleaning
      }
    }

    // Fallback: If JSON parsing did not extract clean title/message, strip raw JSON/code fence artifacts
    if (!parseSuccess || !message) {
      const cleaned = candidateText
        .replace(/```(?:json)?/gi, '')
        .replace(/```/g, '')
        .trim()

      const titleMatch = cleaned.match(/"title"\s*:\s*"([^"]+)"/)
      const msgMatch = cleaned.match(/"message"\s*:\s*"([^"]+)"/)

      if (titleMatch && titleMatch[1]) {
        title = titleMatch[1]
      }
      if (msgMatch && msgMatch[1]) {
        message = msgMatch[1]
      } else {
        message = cleaned
          .replace(/^\s*\{[\s\S]*?"message"\s*:\s*"/i, '')
          .replace(/"\s*\}\s*$/g, '')
          .trim()
      }
    }

    return res.status(200).json({
      title: title || 'CodeQuest AI Guidance',
      message: message || 'Break the problem into smaller steps and proceed carefully.',
    })
  } catch (error) {
    console.error('Companion endpoint error:', error)
    return res.status(500).json({ error: error.message || 'Internal server error' })
  }
}
