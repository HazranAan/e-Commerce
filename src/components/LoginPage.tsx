// src/components/LoginPage.tsx
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

interface Props {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please fill in email and password");
      return;
    }

    onLogin();
    navigate(-1);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h3 className="mb-3">Login / Sign Up</h3>
        <p className="text-muted mb-4">
          Please login to start ordering your favourite drinks.
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

          <button type="submit" className="btn btn-primary w-100 mt-2">
            Login / Sign Up
          </button>
        </form>

        <small className="text-muted d-block mt-3">
          * Demo only – any email & password will work.
        </small>
      </div>
    </div>
  );
};

export default LoginPage;
