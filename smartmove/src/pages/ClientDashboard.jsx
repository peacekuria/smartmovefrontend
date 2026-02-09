import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import "./ClientDashboard.css";

export default function ClientDashboard({ onNavigate }) {
  const { signOut, user } = useContext(AuthContext);
  const [showPaymentDetails, setShowPaymentDetails] = React.useState(null);

  const getPaymentHistory = () => {
    try {
      return JSON.parse(localStorage.getItem("bookingHistory") || "[]");
    } catch (e) {
      return [];
    }
  };

  const payments = getPaymentHistory();

  const handleLogout = () => {
    signOut();
    toast.success("✅ Logged out successfully");
    setTimeout(() => {
      onNavigate && onNavigate("home");
    }, 800);
  };

  return (
    <div className="client-dashboard">
      <ToastContainer position="top-right" autoClose={3500} />

      <header className="client-header">
        <div>
          <h1>📦 Client Dashboard</h1>
          <p>Manage your moves and bookings</p>
        </div>
        <button className="btn-logout-client" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </header>

      <section className="client-grid">
        <div className="client-card">
          <h3>Upcoming Move</h3>
          <p className="big">24 Sept 2026</p>
          <span>Nairobi → Mombasa</span>
        </div>

        <div className="client-card">
          <h3>Inventory Items</h3>
          <p className="big">42</p>
          <span>Items listed</span>
        </div>

        <div className="client-card">
          <h3>Move Status</h3>
          <p className="status-pill">Confirmed</p>
        </div>
      </section>

      <section className="client-section">
        <h2>Recent Activity</h2>

        <div className="activity">📦 Inventory updated</div>

        <div className="activity">🚚 Mover assigned to your booking</div>

        <div className="activity">💳 Payment pending confirmation</div>

        {payments.length > 0 && (
          <section className="client-section payment-history-section">
            <h2>Payment History</h2>
            <div className="confidential-badge">
              Confidential - For Your Records Only
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
                        KES {payment.amount.toLocaleString()}
                      </span>
                      <span
                        className={`status ${payment.status.toLowerCase()}`}
                      >
                        {payment.status}
                      </span>
                    </div>
                  </div>
                  <div className="payment-details">
                    <div className="detail-item">
                      <span className="detail-label">Move Date:</span>
                      <span className="detail-value">{payment.moveDate}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Payment Method:</span>
                      <span className="detail-value">
                        {payment.paymentMethod}
                      </span>
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
                    {showPaymentDetails === index
                      ? "Hide Receipt"
                      : "View Receipt"}
                  </button>
                  {showPaymentDetails === index && (
                    <div className="receipt-modal">
                      <div className="receipt-content">
                        <h3>Transaction Receipt</h3>
                        <div className="receipt-info">
                          <p>
                            <strong>Reference:</strong> {payment.reference}
                          </p>
                          <p>
                            <strong>Amount:</strong> KES{" "}
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
                            This receipt is confidential and issued solely for
                            your records.
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
      </section>

      <section className="client-section">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button
            className="action-btn"
            onClick={() => {
              toast.success("🚚 Taking you to book a move...");
              setTimeout(() => onNavigate("movers"), 600);
            }}
          >
            Book a Move
          </button>
          <button
            className="action-btn"
            onClick={() => {
              toast.success("📍 Loading your move tracking...");
              setTimeout(() => onNavigate("map"), 600);
            }}
          >
            Track Move
          </button>
          <button
            className="action-btn contact-btn"
            onClick={() => {
              toast.info("📞 Support team will contact you shortly");
            }}
          >
            Contact Support
          </button>
        </div>
      </section>
    </div>
  );
}
