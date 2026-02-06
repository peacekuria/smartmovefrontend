import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

export default function Login({ onSuccess }) {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const user = { name: "User", email, role: "client" };
    setTimeout(() => {
      signIn(user);
      setLoading(false);
      if (onSuccess) onSuccess();
    }, 500);
  }

  function handleSocialDemo(role = "client") {
    setLoading(true);
    setTimeout(() => {
      signIn({ name: "Demo User", email: `${role}@example.com`, role });
      setLoading(false);
      if (onSuccess) onSuccess();
    }, 400);
  }

  // simple inline SVG icons for mail/lock/github to avoid adding a new dependency
  const MailIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="input-icon"
      aria-hidden
    >
      <path
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"
        stroke="#9CA3AF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="#9CA3AF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const LockIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="input-icon"
      aria-hidden
    >
      <rect
        x="3"
        y="11"
        width="18"
        height="10"
        rx="2"
        stroke="#9CA3AF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 11V8a5 5 0 0110 0v3"
        stroke="#9CA3AF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const GithubIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.485 2 12.02c0 4.43 2.866 8.19 6.839 9.51.5.09.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.07 1.532 1.034 1.532 1.034.892 1.528 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.337-2.22-.253-4.555-1.113-4.555-4.955 0-1.093.39-1.987 1.03-2.685-.103-.254-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.56 9.56 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.295 2.748-1.025 2.748-1.025.547 1.379.203 2.396.1 2.65.64.698 1.028 1.592 1.028 2.685 0 3.852-2.339 4.699-4.566 4.946.36.31.68.92.68 1.856 0 1.338-.012 2.418-.012 2.748 0 .268.18.577.688.48A10.02 10.02 0 0022 12.02C22 6.485 17.523 2 12 2z"
      />
    </svg>
  );

  return (
    <div className="login-container">
      <div className="login-logo">
        <div
          style={{ background: "#000", padding: "8px", borderRadius: "8px" }}
        >
          <span style={{ color: "#fff", fontWeight: "bold" }}>S</span>
        </div>
        <h1>SmartMove</h1>
      </div>

      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Sign in to your account to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <MailIcon />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="password-header">
              <label>Password</label>
              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>
            <div className="input-wrapper">
              <LockIcon />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <label className="remember-me">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me for 30 days
          </label>

          <button type="submit" className="btn-signin" disabled={loading}>
            {loading ? "Please wait..." : "Sign In"}
          </button>
        </form>

        <div className="divider">
          <span>OR CONTINUE WITH</span>
        </div>

        <div className="social-group">
          <button
            className="btn-social"
            onClick={() => handleSocialDemo("google")}
          >
            <img
              src="https://www.google.com/favicon.ico"
              width="16"
              alt="Google"
            />
            Google
          </button>
          <button
            className="btn-social"
            onClick={() => handleSocialDemo("github")}
          >
            <GithubIcon />
            GitHub
          </button>
          {/* Demo Admin for local development/testing */}
          <button
            className="btn-social"
            onClick={() => handleSocialDemo("admin")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: 8 }}
            >
              <path
                d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z"
                stroke="#374151"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 20c0-4 4-6 8-6s8 2 8 6"
                stroke="#374151"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Demo Admin
          </button>
        </div>

        <p className="signup-text">
          Don't have an account?{" "}
          <span onClick={() => handleSocialDemo("client")}>Sign up</span>
        </p>
      </div>

      <p className="footer-legal">
        By signing in, you agree to our <strong>Terms of Service</strong> and{" "}
        <strong>Privacy Policy</strong>
      </p>
    </div>
  );
}
