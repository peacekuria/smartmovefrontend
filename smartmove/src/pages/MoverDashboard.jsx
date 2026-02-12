import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  FiTruck,
  FiCalendar,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiPower,
  FiAlertTriangle,
  FiBarChart2,
  FiMapPin,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MoverDashboard.css";

export default function MoverDashboard({ onNavigate }) {
  const { signOut, user } = useContext(AuthContext);
  const [available, setAvailable] = useState(true);
  const [showEarnings, setShowEarnings] = useState(false);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(null);

  const getPaymentHistory = () => {
    try {
      const data = JSON.parse(localStorage.getItem("bookingHistory") || "[]");
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  };

  const payments = getPaymentHistory();
  const totalEarnings = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  const [jobs, setJobs] = useState([
    {
      id: 1,
      client: "Jane Doe",
      date: "22 Sept 2026",
      location: "Westlands",
      status: "in-progress",
    },
    {
      id: 2,
      client: "Mark Otieno",
      date: "18 Sept 2026",
      location: "Kilimani",
      status: "completed",
    },
  ]);

  const [issueForm, setIssueForm] = useState({
    subject: "",
    description: "",
  });

  const [reportedIssues, setReportedIssues] = useState([
    {
      id: 1,
      subject: "Payment delay on job #1045",
      description: "Payment not received for completed job",
      status: "resolved",
      date: "05 Feb 2026",
      resolution: "Payment processed on 06 Feb 2026",
    },
    {
      id: 2,
      subject: "Client communication issue",
      description: "Client was unreachable during job",
      status: "in-progress",
      date: "08 Feb 2026",
      resolution: null,
    },
  ]);

  const toggleAvailability = () => {
    setAvailable((prev) => !prev);
    toast.success(
      available
        ? "🔴 You are now unavailable for new jobs"
        : "🟢 You are now available for new jobs",
    );
  };

  const markComplete = (id) => {
    const job = jobs.find((j) => j.id === id);
    if (job.status === "completed") {
      toast.info("⚠️ This job has already been completed");
      return;
    }
    setJobs(
      jobs.map((job) =>
        job.id === id ? { ...job, status: "completed" } : job,
      ),
    );
    toast.success("✅ Job marked as completed successfully");
  };

  const handleEarningsBreakdown = () => {
    setShowEarnings(true);
  };

  const handleLiveTracking = () => {
    toast.info("📍 Navigating to live job tracking...");
    setTimeout(() => {
      onNavigate && onNavigate("map");
    }, 600);
  };

  const handleReportIssue = () => {
    setShowIssueForm(true);
  };

  const submitIssue = (e) => {
    e.preventDefault();
    if (!issueForm.subject || !issueForm.description) {
      toast.warning("⚠️ Please fill in all fields");
      return;
    }
    const newIssue = {
      id: reportedIssues.length + 1,
      subject: issueForm.subject,
      description: issueForm.description,
      status: "pending",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      resolution: null,
    };
    setReportedIssues([newIssue, ...reportedIssues]);
    toast.success(
      "✅ Issue reported successfully. Our team will review it soon.",
    );
    setIssueForm({ subject: "", description: "" });
    setShowIssueForm(false);
  };

  const updateIssueStatus = (id, newStatus) => {
    setReportedIssues(
      reportedIssues.map((issue) =>
        issue.id === id ? { ...issue, status: newStatus } : issue,
      ),
    );
    toast.success("✅ Issue status updated");
  };

  const addFollowUp = (id) => {
    toast.info("📝 Follow-up noted. Support team has been notified.");
  };

  const handleLogout = () => {
    signOut();
    toast.success("✅ Logged out successfully");
    setTimeout(() => {
      onNavigate && onNavigate("home");
    }, 800);
  };

  return (
    <div className="dashboard">
      <ToastContainer position="top-right" autoClose={3500} />

      {/* HEADER */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>🚚 Mover Dashboard</h1>
          <p>Track jobs, manage availability, and grow your earnings</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <FiUser className="user-icon" />
            <div className="user-details">
              <span className="user-name">{user?.name || "Mover"}</span>
              <span className="user-role">Professional Mover</span>
            </div>
          </div>
          <div className="header-actions">
            <button
              className={`availability-toggle ${available ? "available" : "unavailable"}`}
              onClick={toggleAvailability}
            >
              <FiPower />
              <span>{available ? "Available" : "Unavailable"}</span>
            </button>
            <button className="btn-logout" onClick={handleLogout}>
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* KPI CARDS */}
      <section className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <FiTruck className="card-icon" />
            <span className="card-badge">Live</span>
          </div>
          <h3>Active Jobs</h3>
          <p className="stat">
            {jobs.filter((j) => j.status === "in-progress").length}
          </p>
          <span className="card-hint">Currently ongoing</span>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <FiCalendar className="card-icon" />
          </div>
          <h3>Upcoming Moves</h3>
          <p className="stat">5</p>
          <span className="card-hint">Next 14 days</span>
        </div>

        <div className="dashboard-card highlight">
          <div className="card-header">
            <FiDollarSign className="card-icon" />
          </div>
          <h3>Total Earnings</h3>
          <p className="stat">KES {totalEarnings.toLocaleString()}</p>
          <span className="card-hint">This month</span>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-card" onClick={handleEarningsBreakdown}>
            <div className="action-icon earnings-icon">
              <FiBarChart2 />
            </div>
            <div className="action-content">
              <h4>Earnings Breakdown</h4>
              <p>View detailed earnings and payouts</p>
            </div>
            <span className="action-arrow">→</span>
          </button>

          <button className="action-card" onClick={handleLiveTracking}>
            <div className="action-icon tracking-icon">
              <FiMapPin />
            </div>
            <div className="action-content">
              <h4>Live Job Tracking</h4>
              <p>Track your current jobs in real-time</p>
            </div>
            <span className="action-arrow">→</span>
          </button>

          <button className="action-card" onClick={handleReportIssue}>
            <div className="action-icon issue-icon">
              <FiAlertTriangle />
            </div>
            <div className="action-content">
              <h4>Report an Issue</h4>
              <p>Get help with any problems</p>
            </div>
            <span className="action-arrow">→</span>
          </button>
        </div>
      </section>

      {/* JOB LIST */}
      <section className="dashboard-section jobs-section">
        <div className="section-header">
          <h2>📋 Recent Jobs</h2>
          <span className="job-count">{jobs.length} total</span>
        </div>

        <div className="jobs-list">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-main">
                <div className="job-client">
                  <div className="client-avatar">
                    {job.client.charAt(0)}
                  </div>
                  <div className="client-info">
                    <strong>{job.client}</strong>
                    <span className="job-location">
                      <FiMapPin /> {job.location}
                    </span>
                  </div>
                </div>
                <div className="job-meta">
                  <span className="job-date">{job.date}</span>
                  <span className={`status-badge ${job.status}`}>
                    {job.status === "in-progress" ? (
                      <>
                        <FiClock className="status-icon" /> In Progress
                      </>
                    ) : (
                      <>
                        <FiCheckCircle className="status-icon" /> Completed
                      </>
                    )}
                  </span>
                </div>
              </div>
              {job.status === "in-progress" && (
                <button
                  className="complete-btn"
                  onClick={() => markComplete(job.id)}
                >
                  <FiCheckCircle /> Complete Job
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ISSUE TRACKER */}
      <section className="dashboard-section issues-section">
        <div className="section-header">
          <h2>📌 Issue Tracker</h2>
          <span className="issue-count">{reportedIssues.length} issues</span>
        </div>

        {reportedIssues.length > 0 ? (
          <div className="issues-list">
            {reportedIssues.map((issue) => (
              <div key={issue.id} className="issue-card">
                <div className="issue-header">
                  <div className="issue-title">
                    <strong>{issue.subject}</strong>
                    <span className={`issue-status ${issue.status}`}>
                      {issue.status === "pending" ? (
                        <>
                          <FiClock /> Pending
                        </>
                      ) : issue.status === "in-progress" ? (
                        <>
                          <FiClock /> In Progress
                        </>
                      ) : (
                        <>
                          <FiCheckCircle /> Resolved
                        </>
                      )}
                    </span>
                  </div>
                  <span className="issue-date">{issue.date}</span>
                </div>

                <div className="issue-description">
                  <p>{issue.description}</p>
                </div>

                {issue.resolution && (
                  <div className="issue-resolution">
                    <strong>Resolution:</strong>
                    <p>{issue.resolution}</p>
                  </div>
                )}

                <div className="issue-actions">
                  {issue.status === "pending" && (
                    <button
                      className="issue-btn progress-btn"
                      onClick={() => updateIssueStatus(issue.id, "in-progress")}
                    >
                      Mark In Progress
                    </button>
                  )}
                  {issue.status === "in-progress" && (
                    <button
                      className="issue-btn resolve-btn"
                      onClick={() => updateIssueStatus(issue.id, "resolved")}
                    >
                      Mark Resolved
                    </button>
                  )}
                  <button
                    className="issue-btn followup-btn"
                    onClick={() => addFollowUp(issue.id)}
                  >
                    Add Follow-up
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-issues">
            <p>✨ No reported issues. Great work!</p>
          </div>
        )}
      </section>

      {/* PAYMENT HISTORY */}
      {payments.length > 0 && (
        <section className="dashboard-section payment-section">
          <div className="section-header">
            <h2>💰 Earnings & Payment History</h2>
          </div>
          <div className="confidential-badge">
            Confidential - Verified Earnings Record
          </div>
          <div className="payment-history-list">
            {payments.map((payment, index) => (
              <div key={index} className="payment-item">
                <div className="payment-header">
                  <div className="payment-info-main">
                    <h4>Transaction #{payment.id}</h4>
                    <p className="payment-route">
                      {payment.from} → {payment.to}
                    </p>
                    <p className="payment-date">
                      {payment.date} at {payment.time}
                    </p>
                  </div>
                  <div className="payment-amount">
                    <span className="amount">
                      + KES {payment.amount.toLocaleString()}
                    </span>
                    <span className={`status ${payment.status.toLowerCase()}`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
                <div className="payment-details">
                  <div className="detail-row">
                    <span className="detail-label">Move Date:</span>
                    <span className="detail-value">{payment.moveDate}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Payment Method:</span>
                    <span className="detail-value">{payment.paymentMethod}</span>
                  </div>
                  {payment.services && (
                    <div className="services-added">
                      {payment.services.packing && (
                        <span className="service-tag">Packing</span>
                      )}
                      {payment.services.storage && (
                        <span className="service-tag">Storage</span>
                      )}
                      {payment.services.insurance && (
                        <span className="service-tag">Insurance</span>
                      )}
                    </div>
                  )}
                </div>
                <button
                  className="btn-view-receipt"
                  onClick={() =>
                    setShowPaymentDetails(
                      showPaymentDetails === index ? null : index,
                    )
                  }
                >
                  {showPaymentDetails === index ? "Hide Receipt" : "View Receipt"}
                </button>
                {showPaymentDetails === index && (
                  <div className="receipt-modal">
                    <div className="receipt-content">
                      <h3>Payment Verification Receipt</h3>
                      <div className="receipt-info">
                        <p>
                          <strong>Reference:</strong> {payment.reference}
                        </p>
                        <p>
                          <strong>Amount Earned:</strong> KES{" "}
                          {payment.amount.toLocaleString()}
                        </p>
                        <p>
                          <strong>Date:</strong> {payment.date} {payment.time}
                        </p>
                        <p>
                          <strong>From:</strong> {payment.from}
                        </p>
                        <p>
                          <strong>To:</strong> {payment.to}
                        </p>
                        <p>
                          <strong>Move Date:</strong> {payment.moveDate}
                        </p>
                        <p>
                          <strong>Status:</strong> {payment.status}
                        </p>
                        <p className="confidential-note">
                          This receipt is confidential and issued solely as
                          verified earnings record for your accounts.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EARNINGS MODAL */}
      {showEarnings && (
        <div className="modal-overlay" onClick={() => setShowEarnings(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>💰 Earnings Breakdown</h2>
              <button
                className="modal-close"
                onClick={() => setShowEarnings(false)}
              >
                ✕
              </button>
            </div>
            <div className="earnings-grid">
              <div className="earnings-card">
                <span className="earnings-label">This Month</span>
                <p className="earnings-amount">KES 120,000</p>
              </div>
              <div className="earnings-card">
                <span className="earnings-label">Last Month</span>
                <p className="earnings-amount">KES 95,000</p>
              </div>
              <div className="earnings-card">
                <span className="earnings-label">Total Earnings</span>
                <p className="earnings-amount">KES 890,500</p>
              </div>
              <div className="earnings-card">
                <span className="earnings-label">Pending Payouts</span>
                <p className="earnings-amount">KES 18,500</p>
              </div>
            </div>
            <div className="earnings-details">
              <h3>Earnings by Service Type</h3>
              <div className="service-earnings">
                <div className="service-item">
                  <span>Standard Moves</span>
                  <span className="amount">KES 72,000</span>
                </div>
                <div className="service-item">
                  <span>Premium Moves</span>
                  <span className="amount">KES 38,000</span>
                </div>
                <div className="service-item">
                  <span>Urgent Services</span>
                  <span className="amount">KES 10,000</span>
                </div>
              </div>
            </div>
            <button
              className="btn-close-modal"
              onClick={() => setShowEarnings(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* REPORT ISSUE MODAL */}
      {showIssueForm && (
        <div className="modal-overlay" onClick={() => setShowIssueForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📋 Report an Issue</h2>
              <button
                className="modal-close"
                onClick={() => setShowIssueForm(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={submitIssue} className="issue-form">
              <div className="form-group">
                <label>Issue Subject *</label>
                <input
                  type="text"
                  placeholder="e.g., Payment not received, Job cancellation issue..."
                  value={issueForm.subject}
                  onChange={(e) =>
                    setIssueForm({ ...issueForm, subject: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  placeholder="Please describe the issue in detail..."
                  value={issueForm.description}
                  onChange={(e) =>
                    setIssueForm({ ...issueForm, description: e.target.value })
                  }
                  className="form-textarea"
                  rows="5"
                ></textarea>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowIssueForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Submit Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

