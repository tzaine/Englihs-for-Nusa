import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTeacherSession, clearTeacherSession } from "@/utils/studentAuth";
import { getFullReport } from "@/utils/lmsStorage";
import { folders } from "@/data/questionsData";
import "@/styles/lms.css";

const scoreColor = (val) => {
  if (val === null || val === undefined) return "#9ca3af";
  if (val >= 70) return "#16a34a";
  if (val >= 50) return "#d97706";
  return "#dc2626";
};

const ScoreCell = ({ val }) => {
  if (val === null || val === undefined) return <span style={{ color: "#9ca3af", fontSize: "0.85rem" }}>—</span>;
  return <span style={{ color: scoreColor(val), fontWeight: 700 }}>{val}%</span>;
};

const TeacherReport = () => {
  const navigate = useNavigate();
  const [report, setReport] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name"); // "name" | "quiz" | "writing" | "overall"

  useEffect(() => {
    const session = getTeacherSession();
    if (!session) { navigate("/teacher-login"); return; }
    setReport(getFullReport());
  }, [navigate]);

  const filtered = report
    .filter(r => r.student.name.toLowerCase().includes(search.toLowerCase()) || r.student.email.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.student.name.localeCompare(b.student.name);
      if (sortBy === "quiz") return (b.quizAvg ?? -1) - (a.quizAvg ?? -1);
      if (sortBy === "writing") return (b.writingAvg ?? -1) - (a.writingAvg ?? -1);
      if (sortBy === "overall") return (b.overallAvg ?? -1) - (a.overallAvg ?? -1);
      return 0;
    });

  const totalStudents = report.length;
  const passCount = report.filter(r => r.overallAvg !== null && r.overallAvg >= 70).length;
  const avgOverall = report.filter(r => r.overallAvg !== null).length > 0
    ? Math.round(report.filter(r => r.overallAvg !== null).reduce((a, b) => a + b.overallAvg, 0) / report.filter(r => r.overallAvg !== null).length)
    : null;

  return (
    <div className="lms-page" style={{ background: "linear-gradient(135deg, #f0f9ff, #f0fdf4, #f5f3ff)" }}>
      {/* Header */}
      <header style={{ padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e5e7eb" }}>
        <button className="lms-btn-secondary" onClick={() => navigate("/teacher/dashboard")}>← Dashboard</button>
        <span style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1rem" }}>📊 Score Report</span>
        <button className="lms-logout-btn" onClick={() => { clearTeacherSession(); navigate("/teacher-login"); }}>Logout</button>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <h1 style={{ fontWeight: 800, color: "#1e1b4b", marginBottom: "0.25rem" }}>📊 Student Score Report</h1>
        <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>Combined quiz and writing scores for all registered students.</p>

        {/* Class stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "1.75rem" }}>
          {[
            { emoji: "👥", label: "Total Students", val: totalStudents, color: "#6366f1" },
            { emoji: "✅", label: "Pass Rate (≥70%)", val: totalStudents > 0 ? `${Math.round((passCount / totalStudents) * 100)}%` : "—", color: "#16a34a" },
            { emoji: "📊", label: "Class Average", val: avgOverall !== null ? `${avgOverall}%` : "—", color: scoreColor(avgOverall) },
          ].map(s => (
            <div key={s.label} style={{ background: "rgba(255,255,255,.9)", border: "2px solid #e5e7eb", borderRadius: 16, padding: "1.2rem", textAlign: "center", boxShadow: "0 4px 16px rgba(0,0,0,.06)" }}>
              <div style={{ fontSize: "1.5rem" }}>{s.emoji}</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
          <input
            className="lms-input"
            style={{ maxWidth: 260 }}
            placeholder="🔍 Search student name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#6b7280", fontWeight: 600 }}>Sort:</span>
            {[["name", "Name"], ["quiz", "Quiz Avg"], ["writing", "Writing"], ["overall", "Overall"]].map(([val, label]) => (
              <button
                key={val}
                className={`lms-tab-btn ${sortBy === val ? "active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.8rem" }}
                onClick={() => setSortBy(val)}
              >{label}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>
            <div style={{ fontSize: "3rem" }}>📭</div>
            <p>No students registered yet.</p>
          </div>
        ) : (
          <div style={{ background: "rgba(255,255,255,.95)", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,.09)", overflowX: "auto" }}>
            <table className="lms-table" style={{ minWidth: 700 }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  {folders.map(f => <th key={f.id}>{f.name}</th>)}
                  <th>Quiz Avg</th>
                  <th>Writing Avg</th>
                  <th>Overall</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, idx) => {
                  const { student, quizScores, writingScores, quizAvg, writingAvg, overallAvg } = row;
                  return (
                    <tr key={student.id}>
                      <td style={{ color: "#9ca3af", fontSize: "0.85rem" }}>{idx + 1}</td>
                      <td>
                        <div style={{ fontWeight: 700, color: "#1e1b4b" }}>{student.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "#9ca3af" }}>{student.email}</div>
                      </td>
                      {folders.map(f => {
                        const s = quizScores.find(q => q.folder === f.id);
                        const pct = s ? Math.round((s.score / s.total) * 100) : null;
                        return <td key={f.id}><ScoreCell val={pct} /></td>;
                      })}
                      <td><ScoreCell val={quizAvg} /></td>
                      <td>
                        {writingScores.length > 0
                          ? <ScoreCell val={writingAvg} />
                          : <span style={{ color: "#9ca3af", fontSize: "0.85rem" }}>—</span>}
                      </td>
                      <td>
                        <span style={{
                          display: "inline-block",
                          fontWeight: 800,
                          fontSize: "0.95rem",
                          color: scoreColor(overallAvg),
                          background: overallAvg === null ? "#f3f4f6" : overallAvg >= 70 ? "#dcfce7" : overallAvg >= 50 ? "#fef9c3" : "#fee2e2",
                          padding: "3px 12px",
                          borderRadius: 999,
                        }}>
                          {overallAvg !== null ? `${overallAvg}%` : "—"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Legend */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
          {[["lms-badge-green", "≥ 70 — Pass"], ["lms-badge-yellow", "50–69 — Below Average"], ["lms-badge-red", "< 50 — Fail"]].map(([cls, label]) => (
            <span key={label} className={`lms-badge ${cls}`}>{label}</span>
          ))}
          <span className="lms-badge lms-badge-gray">— = Not attempted</span>
        </div>
      </div>
    </div>
  );
};

export default TeacherReport;
