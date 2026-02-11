import React, { useContext, useEffect, useState } from "react";
import "./MyMoves.css";
import { AuthContext } from "../context/AuthContext";

export default function MyMoves({ onNavigate }) {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    try {
      const all = JSON.parse(localStorage.getItem("bookingHistory") || "[]");
      // if user present, show only their bookings; admins see all
      const list =
        user && user.role !== "admin"
          ? all.filter((b) => b.user && b.user.email === user.email)
          : all;
      setBookings(list.reverse());
    } catch (e) {
      setBookings([]);
    }
  }, [user]);

  const deleteBooking = (id) => {
    if (!confirm("Delete this completed booking? This cannot be undone."))
      return;
    try {
      const all = JSON.parse(localStorage.getItem("bookingHistory") || "[]");
      const remaining = all.filter((b) => b.id !== id);
      localStorage.setItem("bookingHistory", JSON.stringify(remaining));
      setBookings(
        remaining
          .filter(
            (b) =>
              !user ||
              user.role === "admin" ||
              (b.user && b.user.email === user.email),
          )
          .reverse(),
      );
    } catch (e) {}
  };

  return (
    <div className="my-moves">
      <div className="moves-home-btn">
        <button onClick={() => onNavigate && onNavigate("home")}>
          {" "}
          ← Back to Home
        </button>
      </div>

      <header className="moves-header">
        <h1>My Moves</h1>
        <p>Track and manage your moving requests</p>

        <div className="header-actions">
          <div className="tabs">
            <button className="tab active">
              Upcoming Moves (
              {
                bookings.filter(
                  (b) => b.status !== "Completed" && b.status !== "completed",
                ).length
              }
              )
            </button>
            <button className="tab">
              Past Moves (
              {
                bookings.filter(
                  (b) => b.status === "Completed" || b.status === "completed",
                ).length
              }
              )
            </button>
          </div>
          <button
            className="btn-new-quote"
            onClick={() => onNavigate && onNavigate("booking")}
          >
            + New Quote Request
          </button>
        </div>
      </header>

      <main>
        {bookings.length === 0 ? (
          <div className="empty-state">
            <p>No moves found. Create a new booking to get started.</p>
            <button onClick={() => onNavigate && onNavigate("booking")}>
              New Booking
            </button>
          </div>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className="move-card">
              <div className="move-card-header">
                <div>
                  <h3>Booking {b.reference || b.id}</h3>
                  <p className="service-tag">Move Date: {b.moveDate}</p>
                </div>
                <div>
                  <strong>
                    KES {b.amount?.toLocaleString?.() || b.amount}
                  </strong>
                </div>
              </div>

              <div className="route-info">
                <div className="info-item">
                  <div className="info-text">
                    <span>From</span>
                    <p>{b.from}</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-text">
                    <span>To</span>
                    <p>{b.to}</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-text">
                    <span>Status</span>
                    <p>{b.status}</p>
                  </div>
                </div>
              </div>

              <div className="card-actions">
                <button onClick={() => onNavigate && onNavigate("support")}>
                  Contact Support
                </button>
                {(b.status === "Completed" || b.status === "completed") && (
                  <button onClick={() => deleteBooking(b.id)}>Delete</button>
                )}
              </div>
            </div>
          ))
        )}
      </main>

      <section className="help-section">
        <h3>Need Help?</h3>
        <p className="service-tag">Our team is here to assist you</p>
      </section>
    </div>
  );
}
