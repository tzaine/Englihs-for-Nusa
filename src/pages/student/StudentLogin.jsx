import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerStudent, loginStudent } from "@/utils/lmsStorage";
import { setStudentSession } from "@/utils/studentAuth";
import "@/styles/lms.css";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login"); // "login" | "register"
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  // Register form state
  const [regData, setRegData] = useState({ name: "", phone: "", email: "", password: "", confirm: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = loginStudent(loginData.email, loginData.password);
    setLoading(false);
    if (!result.success) { setError(result.error); return; }
    setStudentSession(result.student);
    navigate("/student/dashboard");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (regData.password !== regData.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (regData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    const result = registerStudent({
      name: regData.name,
      phone: regData.phone,
      email: regData.email,
      password: regData.password,
    });
    setLoading(false);
    if (!result.success) { setError(result.error); return; }
    setSuccess("Account created! You can now log in. 🎉");
    setTab("login");
    setLoginData({ email: regData.email, password: "" });
    setRegData({ name: "", phone: "", email: "", password: "", confirm: "" });
  };

  return (
    <div
      className="lms-page"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f64f59 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "3rem" }}>🌴</div>
        <h1 style={{ color: "#fff", fontWeight: 800, fontSize: "1.8rem", margin: "0.25rem 0 0.1rem" }}>
          Nusa Tales
        </h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem" }}>Student Learning Portal</p>
      </div>

      <div className="lms-auth-card">
        {/* Tab switcher */}
        <div style={{ display: "flex", gap: "8px", borderRadius: "14px", background: "#f3f4f6", padding: "6px", marginBottom: "1.5rem" }}>
          <button className={`lms-tab-btn ${tab === "login" ? "active" : ""}`} onClick={() => { setTab("login"); setError(""); setSuccess(""); }}>
            🔑 Login
          </button>
          <button className={`lms-tab-btn ${tab === "register" ? "active" : ""}`} onClick={() => { setTab("register"); setError(""); setSuccess(""); }}>
            ✨ Register
          </button>
        </div>

        {error && <div className="lms-alert lms-alert-error">{error}</div>}
        {success && <div className="lms-alert lms-alert-success">{success}</div>}

        {/* LOGIN FORM */}
        {tab === "login" && (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", color: "#374151", fontSize: "0.9rem" }}>Email</label>
              <input
                className="lms-input"
                type="email"
                placeholder="your@email.com"
                required
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", color: "#374151", fontSize: "0.9rem" }}>Password</label>
              <input
                className="lms-input"
                type="password"
                placeholder="••••••••"
                required
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
            </div>
            <button className="lms-btn-primary" type="submit" disabled={loading}>
              {loading ? "Logging in…" : "🚀 Login"}
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {tab === "register" && (
          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", color: "#374151", fontSize: "0.9rem" }}>Full Name</label>
              <input
                className="lms-input"
                type="text"
                placeholder="Your full name"
                required
                value={regData.name}
                onChange={(e) => setRegData({ ...regData, name: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", color: "#374151", fontSize: "0.9rem" }}>Phone Number</label>
              <input
                className="lms-input"
                type="tel"
                placeholder="+62 8xx xxxx xxxx"
                value={regData.phone}
                onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", color: "#374151", fontSize: "0.9rem" }}>Email</label>
              <input
                className="lms-input"
                type="email"
                placeholder="your@email.com"
                required
                value={regData.email}
                onChange={(e) => setRegData({ ...regData, email: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", color: "#374151", fontSize: "0.9rem" }}>Password</label>
              <input
                className="lms-input"
                type="password"
                placeholder="Min. 6 characters"
                required
                value={regData.password}
                onChange={(e) => setRegData({ ...regData, password: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", color: "#374151", fontSize: "0.9rem" }}>Confirm Password</label>
              <input
                className="lms-input"
                type="password"
                placeholder="Repeat password"
                required
                value={regData.confirm}
                onChange={(e) => setRegData({ ...regData, confirm: e.target.value })}
              />
            </div>
            <button className="lms-btn-primary" type="submit" disabled={loading}>
              {loading ? "Creating account…" : "✨ Create Account"}
            </button>
          </form>
        )}

        {/* Back to home */}
        <div style={{ textAlign: "center", marginTop: "1.2rem" }}>
          <button
            className="lms-btn-secondary"
            style={{ fontSize: "0.85rem" }}
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
