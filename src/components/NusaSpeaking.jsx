import React, { useState, useRef, useEffect, useCallback } from "react";

/**
 * Suggested Prompt cards — pulled from the learning materials.
 */
const STUDENT_PROMPTS = [
  {
    title: "Saman Dance",
    desc: "Traditional dance from Aceh",
    opener: "I want to learn about Saman Dance from Aceh. Can you describe it and help me practice speaking about Indonesian traditional dances in English?",
  },
  {
    title: "Rumah Gadang",
    desc: "Minangkabau traditional house",
    opener: "Let's talk about Rumah Gadang, the traditional house from West Sumatra. Can you help me describe it in English?",
  },
  {
    title: "Kebaya",
    desc: "Traditional Indonesian costume",
    opener: "I'd like to practice describing Kebaya, the traditional Indonesian dress. Can we have a conversation about it?",
  },
  {
    title: "Ngaben Ceremony",
    desc: "Balinese cremation ritual",
    opener: "Can you help me talk about the Ngaben ceremony from Bali? I want to practice describing Indonesian ceremonies in English.",
  },
];

const TEACHER_PROMPTS = [
  {
    title: "Grading Rubric",
    desc: "Create an English grading rubric",
    opener: "Can you provide a comprehensive grading rubric for evaluating a student's descriptive text about Indonesian culture?",
  },
  {
    title: "Correct Writing",
    desc: "Help correct student's English writing",
    opener: "I have a student's descriptive text that needs correction. Can you help me identify grammar mistakes, suggest improvements, and provide constructive feedback?",
  },
  {
    title: "Teaching Ideas",
    desc: "Ideas for teaching speaking",
    opener: "What are some engaging and interactive activities I can use in my classroom to encourage students to practice speaking English?",
  },
  {
    title: "Common Mistakes",
    desc: "Identify common grammar issues",
    opener: "What are the most common English grammar mistakes Indonesian students make when writing descriptive texts, and how can I help them improve?",
  },
];

/* ── Markdown-lite renderer for feedback ── */
const RenderFeedback = ({ text }) => {
  const lines = text.split("\n");
  return (
    <div className="nspk-feedback">
      {lines.map((line, i) => {
        if (line.startsWith("## ")) return <h2 key={i}>{line.slice(3)}</h2>;
        if (line.startsWith("### ")) return <h3 key={i}>{line.slice(4)}</h3>;
        if (line.startsWith("- ") || line.startsWith("* "))
          return <p key={i}>• {line.slice(2)}</p>;
        if (line.trim() === "") return <div key={i} style={{ height: 4 }} />;
        return <p key={i}>{line}</p>;
      })}
    </div>
  );
};

/* ── Check for SpeechRecognition support ── */
const SpeechRecognition = typeof window !== "undefined"
  ? window.SpeechRecognition || window.webkitSpeechRecognition
  : null;

