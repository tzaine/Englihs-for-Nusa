import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentSession, clearStudentSession } from "@/utils/studentAuth";
import { getQuizScoresByStudent, getSubmissionsByStudent } from "@/utils/lmsStorage";
import "@/styles/lms.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [quizScores, setQuizScores] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const session = getStudentSession();
    if (!session) { navigate("/student-login"); return; }
    setStudent(session);
    setQuizScores(getQuizScoresByStudent(session.id));
    setSubmissions(getSubmissionsByStudent(session.id));
  }, [navigate]);

  const handleLogout = () => {
    clearStudentSession();
    navigate("/student-login");
  };

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const totalQuizScore = quizScores.reduce((sum, s) => sum + Math.round((s.score / s.total) * 100), 0);
  const avgQuizScore = quizScores.length > 0 ? Math.round(totalQuizScore / quizScores.length) : 0;
  const pendingWriting = submissions.filter(s => s.score === null).length;

  const cards = [
    {
      emoji: "🎮",
      title: "Quiz Practice",
      desc: "Test your English knowledge with 5 exercise sets!",
      path: "/student/quiz",
      gradient: "linear-gradient(135deg, #667eea, #764ba2)",
      bg: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
      border: "2px solid #c4b5fd",
    },
    {
      emoji: "✍️",
      title: "English Writing",
      desc: "Write a descriptive text and submit it for your teacher to review.",
      path: "/student/writing",
      gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
      bg: "linear-gradient(135deg, #fce7f3, #fecdd3)",
      border: "2px solid #f9a8d4",
    },
    {
      emoji: "📚",
      title: "Learning Materials",
      desc: "Explore Indonesian culture through descriptive texts.",
      path: "/materials",
      gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
      bg: "linear-gradient(135deg, #e0f2fe, #bae6fd)",
      border: "2px solid #7dd3fc",
    },
  ];

  if (!student) return null;

  return (
    <div
      className="lms-page"
      style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #fce7f3 50%, #fff7e6 100%)" }}
    >
      {/* Floating blobs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: 40, left: 60, width: 200, height: 200, borderRadius: "50%", background: "rgba(99,102,241,.08)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: 80, right: 80, width: 280, height: 280, borderRadius: "50%", background: "rgba(236,72,153,.08)", filter: "blur(50px)" }} />
      </div>

      {/* Header */}
      <header style={{ position: "relative", zIndex: 10, padding: "1.25rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.8)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "1.8rem" }}>🌴</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#1e1b4b" }}>Nusa Tales</div>
            <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Student Portal</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "0.9rem", color: "#374151", fontWeight: 600 }}>Hi, {student.name.split(" ")[0]}! 👋</span>
          <button className="lms-logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main style={{ position: "relative", zIndex: 10, maxWidth: 1000, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Welcome banner */}
        <div style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)",
          borderRadius: 24,
          padding: "2rem 2.5rem",
          color: "#fff",
          marginBottom: "2rem",
          boxShadow: "0 12px 40px rgba(99,102,241,.35)",
        }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, margin: 0 }}>
            {getGreeting()}, {student.name}! 🌟
          </h1>
          <p style={{ margin: "0.5rem 0 0", opacity: 0.9, fontSize: "1rem" }}>
            Ready to explore Indonesian culture in English today?
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Exercises Done", value: quizScores.length, emoji: "🏆", color: "#6366f1" },
            { label: "Avg Quiz Score", value: quizScores.length ? `${avgQuizScore}%` : "—", emoji: "📊", color: "#8b5cf6" },
            { label: "Writings Submitted", value: submissions.length, emoji: "✍️", color: "#ec4899" },
            { label: "Pending Review", value: pendingWriting, emoji: "⏳", color: "#f59e0b" },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: "rgba(255,255,255,0.85)",
              borderRadius: 16,
              padding: "1.2rem",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,.06)",
              border: "2px solid rgba(255,255,255,0.7)",
            }}>
              <div style={{ fontSize: "1.6rem", marginBottom: 4 }}>{stat.emoji}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: "0.78rem", color: "#6b7280", fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1e1b4b", marginBottom: "1rem" }}>
          📚 Choose Your Activity
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {cards.map((card) => (
            <div
              key={card.title}
              className="lms-dash-card"
              style={{ background: card.bg, border: card.border }}
              onClick={() => navigate(card.path)}
            >
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: card.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", marginBottom: "1rem", boxShadow: "0 6px 20px rgba(0,0,0,.15)" }}>
                {card.emoji}
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#1e1b4b", margin: "0 0 0.4rem" }}>{card.title}</h3>
              <p style={{ color: "#4b5563", fontSize: "0.9rem", margin: 0 }}>{card.desc}</p>
              <div style={{ marginTop: "1rem" }}>
                <span style={{
                  display: "inline-block",
                  padding: "0.4rem 1rem",
                  borderRadius: 999,
                  background: card.gradient,
                  color: "#fff",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  boxShadow: "0 3px 10px rgba(0,0,0,.15)",
                }}>
                  Start Now →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent quiz scores */}
        {quizScores.length > 0 && (
          <div style={{ marginTop: "2.5rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#1e1b4b", marginBottom: "1rem" }}>
              🏅 My Quiz History
            </h2>
            <div style={{ background: "rgba(255,255,255,0.85)", borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,.07)" }}>
              <table className="lms-table">
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Score</th>
                    <th>Percentage</th>
                    <th>Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {quizScores.map((s) => {
                    const pct = Math.round((s.score / s.total) * 100);
                    return (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 600 }}>{s.folder.replace("folder", "Exercise ")}</td>
                        <td>{s.score}/{s.total}</td>
                        <td>
                          <span className={`lms-badge ${pct >= 70 ? "lms-badge-green" : pct >= 50 ? "lms-badge-yellow" : "lms-badge-red"}`}>
                            {pct}%
                          </span>
                        </td>
                        <td style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                          {new Date(s.completedAt).toLocaleDateString("id-ID")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
