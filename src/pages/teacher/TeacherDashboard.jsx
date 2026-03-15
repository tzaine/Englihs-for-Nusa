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
          <span style={{ color: "#374151", fontSize: "0.9rem", fontWeight: 600 }}>Welcome, Teacher </span>
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
            Good Day, Teacher! 
          </h1>
          <p style={{ margin: "0.5rem 0 0", opacity: 0.9, fontSize: "1rem" }}>
            Ready to review your students' progress today?
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
          {[
            { emoji: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: "1em", height: "1em", color: "#8b5cf6" }}><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" /></svg>, label: "Total Students", value: stats.students, color: "#8b5cf6" },
            { emoji: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" style={{ width: "1em", height: "1em", color: "#f59e0b" }} viewBox="0 0 64 64"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g data-name="05_Note Book" id="_05_Note_Book"> <path d="M57,52H3a1,1,0,0,1-1-1V18a1,1,0,0,1,1-1H57a1,1,0,0,1,1,1V51A1,1,0,0,1,57,52Z" fill="#0455bf"></path> <path d="M53,12H38.24A19.148,19.148,0,0,0,31,13.43c-.35.13-.7.29-1.04.45q-.465-.225-.96-.42A19.111,19.111,0,0,0,21.69,12H7a1,1,0,0,0-1,1V47a1,1,0,0,0,1,1H21.69A16.949,16.949,0,0,1,29,49.65q.255.1.51.24a1.03,1.03,0,0,0,.45.11.988.988,0,0,0,.45-.1l.21-.11c.12-.06.25-.12.38-.17A17.119,17.119,0,0,1,38.24,48H53a1,1,0,0,0,1-1V13A1,1,0,0,0,53,12Z" fill="#fdfeff"></path> <path d="M31.515,51.579A15.179,15.179,0,0,1,38.237,50H53a3,3,0,0,0,3-3V17H55V47a2,2,0,0,1-2,2H38.237a16.183,16.183,0,0,0-7.168,1.684l-.216.107a2,2,0,0,1-1.8-.012A16.173,16.173,0,0,0,21.692,49H7a2,2,0,0,1-2-2V17H4V47a3,3,0,0,0,3,3H21.692a15.163,15.163,0,0,1,6.9,1.669A3.02,3.02,0,0,0,29.963,52a2.984,2.984,0,0,0,1.334-.313Z" fill="#c3d6dd"></path> <path d="M57,17h-.777L56,17.223V26.07l2-2V18A1,1,0,0,0,57,17Z" fill="#004787"></path> <path d="M54,47a1,1,0,0,1-1,1H38.237a17.189,17.189,0,0,0-7.613,1.788l-.216.107a.993.993,0,0,1-.445.1,1.006,1.006,0,0,1-.457-.11A17.164,17.164,0,0,0,21.692,48H7a1,1,0,0,1-1-1V15H5V47a2,2,0,0,0,2,2H21.692a16.173,16.173,0,0,1,7.357,1.779,2,2,0,0,0,1.8.012l.216-.107A16.183,16.183,0,0,1,38.237,49H53a2,2,0,0,0,2-2V15H54Z" fill="#dfeaef"></path> <path d="M16,24a1,1,0,0,1-.555-.168L13,22.2l-2.445,1.63A1,1,0,0,1,9,23V12h8V23a1,1,0,0,1-1,1Z" fill="#d6e8f2"></path> <path d="M17,23a1,1,0,0,1-.555-.168L14,21.2l-2.445,1.63A1,1,0,0,1,10,22V12h8V22a1,1,0,0,1-1,1Z" fill="#f74e0c"></path> <path d="M12,22V12H10V22a1,1,0,0,0,1.555.832l.563-.375A.986.986,0,0,1,12,22Z" fill="#e03a07"></path> <rect height="2" fill="#d6e8f2" width="15" x="34" y="37"></rect> <rect height="2" fill="#d6e8f2" width="13" x="36" y="41"></rect> <rect height="2" fill="#d6e8f2" width="15" x="11" y="37"></rect> <rect height="2" fill="#d6e8f2" width="15" x="11" y="33"></rect> <rect height="2" fill="#d6e8f2" width="15" x="11" y="29"></rect> <rect height="2" fill="#d6e8f2" width="7" x="11" y="41"></rect> <rect height="2" fill="#d6e8f2" width="2" x="24" y="41"></rect> <rect height="2" fill="#d6e8f2" width="2" x="20" y="41"></rect> <path d="M31,13.43V49.62c-.13.05-.26.11-.38.17l-.21.11a.988.988,0,0,1-.45.1,1.03,1.03,0,0,1-.45-.11q-.255-.135-.51-.24V13.46q.495.195.96.42C30.3,13.72,30.65,13.56,31,13.43Z" fill="#f0f4f7"></path> <polygon points="43.366 29.857 42.629 33.543 42.146 35.5 44.103 35.018 47.79 34.28 55 27.07 55 18.223 43.366 29.857" fill="#e2e8ed"></polygon> <polygon points="54 28.07 55 27.07 55 18.223 54 19.223 54 28.07" fill="#abcad8"></polygon> <polygon points="55 27.07 56 26.07 56 17.223 55 18.223 55 27.07" fill="#8db7c6"></polygon> <path d="M60.061,20.009l-4.424-4.424,1.475-1.474a2.084,2.084,0,0,1,2.949,0l1.475,1.474a2.087,2.087,0,0,1,0,2.95Z" fill="#f74e0c"></path> <path d="M60.8,14.848l-.737-.737a2.084,2.084,0,0,0-2.949,0l-1.475,1.474.738.738,1.474-1.475A2.086,2.086,0,0,1,60.8,14.848Z" fill="#cc2600"></path> <rect height="6.256" fill="#f74e0c" transform="translate(-3.014 43.064) rotate(-45)" width="16.683" x="42.135" y="22.042"></rect> <rect height="2.085" fill="#febc00" transform="translate(-3.014 43.064) rotate(-45)" width="16.683" x="42.135" y="24.128"></rect> <rect height="2.085" fill="#f74e0c" transform="translate(-2.403 41.59) rotate(-45)" width="16.683" x="40.66" y="22.653"></rect> <rect height="6.256" fill="#dfeaef" transform="translate(3.99 45.966) rotate(-45)" width="3.128" x="55.917" y="15.038"></rect> <path d="M57.112,18.535a2.085,2.085,0,0,1,0-2.95h0l-.737-.737L54.163,17.06l4.423,4.424.738-.738Z" fill="#c3d6dd"></path> <polygon points="43.103 34.018 41.629 32.543 42.366 28.857 46.79 33.28 43.103 34.018" fill="#f7d694"></polygon> <polygon points="41.629 32.543 41.146 34.5 43.103 34.018 41.629 32.543" fill="#f74e0c"></polygon> </g> </g></svg>, label: "Writing Submissions", value: stats.submissions, color: "#f59e0b" },
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <div style={{ fontSize: "2.2rem", height: "50px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 6 }}>{s.emoji}</div>
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
