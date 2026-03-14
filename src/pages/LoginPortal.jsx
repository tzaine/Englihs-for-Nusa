import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  registerStudent,
  loginStudent,
  resetStudentPassword,
} from "@/utils/lmsStorage";
import {
  setStudentSession,
  setTeacherSession,
  TEACHER_CREDENTIALS,
} from "@/utils/studentAuth";
import "@/styles/auth.css";

const LoginPortal = () => {
  const navigate = useNavigate();

  // "login" | "register" | "forgot"
  const [mode, setMode] = useState("login");
  // "student" | "teacher"
  const [role, setRole] = useState("student");

  // Captcha State
  const [captchaParams, setCaptchaParams] = useState({ n1: 0, n2: 0, sum: 0 });

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaParams({ n1: num1, n2: num2, sum: num1 + num2 });
  };

  // Student login
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  // Student register
  const [regData, setRegData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
  });
  // Student reset password
  const [resetData, setResetData] = useState({
    name: "",
    email: "",
    newPassword: "",
    confirm: "",
    captcha: "",
  });
  // Teacher login
  const [teacherData, setTeacherData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setError("");
    setSuccess("");
    if (mode !== "forgot") generateCaptcha();
  };

  // Switch mode
  const goToRegister = () => {
    setMode("register");
    reset();
  };
  const goToLogin = () => {
    setMode("login");
    reset();
  };
  const goToForgot = () => {
    setMode("forgot");
    setResetData({ name: "", email: "", newPassword: "", confirm: "", captcha: "" });
    generateCaptcha();
    reset();
  };

  // ---- STUDENT LOGIN ----
  const handleStudentLogin = (e) => {
    e.preventDefault();
    reset();
    setLoading(true);
    const res = loginStudent(loginData.email, loginData.password);
    setLoading(false);
    if (!res.success) {
      setError(res.error);
      return;
    }
    setStudentSession(res.student);
    navigate("/student/dashboard");
  };

  // ---- STUDENT REGISTER ----
  const handleStudentRegister = (e) => {
    e.preventDefault();
    reset();
    if (regData.password !== regData.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (regData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setLoading(true);
    const res = registerStudent({
      name: regData.name,
      phone: regData.phone,
      email: regData.email,
      password: regData.password,
    });
    setLoading(false);
    if (!res.success) {
      setError(res.error);
      return;
    }
    setSuccess("Account created successfully! Please log in.");
    setMode("login");
    setLoginData({ email: regData.email, password: "" });
    setRegData({ name: "", phone: "", email: "", password: "", confirm: "" });
  };

  // ---- STUDENT FORGOT PASSWORD ----
  const handleStudentReset = (e) => {
    e.preventDefault();
    reset();
    
    // Validate Captcha
    if (parseInt(resetData.captcha) !== captchaParams.sum) {
      setError(`Incorrect math answer. Please try again.`);
      generateCaptcha();
      setResetData({ ...resetData, captcha: "" });
      return;
    }

    if (resetData.newPassword !== resetData.confirm) {
      setError("New passwords do not match.");
      return;
    }

    if (resetData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    const res = resetStudentPassword(resetData.name, resetData.email, resetData.newPassword);
    setLoading(false);

    if (!res.success) {
      setError(res.error);
      generateCaptcha();
      setResetData({ ...resetData, captcha: "" });
      return;
    }

    setSuccess("Password reset successful! Please log in with your new password.");
    setMode("login");
    setLoginData({ email: resetData.email, password: "" });
    setResetData({ name: "", email: "", newPassword: "", confirm: "", captcha: "" });
  };

  // ---- TEACHER LOGIN ----
  const handleTeacherLogin = (e) => {
    e.preventDefault();
    reset();
    setLoading(true);
    setTimeout(() => {
      if (
        teacherData.username === TEACHER_CREDENTIALS.username &&
        teacherData.password === TEACHER_CREDENTIALS.password
      ) {
        setTeacherSession({
          username: TEACHER_CREDENTIALS.username,
          name: "Teacher",
          role: "teacher",
        });
        navigate("/teacher/dashboard");
      } else {
        setError("Incorrect username or password.");
      }
      setLoading(false);
    }, 400);
  };

  // Role toggle component
  const RoleToggle = () => (
    <div className="auth-role-toggle">
      <button
        type="button"
        className={`auth-role-btn ${role === "student" ? "active" : ""}`}
        onClick={() => {
          setRole("student");
          reset();
        }}
      >
        Student
      </button>
      <button
        type="button"
        className={`auth-role-btn ${role === "teacher" ? "active" : ""}`}
        onClick={() => {
          setRole("teacher");
          reset();
          if (mode === "register") setMode("login");
        }}
      >
        Teacher
      </button>
    </div>
  );

  const isRegister = mode === "register";
  const isForgot = mode === "forgot";

  return (
    <div className="auth-page">
      {/* Back to home */}
      <button className="auth-back-btn" onClick={() => navigate("/")}>
        ← Home
      </button>

      <div
        className={`auth-container ${isRegister || isForgot ? "register-active" : ""}`}
      >
        {/* ============ LOGIN FORM PANEL ============ */}
        <div className="auth-form-panel auth-login-form">
          <h1 className="auth-form-title">Log In.</h1>

          <RoleToggle />

          {error && !isRegister && (
            <div className="auth-alert auth-alert-error">{error}</div>
          )}
          {success && !isRegister && (
            <div className="auth-alert auth-alert-success">{success}</div>
          )}

          {role === "student" ? (
            <form onSubmit={handleStudentLogin} key="student-login">
              <div className="auth-input-group">
                <label>Email</label>
                <input
                  className="auth-input"
                  type="email"
                  placeholder="email@example.com"
                  required
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
              </div>
              <div className="auth-input-group">
                <label>Password</label>
                <input
                  className="auth-input"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
              </div>
              <div className="auth-form-footer">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <button type="button" onClick={goToForgot}>Forgot password?</button>
              </div>
              <button
                className="auth-submit-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? "Processing..." : "Log In"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleTeacherLogin} key="teacher-login">
              <div className="auth-input-group">
                <label>Username</label>
                <input
                  className="auth-input"
                  type="text"
                  placeholder="Teacher username"
                  required
                  value={teacherData.username}
                  onChange={(e) =>
                    setTeacherData({
                      ...teacherData,
                      username: e.target.value,
                    })
                  }
                />
              </div>
              <div className="auth-input-group">
                <label>Password</label>
                <input
                  className="auth-input"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={teacherData.password}
                  onChange={(e) =>
                    setTeacherData({
                      ...teacherData,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <button
                className="auth-submit-btn teacher"
                type="submit"
                disabled={loading}
              >
                {loading ? "Processing..." : "Log In as Teacher"}
              </button>
            </form>
          )}
        </div>

        {/* ============ OVERLAY PANEL (Image Side) ============ */}
        <div className="auth-overlay-panel">
          <div
            className="auth-overlay-bg"
            style={{ backgroundImage: "url('/nusa.png')" }}
          />
          <div className="auth-overlay-content">
            {isRegister ? (
              <>
                <h2>
                  Hello,
                  <br />
                  Friend!
                </h2>
                <p>
                  Already have an account? Log in to
                  <br />
                  continue your learning journey.
                </p>
                <button
                  className="auth-overlay-btn"
                  type="button"
                  onClick={goToLogin}
                >
                  Log In
                </button>
              </>
            ) : isForgot ? (
              <>
                <h2>
                  Forgot
                  <br />
                  Password?
                </h2>
                <p>
                  Don't worry, just enter your name and
                  <br />
                  email to reset your password.
                </p>
                <button
                  className="auth-overlay-btn"
                  type="button"
                  onClick={goToLogin}
                >
                  Back to Log In
                </button>
              </>
            ) : (
              <>
                <h2>
                  Start Your
                  <br />
                  Journey
                </h2>
                <p>
                  Don't have an account? Sign up now
                  <br />
                  and start learning with us.
                </p>
                {role === "student" && (
                  <button
                    className="auth-overlay-btn"
                    type="button"
                    onClick={goToRegister}
                  >
                    Sign Up
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* ============ REGISTER / FORGOT FORM PANEL ============ */}
        <div className="auth-form-panel auth-register-form">
          <h1 className="auth-form-title">{isForgot ? "Reset Password." : "Sign Up."}</h1>

          {error && (isRegister || isForgot) && (
            <div className="auth-alert auth-alert-error">{error}</div>
          )}

          {isForgot ? (
            <form onSubmit={handleStudentReset}>
              <div className="auth-input-group">
                <label>Full Name (Account Name)</label>
                <input
                  className="auth-input"
                  type="text"
                  placeholder="Exact name used during registration"
                  required
                  value={resetData.name}
                  onChange={(e) =>
                    setResetData({ ...resetData, name: e.target.value })
                  }
                />
              </div>
              <div className="auth-input-group">
                <label>Registered Email</label>
                <input
                  className="auth-input"
                  type="email"
                  placeholder="email@example.com"
                  required
                  value={resetData.email}
                  onChange={(e) =>
                    setResetData({ ...resetData, email: e.target.value })
                  }
                />
              </div>
              <div className="auth-input-group">
                <label>New Password</label>
                <input
                  className="auth-input"
                  type="password"
                  placeholder="Min. 6 characters"
                  required
                  value={resetData.newPassword}
                  onChange={(e) =>
                    setResetData({ ...resetData, newPassword: e.target.value })
                  }
                />
              </div>
              <div className="auth-input-group">
                <label>Confirm New Password</label>
                <input
                  className="auth-input"
                  type="password"
                  placeholder="Repeat password"
                  required
                  value={resetData.confirm}
                  onChange={(e) =>
                    setResetData({ ...resetData, confirm: e.target.value })
                  }
                />
              </div>
              <div className="auth-input-group" style={{ background: "#f8fafc", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "10px" }}>
                <label style={{ color: "#334155" }}>Security (Verification)</label>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
                  <span style={{ fontWeight: 800, fontSize: "1.1rem", background: "#cbd5e1", padding: "4px 12px", borderRadius: "6px", letterSpacing: "1px" }}>
                    {captchaParams.n1} + {captchaParams.n2} = ?
                  </span>
                  <input
                    className="auth-input"
                    type="number"
                    placeholder="Result"
                    style={{ flex: 1, padding: "8px", background: "#fff", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                    required
                    value={resetData.captcha}
                    onChange={(e) =>
                      setResetData({ ...resetData, captcha: e.target.value })
                    }
                  />
                </div>
              </div>
              <button
                className="auth-submit-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : "Reset Password"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleStudentRegister}>
              <div className="auth-input-group">
                <label>Full Name</label>
                <input
                  className="auth-input"
                  type="text"
                  placeholder="Your name"
                  required
                  value={regData.name}
                  onChange={(e) =>
                    setRegData({ ...regData, name: e.target.value })
                  }
                />
              </div>
              <div className="auth-input-group">
                <label>Email</label>
                <input
                  className="auth-input"
                  type="email"
                  placeholder="email@example.com"
                  required
                  value={regData.email}
                  onChange={(e) =>
                    setRegData({ ...regData, email: e.target.value })
                  }
                />
              </div>
              <div className="auth-input-group">
                <label>Password</label>
                <input
                  className="auth-input"
                  type="password"
                  placeholder="Min. 6 characters"
                  required
                  value={regData.password}
                  onChange={(e) =>
                    setRegData({ ...regData, password: e.target.value })
                  }
                />
              </div>
              <div className="auth-input-group">
                <label>Confirm Password</label>
                <input
                  className="auth-input"
                  type="password"
                  placeholder="Repeat password"
                  required
                  value={regData.confirm}
                  onChange={(e) =>
                    setRegData({ ...regData, confirm: e.target.value })
                  }
                />
              </div>
              <button
                className="auth-submit-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPortal;
