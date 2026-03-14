import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentSession, clearStudentSession } from "@/utils/studentAuth";
import { saveSubmission, getSubmissionsByStudent } from "@/utils/lmsStorage";
import "@/styles/lms.css";

const QUESTIONS = [
  "Write a descriptive text about Lawang Sewu Semarang.",
  "Write a descriptive text about Lumpia Semarang.",
  "Write a descriptive text about Borobudur Temple.",
  "Write a descriptive text about the Kota Lama Semarang.",
  "Choose one traditional Indonesian cultural object (dance, food, place, or clothing) and write a descriptive text about it.",
];

const StudentWriting = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [title, setTitle] = useState("");
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mySubmissions, setMySubmissions] = useState([]);
  const [view, setView] = useState("write"); // "write" | "history"

  useEffect(() => {
    const session = getStudentSession();
    if (!session) { navigate("/student-login"); return; }
    setStudent(session);
    setMySubmissions(getSubmissionsByStudent(session.id));
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const isValid = answers.every(ans => ans.trim().split(/\s+/).length >= 10);
    if (!isValid) {
      setError("Your texts are too short! Please write at least 10 words for each question.");
      return;
    }
    setLoading(true);
    const content = JSON.stringify(answers);
    const entry = saveSubmission({ user_student_id: student.id, title, content });
    setMySubmissions((prev) => [...prev, entry]);
    setLoading(false);
    setSuccess("✅ Your writing has been submitted! Your teacher will review it soon.");
    setTitle("");
    setAnswers(["", "", "", "", ""]);
  };

  const getScoreBadge = (score) => {
    if (score === null) return <span className="lms-badge lms-badge-gray">Pending</span>;
    if (score >= 70) return <span className="lms-badge lms-badge-green">{score}/100</span>;
    if (score >= 50) return <span className="lms-badge lms-badge-yellow">{score}/100</span>;
    return <span className="lms-badge lms-badge-red">{score}/100</span>;
  };

  if (!student) return null;

  return (
    <div className="lms-page" style={{ background: "linear-gradient(135deg, #fff0f6, #f0fdf4, #eff6ff)" }}>
      {/* Header */}
      <header style={{ padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e5e7eb" }}>
        <button className="lms-btn-secondary" onClick={() => navigate("/student/dashboard")}>← Dashboard</button>
        <span style={{ fontWeight: 700, color: "#1e1b4b" }}>✍️ English Writing</span>
        <button className="lms-logout-btn" onClick={() => { clearStudentSession(); navigate("/student-login"); }}>Logout</button>
      </header>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Sub-tabs */}
        <div style={{ display: "flex", gap: "8px", background: "#f3f4f6", borderRadius: 14, padding: 6, marginBottom: "2rem" }}>
          <button className={`lms-tab-btn ${view === "write" ? "active" : ""}`} onClick={() => setView("write")}>✍️ Write New</button>
          <button className={`lms-tab-btn ${view === "history" ? "active" : ""}`} onClick={() => setView("history")}>📋 My Submissions ({mySubmissions.length})</button>
        </div>

        {/* ---- WRITE VIEW ---- */}
        {view === "write" && (
          <>
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontWeight: 700, color: "#374151", marginBottom: 6, fontSize: "0.95rem" }}>
                  Title of Your Text *
                </label>
                <input
                  className="lms-input"
                  type="text"
                  placeholder="e.g. My English Writing Task"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Contains the 5 essay questions */}
              {QUESTIONS.map((q, idx) => {
                const wordCount = answers[idx].trim() === "" ? 0 : answers[idx].trim().split(/\s+/).length;
                return (
                  <div key={idx} style={{ marginBottom: "1.5rem", background: "#fff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
                    <label style={{ display: "block", fontWeight: 700, color: "#374151", marginBottom: 8, fontSize: "0.95rem" }}>
                      {idx + 1}. {q} <span style={{ fontWeight: 400, color: "#6b7280" }}>(min. 10 words)</span>
                    </label>
                    <textarea
                      className="lms-textarea"
                      rows={5}
                      placeholder={`Write your answer here for question ${idx + 1}...`}
                      required
                      value={answers[idx]}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[idx] = e.target.value;
                        setAnswers(newAnswers);
                      }}
                    />
                    <div style={{ textAlign: "right", fontSize: "0.8rem", color: wordCount >= 10 ? "#16a34a" : "#f59e0b", fontWeight: 600, marginTop: 4 }}>
                      {wordCount} words {wordCount < 10 ? `(need ${10 - wordCount} more)` : "✅"}
                    </div>
                  </div>
                );
              })}

              {/* Tips */}
              <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: "0.9rem 1.1rem", marginBottom: "1.5rem" }}>
                <p style={{ margin: 0, fontWeight: 600, color: "#15803d", fontSize: "0.85rem" }}>💡 Writing Tips:</p>
                <ul style={{ margin: "0.4rem 0 0 1rem", color: "#166534", fontSize: "0.83rem", lineHeight: 1.8 }}>
                  <li>Start with <strong>Identification</strong>: introduce your topic with a general statement.</li>
                  <li>Add <strong>Description</strong>: describe appearance, parts, functions, or special features.</li>
                  <li>Use <strong>Simple Present Tense</strong>: "It has…", "The roof is…", "People use…"</li>
                  <li>Use <strong>adjectives</strong>: beautiful, unique, traditional, colorful.</li>
                </ul>
              </div>

              <button className="lms-btn-primary" type="submit" disabled={loading}>
                {loading ? "Submitting…" : "📤 Submit Writing"}
              </button>
            </form>
          </>
        )}

        {/* ---- HISTORY VIEW ---- */}
        {view === "history" && (
          <>
            <h2 style={{ fontWeight: 700, color: "#1e1b4b", marginBottom: "1rem" }}>My Submitted Writings</h2>
            {mySubmissions.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>
                <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>📭</div>
                <p>No submissions yet. Write your first text!</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[...mySubmissions].reverse().map((sub) => (
                  <div key={sub.id} style={{ background: "rgba(255,255,255,0.9)", borderRadius: 18, padding: "1.5rem", boxShadow: "0 4px 20px rgba(0,0,0,.07)", border: "2px solid #e5e7eb" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", flexWrap: "wrap", gap: 8 }}>
                      <h3 style={{ margin: 0, fontWeight: 700, color: "#1e1b4b", fontSize: "1.05rem" }}>{sub.title}</h3>
                      {getScoreBadge(sub.score)}
                    </div>
                    {(() => {
                      try {
                        const parsed = JSON.parse(sub.content);
                        if (Array.isArray(parsed)) {
                          return (
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "0.75rem" }}>
                              {parsed.map((ans, idx) => (
                                <div key={idx}>
                                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#4b5563" }}>Q{idx + 1}: {QUESTIONS[idx]}</div>
                                  <p style={{ color: "#374151", fontSize: "0.9rem", lineHeight: 1.5, margin: "0.25rem 0 0", whiteSpace: "pre-wrap" }}>
                                    {ans}
                                  </p>
                                </div>
                              ))}
                            </div>
                          );
                        }
                      } catch (e) {
                        // Not JSON, display normally
                      }
                      return (
                        <p style={{ color: "#374151", fontSize: "0.9rem", lineHeight: 1.65, margin: "0 0 0.75rem", whiteSpace: "pre-wrap" }}>
                          {sub.content.length > 300 ? sub.content.slice(0, 300) + "…" : sub.content}
                        </p>
                      );
                    })()}
                    {sub.feedback && (
                      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "0.6rem 0.9rem", marginTop: "0.5rem" }}>
                        <p style={{ margin: 0, fontSize: "0.85rem", color: "#1d4ed8", fontWeight: 700 }}>Teacher Feedback:</p>
                        <p style={{ margin: "0.2rem 0 0", fontSize: "0.85rem", color: "#1e40af" }}>{sub.feedback}</p>
                      </div>
                    )}
                    <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem" }}>
                      Submitted: {new Date(sub.submittedAt).toLocaleString("id-ID")}
                      {sub.gradedAt && ` · Graded: ${new Date(sub.gradedAt).toLocaleString("id-ID")}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentWriting;
