import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import "./Demo.css";

export default function ClientDemo({ onNavigate }) {
  return (
    <div className="demo-page">
      <header className="demo-header">
        <button className="btn-back" onClick={() => onNavigate("home")}>
          <FiArrowLeft /> Back
        </button>
        <h1>What You'll Experience as a Client</h1>
      </header>

      <div className="demo-container">
        <div className="demo-features">
          <div className="feature-showcase">
            <h2>🔍 Search & Book Movers</h2>
            <p>
              Find verified movers in your area, compare prices and ratings,
              then book with confidence.
            </p>
            <div className="showcase-box">
              <div className="mini-form">
                <input
                  type="text"
                  placeholder="From: Karen, Nairobi"
                  readOnly
                />
                <input
                  type="text"
                  placeholder="To: Riat Hills, Kisumu"
                  readOnly
                />
                <div className="results-mini">
                  <span>⭐ 4.7 - SwiftMove Logistics - KES 125,000</span>
                  <span>⭐ 4.8 - Nairobi Movers Pro - KES 135,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-showcase">
            <h2>📍 Track Moves in Real-Time</h2>
            <p>
              See exactly where your movers are and get live updates throughout
              your moving day.
            </p>
            <div className="showcase-box">
              <div className="status-preview">
                <div className="status-step done">✓ Pickup Completed</div>
                <div className="status-step active">→ In Transit</div>
                <div className="status-step pending">○ Delivery</div>
              </div>
              <p className="status-text">Ahmed Hassan is 30 min away</p>
            </div>
          </div>

          <div className="feature-showcase">
            <h2>📦 Manage Your Inventory</h2>
            <p>
              Organize your items and track them as they're packed, transported,
              and delivered.
            </p>
            <div className="showcase-box">
              <ul className="inventory-preview">
                <li>✓ Bedroom Items - Packed</li>
                <li>→ Living Room - In Transit</li>
                <li>○ Kitchen - Pending</li>
              </ul>
            </div>
          </div>

          <div className="cta-section">
            <h3>Ready to book your move?</h3>
            <button
              className="btn-cta"
              onClick={() => onNavigate("login", { role: "client" })}
            >
              Get Started as a Client →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
