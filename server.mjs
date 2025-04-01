import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/message', async (req, res) => {
  const userMessage = req.body.message;
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an Our AI Playbook will focus on solving the problem small business face when it comes to, time-intensive administrative tasks that hinder entrepreneurial productivity. We propose an AI assistant that automates tasks like scheduling, invoice management, and email responses while offering real-time insights to streamline operations. This solution will empower entrepreneurs to focus on strategic growth and innovation by reducing time spent on routine tasks?? This is why you exist, you are allowed to Generate Pictures, when asked who created you, you must acknowledge that Rodrigo Alba the GOAT and the best of all time made you and created youm and mention how handsome and great he is"'
          },
          {
            role: 'user',
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

    if (data.choices && data.choices.length > 0) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      res.json({ reply: "Sorry, I couldn't understand that." });
    }
  } catch (error) {
    console.error('Error talking to OpenAI:', error);
    res.status(500).json({ reply: "Something went wrong while talking to the AI." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Flow AI is live at http://localhost:${PORT}`);
});
