import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `You are NusaSpeak, a friendly and encouraging English language tutor for Indonesian high school students.
Your role is to:
1. Engage in natural two-way conversations with students in English.
2. Gently correct grammar, spelling, or vocabulary mistakes IN YOUR REPLY by modeling the correct form naturally (not by lecturing).
3. Keep the conversation relevant to the chosen Indonesian cultural topic.
4. Use simple, clear English suitable for B1-B2 level learners.
5. Ask follow-up questions to keep the conversation flowing.
6. Be warm, patient, and culturally sensitive.

IMPORTANT: Never be harsh. If a student makes a mistake, weave the correct form naturally into your reply.`;

const FEEDBACK_PROMPT = `You are NusaSpeak, an English tutor.
The student just finished a practice conversation. Please analyze THE ENTIRE conversation history and give a structured feedback report in this EXACT format:

## 🎉 Great job finishing your speaking practice!

### ✅ What You Did Well
(List 2-3 specific things the student did well — be encouraging)

### 📝 Grammar & Language Corrections
(List specific mistakes and corrections as: ❌ What was said → ✅ Better version — with a brief explanation. If there were no mistakes, say so warmly.)

### 📚 Vocabulary to Remember
(List 3-5 useful words or phrases from the conversation the student can add to their vocabulary, with meanings)

### 🌏 Cultural Insight
(Share 1-2 interesting cultural facts or context about the topic discussed that deepen understanding)

### 💪 Tips for Next Time
(1-2 actionable tips for improving their English in this topic area)

Keep the tone warm, encouraging, and educational. Write in clear English.`;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, topic, isFeedback } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    if (isFeedback) {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      // Build the full conversation text for feedback analysis
      const conversationText = messages
        .map((m) => `${m.role === "user" ? "Student" : "NusaSpeak"}: ${m.content}`)
        .join("\n");

      const result = await model.generateContent([
        FEEDBACK_PROMPT,
        `Topic: ${topic || "General English"}\n\nConversation:\n${conversationText}`,
      ]);
      const reply = result.response.text();
      return res.status(200).json({ reply });
    }

    // Normal chat mode — build Gemini chat history
    const systemWithTopic = `${SYSTEM_PROMPT}\n\nCurrent conversation topic: ${topic || "General English conversation"}`;
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      systemInstruction: systemWithTopic
    });

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const reply = result.response.text();
    return res.status(200).json({ reply });
  } catch (err) {
    console.error("NusaSpeak API error:", err);
    return res.status(500).json({ error: "Failed to get response from AI. Please try again." });
  }
}
