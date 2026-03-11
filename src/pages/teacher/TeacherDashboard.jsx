import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTeacherSession, clearTeacherSession } from "@/utils/studentAuth";
import { getStudents, getSubmissions, getQuizScores } from "@/utils/lmsStorage";
import "@/styles/lms.css";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [stats, setStats] = useState({ students: 0, submissions: 0, pending: 0, quizAttempts: 0 });

  useEffect(() => {
    const session = getTeacherSession();
    if (!session) { navigate("/teacher-login"); return; }
    setTeacher(session);
    const students = getStudents();
    const submissions = getSubmissions();
    const quizScores = getQuizScores();
    setStats({
      students: students.length,
      submissions: submissions.length,
      pending: submissions.filter(s => s.score === null).length,
      quizAttempts: quizScores.length,
    });
  }, [navigate]);

  const handleLogout = () => {
    clearTeacherSession();
    navigate("/teacher-login");
  };

  const navCards = [
    {
      emoji: "📋",
      title: "Correct Submissions",
      desc: "Read student writing and give scores & feedback.",
      path: "/teacher/corrections",
      gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
      bg: "#fff0f6",
      border: "2px solid #f9a8d4",
      badge: stats.pending > 0 ? `${stats.pending} pending` : null,
      badgeColor: "#dc2626",
    },
    {
      emoji: "📊",
      title: "Score Report",
      desc: "View combined quiz & writing scores for all students.",
      path: "/teacher/report",
      gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
      bg: "#eff6ff",
      border: "2px solid #7dd3fc",
      badge: null,
    },
    {
      emoji: "📚",
      title: "Learning Materials",
      desc: "Access the learning materials used in class.",
      path: "/materials",
      gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
      bg: "#f0fdf4",
      border: "2px solid #86efac",
      badge: null,
    },
  ];

  if (!teacher) return null;

  return (
    <div className="lms-page" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4338ca 60%, #6366f1 100%)", minHeight: "100vh" }}>
      {/* Floating decorations */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,.04)" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,.03)" }} />
      </div>

      {/* Header */}
      <header style={{ position: "relative", zIndex: 10, padding: "1.25rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,.25)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: "1.8rem" }}>🎓</span>
          <div>
            <div style={{ fontWeight: 800, color: "#fff", fontSize: "1.1rem" }}>Teacher Dashboard</div>
            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,.65)" }}>Nusa Tales LMS</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "rgba(255,255,255,.85)", fontSize: "0.9rem", fontWeight: 600 }}>Welcome, Teacher 👋</span>
          <button className="lms-logout-btn" onClick={handleLogout} style={{ background: "rgba(255,255,255,.1)", borderColor: "rgba(255,255,255,.3)", color: "#fff" }}>Logout</button>
        </div>
      </header>

      <main style={{ position: "relative", zIndex: 10, maxWidth: 1000, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
          {[
            { emoji: "👥", label: "Total Students", value: stats.students, color: "#a5f3fc" },
            { emoji: "✍️", label: "Writing Submissions", value: stats.submissions, color: "#fde68a" },
            { emoji: "⏳", label: "Pending Corrections", value: stats.pending, color: stats.pending > 0 ? "#fca5a5" : "#a5f3fc" },
            { emoji: "🎮", label: "Quiz Attempts", value: stats.quizAttempts, color: "#c4b5fd" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,.12)",
              border: "1px solid rgba(255,255,255,.2)",
              backdropFilter: "blur(10px)",
              borderRadius: 18,
              padding: "1.5rem 1.25rem",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 6 }}>{s.emoji}</div>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,.75)", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation cards */}
        <h2 style={{ color: "rgba(255,255,255,.9)", fontWeight: 700, marginBottom: "1rem", fontSize: "1.2rem" }}>📌 Quick Actions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {navCards.map((card) => (
            <div
              key={card.title}
              style={{ background: card.bg, border: card.border, borderRadius: 22, padding: "1.75rem", cursor: "pointer", transition: "transform .3s, box-shadow .3s", boxShadow: "0 8px 30px rgba(0,0,0,.15)", position: "relative" }}
              className="lms-dash-card"
              onClick={() => navigate(card.path)}
            >
              {card.badge && (
                <span style={{
                  position: "absolute", top: 14, right: 14,
                  background: card.badgeColor, color: "#fff",
                  padding: "2px 10px", borderRadius: 999, fontSize: "0.75rem", fontWeight: 700
                }}>{card.badge}</span>
              )}
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: card.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "0.9rem", boxShadow: "0 6px 20px rgba(0,0,0,.15)" }}>
                {card.emoji}
              </div>
              <h3 style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1.1rem", margin: "0 0 0.3rem" }}>{card.title}</h3>
              <p style={{ color: "#4b5563", fontSize: "0.88rem", margin: 0 }}>{card.desc}</p>
              <div style={{ marginTop: "0.9rem" }}>
                <span style={{ padding: "0.35rem 1rem", borderRadius: 999, background: card.gradient, color: "#fff", fontSize: "0.82rem", fontWeight: 700 }}>
                  Open →
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
