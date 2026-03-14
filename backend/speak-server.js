import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Fix dotenv path for Windows
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

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

app.post("/api/speak", async (req, res) => {
  const { messages, topic, isFeedback } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    return res.status(500).json({ 
      error: "GEMINI_API_KEY belum diset. Buka backend/.env dan masukkan API key dari aistudio.google.com/app/apikey" 
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    if (isFeedback) {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const conversationText = messages
        .map((m) => `${m.role === "user" ? "Student" : "NusaSpeak"}: ${m.content}`)
        .join("\n");

      const result = await model.generateContent([
        FEEDBACK_PROMPT,
        `Topic: ${topic || "General English"}\n\nConversation:\n${conversationText}`,
      ]);
      return res.json({ reply: result.response.text() });
    }

    const systemWithTopic = `${SYSTEM_PROMPT}\n\nCurrent conversation topic: ${topic || "General English conversation"}`;
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemWithTopic
    });

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });
    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    return res.json({ reply: result.response.text() });
  } catch (err) {
    console.error("NusaSpeak local error:", err);
    return res.status(500).json({ error: `AI error: ${err.message}` });
  }
});

const PORT = process.env.SPEAK_PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ NusaSpeak server running on http://localhost:${PORT}`);
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
    console.log("⚠️  GEMINI_API_KEY belum diset! Edit backend/.env dan masukkan key dari https://aistudio.google.com/app/apikey");
  } else {
    console.log("✅ GEMINI_API_KEY found");
  }
});
