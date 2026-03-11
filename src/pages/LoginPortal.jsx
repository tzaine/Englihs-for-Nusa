import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  registerStudent,
  loginStudent,
} from "@/utils/lmsStorage";
import {
  setStudentSession,
  setTeacherSession,
  TEACHER_CREDENTIALS,
} from "@/utils/studentAuth";
import "@/styles/lms.css";

const LoginPortal = () => {
  const navigate = useNavigate();

  // "select" | "student" | "teacher"
  const [role, setRole] = useState("select");

  // student auth
  const [tab, setTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [regData, setRegData] = useState({ name: "", phone: "", email: "", password: "", confirm: "" });

  // teacher auth
  const [teacherData, setTeacherData] = useState({ username: "", password: "" });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => { setError(""); setSuccess(""); };

  // ---- STUDENT HANDLERS ----
  const handleStudentLogin = (e) => {
    e.preventDefault(); reset(); setLoading(true);
    const res = loginStudent(loginData.email, loginData.password);
    setLoading(false);
    if (!res.success) { setError(res.error); return; }
    setStudentSession(res.student);
    navigate("/student/dashboard");
  };

  const handleStudentRegister = (e) => {
    e.preventDefault(); reset();
    if (regData.password !== regData.confirm) { setError("Password tidak cocok."); return; }
    if (regData.password.length < 6) { setError("Password minimal 6 karakter."); return; }
    setLoading(true);
    const res = registerStudent({ name: regData.name, phone: regData.phone, email: regData.email, password: regData.password });
    setLoading(false);
    if (!res.success) { setError(res.error); return; }
    setSuccess("Akun berhasil dibuat! Silakan login. 🎉");
    setTab("login");
    setLoginData({ email: regData.email, password: "" });
    setRegData({ name: "", phone: "", email: "", password: "", confirm: "" });
  };

  // ---- TEACHER HANDLER ----
  const handleTeacherLogin = (e) => {
    e.preventDefault(); reset(); setLoading(true);
    setTimeout(() => {
      if (teacherData.username === TEACHER_CREDENTIALS.username && teacherData.password === TEACHER_CREDENTIALS.password) {
        setTeacherSession({ username: TEACHER_CREDENTIALS.username, name: "Teacher", role: "teacher" });
        navigate("/teacher/dashboard");
      } else {
        setError("Username atau password salah.");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div
      className="lms-page"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 40%, #f64f59 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        minHeight: "100vh",
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <span style={{ fontSize: "3rem" }}>🌴</span>
        <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "2rem", margin: "0.25rem 0 0.1rem" }}>
          Nusa Tales
        </h1>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>Selamat datang! Pilih peranmu</p>
      </div>

      {/* ============ ROLE SELECTOR ============ */}
      {role === "select" && (
        <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center", maxWidth: 620 }}>
          {/* Student Card */}
          <div
            onClick={() => { setRole("student"); reset(); }}
            style={{
              background: "rgba(255,255,255,0.95)",
              borderRadius: 24,
              padding: "2.5rem 2rem",
              textAlign: "center",
              cursor: "pointer",
              width: 260,
              boxShadow: "0 16px 50px rgba(0,0,0,.2)",
              transition: "transform .2s, box-shadow .2s",
              border: "3px solid transparent",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,.28)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 16px 50px rgba(0,0,0,.2)"; }}
          >
            <div style={{ fontSize: "4rem", marginBottom: "0.75rem" }}>🎒</div>
            <h2 style={{ fontWeight: 800, color: "#1e1b4b", fontSize: "1.4rem", margin: "0 0 0.4rem" }}>Siswa</h2>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: "0 0 1.25rem" }}>
              Akses latihan soal, kirim tulisan, dan lihat materi pelajaran
            </p>
            <span style={{ display: "inline-block", padding: "0.5rem 1.5rem", borderRadius: 999, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>
              Masuk sebagai Siswa →
            </span>
          </div>

          {/* Teacher Card */}
          <div
            onClick={() => { setRole("teacher"); reset(); }}
            style={{
              background: "rgba(255,255,255,0.95)",
              borderRadius: 24,
              padding: "2.5rem 2rem",
              textAlign: "center",
              cursor: "pointer",
              width: 260,
              boxShadow: "0 16px 50px rgba(0,0,0,.2)",
              transition: "transform .2s, box-shadow .2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,.28)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 16px 50px rgba(0,0,0,.2)"; }}
          >
            <div style={{ fontSize: "4rem", marginBottom: "0.75rem" }}>🎓</div>
            <h2 style={{ fontWeight: 800, color: "#1e1b4b", fontSize: "1.4rem", margin: "0 0 0.4rem" }}>Guru</h2>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: "0 0 1.25rem" }}>
              Koreksi tulisan siswa, lihat laporan nilai, dan kelola kelas
            </p>
            <span style={{ display: "inline-block", padding: "0.5rem 1.5rem", borderRadius: 999, background: "linear-gradient(135deg, #1e1b4b, #4338ca)", color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>
              Masuk sebagai Guru →
            </span>
          </div>
        </div>
      )}

      {/* ============ STUDENT FORM ============ */}
      {role === "student" && (
        <div className="lms-auth-card" style={{ maxWidth: 460, width: "100%" }}>
          {/* Back */}
          <button
            onClick={() => { setRole("select"); reset(); }}
            style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "0.88rem", marginBottom: "1rem", padding: 0, display: "flex", alignItems: "center", gap: 4 }}
          >
            ← Ganti peran
          </button>

          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <div style={{ fontSize: "2rem" }}>🎒</div>
            <h2 style={{ fontWeight: 800, color: "#1e1b4b", margin: "4px 0 0" }}>Portal Siswa</h2>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 8, background: "#f3f4f6", borderRadius: 14, padding: 6, marginBottom: "1.25rem" }}>
            <button className={`lms-tab-btn ${tab === "login" ? "active" : ""}`} onClick={() => { setTab("login"); reset(); }}>🔑 Login</button>
            <button className={`lms-tab-btn ${tab === "register" ? "active" : ""}`} onClick={() => { setTab("register"); reset(); }}>✨ Daftar</button>
          </div>

          {error && <div className="lms-alert lms-alert-error">{error}</div>}
          {success && <div className="lms-alert lms-alert-success">{success}</div>}

          {/* Login Form */}
          {tab === "login" && (
            <form onSubmit={handleStudentLogin}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: "#374151", fontSize: "0.9rem" }}>Email</label>
                <input className="lms-input" type="email" placeholder="your@email.com" required value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: "#374151", fontSize: "0.9rem" }}>Password</label>
                <input className="lms-input" type="password" placeholder="••••••••" required value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} />
              </div>
              <button className="lms-btn-primary" type="submit" disabled={loading}>{loading ? "Loading…" : "🚀 Login"}</button>
            </form>
          )}

          {/* Register Form */}
          {tab === "register" && (
            <form onSubmit={handleStudentRegister}>
              {[
                { label: "Nama Lengkap", key: "name", type: "text", placeholder: "Nama kamu" },
                { label: "Nomor HP", key: "phone", type: "tel", placeholder: "+62 8xx xxxx xxxx" },
                { label: "Email", key: "email", type: "email", placeholder: "your@email.com" },
                { label: "Password", key: "password", type: "password", placeholder: "Min. 6 karakter" },
                { label: "Konfirmasi Password", key: "confirm", type: "password", placeholder: "Ulangi password" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: "#374151", fontSize: "0.9rem" }}>{f.label}</label>
                  <input
                    className="lms-input"
                    type={f.type}
                    placeholder={f.placeholder}
                    required={f.key !== "phone"}
                    value={regData[f.key]}
                    onChange={e => setRegData({ ...regData, [f.key]: e.target.value })}
                  />
                </div>
              ))}
              <div style={{ marginTop: "0.5rem" }}>
                <button className="lms-btn-primary" type="submit" disabled={loading}>{loading ? "Mendaftar…" : "✨ Buat Akun"}</button>
              </div>
            </form>
          )}

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button className="lms-btn-secondary" style={{ fontSize: "0.82rem" }} onClick={() => navigate("/")}>← Kembali ke Beranda</button>
          </div>
        </div>
      )}

      {/* ============ TEACHER FORM ============ */}
      {role === "teacher" && (
        <div className="lms-auth-card" style={{ maxWidth: 400, width: "100%" }}>
          <button
            onClick={() => { setRole("select"); reset(); }}
            style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "0.88rem", marginBottom: "1rem", padding: 0 }}
          >
            ← Ganti peran
          </button>

          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "2rem" }}>🎓</div>
            <h2 style={{ fontWeight: 800, color: "#1e1b4b", margin: "4px 0 0" }}>Portal Guru</h2>
          </div>

          {error && <div className="lms-alert lms-alert-error">{error}</div>}

          <form onSubmit={handleTeacherLogin}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: "#374151", fontSize: "0.9rem" }}>Username</label>
              <input className="lms-input" type="text" placeholder="teacher" required value={teacherData.username} onChange={e => setTeacherData({ ...teacherData, username: e.target.value })} />
            </div>
            <div style={{ marginBottom: "1.75rem" }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: "#374151", fontSize: "0.9rem" }}>Password</label>
              <input className="lms-input" type="password" placeholder="••••••••" required value={teacherData.password} onChange={e => setTeacherData({ ...teacherData, password: e.target.value })} />
            </div>
            <button className="lms-btn-primary" type="submit" disabled={loading}
              style={{ background: "linear-gradient(135deg, #1e1b4b, #4338ca)" }}
            >
              {loading ? "Loading…" : "🎓 Login sebagai Guru"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button className="lms-btn-secondary" style={{ fontSize: "0.82rem" }} onClick={() => navigate("/")}>← Kembali ke Beranda</button>
          </div>
        </div>
      )}

      {/* Back to home (select screen only) */}
      {role === "select" && (
        <button
          onClick={() => navigate("/")}
          style={{ marginTop: "1.5rem", background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.4)", color: "#fff", borderRadius: 12, padding: "0.5rem 1.4rem", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer", transition: "background .2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
        >
          ← Kembali ke Beranda
        </button>
      )}
    </div>
  );
};

export default LoginPortal;
