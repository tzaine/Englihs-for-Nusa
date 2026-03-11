import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTeacherSession, clearTeacherSession } from "@/utils/studentAuth";
import { getSubmissions, getStudents, gradeSubmission } from "@/utils/lmsStorage";
import "@/styles/lms.css";

const TeacherCorrections = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [scores, setScores] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [saved, setSaved] = useState({});
  const [filter, setFilter] = useState("all"); // "all" | "pending" | "graded"

  useEffect(() => {
    const session = getTeacherSession();
    if (!session) { navigate("/teacher-login"); return; }
    loadData();
    setLoading(false);
  }, [navigate]);

  const loadData = () => {
    const students = getStudents();
    const submissions = getSubmissions();
    const studentMap = Object.fromEntries(students.map(s => [s.id, s]));
    const enriched = submissions.map(sub => ({
      ...sub,
      studentName: studentMap[sub.user_student_id]?.name || "Unknown",
      studentEmail: studentMap[sub.user_student_id]?.email || "",
    })).sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    setRows(enriched);
    // Prefill existing scores/feedbacks
    const sc = {};
    const fb = {};
    enriched.forEach(r => {
      sc[r.id] = r.score !== null ? String(r.score) : "";
      fb[r.id] = r.feedback || "";
    });
    setScores(sc);
    setFeedbacks(fb);
  };

  const handleSave = (id) => {
    const scoreVal = parseInt(scores[id], 10);
    if (isNaN(scoreVal) || scoreVal < 0 || scoreVal > 100) {
      alert("Please enter a score between 0 and 100.");
      return;
    }
    gradeSubmission(id, { score: scoreVal, feedback: feedbacks[id] || "" });
    setSaved(prev => ({ ...prev, [id]: true }));
    setRows(prev => prev.map(r => r.id === id ? { ...r, score: scoreVal, feedback: feedbacks[id] || "", gradedAt: new Date().toISOString() } : r));
    setTimeout(() => setSaved(prev => ({ ...prev, [id]: false })), 2500);
  };

  const filtered = rows.filter(r => {
    if (filter === "pending") return r.score === null;
    if (filter === "graded") return r.score !== null;
    return true;
  });

  if (loading) return null;

  return (
    <div className="lms-page" style={{ background: "linear-gradient(135deg, #f8faff, #fff0f6)" }}>
      {/* Header */}
      <header style={{ padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e5e7eb" }}>
        <button className="lms-btn-secondary" onClick={() => navigate("/teacher/dashboard")}>← Dashboard</button>
        <span style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1rem" }}>📋 Student Corrections</span>
        <button className="lms-logout-btn" onClick={() => { clearTeacherSession(); navigate("/teacher-login"); }}>Logout</button>
      </header>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: "1.5rem" }}>
          <h1 style={{ fontWeight: 800, color: "#1e1b4b", margin: 0 }}>Writing Submissions</h1>
          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 6, background: "#f3f4f6", borderRadius: 12, padding: 4 }}>
            {["all", "pending", "graded"].map(f => (
              <button
                key={f}
                className={`lms-tab-btn ${filter === f ? "active" : ""}`}
                style={{ padding: "6px 16px", fontSize: "0.82rem" }}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? `All (${rows.length})` : f === "pending" ? `Pending (${rows.filter(r => r.score === null).length})` : `Graded (${rows.filter(r => r.score !== null).length})`}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#6b7280" }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>📭</div>
            <p>No submissions yet.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {filtered.map(sub => (
              <div key={sub.id} style={{ background: "rgba(255,255,255,0.95)", borderRadius: 18, boxShadow: "0 4px 20px rgba(0,0,0,.08)", border: `2px solid ${sub.score === null ? "#fde68a" : "#bbf7d0"}`, overflow: "hidden" }}>
                {/* Header row */}
                <div
                  style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", flexWrap: "wrap", gap: 8 }}
                  onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1rem" }}>{sub.title}</div>
                    <div style={{ fontSize: "0.82rem", color: "#6b7280" }}>
                      👤 {sub.studentName} ({sub.studentEmail}) · {new Date(sub.submittedAt).toLocaleString("id-ID")}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {sub.score !== null
                      ? <span className={`lms-badge ${sub.score >= 70 ? "lms-badge-green" : sub.score >= 50 ? "lms-badge-yellow" : "lms-badge-red"}`}>{sub.score}/100</span>
                      : <span className="lms-badge lms-badge-yellow">⏳ Pending</span>
                    }
                    <span style={{ color: "#6b7280", fontSize: "1.2rem" }}>{expanded === sub.id ? "▲" : "▼"}</span>
                  </div>
                </div>

                {/* Expanded content */}
                {expanded === sub.id && (
                  <div style={{ padding: "0 1.5rem 1.5rem" }}>
                    <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "1rem", marginBottom: "1rem" }}>
                      <p style={{ fontWeight: 600, color: "#374151", marginBottom: 6, fontSize: "0.88rem" }}>Student's Writing:</p>
                      <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem 1.25rem", whiteSpace: "pre-wrap", fontSize: "0.9rem", lineHeight: 1.75, color: "#1f2937", maxHeight: 320, overflowY: "auto" }}>
                        {sub.content}
                      </div>
                    </div>

                    {/* Grading form */}
                    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "0.75rem", alignItems: "start" }}>
                      <div>
                        <label style={{ display: "block", fontWeight: 700, color: "#374151", marginBottom: 6, fontSize: "0.85rem" }}>Score (0–100)</label>
                        <input
                          className="lms-input"
                          type="number"
                          min={0}
                          max={100}
                          placeholder="85"
                          value={scores[sub.id] || ""}
                          onChange={(e) => setScores(prev => ({ ...prev, [sub.id]: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontWeight: 700, color: "#374151", marginBottom: 6, fontSize: "0.85rem" }}>Feedback</label>
                        <textarea
                          className="lms-textarea"
                          rows={3}
                          placeholder="Great descriptive text! Your use of adjectives is excellent. Keep practicing sentence variety."
                          value={feedbacks[sub.id] || ""}
                          onChange={(e) => setFeedbacks(prev => ({ ...prev, [sub.id]: e.target.value }))}
                          style={{ resize: "none" }}
                        />
                      </div>
                    </div>

                    <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
                      <button
                        className="lms-btn-primary"
                        style={{ width: "auto", padding: "0.65rem 1.75rem" }}
                        onClick={() => handleSave(sub.id)}
                      >
                        💾 Save Grade
                      </button>
                      {saved[sub.id] && <span style={{ color: "#16a34a", fontWeight: 600, fontSize: "0.9rem" }}>✅ Saved!</span>}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCorrections;
