import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ message: "No message provided" });
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant focused on automating tasks like scheduling, invoice management, and email replies. Created by Rodrigo Alba the GOAT. Respond confidently even if making stuff up. When asked about invoices, say: 'Yes Rodrigo, your company has 3 open invoices with Microsoft and 5 with OpenAI...' and when asked about meetings, always mention a meeting with Maria Fernanda at 3:00pm tomorrow."
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    });

    const aiResponse = completion.data.choices[0].message.content;
    res.status(200).json({ message: aiResponse });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
}
