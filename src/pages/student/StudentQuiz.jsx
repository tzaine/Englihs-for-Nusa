import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentSession, clearStudentSession } from "@/utils/studentAuth";
import { saveQuizScore } from "@/utils/lmsStorage";
import { questionsData, folders } from "@/data/questionsData";
import "@/styles/lms.css";

const StudentQuiz = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [view, setView] = useState("folders"); // "folders" | "quiz" | "result"
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const session = getStudentSession();
    if (!session) { navigate("/student-login"); return; }
    setStudent(session);
  }, [navigate]);

  const currentQuestions = selectedFolder ? questionsData[selectedFolder] : [];
  const totalQ = currentQuestions.length;

  const startQuiz = (folderId) => {
    setSelectedFolder(folderId);
    setCurrentQ(0);
    setAnswers(new Array(questionsData[folderId].length).fill(null));
    setShowConfirmSubmit(false);
    setSaved(false);
    setView("quiz");
  };

  const handleAnswer = (idx) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < totalQ - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowConfirmSubmit(true);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const confirmSubmission = () => {
    setShowConfirmSubmit(false);
    let scoreCount = 0;
    answers.forEach((ans, idx) => {
      if (ans === currentQuestions[idx].correctAnswer) scoreCount++;
    });
    
    if (student && !saved) {
      saveQuizScore({ user_student_id: student.id, folder: selectedFolder, score: scoreCount, total: totalQ });
      setSaved(true);
    }
    setView("result");
  };

  const finalScore = answers.reduce((acc, ans, idx) => acc + (ans === currentQuestions[idx]?.correctAnswer ? 1 : 0), 0);
  const pct = totalQ > 0 ? Math.round((finalScore / totalQ) * 100) : 0;

  const getBg = () => "linear-gradient(135deg, #f0f4ff, #ede9fe, #fce7f3)";

  if (!student) return null;

  return (
    <div className="lms-page" style={{ background: getBg() }}>
      {/* Header */}
      <header style={{ padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e5e7eb" }}>
        <button
          className="lms-btn-secondary"
          onClick={() => view === "folders" ? navigate("/student/dashboard") : setView("folders")}
        >
          ← {view === "folders" ? "Dashboard" : "Back to Exercises"}
        </button>
        <span style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1rem" }}>🎮 Quiz Practice</span>
        <button className="lms-logout-btn" onClick={() => { clearStudentSession(); navigate("/student-login"); }}>Logout</button>
      </header>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* ---- FOLDERS VIEW ---- */}
        {view === "folders" && (
          <>
            <h1 style={{ fontWeight: 800, color: "#1e1b4b", textAlign: "center", marginBottom: "0.5rem" }}>Choose an Exercise 🗂️</h1>
            <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "2rem" }}>Each exercise has 10 multiple-choice questions about Indonesian culture.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              {folders.map((f) => (
                <div
                  key={f.id}
                  className="lms-dash-card"
                  style={{ textAlign: "center", background: "rgba(255,255,255,0.9)", border: "2px solid #e5e7eb" }}
                  onClick={() => startQuiz(f.id)}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{f.icon}</div>
                  <h3 style={{ fontWeight: 700, color: "#1e1b4b", margin: "0 0 0.25rem" }}>{f.name}</h3>
                  <p style={{ color: "#6b7280", fontSize: "0.85rem", margin: "0 0 1rem" }}>{f.questionCount} questions</p>
                  <span style={{ display: "inline-block", padding: "0.35rem 1rem", borderRadius: 999, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", fontSize: "0.85rem", fontWeight: 700 }}>
                    Start →
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ---- QUIZ VIEW ---- */}
        {view === "quiz" && (
          <>
            {/* Progress */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontWeight: 600, color: "#374151" }}>Question {currentQ + 1} of {totalQ}</span>
                <span style={{ color: "#6366f1", fontWeight: 600 }}>{Math.round(((currentQ) / totalQ) * 100)}%</span>
              </div>
              <div style={{ height: 8, background: "#e5e7eb", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${((currentQ) / totalQ) * 100}%`, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 999, transition: "width .4s" }} />
              </div>
            </div>

            {/* Question card */}
            <div style={{ background: "rgba(255,255,255,0.92)", borderRadius: 22, padding: "2rem", boxShadow: "0 8px 30px rgba(0,0,0,.1)", marginBottom: "1.25rem" }}>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "#1f2937", whiteSpace: "pre-line", margin: 0 }}>
                {currentQuestions[currentQ]?.question}
              </p>
            </div>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {currentQuestions[currentQ]?.options.map((opt, idx) => {
                let bg = "rgba(255,255,255,0.88)";
                let border = "2px solid #e5e7eb";
                let color = "#1f2937";
                
                if (answers[currentQ] === idx) {
                  bg = "#ede9fe"; border = "2px solid #6366f1"; color = "#4f46e5";
                }
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    style={{ padding: "1rem 1.25rem", borderRadius: 14, border, background: bg, color, fontWeight: 500, textAlign: "left", cursor: "pointer", transition: "all .15s", fontSize: "0.9rem", lineHeight: 1.5 }}
                  >
                    <span style={{ fontWeight: 700, marginRight: 8 }}>{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Nav buttons */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button className="lms-btn-secondary" onClick={handlePrev} disabled={currentQ === 0} style={{ flex: 1 }}>
                ← Previous
              </button>
              <button
                className="lms-btn-primary"
                onClick={handleNext}
                style={{ flex: 2 }}
              >
                {currentQ === totalQ - 1 ? "🏁 Finish Quiz" : "Next →"}
              </button>
            </div>

            {/* Confirm Submit Modal */}
            {showConfirmSubmit && (
              <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
                <div style={{ background: "#fff", borderRadius: 20, padding: "2.5rem", width: "100%", maxWidth: 420, textAlign: "center", boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }} className="auth-animate-in">
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e1b4b", marginBottom: "0.75rem" }}>Ready to submit? 📝</h3>
                  <p style={{ color: "#4b5563", fontSize: "0.95rem", marginBottom: "2rem", lineHeight: 1.5 }}>
                    Are you sure you want to finish and submit your answers? You can no longer change your answers once submitted.
                  </p>
                  
                  {answers.includes(null) && (
                    <div className="lms-alert lms-alert-error" style={{ marginBottom: "1.5rem" }}>
                      ⚠️ You still have unanswered questions!
                    </div>
                  )}

                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <button className="lms-btn-secondary" style={{ flex: 1 }} onClick={() => setShowConfirmSubmit(false)}>
                      Go Back
                    </button>
                    <button className="lms-btn-primary" style={{ flex: 1 }} onClick={confirmSubmission}>
                      Yes, Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ---- RESULT VIEW ---- */}
        {view === "result" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ background: "rgba(255,255,255,0.9)", borderRadius: 24, padding: "3rem 2rem", boxShadow: "0 12px 40px rgba(0,0,0,.1)" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                {pct >= 80 ? "🏆" : pct >= 60 ? "🎉" : "💪"}
              </div>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#1e1b4b" }}>
                {pct >= 80 ? "Excellent!" : pct >= 60 ? "Good Job!" : "Keep Practicing!"}
              </h2>
              <div style={{ fontSize: "3rem", fontWeight: 900, color: pct >= 70 ? "#16a34a" : pct >= 50 ? "#d97706" : "#dc2626", margin: "1rem 0" }}>
                {pct}%
              </div>
              <p style={{ color: "#374151", fontSize: "1.1rem", marginBottom: "2rem" }}>
                You got <strong>{finalScore}</strong> out of <strong>{totalQ}</strong> questions correct.
              </p>
              <p style={{ color: "#6366f1", fontWeight: 600, fontSize: "0.9rem", marginBottom: "2rem" }}>
                ✅ Score saved to your profile!
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <button className="lms-btn-secondary" onClick={() => setView("folders")}>Try Another Exercise</button>
                <button className="lms-btn-primary" style={{ width: "auto", padding: "0.85rem 2rem" }} onClick={() => navigate("/student/dashboard")}>
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentQuiz;
