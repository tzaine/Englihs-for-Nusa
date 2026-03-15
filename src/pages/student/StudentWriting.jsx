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
  const [mySubmissions, setMySubmissions] = useState([]);
  const [view, setView] = useState("write"); // "write" | "history"

  /* per-question state */
  const [activeQ, setActiveQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const session = getStudentSession();
    if (!session) { navigate("/student-login"); return; }
    setStudent(session);
    setMySubmissions(getSubmissionsByStudent(session.id));
  }, [navigate]);

  /* Check if a question has been submitted already */
  const getSubmissionForQ = (qIdx) =>
    mySubmissions.find((s) => s.title === `Question ${qIdx + 1}`);

  const wordCount = answer.trim() === "" ? 0 : answer.trim().split(/\s+/).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (wordCount < 10) {
      setError("Your text is too short! Please write at least 10 words.");
      return;
    }
    setLoading(true);
    const entry = saveSubmission({
      user_student_id: student.id,
      title: `Question ${activeQ + 1}`,
      content: answer.trim(),
    });
    setMySubmissions((prev) => [...prev, entry]);
    setLoading(false);
    setSuccess("✅ Your answer has been submitted! Your teacher will review it soon.");
    setAnswer("");
  };

  const getScoreBadge = (score) => {
    if (score === null || score === undefined) return <span className="lms-badge lms-badge-gray">Pending</span>;
    if (score >= 70) return <span className="lms-badge lms-badge-green">{score}/100</span>;
    if (score >= 50) return <span className="lms-badge lms-badge-yellow">{score}/100</span>;
    return <span className="lms-badge lms-badge-red">{score}/100</span>;
  };

  if (!student) return null;

  const existingSub = getSubmissionForQ(activeQ);

  return (
    <div className="lms-page" style={{ background: "linear-gradient(135deg, #fff0f6, #f0fdf4, #eff6ff)" }}>
      {/* Header */}
      <header className="sw-header">
        <button className="lms-btn-secondary" onClick={() => navigate("/student/dashboard")}>← Dashboard</button>
        <span style={{ fontWeight: 700, color: "#1e1b4b" }}>✍️ English Writing</span>
        <button className="lms-logout-btn" onClick={() => { clearStudentSession(); navigate("/student-login"); }}>Logout</button>
      </header>

      <div className="sw-container">
        {/* Sub-tabs */}
        <div className="sw-tabs">
          <button className={`lms-tab-btn ${view === "write" ? "active" : ""}`} onClick={() => setView("write")}>✍️ Write</button>
          <button className={`lms-tab-btn ${view === "history" ? "active" : ""}`} onClick={() => setView("history")}>📋 Submissions ({mySubmissions.length})</button>
        </div>

        {/* ---- WRITE VIEW ---- */}
        {view === "write" && (
          <>
            {/* Question selector pills */}
            <div className="sw-q-pills">
              {QUESTIONS.map((_, idx) => {
                const done = !!getSubmissionForQ(idx);
                return (
                  <button
                    key={idx}
                    className={`sw-q-pill ${activeQ === idx ? "active" : ""} ${done ? "done" : ""}`}
                    onClick={() => { setActiveQ(idx); setAnswer(""); setError(""); setSuccess(""); }}
                  >
                    {done ? "✅" : ""} Q{idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Active question card */}
            <div className="sw-question-card">
              <div className="sw-question-number">Question {activeQ + 1} of {QUESTIONS.length}</div>
              <p className="sw-question-text">{QUESTIONS[activeQ]}</p>
            </div>

            {error && <div className="lms-alert lms-alert-error">{error}</div>}
            {success && <div className="lms-alert lms-alert-success">{success}</div>}

            {existingSub ? (
              /* Already submitted for this question */
              <div className="sw-submitted-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: 8 }}>
                  <span style={{ fontWeight: 700, color: "#16a34a", fontSize: "0.95rem" }}>✅ Already Submitted</span>
                  {getScoreBadge(existingSub.score)}
                </div>
                <p className="sw-submitted-text">{existingSub.content}</p>
                {existingSub.feedback && (
                  <div className="sw-feedback-box">
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "#1d4ed8", fontWeight: 700 }}>Teacher Feedback:</p>
                    <p style={{ margin: "0.2rem 0 0", fontSize: "0.85rem", color: "#1e40af" }}>{existingSub.feedback}</p>
                  </div>
                )}
                <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem" }}>
                  Submitted: {new Date(existingSub.submittedAt).toLocaleString("id-ID")}
                </div>
              </div>
            ) : (
              /* Write form */
              <form onSubmit={handleSubmit}>
                <textarea
                  className="lms-textarea"
                  rows={8}
                  placeholder={`Write your descriptive text here for Question ${activeQ + 1}...`}
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <div className="sw-word-count" style={{ color: wordCount >= 10 ? "#16a34a" : "#f59e0b" }}>
                  {wordCount} words {wordCount < 10 ? `(need ${10 - wordCount} more)` : "✅"}
                </div>

                {/* Tips */}
                <div className="sw-tips">
                  <p style={{ margin: 0, fontWeight: 600, color: "#15803d", fontSize: "0.85rem" }}>💡 Writing Tips:</p>
                  <ul>
                    <li>Start with <strong>Identification</strong>: introduce your topic with a general statement.</li>
                    <li>Add <strong>Description</strong>: describe appearance, parts, functions, or special features.</li>
                    <li>Use <strong>Simple Present Tense</strong>: "It has…", "The roof is…", "People use…"</li>
                    <li>Use <strong>adjectives</strong>: beautiful, unique, traditional, colorful.</li>
                  </ul>
                </div>

                <button className="lms-btn-primary" type="submit" disabled={loading}>
                  {loading ? "Submitting…" : `📤 Submit Answer for Q${activeQ + 1}`}
                </button>
              </form>
            )}

            {/* Navigation arrows */}
            <div className="sw-nav">
              <button className="lms-btn-secondary" disabled={activeQ === 0} onClick={() => { setActiveQ(activeQ - 1); setAnswer(""); setError(""); setSuccess(""); }}>
                ← Previous
              </button>
              <button className="lms-btn-secondary" disabled={activeQ === QUESTIONS.length - 1} onClick={() => { setActiveQ(activeQ + 1); setAnswer(""); setError(""); setSuccess(""); }}>
                Next →
              </button>
            </div>
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
                {[...mySubmissions].reverse().map((sub) => {
                  /* Find which question index this belongs to */
                  const qMatch = sub.title.match(/Question (\d+)/);
                  const qIdx = qMatch ? parseInt(qMatch[1], 10) - 1 : null;
                  return (
                    <div key={sub.id} className="sw-history-card">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", flexWrap: "wrap", gap: 8 }}>
                        <h3 style={{ margin: 0, fontWeight: 700, color: "#1e1b4b", fontSize: "1rem" }}>{sub.title}</h3>
                        {getScoreBadge(sub.score)}
                      </div>
                      {qIdx !== null && qIdx < QUESTIONS.length && (
                        <p style={{ fontSize: "0.82rem", color: "#6366f1", fontWeight: 600, margin: "0 0 0.5rem" }}>
                          {QUESTIONS[qIdx]}
                        </p>
                      )}
                      <p style={{ color: "#374151", fontSize: "0.9rem", lineHeight: 1.65, margin: "0 0 0.5rem", whiteSpace: "pre-wrap" }}>
                        {sub.content.length > 300 ? sub.content.slice(0, 300) + "…" : sub.content}
                      </p>
                      {sub.feedback && (
                        <div className="sw-feedback-box">
                          <p style={{ margin: 0, fontSize: "0.85rem", color: "#1d4ed8", fontWeight: 700 }}>Teacher Feedback:</p>
                          <p style={{ margin: "0.2rem 0 0", fontSize: "0.85rem", color: "#1e40af" }}>{sub.feedback}</p>
                        </div>
                      )}
                      <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem" }}>
                        Submitted: {new Date(sub.submittedAt).toLocaleString("id-ID")}
                        {sub.gradedAt && ` · Graded: ${new Date(sub.gradedAt).toLocaleString("id-ID")}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentWriting;
