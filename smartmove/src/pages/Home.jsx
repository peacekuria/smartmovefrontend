import React from "react";
import "./Home.css";

export default function Home({ onNavigate }) {
  return (
    <div className="home">
      {/* Navbar */}
      <header className="navbar">
        <div className="nav-left">
          <div className="logo">SmartMove</div>
          <ul className="nav-links">
            <li onClick={() => onNavigate("services")}>Services</li>
            <li onClick={() => onNavigate("about")}>About</li>
            <li onClick={() => onNavigate("inventory")}>Inventory</li>
            <li onClick={() => onNavigate("find-movers")}>Find Movers</li>
            <li onClick={() => onNavigate("booking")}>Booking</li>
            <li onClick={() => onNavigate("tracking")}>Track</li>
          </ul>
        </div>

        <div className="nav-right">
          <button className="btn-link" onClick={() => onNavigate("login")}>
            Login
          </button>
          <button className="btn-primary" onClick={() => onNavigate("signup")}>
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-logo">SmartMove</div>
          <h1>Your Stress-Free Moving Solution</h1>
          <p>
            Plan, book, track, and manage your move — whether you’re relocating,
            moving professionally, or managing operations.
          </p>

          {/* ROLE SELECTOR */}
          <div className="role-selector">
            <h3>Continue as</h3>

            <div className="role-cards">
              <div
                className="role-card"
                onClick={() => onNavigate("login-client")}
              >
                <h4>Client</h4>
                <p>Plan your move, book movers, track inventory.</p>
                <span>Get Started →</span>
              </div>

              <div
                className="role-card"
                onClick={() => onNavigate("login-mover")}
              >
                <h4>Mover</h4>
                <p>Manage jobs, update status, communicate with clients.</p>
                <span>Enter Dashboard →</span>
              </div>

              <div
                className="role-card admin"
                onClick={() => onNavigate("login-admin")}
              >
                <h4>Admin</h4>
                <p>Approve movers, monitor bookings, view analytics.</p>
                <span>Admin Access →</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="features-cards">
            <div className="feature-card">✔ Fully Insured & Licensed</div>
            <div className="feature-card">⏱ On-Time Guarantee</div>
            <div className="feature-card">💰 Transparent Pricing</div>
            <div className="feature-card">⭐ 5-Star Rated Service</div>
          </div>
        </div>

        {/* HERO IMAGE — UNTOUCHED */}
        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Modern living room"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Connect with us</p>
        <div className="social-icons">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
            alt="Instagram"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
            alt="WhatsApp"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
            alt="Facebook"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
            alt="Twitter"
          />
        </div>
      </footer>
    </div>
  );
}
