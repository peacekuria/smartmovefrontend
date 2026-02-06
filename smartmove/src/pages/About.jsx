import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="hero-content">
          <span>Est. 2011</span>
          <h1>Moving People Forward for Over a Decade</h1>
          <p>
            We're more than just a moving company. We're your partners in
            transition, committed to making every move a positive experience.
          </p>
          <button
            className="btn-primary"
            style={{ background: "#000", color: "#fff" }}
          >
            Get Started →
          </button>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745"
            alt="Moving Truck"
          />
        </div>
      </section>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-item">
          <h2>10,000+</h2>
          <p>Moves Completed</p>
        </div>
        <div className="stat-item">
          <h2>15+</h2>
          <p>Years in Business</p>
        </div>
        <div className="stat-item">
          <h2>98%</h2>
          <p>Customer Satisfaction</p>
        </div>
        <div className="stat-item">
          <h2>200+</h2>
          <p>Team Members</p>
        </div>
      </div>

      {/* Story */}
      <section className="story-section">
        <div className="section-header">
          <span>Our Story</span>
          <p>
            SmartMove was founded in 2011 with a simple mission: to transform
            the moving industry by putting customers first.
          </p>
        </div>
        <div className="history-grid">
          <HistoryCard
            year="2011"
            title="SmartMove Founded"
            desc="Started with a single truck and a dream."
          />
          <HistoryCard
            year="2015"
            title="Regional Expansion"
            desc="Expanded to serve 5 major cities."
          />
          <HistoryCard
            year="2020"
            title="10,000 Moves"
            desc="Completed our 10,000th successful move."
          />
          <HistoryCard
            year="2024"
            title="Tech Innovation"
            desc="Launched real-time move tracking system."
          />
        </div>
      </section>

      {/* Values */}
      <h2 style={{ textAlign: "center", margin: "40px 0" }}>Our Values</h2>
      <div className="values-grid">
        <ValueCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2l2 5 5 .5-4 3 1.2 5L12 14l-4.2 1.5L9 10 5 7l5-.5L12 2z"
              />
            </svg>
          }
          title="Safety First"
          desc="Your belongings are handled with utmost care."
        />
        <ValueCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 21s-6-4-8-9a8 8 0 1116 0c-2 5-8 9-8 9z"
              />
            </svg>
          }
          title="Customer Care"
          desc="We treat every move as if it were our own."
        />
        <ValueCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4"
              />
            </svg>
          }
          title="Excellence"
          desc="Our team is trained to the highest standards."
        />
        <ValueCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3v18h18"
              />
            </svg>
          }
          title="Innovation"
          desc="We use the latest tech to make moves smooth."
        />
      </div>

      {/* Leadership */}
      <h2 style={{ textAlign: "center", margin: "40px 0" }}>
        Meet Our Leadership
      </h2>
      <div className="leadership-grid">
        <LeaderCard
          name="Jennifer Martinez"
          role="CEO & Founder"
          initial="JM"
        />
        <LeaderCard
          name="David Thompson"
          role="Operations Director"
          initial="DT"
        />
        <LeaderCard
          name="Sarah Chen"
          role="Customer Success Lead"
          initial="SC"
        />
      </div>

      {/* Trust & CTA */}
      <section className="trust-section">
        <h3>Trusted & Certified</h3>
        <p>
          Fully licensed, insured, and certified by leading industry
          organizations.
        </p>
        <div className="trust-badges">
          <span className="badge">DOT Certified</span>
          <span className="badge">BBB Accredited A+</span>
          <span className="badge">Fully Insured</span>
          <span className="badge">Licensed & Bonded</span>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Experience the SmartMove Difference?</h2>
        <p>
          Join thousands of satisfied customers who trusted us with their move.
        </p>
        <div className="cta-buttons">
          <button className="btn-primary">Get Free Quote →</button>
          <button className="btn-secondary">View Services</button>
        </div>
      </section>
    </div>
  );
}

const HistoryCard = ({ year, title, desc }) => (
  <div className="history-card">
    <h3>{year}</h3>
    <strong>{title}</strong>
    <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "8px" }}>
      {desc}
    </p>
  </div>
);

const ValueCard = ({ icon, title, desc }) => (
  <div className="value-card">
    <div style={{ fontSize: "32px", marginBottom: "16px" }}>{icon}</div>
    <h4>{title}</h4>
    <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "8px" }}>
      {desc}
    </p>
  </div>
);

const LeaderCard = ({ name, role, initial }) => (
  <div className="leader-card">
    <div className="avatar">{initial}</div>
    <h4>{name}</h4>
    <p style={{ color: "#2563eb", fontSize: "14px", marginBottom: "8px" }}>
      {role}
    </p>
    <p style={{ fontSize: "13px", color: "#6b7280" }}>
      Expert in logistics and streamlining moving processes.
    </p>
  </div>
);