const NusaSpeaking = ({ role = "student" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, feedback]);

  /* ── Mic: setup speech recognition ── */
  const startListening = useCallback(() => {
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition. Please use Chrome or Edge.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "not-allowed") {
        alert("Microphone access denied. Please allow microphone access in your browser settings.");
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const toggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  /* ── Safe fetch helper ── */
  const safeFetch = async (url, options) => {
    const res = await fetch(url, options);
    const text = await res.text();
    // Try parsing as JSON, handle non-JSON (HTML errors, empty responses)
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(
        res.status === 404
          ? "Backend server not found. Pastikan 'node speak-server.js' sudah berjalan di terminal."
          : res.status >= 500
          ? `Server error (${res.status}). Periksa GEMINI_API_KEY di backend/.env`
          : `Unexpected response (${res.status}): ${text.slice(0, 100)}`
      );
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setTimeout(() => inputRef.current?.focus(), 200);
  };

  const startWithPrompt = (prompt) => {
    setCurrentTopic(prompt.title);
    setFeedback(null);
    const newMessages = [{ role: "user", content: prompt.opener }];
    setMessages(newMessages);
    sendToAI(newMessages, prompt.title);
  };

  const sendToAI = async (msgs, topic) => {
    setIsLoading(true);
    try {
      const data = await safeFetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: msgs, topic: topic || currentTopic || "Indonesian culture", isFeedback: false }),
      });
      if (data.error) throw new Error(data.error);
      setMessages([...msgs, { role: "model", content: data.reply }]);
    } catch (err) {
      setMessages([...msgs, { role: "model", content: `⚠️ ${err.message}` }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    if (isListening) stopListening();
    const newMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(newMessages);
    setInput("");
    if (!currentTopic) setCurrentTopic("General English");
    sendToAI(newMessages, currentTopic || "General English");
  };

  const handleEndSession = async () => {
    if (messages.filter((m) => m.role === "user").length === 0) return;
    setIsFeedbackLoading(true);
    try {
      const data = await safeFetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, topic: currentTopic, isFeedback: true }),
      });
      if (data.error) throw new Error(data.error);
      setFeedback(data.reply);
    } catch (err) {
      setFeedback(`⚠️ ${err.message}`);
    } finally {
      setIsFeedbackLoading(false);
    }
  };

  const handleNewSession = () => {
    setMessages([]);
    setCurrentTopic(null);
    setFeedback(null);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const hasMessages = messages.length > 0;
  const userMsgCount = messages.filter((m) => m.role === "user").length;

  return (
    <>
      {/* Floating Action Button */}
      <button className="nspk-fab" onClick={toggleOpen} title="Nusa Speaking">
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Popup Window */}
      {isOpen && (
        <div className="nspk-popup">
          {/* Header */}
          <div className="nspk-header">
            <div className="nspk-header-info">
              <div className="nspk-header-avatar">🎙️</div>
              <div className="nspk-header-text">
                <h3>{role === "teacher" ? "Nusa Grader" : "Nusa Speaking"}</h3>
                <p>{role === "teacher" ? "AI Teacher Assistant" : "AI English Practice Partner"}</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {hasMessages && !feedback && userMsgCount > 0 && (
                <button className="nspk-end" onClick={handleEndSession} disabled={isFeedbackLoading}>
                  {isFeedbackLoading ? "Analyzing…" : "End & Feedback"}
                </button>
              )}
              <button className="nspk-close-btn" onClick={toggleOpen}>✕</button>
            </div>
          </div>

          {/* Welcome + Suggested Prompts */}
          {!hasMessages && !feedback && (
            <>
              <div style={{ padding: "0.85rem 1rem 0.4rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>🎙️</div>
                <p style={{ fontSize: "0.82rem", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>
                  Hi! I'm <strong>{role === "teacher" ? "Nusa Grader" : "Nusa Speaking"}</strong>, your AI {role === "teacher" ? "teacher assistant" : "English conversation partner"}. Pick a topic or type your own question!
                </p>
              </div>
              <div className="nspk-prompts">
                {(role === "teacher" ? TEACHER_PROMPTS : STUDENT_PROMPTS).map((p, i) => (
                  <button key={i} className="nspk-prompt-card" onClick={() => startWithPrompt(p)}>
                    <div className="nspk-prompt-title">{p.title}</div>
                    <div className="nspk-prompt-desc">{p.desc}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Chat messages area */}
          <div className="nspk-chat">
            {messages.map((msg, idx) => (
              <div key={idx} className={`nspk-msg-row ${msg.role === "user" ? "user" : ""}`}>
                <div className="nspk-msg-avatar">
                  {msg.role === "user" ? "👤" : "🤖"}
                </div>
                <div className="nspk-msg-bubble">
                  {msg.content.split("**").map((part, i) =>
                    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="nspk-msg-row">
                <div className="nspk-msg-avatar">🤖</div>
                <div className="nspk-msg-bubble nspk-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            {isFeedbackLoading && (
              <div style={{ textAlign: "center", padding: "1rem", color: "#6b7280", fontSize: "0.85rem" }}>
                <div className="nspk-spinner" />
                Analyzing your conversation…
              </div>
            )}
            {feedback && <RenderFeedback text={feedback} />}
            {feedback && (
              <div style={{ textAlign: "center", paddingTop: "0.5rem" }}>
                <button
                  onClick={handleNewSession}
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "0.5rem 1.2rem",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  🔄 New Session
                </button>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input bar with mic button */}
          {!feedback && (
            <div className="nspk-input-bar">
              <textarea
                ref={inputRef}
                className="nspk-input"
                placeholder={isListening ? "🎤 Listening… speak now" : "Type or tap 🎤 to speak…"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={isLoading || isFeedbackLoading}
              />
              {SpeechRecognition && (
                <button
                  className={`nspk-mic ${isListening ? "nspk-mic-active" : ""}`}
                  onClick={toggleMic}
                  title={isListening ? "Stop listening" : "Speak with microphone"}
                  disabled={isLoading}
                >
                  🎤
                </button>
              )}
              <button
                className="nspk-send"
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
              >
                ➤
              </button>
            </div>
          )}
          {!feedback && (
            <div className="nspk-hint">
              {isListening
                ? "🔴 Speaking… tap 🎤 again or press Enter to send"
                : SpeechRecognition
                  ? "Press Enter to send • Tap 🎤 to speak"
                  : "Press Enter to send • Shift+Enter for new line"
              }
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NusaSpeaking;
