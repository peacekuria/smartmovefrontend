import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { FiLogOut, FiStar, FiThumbsUp } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import "./ClientDashboard.css";

export default function ClientDashboard({ onNavigate }) {
  const { signOut, user } = useContext(AuthContext);
  const [showPaymentDetails, setShowPaymentDetails] = React.useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingType, setRatingType] = useState("app"); // "app" or "mover"
  const [selectedMoverRating, setSelectedMoverRating] = useState(null);
  const [appRating, setAppRating] = useState(0);
  const [moverRating, setMoverRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");

  const getPaymentHistory = () => {
    try {
      const data = JSON.parse(localStorage.getItem("bookingHistory") || "[]");
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  };

  const getRatings = () => {
    try {
      const data = JSON.parse(localStorage.getItem("clientRatings") || "[]");
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  };

  const payments = getPaymentHistory();
  const existingRatings = getRatings();

  const handleRateApp = () => {
    setRatingType("app");
    setShowRatingModal(true);
    setAppRating(0);
    setRatingComment("");
  };

  const handleRateMover = (moverName) => {
    setRatingType("mover");
    setSelectedMoverRating(moverName);
    setShowRatingModal(true);
    setMoverRating(0);
    setRatingComment("");
  };

  const submitRating = () => {
    if (ratingType === "app" && appRating === 0) {
      toast.error("Please select a rating!");
      return;
    }
    if (ratingType === "mover" && moverRating === 0) {
      toast.error("Please select a rating!");
      return;
    }

    const newRating = {
      id: Date.now(),
      type: ratingType,
      rating: ratingType === "app" ? appRating : moverRating,
      comment: ratingComment,
      moverName: ratingType === "mover" ? selectedMoverRating : null,
      date: new Date().toLocaleDateString(),
      userName: user?.name || "Anonymous",
    };

    const updatedRatings = [...existingRatings, newRating];
    localStorage.setItem("clientRatings", JSON.stringify(updatedRatings));

    toast.success(
      ratingType === "app"
        ? "🎉 Thank you for rating the app!"
        : `⭐ Thanks for rating ${selectedMoverRating}!`,
    );
    setShowRatingModal(false);
  };

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
          <button className="action-btn rate-btn" onClick={handleRateApp}>
            <FiThumbsUp /> Rate App
          </button>
        </div>
      </section>

      {/* Rating Modal */}
      {showRatingModal && (
        <div
          className="rating-modal-overlay"
          onClick={() => setShowRatingModal(false)}
        >
          <div className="rating-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="rating-close-btn"
              onClick={() => setShowRatingModal(false)}
            >
              ×
            </button>
            <h2>
              {ratingType === "app"
                ? "Rate Our App"
                : `Rate ${selectedMoverRating}`}
            </h2>
            <p className="rating-subtitle">
              {ratingType === "app"
                ? "How was your experience with SmartMove?"
                : "How was your experience with this moving company?"}
            </p>

            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`star-btn ${(ratingType === "app" ? appRating : moverRating) >= star
                      ? "star-active"
                      : ""
                    }`}
                  onClick={() =>
                    ratingType === "app"
                      ? setAppRating(star)
                      : setMoverRating(star)
                  }
                >
                  <FiStar />
                </button>
              ))}
            </div>

            <div className="rating-labels">
              <span>Poor</span>
              <span>Excellent</span>
            </div>

            <textarea
              className="rating-textarea"
              placeholder={
                ratingType === "app"
                  ? "Tell us what you liked or how we can improve..."
                  : "Share your experience with this mover..."
              }
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
              rows="4"
            />

            <button className="submit-rating-btn" onClick={submitRating}>
              <FiThumbsUp /> Submit Rating
            </button>
          </div>
        </div>
      )}

      {/* Movers Rating Section - Show if client has completed bookings */}
      {payments.length > 0 && (
        <section className="client-section rating-section">
          <h2>Rate Moving Companies</h2>
          <p className="rating-section-subtitle">
            Rate the movers who completed your moves
          </p>
          <div className="mover-rating-list">
            {payments.map((payment, index) => (
              <div key={index} className="mover-rating-item">
                <div className="mover-rating-info">
                  <h4>{payment.moverName || "Assigned Mover"}</h4>
                  <p>
                    {payment.from} → {payment.to} • {payment.moveDate}
                  </p>
                </div>
                <button
                  className="btn-rate-mover"
                  onClick={() =>
                    handleRateMover(payment.moverName || "Your Mover")
                  }
                >
                  <FiStar /> Rate This Mover
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* My Ratings Section */}
      {existingRatings.length > 0 && (
        <section className="client-section my-ratings-section">
          <h2>My Ratings</h2>
          <div className="my-ratings-list">
            {existingRatings.map((rating) => (
              <div key={rating.id} className="my-rating-item">
                <div className="my-rating-header">
                  <span className="my-rating-type">
                    {rating.type === "app"
                      ? "📱 App Rating"
                      : "🚚 Mover Rating"}
                  </span>
                  <span className="my-rating-date">{rating.date}</span>
                </div>
                {rating.type === "mover" && rating.moverName && (
                  <p className="my-rating-mover">{rating.moverName}</p>
                )}
                <div className="my-rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className={`star-icon ${rating.rating >= star ? "star-filled" : "star-empty"
                        }`}
                    />
                  ))}
                </div>
                {rating.comment && (
                  <p className="my-rating-comment">"{rating.comment}"</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
