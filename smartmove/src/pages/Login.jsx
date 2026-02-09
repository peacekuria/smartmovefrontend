import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { FiUser, FiTruck, FiShield } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

export default function Login({ role: initialRole = "client", onSuccess }) {
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
      toast.error("Email and password are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (role === "admin" && !email.endsWith("@smartmove.com")) {
      toast.error("Admin access requires a SmartMove admin email");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (email === "wrong@user.com") {
        toast.error("Invalid email or password");
        setLoading(false);
        return;
      }

      const user = {
        name: email.split("@")[0],
        email,
        role,
      };

      signIn(user);
      toast.success(`Signed in as ${role}`);

      setLoading(false);
      if (onSuccess) onSuccess(user);
    }, 900);
  };

  const demoLogin = (demoRole) => {
    setLoading(true);

    setTimeout(() => {
      const demoUser = {
        name: "Demo User",
        email: `${demoRole}@demo.com`,
        role: demoRole,
      };

      signIn(demoUser);
      toast.info(`Demo access: ${demoRole}`);
      setLoading(false);

      if (onSuccess) onSuccess(demoUser);
    }, 600);
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-right" autoClose={3500} />

      {/* BRAND */}
      <div className="login-logo">
        <div className="logo-box">S</div>
        <h1>SmartMove</h1>
      </div>

      <div className="login-card">
        {/* ROLE PICKER */}
        <div className="role-picker">
          <button
            className={role === "client" ? "active" : ""}
            onClick={() => setRole("client")}
          >
            <FiUser />
            Client
          </button>
          <button
            className={role === "mover" ? "active" : ""}
            onClick={() => setRole("mover")}
          >
            <FiTruck />
            Mover
          </button>
          <button
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            <FiShield />
            Admin
          </button>
        </div>

        {/* HEADER */}
        <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Login</h2>
        <p>
          {role === "client" && "Access bookings, tracking, and invoices"}
          {role === "mover" && "Manage jobs, schedules, and earnings"}
          {role === "admin" && "Oversee platform operations and approvals"}
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@smartmove.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <label className="remember-me">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>

          <button className="btn-signin" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* DEMO */}
        <div className="divider">
          <span>DEMO ACCESS</span>
        </div>

        <div className="demo-buttons">
          <button onClick={() => demoLogin("client")}>Client Demo</button>
          <button onClick={() => demoLogin("mover")}>Mover Demo</button>
          <button onClick={() => demoLogin("admin")}>Admin Demo</button>
        </div>

        <p className="signup-text">
          New to SmartMove? <span>Create an account</span>
        </p>
      </div>

      <p className="footer-legal">© SmartMove · Secure logistics platform</p>
    </div>
  );
}
