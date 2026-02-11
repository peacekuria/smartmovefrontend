import React from "react";

export default function AccessDenied({ message, onNavigate, required }) {
  return (
    <div
      style={{
        padding: 36,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: 720,
          background: "#fff",
          borderRadius: 12,
          padding: 28,
          boxShadow: "0 12px 40px rgba(2,6,23,0.08)",
          textAlign: "center",
        }}
      >
        <h3 style={{ margin: 0, fontSize: 20 }}>Access Restricted</h3>
        <p style={{ color: "#6b7280", marginTop: 12 }}>
          {message || "You do not have permission to view this page."}
        </p>
        {required && (
          <p style={{ color: "#9ca3af", marginTop: 6 }}>
            Required: {required.join(", ")}
          </p>
        )}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginTop: 18,
          }}
        >
          <button
            onClick={() => onNavigate && onNavigate("login")}
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => onNavigate && onNavigate("home")}
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              border: "none",
              background: "#4f46e5",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
}
