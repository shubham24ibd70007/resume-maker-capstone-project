const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Groq = require('groq-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/generate-summary', async (req, res) => {
  const { jobRole } = req.body;
  try {
    const completion = await groq.chat.completions.create({
      messages: [{
        role: 'user',
        content: `Write a short, professional resume summary for a ${jobRole}. 
        Rules:
        - Maximum 3 sentences only
        - No headings or labels
        - Start directly with the summary
        - Use strong action words
        - Sound confident and impressive
        - Do not give multiple options`
      }],
      model: 'llama-3.1-8b-instant',
    });
    const summary = completion.choices[0].message.content;
    res.json({ summary });
  } catch (error) {
    console.error('FULL ERROR:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));