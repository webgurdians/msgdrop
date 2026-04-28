import { Router } from 'express';

const router = Router();

router.post('/generate-ai-response', async (req, res) => {
  try {
    const { businessContext, tone, userQuery } = req.body;
    
    if (!process.env.GROQ_API_KEY) {
      console.warn("GROQ_API_KEY is not set in environment variables");
    }

    const systemPrompt = `You are a professional SaaS Growth Partner AI for MsgDrop.
Business Context: ${businessContext}
Tone: ${tone}

Based on the above context and tone, provide a concise, highly converting, personalized response to the user's query.
Do NOT include any conversational filler like "Here is your response:" or "I can help with that". Just return the exact message text.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userQuery }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });
    
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to generate response from Groq');
    }
    res.json({ response: data.choices[0].message.content.trim() });
  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ error: 'Internal server error during AI generation' });
  }
});

export default router;
