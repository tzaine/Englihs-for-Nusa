import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setTeacherSession, TEACHER_CREDENTIALS } from "@/utils/studentAuth";
import "@/styles/lms.css";

const TeacherLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (
        username.trim() === TEACHER_CREDENTIALS.username &&
        password === TEACHER_CREDENTIALS.password
      ) {
        setTeacherSession({ username: TEACHER_CREDENTIALS.username, name: "Teacher", role: "teacher" });
        navigate("/teacher/dashboard");
      } else {
        setError("Invalid credentials. Check username and password.");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div
      className="lms-page"
      style={{
        background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "3rem" }}>🎓</div>
        <h1 style={{ color: "#fff", fontWeight: 800, fontSize: "1.8rem", margin: "0.25rem 0 0.1rem" }}>
          Teacher Portal
        </h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem" }}>Nusa Tales LMS — Educator Access</p>
      </div>

      <div className="lms-auth-card">
        <h2 style={{ fontWeight: 800, color: "#1e1b4b", marginBottom: "1.5rem", textAlign: "center" }}>
          🔒 Educator Login
        </h2>

        {error && <div className="lms-alert lms-alert-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: "#374151", fontSize: "0.9rem" }}>Username</label>
            <input
              className="lms-input"
              type="text"
              placeholder="teacher"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "1.75rem" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: "#374151", fontSize: "0.9rem" }}>Password</label>
            <input
              className="lms-input"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="lms-btn-primary" type="submit" disabled={loading}
            style={{ background: "linear-gradient(135deg, #1e1b4b, #4338ca)" }}
          >
            {loading ? "Logging in…" : "🎓 Login as Teacher"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.2rem" }}>
          <button className="lms-btn-secondary" style={{ fontSize: "0.85rem" }} onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
