import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTeacherSession, clearTeacherSession } from "@/utils/studentAuth";
import { getSubmissions, getStudents, gradeSubmission, deleteSubmission, editSubmission } from "@/utils/lmsStorage";
import "@/styles/lms.css";

const QUESTIONS = [
  "Write a descriptive text about Lawang Sewu Semarang.",
  "Write a descriptive text about Lumpia Semarang.",
  "Write a descriptive text about Borobudur Temple.",
  "Write a descriptive text about the Kota Lama Semarang.",
  "Choose one traditional Indonesian cultural object (dance, food, place, or clothing) and write a descriptive text about it.",
];

const TeacherCorrections = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [scores, setScores] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [saved, setSaved] = useState({});
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null); // id of row being edited
  const [editScores, setEditScores] = useState({});
  const [editFeedbacks, setEditFeedbacks] = useState({});

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

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this submission? This cannot be undone.")) return;
    deleteSubmission(id);
    setRows(prev => prev.filter(r => r.id !== id));
    if (expanded === id) setExpanded(null);
  };

  const startEdit = (sub) => {
    setEditing(sub.id);
    setEditScores(prev => ({ ...prev, [sub.id]: sub.score !== null ? String(sub.score) : "" }));
    setEditFeedbacks(prev => ({ ...prev, [sub.id]: sub.feedback || "" }));
  };

  const handleEditSave = (id) => {
    const scoreVal = editScores[id] !== "" ? parseInt(editScores[id], 10) : null;
    if (scoreVal !== null && (isNaN(scoreVal) || scoreVal < 0 || scoreVal > 100)) {
      alert("Please enter a score between 0 and 100.");
      return;
    }
    const updates = {
      score: scoreVal,
      feedback: editFeedbacks[id] || "",
      gradedAt: scoreVal !== null ? new Date().toISOString() : null,
    };
    editSubmission(id, updates);
    setRows(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
    setScores(prev => ({ ...prev, [id]: scoreVal !== null ? String(scoreVal) : "" }));
    setFeedbacks(prev => ({ ...prev, [id]: editFeedbacks[id] || "" }));
    setEditing(null);
    setSaved(prev => ({ ...prev, [id]: true }));
    setTimeout(() => setSaved(prev => ({ ...prev, [id]: false })), 2500);
  };

  const getQuestionText = (title) => {
    const match = title.match(/Question (\d+)/);
    if (!match) return null;
    const idx = parseInt(match[1], 10) - 1;
    return idx >= 0 && idx < QUESTIONS.length ? QUESTIONS[idx] : null;
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
      <header className="sw-header">
        <button className="lms-btn-secondary" onClick={() => navigate("/teacher/dashboard")}>← Dashboard</button>
        <span style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1rem" }}>📋 Student Corrections</span>
        <button className="lms-logout-btn" onClick={() => { clearTeacherSession(); navigate("/teacher-login"); }}>Logout</button>
      </header>

      <div className="sw-container" style={{ maxWidth: 920 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: "1.5rem" }}>
          <h1 style={{ fontWeight: 800, color: "#1e1b4b", margin: 0 }}>Writing Submissions</h1>
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
            {filtered.map(sub => {
              const qText = getQuestionText(sub.title);
              const isEditing = editing === sub.id;
              return (
                <div key={sub.id} className="tc-card" style={{ borderColor: sub.score === null ? "#fde68a" : "#bbf7d0" }}>
                  {/* Header row */}
                  <div
                    className="tc-card-header"
                    onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1rem" }}>{sub.title}</div>
                      {qText && <div style={{ fontSize: "0.82rem", color: "#6366f1", fontWeight: 600 }}>{qText}</div>}
                      <div style={{ fontSize: "0.82rem", color: "#6b7280" }}>
                        👤 {sub.studentName} ({sub.studentEmail}) · {new Date(sub.submittedAt).toLocaleString("id-ID")}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                      {sub.score !== null
                        ? <span className={`lms-badge ${sub.score >= 70 ? "lms-badge-green" : sub.score >= 50 ? "lms-badge-yellow" : "lms-badge-red"}`}>{sub.score}/100</span>
                        : <span className="lms-badge lms-badge-yellow">⏳ Pending</span>
                      }
                      <span style={{ color: "#6b7280", fontSize: "1.2rem" }}>{expanded === sub.id ? "▲" : "▼"}</span>
                    </div>
                  </div>

                  {/* Expanded content */}
                  {expanded === sub.id && (
                    <div className="tc-card-body">
                      {/* Student's writing */}
                      <div style={{ marginBottom: "1rem" }}>
                        <p style={{ fontWeight: 600, color: "#374151", marginBottom: 6, fontSize: "0.88rem" }}>Student's Writing:</p>
                        <div className="tc-writing-box">
                          {sub.content}
                        </div>
                      </div>

                      {/* Action buttons: Edit & Delete */}
                      <div style={{ display: "flex", gap: 8, marginBottom: "1rem", flexWrap: "wrap" }}>
                        {sub.score !== null && !isEditing && (
                          <button className="tc-btn-edit" onClick={() => startEdit(sub)}> Edit Grade</button>
                        )}
                        <button className="tc-btn-delete" onClick={() => handleDelete(sub.id)}> Delete</button>
                      </div>

                      {/* Editing mode for already-graded submissions */}
                      {isEditing ? (
                        <>
                          <div className="tc-grading-grid">
                            <div>
                              <label className="tc-label">Score (0–100)</label>
                              <input
                                className="lms-input"
                                type="number"
                                min={0}
                                max={100}
                                placeholder="85"
                                value={editScores[sub.id] || ""}
                                onChange={(e) => setEditScores(prev => ({ ...prev, [sub.id]: e.target.value }))}
                              />
                            </div>
                            <div>
                              <label className="tc-label">Feedback</label>
                              <textarea
                                className="lms-textarea"
                                rows={3}
                                placeholder="Update your feedback here..."
                                value={editFeedbacks[sub.id] || ""}
                                onChange={(e) => setEditFeedbacks(prev => ({ ...prev, [sub.id]: e.target.value }))}
                                style={{ resize: "none" }}
                              />
                            </div>
                          </div>
                          <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                            <button className="lms-btn-primary" style={{ width: "auto", padding: "0.65rem 1.75rem" }} onClick={() => handleEditSave(sub.id)}>
                              Update Grade
                            </button>
                            <button className="lms-btn-secondary" onClick={() => setEditing(null)}>Cancel</button>
                            {saved[sub.id] && <span style={{ color: "#16a34a", fontWeight: 600, fontSize: "0.9rem" }}>✅ Updated!</span>}
                          </div>
                        </>
                      ) : sub.score === null ? (
                        /* Grading form for pending submissions */
                        <>
                          <div className="tc-grading-grid">
                            <div>
                              <label className="tc-label">Score (0–100)</label>
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
                              <label className="tc-label">Feedback</label>
                              <textarea
                                className="lms-textarea"
                                rows={3}
                                placeholder="Great descriptive text! Your use of adjectives is excellent."
                                value={feedbacks[sub.id] || ""}
                                onChange={(e) => setFeedbacks(prev => ({ ...prev, [sub.id]: e.target.value }))}
                                style={{ resize: "none" }}
                              />
                            </div>
                          </div>
                          <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
                            <button className="lms-btn-primary" style={{ width: "auto", padding: "0.65rem 1.75rem" }} onClick={() => handleSave(sub.id)}>
                              Save Grade
                            </button>
                            {saved[sub.id] && <span style={{ color: "#16a34a", fontWeight: 600, fontSize: "0.9rem" }}>✅ Saved!</span>}
                          </div>
                        </>
                      ) : (
                        /* Already graded — display summary */
                        <div className="tc-graded-summary">
                          <div><strong>Score:</strong> {sub.score}/100</div>
                          {sub.feedback && <div><strong>Feedback:</strong> {sub.feedback}</div>}
                          <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Graded: {new Date(sub.gradedAt).toLocaleString("id-ID")}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCorrections;
