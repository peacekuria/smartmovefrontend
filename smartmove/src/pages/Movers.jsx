import React, { useState, useContext } from "react";
import { FiArrowLeft, FiSearch, FiStar, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import "./Movers.css";

const MOCK = [
  {
    id: 1,
    name: "QuickMove Ltd",
    rating: 4.7,
    pricePerKm: 1.2,
    reviews: 234,
    avatar: "Q",
  },
  {
    id: 2,
    name: "SafeHands Movers",
    rating: 4.5,
    pricePerKm: 1.4,
    reviews: 189,
    avatar: "S",
  },
  {
    id: 3,
    name: "BudgetMove",
    rating: 4.0,
    pricePerKm: 0.9,
    reviews: 156,
    avatar: "B",
  },
  {
    id: 4,
    name: "Elite Movers",
    rating: 4.8,
    pricePerKm: 1.8,
    reviews: 312,
    avatar: "E",
  },
  {
    id: 5,
    name: "City Express",
    rating: 4.3,
    pricePerKm: 1.1,
    reviews: 98,
    avatar: "C",
  },
];

export default function Movers({ onBook, onNavigate }) {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const filteredMovers = MOCK.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()),
  ).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "price") return a.pricePerKm - b.pricePerKm;
    return 0;
  });

  const handleBack = () => {
    if (user && user.role === "client") {
      onNavigate && onNavigate("client-dashboard");
    } else {
      onNavigate && onNavigate("home");
    }
  };

  return (
    <div className="movers-container animate-fadeIn">
      {/* Header with Back Button */}
      <div className="movers-header">
        <div className="header-content">
          <button className="btn-back" onClick={handleBack} title="Go back">
            <FiArrowLeft /> Back
          </button>
          <div>
            <h1 className="page-title">🚚 Find Movers</h1>
            <p className="page-subtitle">
              Select from trusted moving companies
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="movers-filters">
        <div className="filter-search">
          <label>Search Movers</label>
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        <div className="filter-sort">
          <label>Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="rating">Highest Rated</option>
            <option value="price">Lowest Price</option>
          </select>
        </div>
      </div>

      {/* Movers List */}
      <div className="movers-list">
        {filteredMovers.length > 0 ? (
          filteredMovers.map((m) => (
            <div key={m.id} className="mover-card">
              <div className="mover-content">
                {/* Avatar */}
                <div className="mover-avatar">{m.avatar}</div>

                {/* Info */}
                <div className="mover-info">
                  <h3 className="mover-name">{m.name}</h3>
                  <div className="mover-meta">
                    <div className="mover-rating">
                      <FiStar className="star-icon" />
                      <span className="rating-value">{m.rating}</span>
                      <span className="review-count">
                        ({m.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price & Button */}
                <div className="mover-action">
                  <div className="price-section">
                    <p className="price-label">Starting at</p>
                    <p className="price-value">
                      KES {(m.pricePerKm * 100).toFixed(0)}/km
                    </p>
                  </div>
                  <button onClick={() => onBook(m)} className="btn-book">
                    Book Now
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="mover-features">
                {["Verified", "Insured", "24/7 Support"].map((feature, i) => (
                  <span key={i} className="feature-badge">
                    <FiCheck className="feature-icon" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <FiSearch className="no-results-icon" />
            <p>No movers found matching your search.</p>
            <button onClick={() => setSearchTerm("")} className="btn-reset">
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
