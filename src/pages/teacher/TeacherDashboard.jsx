import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTeacherSession, clearTeacherSession } from "@/utils/studentAuth";
import { getStudents, getSubmissions, getQuizScores } from "@/utils/lmsStorage";
import NusaSpeaking from "@/components/NusaSpeaking";
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
    <div className="lms-page" style={{ background: "linear-gradient(135deg, #fdf4ff 0%, #fffbeb 50%, #faf5ff 100%)", minHeight: "100vh" }}>
      {/* Floating decorations */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: 40, left: 60, width: 250, height: 250, borderRadius: "50%", background: "rgba(139,92,246,.08)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: 80, right: 80, width: 300, height: 300, borderRadius: "50%", background: "rgba(245,158,11,.08)", filter: "blur(50px)" }} />
      </div>

      {/* Header */}
      <header style={{ position: "relative", zIndex: 10, padding: "1.25rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.8)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: "1.8rem" }}>🎓</span>
          <div>
            <div style={{ fontWeight: 800, color: "#1e1b4b", fontSize: "1.1rem" }}>Nusa Tales</div>
            <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Teacher Portal</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "#374151", fontSize: "0.9rem", fontWeight: 600 }}>Welcome, Teacher 👋</span>
          <button className="lms-logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main style={{ position: "relative", zIndex: 10, maxWidth: 1000, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Welcome banner */}
        <div style={{
          background: "linear-gradient(135deg, #8b5cf6, #d946ef, #f59e0b)",
          borderRadius: 24,
          padding: "2rem 2.5rem",
          color: "#fff",
          marginBottom: "2rem",
          boxShadow: "0 12px 40px rgba(139,92,246,.3)",
        }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, margin: 0 }}>
            Good Day, Teacher! 🌟
          </h1>
          <p style={{ margin: "0.5rem 0 0", opacity: 0.9, fontSize: "1rem" }}>
            Ready to review your students' progress today?
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
          {[
            { emoji: "👥", label: "Total Students", value: stats.students, color: "#8b5cf6" },
            { emoji: "✍️", label: "Writing Submissions", value: stats.submissions, color: "#f59e0b" },
            { emoji: "⏳", label: "Pending Corrections", value: stats.pending, color: stats.pending > 0 ? "#ef4444" : "#10b981" },
            { emoji: "🎮", label: "Quiz Attempts", value: stats.quizAttempts, color: "#d946ef" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,0.85)",
              border: "2px solid rgba(255,255,255,0.7)",
              boxShadow: "0 4px 20px rgba(0,0,0,.06)",
              borderRadius: 18,
              padding: "1.5rem 1.25rem",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 6 }}>{s.emoji}</div>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: "0.78rem", color: "#6b7280", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation cards */}
        <h2 style={{ color: "#1e1b4b", fontWeight: 700, marginBottom: "1rem", fontSize: "1.3rem" }}>📌 Quick Actions</h2>
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
                  padding: "4px 12px", borderRadius: 999, fontSize: "0.75rem", fontWeight: 700,
                  boxShadow: "0 2px 8px rgba(0,0,0,.2)"
                }}>{card.badge}</span>
              )}
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: card.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", marginBottom: "1rem", boxShadow: "0 6px 20px rgba(0,0,0,.15)" }}>
                {card.emoji}
              </div>
              <h3 style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1.2rem", margin: "0 0 0.4rem" }}>{card.title}</h3>
              <p style={{ color: "#4b5563", fontSize: "0.9rem", margin: 0 }}>{card.desc}</p>
              <div style={{ marginTop: "1rem" }}>
                <span style={{ padding: "0.4rem 1rem", borderRadius: 999, background: card.gradient, color: "#fff", fontSize: "0.85rem", fontWeight: 700, boxShadow: "0 3px 10px rgba(0,0,0,.15)" }}>
                  Open →
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Floating chatbot for teacher */}
      <NusaSpeaking role="teacher" />
    </div>
  );
};

export default TeacherDashboard;
