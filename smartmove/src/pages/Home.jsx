import React from "react";
import "./Home.css";

export default function Home({ onNavigate }) {
  return (
    <div className="home">
      {/* Header is rendered globally by the app; page content below */}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <span className="trust-badge">Trusted by 10,000+ customers</span>

          <h1>Your Stress-Free Moving Solution</h1>

          <p>
            Professional moving services that make relocation simple, safe, and
            affordable. Get your free quote in minutes.
          </p>

          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => onNavigate("booking")}
            >
              Get Free Quote →
            </button>
            <button
              className="btn-secondary"
              onClick={() => onNavigate("movers")}
            >
              View Services
            </button>
          </div>

          <div className="features">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Fully Insured & Licensed
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3"
                />
              </svg>
              On-Time Guarantee
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7h18M3 12h18M3 17h18"
                />
              </svg>
              Transparent Pricing
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6l2 4 4 .5-3 2 1 4-4-2-4 2 1-4-3-2L10 10 12 6z"
                />
              </svg>
              5-Star Rated Service
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Modern living room"
          />
        </div>
      </section>
    </div>
  );
}
