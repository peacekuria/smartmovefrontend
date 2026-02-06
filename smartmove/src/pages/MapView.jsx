import React, { useState } from "react";
import "./MapView.css";

export default function MapView() {
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
    }, 500);
  }

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="card mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Map & Tracking</h2>
        <p className="text-gray-600 mt-1">
          Pin locations for accurate quotes and real-time tracking
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <div className="card overflow-hidden">
            <div className="h-[400px] bg-gray-100 rounded-xl overflow-hidden relative">
              {/* Map Placeholder with styling */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-indigo-600"
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
                  <p className="text-gray-500">Interactive map preview</p>
                  <p className="text-sm text-gray-400">
                    Enter an address to view location
                  </p>
                </div>
              </div>

              {/* Google Maps iframe (uncomment to use real maps) */}
              {/* 
              <iframe 
                title="map"
                className="absolute inset-0 w-full h-full"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(pin || 'Current Location')}&output=embed`}
              />
              */}
            </div>

            {/* Pin Input */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Location
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter address or coordinates"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="input-field flex-1"
                />
                <button
                  onClick={pinLocation}
                  className="btn-primary whitespace-nowrap"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Pin Location
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Status */}
        <div className="lg:col-span-1 space-y-6">
          {/* Status Card */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tracking Status
            </h3>

            <div
              className={`p-4 rounded-xl mb-4 ${
                trackingStatus === "active"
                  ? "bg-green-50 border border-green-100"
                  : trackingStatus === "pinning"
                    ? "bg-indigo-50 border border-indigo-100"
                    : "bg-gray-50 border border-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    trackingStatus === "active"
                      ? "bg-green-100"
                      : trackingStatus === "pinning"
                        ? "bg-indigo-100"
                        : "bg-gray-200"
                  }`}
                >
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
              <span className="flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                Enable Notifications
              </span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-colors">
                <p className="font-medium text-gray-900">Current Location</p>
                <p className="text-sm text-gray-500">
                  Use GPS to pin current location
                </p>
              </button>
              <button className="w-full p-3 text-left rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-colors">
                <p className="font-medium text-gray-900">Saved Locations</p>
                <p className="text-sm text-gray-500">
                  Access previously saved addresses
                </p>
              </button>
              <button className="w-full p-3 text-left rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-colors">
                <p className="font-medium text-gray-900">Route Planner</p>
                <p className="text-sm text-gray-500">Plan your moving route</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
