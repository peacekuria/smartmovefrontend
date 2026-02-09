import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import {
  FiLogOut,
  FiTrendingUp,
  FiStar,
  FiUsers,
  FiDollarSign,
} from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import "./AdminDashboard.css";

export default function Admin({ onNavigate }) {
  const { signOut } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("Overview");

  const handleLogout = () => {
    signOut();
    toast.success("Logged out successfully");
    setTimeout(() => {
      onNavigate && onNavigate("home");
    }, 800);
  };

  const stats = [
    {
      label: "Total Revenue",
      value: "KES 1,245,920",
      trend: "+12.5%",
      isUp: true,
      icon: "💰",
    },
    {
      label: "Active Moves",
      value: "48",
      trend: "+8.2%",
      isUp: true,
      icon: "🚚",
    },
    {
      label: "Total Customers",
      value: "1,429",
      trend: "+18.7%",
      isUp: true,
      icon: "👥",
    },
    {
      label: "Pending Quotes",
      value: "23",
      trend: "-4.3%",
      isUp: false,
      icon: "📋",
    },
  ];

  const recentMoves = [
    {
      id: "MV-2024-001",
      client: "Wanjiku Ndungu",
      route: "Karen, Nairobi → Riat Hills, Kisumu",
      price: "KES 125,000",
      date: "2026-02-05",
      status: "scheduled",
    },
    {
      id: "MV-2024-002",
      client: "James Omondi",
      route: "Milimani, Kisumu → Westlands, Nairobi",
      price: "KES 210,000",
      date: "2026-02-03",
      status: "in-progress",
    },
    {
      id: "MV-2024-003",
      client: "Grace Wambui",
      route: "Section 58, Nakuru → Milimani, Nakuru",
      price: "KES 38,500",
      date: "2026-02-02",
      status: "completed",
    },
    {
      id: "MV-2024-004",
      client: "Peter Kamau",
      route: "Kilimani, Nairobi → Bahati, Nakuru",
      price: "KES 95,000",
      date: "2026-02-08",
      status: "scheduled",
    },
    {
      id: "MV-2024-005",
      client: "Mary Akinyi",
      route: "Loresho, Nairobi → Mamboleo, Kisumu",
      price: "KES 165,000",
      date: "2026-02-01",
      status: "completed",
    },
  ];

  const customers = [
    {
      id: 1,
      name: "Wanjiku Ndungu",
      email: "wanjiku@email.com",
      moves: 5,
      status: "active",
      joined: "2025-06-15",
    },
    {
      id: 2,
      name: "James Omondi",
      email: "james@email.com",
      moves: 12,
      status: "active",
      joined: "2025-03-20",
    },
    {
      id: 3,
      name: "Grace Wambui",
      email: "grace@email.com",
      moves: 3,
      status: "active",
      joined: "2025-11-10",
    },
    {
      id: 4,
      name: "Peter Kamau",
      email: "peter@email.com",
      moves: 8,
      status: "inactive",
      joined: "2024-12-05",
    },
    {
      id: 5,
      name: "Mary Akinyi",
      email: "mary@email.com",
      moves: 6,
      status: "active",
      joined: "2025-08-22",
    },
  ];

  const quotes = [
    {
      id: 1,
      from: "Nairobi",
      to: "Mombasa",
      date: "2026-02-10",
      amount: "KES 85,000",
      status: "pending",
      customer: "Samuel Kipchoge",
    },
    {
      id: 2,
      from: "Kisumu",
      to: "Nakuru",
      date: "2026-02-12",
      amount: "KES 45,000",
      status: "accepted",
      customer: "Diana Kipkemboi",
    },
    {
      id: 3,
      from: "Nairobi",
      to: "Kisii",
      date: "2026-02-08",
      amount: "KES 95,000",
      status: "pending",
      customer: "Robert Mutua",
    },
    {
      id: 4,
      from: "Mombasa",
      to: "Nairobi",
      date: "2026-02-07",
      amount: "KES 120,000",
      status: "rejected",
      customer: "Patricia Mukhwaya",
    },
  ];

  const movers = [
    {
      id: 1,
      name: "John Kipchoge",
      rating: 4.8,
      completedMoves: 156,
      earnings: "KES 2,450,000",
      availability: "available",
    },
    {
      id: 2,
      name: "David Ochieng",
      rating: 4.6,
      completedMoves: 98,
      earnings: "KES 1,560,000",
      availability: "available",
    },
    {
      id: 3,
      name: "Michael Koech",
      rating: 4.9,
      completedMoves: 203,
      earnings: "KES 3,240,000",
      availability: "busy",
    },
    {
      id: 4,
      name: "Patrick Mwangi",
      rating: 4.5,
      completedMoves: 67,
      earnings: "KES 950,000",
      availability: "available",
    },
    {
      id: 5,
      name: "Steven Kiplagat",
      rating: 4.7,
      completedMoves: 142,
      earnings: "KES 2,130,000",
      availability: "available",
    },
  ];

  const companies = [
    {
      id: 1,
      name: "SwiftMove Logistics",
      moversCount: 8,
      activeMovesCount: 12,
      rating: 4.7,
      commissionRate: "12%",
      status: "active",
      monthlyRevenue: "KES 450,000",
    },
    {
      id: 2,
      name: "EagleMover Kenya",
      moversCount: 5,
      activeMovesCount: 7,
      rating: 4.5,
      commissionRate: "13%",
      status: "active",
      monthlyRevenue: "KES 280,000",
    },
    {
      id: 3,
      name: "Nairobi Movers Pro",
      moversCount: 12,
      activeMovesCount: 18,
      rating: 4.8,
      commissionRate: "11%",
      status: "active",
      monthlyRevenue: "KES 515,000",
    },
    {
      id: 4,
      name: "RelocationExperts Ltd",
      moversCount: 6,
      activeMovesCount: 5,
      rating: 4.6,
      commissionRate: "13%",
      status: "pending",
      monthlyRevenue: "KES 210,000",
    },
  ];

  const ratings = [
    {
      id: 1,
      userName: "Wanjiku Ndungu",
      rating: 5,
      message:
        "Amazing service! The movers were professional and efficient. Highly recommended!",
      date: "2026-02-08",
      category: "service",
    },
    {
      id: 2,
      userName: "James Omondi",
      rating: 4,
      message:
        "Good experience overall. Arrived on time and handled my belongings carefully.",
      date: "2026-02-07",
      category: "reliability",
    },
    {
      id: 3,
      userName: "Grace Wambui",
      rating: 5,
      message:
        "SmartMove made moving stress-free. The app is intuitive and customer support was excellent.",
      date: "2026-02-06",
      category: "app",
    },
    {
      id: 4,
      userName: "Peter Kamau",
      rating: 4,
      message:
        "Good pricing and decent service. Would use again for my next move.",
      date: "2026-02-05",
      category: "pricing",
    },
    {
      id: 5,
      userName: "Mary Akinyi",
      rating: 5,
      message:
        "Excellent service from booking to delivery. Very professional movers!",
      date: "2026-02-04",
      category: "service",
    },
  ];

  const analyticsData = {
    monthlyRevenue: [
      { month: "Jan", amount: 850000 },
      { month: "Feb", amount: 920000 },
      { month: "Mar", amount: 1050000 },
      { month: "Apr", amount: 980000 },
      { month: "May", amount: 1120000 },
    ],
    topRoutes: [
      { route: "Nairobi → Mombasa", moves: 245, revenue: "KES 410,000" },
      { route: "Nairobi → Kisumu", moves: 189, revenue: "KES 320,000" },
      { route: "Nairobi → Nakuru", moves: 167, revenue: "KES 285,000" },
      { route: "Mombasa → Nairobi", moves: 154, revenue: "KES 265,000" },
    ],
  };

  const renderStarRating = (rating) => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={i < Math.floor(rating) ? "star-filled" : "star-empty"}
          >
            ★
          </span>
        ))}
        <span className="rating-number">{rating}</span>
      </div>
    );
  };

  return (
    <div className="admin-dashboard animate-fadeIn">
      <ToastContainer position="top-right" autoClose={3500} />

      {/* Header */}
      <header className="admin-header">
        <div className="admin-title">
          <h1>Admin Dashboard</h1>
          <p>Manage your moving business operations efficiently</p>
        </div>
        <div className="admin-actions">
          <div className="header-actions">
            <button
              className="btn-secondary"
              onClick={() => onNavigate && onNavigate("map")}
            >
              Open Tracking
            </button>
            <button
              className="btn-social"
              onClick={() => toast.info("Website portal feature coming soon")}
            >
              🌐 View Website
            </button>
            <button
              className="btn-signin"
              onClick={() => toast.info("Scheduling feature coming soon")}
            >
              📅 Schedule Move
            </button>
            <button className="btn-logout" onClick={handleLogout}>
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card hover-card">
            <div className="stat-header">
              <span>{stat.label}</span>
              <div className="stat-icon">{stat.icon}</div>
            </div>
            <span className="stat-value">{stat.value}</span>
            <div
              className={`stat-trend ${stat.isUp ? "trend-up" : "trend-down"}`}
            >
              {stat.isUp ? "↑" : "↓"} {stat.trend} vs last month
            </div>
          </div>
        ))}
      </section>

      {/* Tabs */}
      <nav className="admin-tabs">
        {[
          "Overview",
          "Moves",
          "Quotes",
          "Customers",
          "Movers",
          "Companies",
          "Ratings",
          "Analytics",
        ].map((tab) => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </nav>

      {/* Overview Tab */}
      {activeTab === "Overview" && (
        <section className="overview-section">
          <div className="overview-grid">
            <div className="overview-card">
              <h3>Quick Stats</h3>
              <ul className="stat-list">
                <li>
                  <strong>Today's Revenue:</strong> KES 42,500
                </li>
                <li>
                  <strong>Today's Moves:</strong> 7
                </li>
                <li>
                  <strong>Active Movers:</strong> 12
                </li>
                <li>
                  <strong>Pending Quotes:</strong> 23
                </li>
                <li>
                  <strong>Customer Satisfaction:</strong> 4.7/5
                </li>
              </ul>
            </div>
            <div className="overview-card">
              <h3>Recent Activity</h3>
              <ul className="activity-list">
                <li>🎉 New customer registered: Jane Smith</li>
                <li>✅ Move completed: MV-2024-003</li>
                <li>📋 Quote accepted: QT-2024-012</li>
                <li>⚠️ New issue reported: Payment delay</li>
                <li>🚀 New mover joined: David Kipkemboi</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Moves Tab */}
      {activeTab === "Moves" && (
        <section className="moves-section scrollable">
          <h2>Recent Moves</h2>
          <p className="text-muted">Latest booking activities</p>
          <div className="moves-list">
            {recentMoves.map((move, i) => (
              <div key={i} className="move-item hover-card">
                <div className="move-info">
                  <h4>
                    {move.id}{" "}
                    <span className={`status-tag status-${move.status}`}>
                      {move.status.replace("-", " ")}
                    </span>
                  </h4>
                  <p className="move-client">{move.client}</p>
                  <p className="move-route">{move.route}</p>
                </div>
                <div className="move-finance">
                  <span className="move-price">{move.price}</span>
                  <span className="move-date">{move.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quotes Tab */}
      {activeTab === "Quotes" && (
        <section className="quotes-section">
          <h2>Quote Requests</h2>
          <p className="text-muted">Manage quote requests from customers</p>
          <div className="quotes-list scrollable">
            {quotes.map((quote, i) => (
              <div key={i} className="quote-item hover-card">
                <div className="quote-route">
                  <strong>
                    {quote.from} → {quote.to}
                  </strong>
                  <p className="quote-customer">From: {quote.customer}</p>
                </div>
                <div className="quote-details">
                  <span className="quote-amount">{quote.amount}</span>
                  <span className={`quote-status status-${quote.status}`}>
                    {quote.status}
                  </span>
                  <span className="quote-date">{quote.date}</span>
                </div>
                <div className="quote-actions">
                  {quote.status === "pending" && (
                    <>
                      <button
                        className="btn-accept"
                        onClick={() => toast.success("Quote accepted")}
                      >
                        Accept
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => toast.info("Quote rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Customers Tab */}
      {activeTab === "Customers" && (
        <section className="customers-section">
          <h2>Customers</h2>
          <p className="text-muted">All registered customers</p>
          <div className="customers-table scrollable">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Moves</th>
                  <th>Status</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.moves}</td>
                    <td>
                      <span
                        className={`status-badge status-${customer.status}`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td>{customer.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Movers Tab */}
      {activeTab === "Movers" && (
        <section className="movers-section">
          <h2>Registered Movers</h2>
          <p className="text-muted">
            Performance and availability of all movers
          </p>
          <div className="movers-grid">
            {movers.map((mover) => (
              <div key={mover.id} className="mover-card hover-card">
                <div className="mover-header">
                  <h3>{mover.name}</h3>
                  <span className={`availability ${mover.availability}`}>
                    {mover.availability}
                  </span>
                </div>
                <div className="mover-rating">
                  {renderStarRating(mover.rating)}
                </div>
                <div className="mover-stats">
                  <div className="mover-stat">
                    <span className="stat-label">Completed Moves</span>
                    <span className="stat-value-small">
                      {mover.completedMoves}
                    </span>
                  </div>
                  <div className="mover-stat">
                    <span className="stat-label">Total Earnings</span>
                    <span className="stat-value-small">{mover.earnings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Companies Tab */}
      {activeTab === "Companies" && (
        <section className="companies-section">
          <h2>Moving Companies</h2>
          <p className="text-muted">Manage affiliated moving companies</p>
          <div className="companies-grid">
            {companies.map((company) => (
              <div key={company.id} className="company-card hover-card">
                <div className="company-header">
                  <h3>{company.name}</h3>
                  <span className={`status-badge status-${company.status}`}>
                    {company.status}
                  </span>
                </div>
                <div className="company-rating">
                  {renderStarRating(company.rating)}
                </div>
                <div className="company-stats">
                  <div className="company-stat">
                    <span className="stat-label">Movers</span>
                    <span className="stat-value-small">
                      {company.moversCount}
                    </span>
                  </div>
                  <div className="company-stat">
                    <span className="stat-label">Active Moves</span>
                    <span className="stat-value-small">
                      {company.activeMovesCount}
                    </span>
                  </div>
                </div>
                <div className="company-details">
                  <p>
                    <strong>Commission:</strong> {company.commissionRate}
                  </p>
                  <p>
                    <strong>Monthly Revenue:</strong> {company.monthlyRevenue}
                  </p>
                </div>
                <div className="company-actions">
                  <button
                    className="btn-sm"
                    onClick={() => toast.info("Viewing company details")}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Ratings Tab */}
      {activeTab === "Ratings" && (
        <section className="ratings-section">
          <h2>Customer Reviews & Ratings</h2>
          <p className="text-muted">
            Real feedback from customers using SmartMove
          </p>

          <div className="ratings-summary">
            <div className="rating-stat">
              <div className="stat-big">4.8</div>
              <div className="stat-label">Average Rating</div>
              <div className="stars">★★★★★</div>
            </div>
            <div className="rating-stat">
              <div className="stat-big">{ratings.length}</div>
              <div className="stat-label">Total Reviews</div>
            </div>
            <div className="rating-stat">
              <div className="stat-big">98%</div>
              <div className="stat-label">Positive Reviews</div>
            </div>
          </div>

          <div className="ratings-list">
            {ratings.map((review) => (
              <div key={review.id} className="rating-card hover-card">
                <div className="rating-header">
                  <div>
                    <h4>{review.userName}</h4>
                    <p className="review-category">
                      {review.category.charAt(0).toUpperCase() +
                        review.category.slice(1)}
                    </p>
                  </div>
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < review.rating ? "star-filled" : "star-empty"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="review-message">"{review.message}"</p>
                <p className="review-date">{review.date}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Analytics Tab */}
      {activeTab === "Analytics" && (
        <section className="analytics-section">
          <h2>Business Analytics</h2>
          <p className="text-muted">
            Detailed insights and performance metrics
          </p>

          <div className="analytics-grid">
            {/* Monthly Revenue Chart */}
            <div className="analytics-card">
              <h3>Monthly Revenue Trend</h3>
              <div className="mini-chart">
                {analyticsData.monthlyRevenue.map((data, i) => (
                  <div key={i} className="chart-bar-container">
                    <div
                      className="chart-bar"
                      style={{ height: `${(data.amount / 1200000) * 100}%` }}
                    >
                      <span className="bar-label">{data.amount / 1000}K</span>
                    </div>
                    <span className="bar-month">{data.month}</span>
                  </div>
                ))}
              </div>
              <p className="chart-note">
                Revenue growth: +18.2% vs last quarter
              </p>
            </div>

            {/* Top Routes */}
            <div className="analytics-card">
              <h3>Top Performing Routes</h3>
              <ul className="analytics-list">
                {analyticsData.topRoutes.map((route, i) => (
                  <li key={i} className="route-item">
                    <div>
                      <strong>{route.route}</strong>
                      <p className="route-stats">
                        {route.moves} moves | {route.revenue}
                      </p>
                    </div>
                    <div className="route-bar">
                      <div
                        className="route-progress"
                        style={{ width: `${(route.moves / 250) * 100}%` }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Metrics */}
            <div className="analytics-card full-width">
              <h3>Key Performance Indicators</h3>
              <div className="kpi-grid">
                <div className="kpi-item">
                  <div className="kpi-label">Average Move Value</div>
                  <div className="kpi-value">KES 2,850</div>
                </div>
                <div className="kpi-item">
                  <div className="kpi-label">Customer Retention Rate</div>
                  <div className="kpi-value">87.3%</div>
                </div>
                <div className="kpi-item">
                  <div className="kpi-label">On-Time Completion</div>
                  <div className="kpi-value">94.2%</div>
                </div>
                <div className="kpi-item">
                  <div className="kpi-label">Average Rating</div>
                  <div className="kpi-value">4.7/5</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
