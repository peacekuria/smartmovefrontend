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
      {/* Header is rendered globally by the app; inventory content follows */}

      <div className="inventory-content">
        {/* Header Card */}
        <div className="card mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Inventory Checklist
              </h2>
              <p className="text-gray-600 mt-1">
                Organize your move room by room
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {completedCount} of {items.length} items
                </p>
                <p className="text-sm text-gray-500">{progress}% complete</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-semibold">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Template Selection */}
        <div className="card mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Start Templates
          </h3>
          <div className="flex flex-wrap gap-3">
            {Object.keys(TEMPLATES).map((t) => (
              <button
                key={t}
                onClick={() => applyTemplate(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  template === t
                    ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-300"
                    : "bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Add Custom Item */}
        <div className="card mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Add Custom Item
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter item name..."
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addCustom()}
              className="input-field flex-1"
            />
            <button onClick={addCustom} className="btn-primary">
              Add Item
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Your Items
          </h3>
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
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
              <p className="text-gray-500">
                No items yet. Add items above or select a template.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((it, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                    it.done
                      ? "bg-gray-50 border-gray-100"
                      : "bg-white border-gray-100 hover:border-indigo-200"
                  }`}
                >
                  <button
                    onClick={() => toggleIndex(i)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      it.done
                        ? "bg-indigo-600 border-indigo-600"
                        : "border-gray-300 hover:border-indigo-500"
                    }`}
                  >
                    {it.done && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
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
                  <span
                    className={`flex-1 text-gray-900 ${it.done ? "line-through text-gray-400" : ""}`}
                  >
                    {it.text}
                  </span>
                  <button
                    onClick={() => removeItem(i)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Role Info */}
        <div className="card mt-6">
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">Current role:</span>{" "}
            {user ? user.role : "guest"}
          </p>
        </div>
      </div>
    </div>
  );
}
