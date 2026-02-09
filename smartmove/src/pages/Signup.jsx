import React, { useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCheck } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

export default function Signup({ onSuccess, onNavigate }) {
  const { signIn } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!firstName || !lastName) {
      toast.error("❌ Please enter both first and last name");
      return;
    }

    if (!email) {
      toast.error("❌ Email address is required");
      return;
    }

    if (!password) {
      toast.error("❌ Password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("❌ Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("❌ Passwords do not match");
      return;
    }

    if (!agree) {
      toast.error("❌ Please accept the terms and conditions");
      return;
    }

    setLoading(true);
    const user = {
      name: `${firstName} ${lastName}`.trim(),
      email,
      role: "client",
    };
    setTimeout(() => {
      signIn(user);
      setLoading(false);
      toast.success(
        `✅ Welcome ${firstName}! Account created successfully. Redirecting...`,
        { autoClose: 2000 },
      );
      if (onSuccess) onSuccess(user);
    }, 900);
  }

  return (
    <div className="signup-container">
      <ToastContainer position="top-right" autoClose={3500} />

      {/* BACK BUTTON */}
      <button
        className="signup-back-btn"
        onClick={() => onNavigate && onNavigate("login")}
        title="Back to login"
      >
        <FiArrowLeft /> Back to Login
      </button>

      {/* BRAND */}
      <div className="signup-logo">
        <div className="logo-box-signup">S</div>
        <h1>SmartMove</h1>
        <p className="tagline">Join thousands of movers and clients</p>
      </div>

      <div className="signup-card">
        <div className="signup-intro">
          <h2>Create Your Account</h2>
          <p>Get started with SmartMove today - it takes less than a minute</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          {/* NAME FIELDS */}
          <div className="name-grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>
            <p className="password-hint">Must be at least 6 characters</p>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* TERMS CHECKBOX */}
          <label className="terms-label">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>
              I agree to the <strong>Terms of Service</strong> and{" "}
              <strong>Privacy Policy</strong>
            </span>
          </label>

          {/* SUBMIT BUTTON */}
          <button type="submit" className="btn-create" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="login-link">
          Already have an account?{" "}
          <span
            className="login-link-text"
            onClick={() => onNavigate && onNavigate("login")}
          >
            Sign in
          </span>
        </p>
      </div>

      <p className="footer-legal-signup">
        © 2026 SmartMove · Secure Logistics Platform
      </p>
    </div>
  );
}
