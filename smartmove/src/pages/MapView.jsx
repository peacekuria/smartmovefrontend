import React, { useState } from "react";
import "./MapView.css";

export default function MapView({ onNavigate }) {
  const [pin, setPin] = useState("");
  const [trackingStatus, setTrackingStatus] = useState("idle");

  function enableNotifications() {
    if (!("Notification" in window))
      return alert("Notifications not supported in this browser");
    Notification.requestPermission().then((p) => {
      if (p === "granted") {
        new Notification("SmartMove notifications enabled", {
          body: "You will receive updates about your move status.",
          icon: "/logo.svg",
        });
        setTrackingStatus("active");
      }
    });
  }

  function pinLocation() {
    if (!pin.trim()) {
      alert("Please enter an address or coordinates");
      return;
    }
    setTrackingStatus("pinning");
    setTimeout(() => {
      setTrackingStatus("active");
      alert(`Location pinned: ${pin}`);
    }, 600);
  }

  function goBack() {
    // Prefer returning to the last visited page saved by App.navigate
    const last = localStorage.getItem("lastPage");
    if (last && last !== "map") {
      onNavigate && onNavigate(last);
      return;
    }

    // Fallback to role-based dashboard
    const previousRole = localStorage.getItem("userRole");
    if (previousRole === "mover") {
      onNavigate && onNavigate("mover-dashboard");
    } else if (previousRole === "admin") {
      onNavigate && onNavigate("admin");
    } else {
      onNavigate && onNavigate("client-dashboard");
    }
  }

  return (
    <div className="mapview-page animate-fadeIn">
      {/* Back Button */}
      <button className="btn-back-home" onClick={goBack}>
        ← Back
      </button>

      {/* Header */}
      <div className="card mb-6 header-card">
        <h2 className="text-2xl font-bold text-gray-900">Map & Tracking</h2>
        <p className="text-gray-600 mt-1">
          Pin locations for accurate quotes and real-time tracking
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <div className="card map-card overflow-hidden rounded-xl shadow-lg">
            <div className="map-container">
              <div className="map-placeholder">
                <div className="placeholder-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-1.447-.894L15 7m0 13V7"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">
                  Interactive Map Preview
                </p>
                <p className="text-sm text-gray-400">
                  Enter an address to view your location
                </p>
              </div>
            </div>

            {/* Pin Input */}
            <div className="mt-6 pin-input">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Location
              </label>
              <div className="flex gap-3 flex-wrap">
                <input
                  type="text"
                  placeholder="Enter address or coordinates"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="input-field flex-1"
                />
                <button onClick={pinLocation} className="btn-primary">
                  Pin Location
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Status & Quick Actions */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="card tracking-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tracking Status
            </h3>
            <div
              className={`tracking-status p-4 rounded-xl mb-4 ${
                trackingStatus === "active"
                  ? "active"
                  : trackingStatus === "pinning"
                    ? "pinning"
                    : "idle"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="status-icon">
                  {trackingStatus === "active" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : trackingStatus === "pinning" ? (
                    <svg
                      className="animate-spin h-5 w-5 text-indigo-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {trackingStatus === "active"
                      ? "Tracking Active"
                      : trackingStatus === "pinning"
                        ? "Pinning Location..."
                        : "Not Tracking"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {trackingStatus === "active"
                      ? "Real-time updates enabled"
                      : "Enable notifications to track"}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={enableNotifications}
              className="btn-secondary w-full"
            >
              Enable Notifications
            </button>
          </div>

          <div className="card quick-actions-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              {["Current Location", "Saved Locations", "Route Planner"].map(
                (action, idx) => (
                  <button key={idx} className="quick-action-btn">
                    <p className="font-medium text-gray-900">{action}</p>
                    <p className="text-sm text-gray-500">
                      {action === "Current Location"
                        ? "Use GPS to pin current location"
                        : action === "Saved Locations"
                          ? "Access previously saved addresses"
                          : "Plan your moving route"}
                    </p>
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
