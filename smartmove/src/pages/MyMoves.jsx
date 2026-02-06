import React from 'react';
import './MyMoves.css';

export default function MyMoves({ onNavigate }) {
  const steps = [
    { label: "Quote Requested", date: "Jan 15, 2026", status: "completed" },
    { label: "Quote Approved", date: "Jan 16, 2026", status: "completed" },
    { label: "Move Scheduled", date: "Jan 18, 2026", status: "completed" },
    { label: "Packing Day", date: "Pending", status: "upcoming" },
    { label: "Moving Day", date: "Pending", status: "upcoming" },
    { label: "Move Completed", date: "Pending", status: "upcoming" },
  ];

  return (
    <div className="my-moves">
      <header className="moves-header">
        <h1>My Moves</h1>
        <p>Track and manage your moving requests</p>
        
        <div className="header-actions">
          <div className="tabs">
            <button className="tab active">Upcoming Moves (1)</button>
            <button className="tab">Past Moves (1)</button>
          </div>
          <button className="btn-new-quote" onClick={() => onNavigate && onNavigate('booking')}>+ New Quote Request</button>
        </div>
      </header>

      <main className="move-card">
        <div className="move-card-header">
          <div className="move-id-group">
            <h2>Move ID: MV-2026-001 <span className="status-badge">Scheduled</span></h2>
            <p className="service-tag">Inter-City Move</p>
          </div>
          <div className="cost-group">
            <span className="cost-label">Estimated Cost</span>
            <span className="cost-amount">KES 89,900</span>
          </div>
        </div>

        <div className="route-info">
          <div className="info-item">
            <div className="info-text">
              <span>From</span>
              <p>Kilimani, Nairobi</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-text">
              <span>To</span>
              <p>Milimani, Kisumu</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-text">
              <span>Move Date</span>
              <p>February 15, 2026</p>
            </div>
          </div>
        </div>

        <div className="progress-container">
          <div className="progress-header">
            <span>Move Progress</span>
            <span>40%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: '40%' }}></div>
          </div>
        </div>

        <ul className="timeline">
          {steps.map((step, index) => (
            <li key={index} className={`timeline-item ${step.status}`}>
              <div className="timeline-icon">
                {step.status === 'completed' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="9" strokeWidth={2} />
                  </svg>
                )}
              </div>
              <div className="timeline-content">
                <h4>{step.label}</h4>
                <span>{step.date}</span>
              </div>
            </li>
          ))}
        </ul>
        
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <button className="tab">Contact Support</button>
          <button className="tab">View Details</button>
        </div>
      </main>

      <section className="help-section">
        <h3>Need Help?</h3>
        <p className="service-tag">Our team is here to assist you</p>
        <div className="help-grid">
          <div className="help-card">
            <strong>Call Us</strong>
            <p>(800) 555-MOVE</p>
          </div>
          <div className="help-card">
            <strong>Email Support</strong>
            <p>help@smartmove.com</p>
          </div>
          <div className="help-card" onClick={() => onNavigate && onNavigate('booking')} style={{ cursor: 'pointer' }}>
            <strong>New Quote</strong>
            <p>Get started now</p>
          </div>
        </div>
      </section>
    </div>
  );
}

