import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import "./Demo.css";

export default function MoverDemo({ onNavigate }) {
  return (
    <div className="demo-page">
      <header className="demo-header">
        <button className="btn-back" onClick={() => onNavigate("home")}>
          <FiArrowLeft /> Back
        </button>
        <h1>What You'll Experience as a Mover</h1>
      </header>

      <div className="demo-container">
        <div className="demo-features">
          <div className="feature-showcase">
            <h2>💼 Accept Lucrative Jobs</h2>
            <p>
              Get notifications for jobs in your area, see pricing upfront, and
              accept what works for you.
            </p>
            <div className="showcase-box">
              <div className="jobs-preview">
                <div className="job-preview">
                  <span className="job-title">Karen → Riat Hills</span>
                  <span className="job-price">KES 125,000</span>
                </div>
                <div className="job-preview">
                  <span className="job-title">Westlands → Bahati</span>
                  <span className="job-price">KES 95,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-showcase">
            <h2>💬 Direct Client Communication</h2>
            <p>
              Chat with clients in real-time, share updates, and build strong
              working relationships.
            </p>
            <div className="showcase-box">
              <div className="chat-preview">
                <div className="chat-msg received">When will you arrive?</div>
                <div className="chat-msg sent">15 minutes away</div>
              </div>
            </div>
          </div>

          <div className="feature-showcase">
            <h2>💰 Track Earnings & Build Reputation</h2>
            <p>
              Monitor your income, see completed moves, and build your 5-star
              rating.
            </p>
            <div className="showcase-box">
              <ul className="earnings-preview">
                <li>
                  Total Earned: <strong>KES 156,300</strong>
                </li>
                <li>
                  Completed Moves: <strong>156</strong>
                </li>
                <li>
                  Rating: <strong>4.8 ★</strong>
                </li>
              </ul>
            </div>
          </div>

          <div className="cta-section">
            <h3>Ready to grow your moving business?</h3>
            <button
              className="btn-cta"
              onClick={() => onNavigate("login", { role: "mover" })}
            >
              Get Started as a Mover →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
