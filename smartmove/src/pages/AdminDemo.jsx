import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import "./Demo.css";

export default function AdminDemo({ onNavigate }) {
  return (
    <div className="demo-page">
      <header className="demo-header">
        <button className="btn-back" onClick={() => onNavigate("home")}>
          <FiArrowLeft /> Back
        </button>
        <h1>What You'll Experience as an Admin</h1>
      </header>

      <div className="demo-container">
        <div className="demo-features">
          <div className="feature-showcase">
            <h2>📊 Monitor Key Metrics</h2>
            <p>
              Track revenue, active moves, customer growth, and platform
              performance in real-time.
            </p>
            <div className="showcase-box">
              <div className="stats-preview">
                <div className="stat-mini">
                  <span className="stat-number">KES 1,245,920</span>
                  <span className="stat-label">Total Revenue</span>
                </div>
                <div className="stat-mini">
                  <span className="stat-number">48</span>
                  <span className="stat-label">Active Moves</span>
                </div>
                <div className="stat-mini">
                  <span className="stat-number">1,429</span>
                  <span className="stat-label">Customers</span>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-showcase">
            <h2>🏢 Manage Companies & Movers</h2>
            <p>
              Oversee all affiliated companies, verify movers, and maintain
              service quality standards.
            </p>
            <div className="showcase-box">
              <div className="companies-preview">
                <div className="company-item-mini">
                  <span className="company-name">SwiftMove Logistics</span>
                  <span className="company-rating">⭐ 4.7</span>
                </div>
                <div className="company-item-mini">
                  <span className="company-name">Nairobi Movers Pro</span>
                  <span className="company-rating">⭐ 4.8</span>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-showcase">
            <h2>⭐ View Customer Ratings</h2>
            <p>
              Monitor customer satisfaction and identify areas for platform
              improvement.
            </p>
            <div className="showcase-box">
              <div className="ratings-preview">
                <div className="rating-stat">
                  Average Rating: <strong>4.8/5</strong>
                </div>
                <div className="rating-stat">
                  Positive Reviews: <strong>98%</strong>
                </div>
                <p className="review-sample">
                  ★★★★★ "Amazing service! Highly recommend!" - Wanjiku
                </p>
              </div>
            </div>
          </div>

          <div className="cta-section">
            <h3>Ready to manage the platform?</h3>
            <button
              className="btn-cta"
              onClick={() => onNavigate("login", { role: "admin" })}
            >
              Access Admin Panel →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
