import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import "./ClientDashboard.css";

export default function ClientDashboard({ onNavigate }) {
  const { signOut, user } = useContext(AuthContext);

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
