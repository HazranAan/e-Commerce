// src/components/LoginPage.tsx
import { useState, FormEvent } from "react";
import "../styles/App.css";

interface Props {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simple check – boleh adjust kalau nak hardcode credential
    if (email.trim() && password.trim()) {
      onLogin();
    } else {
      alert("Please fill in email and password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="mb-3">Cafe Login</h2>
        <p className="text-muted mb-4">
          Please login to continue ordering your favourite drinks.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100 mt-2" type="submit">
            Login
          </button>
        </form>
        <small className="text-muted d-block mt-3">
          * Demo: any email & password will work
        </small>
      </div>
    </div>
  );
};

export default LoginPage;
