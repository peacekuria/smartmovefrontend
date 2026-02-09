import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import {
  FiUser,
  FiTruck,
  FiShield,
  FiArrowLeft,
  FiMail,
  FiLock,
} from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

export default function Login({
  role: initialRole = "client",
  onSuccess,
  onNavigate,
}) {
  const { signIn } = useContext(AuthContext);

  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRole(initialRole);
  }, [initialRole]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("❌ Email and password are required");
      return;
    }

    if (password.length < 6) {
      toast.error("❌ Password must be at least 6 characters");
      return;
    }

    if (role === "admin" && !email.endsWith("@smartmove.com")) {
      toast.error(
        "❌ Admin access requires a SmartMove admin email (@smartmove.com)",
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (email === "wrong@user.com") {
        toast.error("❌ Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }

      const user = {
        name: email.split("@")[0],
        email,
        role,
      };

      signIn(user);
      try {
        localStorage.setItem("userRole", role);
      } catch (e) {}

      const roleDisplay = role.charAt(0).toUpperCase() + role.slice(1);
      toast.success(
        `✅ Welcome ${user.name}! Logged in as ${roleDisplay}. Redirecting...`,
        {
          autoClose: 2000,
        },
      );

      setLoading(false);
      if (onSuccess) onSuccess(user);
    }, 900);
  };

  const demoLogin = (demoRole) => {
    setLoading(true);

    // Demo data for each role
    const demoProfiles = {
      client: {
        name: "Sarah Johnson",
        email: "sarah.johnson@gmail.com",
        role: "client",
        moves: 5,
        recentMove: "Nairobi → Kisumu",
      },
      mover: {
        name: "Ahmed Hassan",
        email: "ahmed.hassan@gmail.com",
        role: "mover",
        rating: 4.8,
        completedMoves: 156,
        earnings: "KES 2,450,000",
        availability: "available",
      },
      admin: {
        name: "Admin Manager",
        email: "admin@smartmove.com",
        role: "admin",
        totalMovers: 12,
        activeCompanies: 8,
        monthlyRevenue: "KES 1,245,920",
      },
    };

    setTimeout(() => {
      const demoUser = demoProfiles[demoRole];

      signIn(demoUser);

      const roleDisplay = demoRole.charAt(0).toUpperCase() + demoRole.slice(1);
      const roleMessages = {
        client:
          "👤 Explore booking moves, tracking deliveries, and managing your items",
        mover:
          "🚚 View available jobs, manage your schedule, and track earnings",
        admin:
          "⚙️ Manage movers, monitor operations, and view analytics dashboard",
      };

      toast.success(`✅ ${demoUser.name} | ${roleMessages[demoRole]}`, {
        autoClose: 2500,
      });

      setLoading(false);

      if (onSuccess) onSuccess(demoUser);
    }, 900);
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-right" autoClose={3500} />

      {/* BACK BUTTON */}
      <button
        className="login-back-btn"
        onClick={() => onNavigate && onNavigate("home")}
      >
        <FiArrowLeft /> Back
      </button>

      {/* BRAND SECTION - Simplified */}
      <div className="login-brand">
        <div className="logo-box">S</div>
        <h1>SmartMove</h1>
      </div>

      <div className="login-card">
        {/* TITLE */}
        <h2>Sign In</h2>
        <p className="subtitle">Choose your role and log in</p>

        {/* ROLE PICKER - Horizontal and compact */}
        <div className="role-tabs">
          <button
            className={`role-tab ${role === "client" ? "active" : ""}`}
            onClick={() => setRole("client")}
          >
            <FiUser /> Client
          </button>
          <button
            className={`role-tab ${role === "mover" ? "active" : ""}`}
            onClick={() => setRole("mover")}
          >
            <FiTruck /> Mover
          </button>
          <button
            className={`role-tab ${role === "admin" ? "active" : ""}`}
            onClick={() => setRole("admin")}
          >
            <FiShield /> Admin
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <label className="remember-me">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Remember me</span>
          </label>

          <button type="submit" className="btn-signin" disabled={loading}>
            {loading
              ? `Signing in...`
              : `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
          </button>
        </form>

        {/* Demo access is available from Home page role cards */}

        {/* SIGNUP LINK */}
        <p className="signup-text">
          New here?{" "}
          <span
            className="signup-link"
            onClick={() => onNavigate && onNavigate("signup")}
          >
            Create account
          </span>
        </p>
      </div>

      <p className="footer-legal">© 2026 SmartMove</p>
    </div>
  );
}
