// src/LoginPage.tsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LoginPage.css";

type LoginPageProps = {
  onLogin: (isAdmin: boolean) => void;
};

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || "/";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (mode === "login") {
      // LOGIN MODE
      if (username === "admin") {
        if (password !== "admin123") {
          setError("Wrong admin password (hint: admin123)");
          return;
        }
        onLogin(true); // admin
      } else {
        // user biasa
        onLogin(false);
      }
    } else {
      // SIGNUP MODE (simple frontend-only)
      if (password.length < 4) {
        setError("Password at least 4 characters");
        return;
      }
      if (password !== confirmPassword) {
        setError("Password and confirm password not same");
        return;
      }

      // Anggap signup berjaya -> login sebagai user biasa
      onLogin(false);
    }

    navigate(from, { replace: true });
  }

  function handleBack() {
    navigate("/");
  }

  return (
    <div className="auth-page">
      <div className="auth-overlay" />

      <button className="auth-back-btn" onClick={handleBack}>
        ← Back to menu
      </button>

      <div className="auth-card">
        <h1 className="auth-brand">My Drinks Café</h1>

        <div className="auth-toggle">
          <button
            type="button"
            className={`auth-tab ${mode === "login" ? "active" : ""}`}
            onClick={() => {
              setMode("login");
              setError("");
            }}
          >
            Login
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === "signup" ? "active" : ""}`}
            onClick={() => {
              setMode("signup");
              setError("");
            }}
          >
            Sign Up
          </button>
        </div>

        {mode === "login" && (
          <p className="auth-helper-text">
            Masuk sebagai <strong>admin</strong> guna:
            <br />
            username: <code>admin</code>, password: <code>admin123</code>.
            <br />
            Lain-lain username = user biasa.
          </p>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label className="auth-label">Username</label>
            <input
              className="auth-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              type="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {mode === "signup" && (
            <div className="auth-field">
              <label className="auth-label">Confirm Password</label>
              <input
                type="password"
                className="auth-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit-btn">
            {mode === "login" ? "Login" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
