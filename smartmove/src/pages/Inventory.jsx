import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Inventory.css";

const TEMPLATES = {
  Bedsitter: ["Bed", "Wardrobe", "Table", "Chairs"],
  Studio: ["Bed", "Sofa", "Wardrobe", "Dining Table", "Boxes"],
  "1BR": ["Bed", "Sofa", "Dining Table", "Fridge", "Washing Machine"],
  "2BR": [
    "2 Beds",
    "Sofa",
    "Dining Table",
    "Fridge",
    "Washing Machine",
    "Boxes",
  ],
};

export default function Inventory({ onNavigate }) {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [template, setTemplate] = useState("Bedsitter");
  const [custom, setCustom] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("sm_inventory");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("sm_inventory", JSON.stringify(items));
  }, [items]);

  function applyTemplate(name) {
    setTemplate(name);
    const list = TEMPLATES[name].map((i) => ({ text: i, done: false }));
    setItems(list);
  }

  function addCustom() {
    if (!custom.trim()) return;
    setItems((prev) => [...prev, { text: custom.trim(), done: false }]);
    setCustom("");
  }

  function toggleIndex(i) {
    setItems((prev) =>
      prev.map((it, idx) => (idx === i ? { ...it, done: !it.done } : it)),
    );
  }

  function removeItem(i) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  const completedCount = items.filter((i) => i.done).length;
  const progress =
    items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <div className="inventory-page">
      {/* Back Button (returns to last visited page when available) */}
      <div className="inventory-header">
        <button
          className="btn-back"
          onClick={() => {
            const last = localStorage.getItem("lastPage");
            if (last && last !== "inventory") {
              onNavigate && onNavigate(last);
              return;
            }
            const role = localStorage.getItem("userRole");
            if (role === "mover") onNavigate && onNavigate("mover-dashboard");
            else if (role === "admin") onNavigate && onNavigate("admin");
            else onNavigate && onNavigate("home");
          }}
        >
          ← Back
        </button>
      </div>

      <div className="inventory-content">
        {/* Progress Card */}
        <div className="card mb-6 progress-card">
          <div className="progress-header">
            <div>
              <h2>Inventory Checklist</h2>
              <p>Organize your move room by room</p>
            </div>
            <div className="progress-circle">
              <span>{progress}%</span>
            </div>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="progress-text">
            {completedCount} of {items.length} items completed
          </p>
        </div>

        {/* Templates */}
        <div className="card mb-6">
          <h3>Quick Start Templates</h3>
          <div className="template-buttons">
            {Object.keys(TEMPLATES).map((t) => (
              <button
                key={t}
                onClick={() => applyTemplate(t)}
                className={`template-btn ${template === t ? "active" : ""}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Add Custom Item */}
        <div className="card mb-6">
          <h3>Add Custom Item</h3>
          <div className="custom-add">
            <input
              type="text"
              placeholder="Enter item name..."
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addCustom()}
            />
            <button className="btn-primary" onClick={addCustom}>
              Add
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="card">
          <h3>Your Items</h3>
          {items.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <p>No items yet. Add items above or select a template.</p>
            </div>
          ) : (
            <ul className="item-list">
              {items.map((it, i) => (
                <li key={i} className={it.done ? "done" : ""}>
                  <button onClick={() => toggleIndex(i)} className="check-btn">
                    {it.done && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  <span>{it.text}</span>
                  <button onClick={() => removeItem(i)} className="delete-btn">
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* User Role */}
        <div className="card mt-6">
          <p>
            <strong>Current role:</strong> {user ? user.role : "Guest"}
          </p>
        </div>
      </div>
    </div>
  );
}
