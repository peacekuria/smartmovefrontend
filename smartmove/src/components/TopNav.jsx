import React from "react";

export default function TopNav({ onNavigate }) {
  return (
    <div
      style={{
        width: "100%",
        background: "#fafafa",
        borderBottom: "1px solid rgba(0,0,0,0.04)",
        padding: "8px 16px",
        display: "flex",
        justifyContent: "flex-end",
        gap: 12,
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={() => onNavigate("services")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#374151",
          fontWeight: 600,
        }}
      >
        Services
      </button>
      <button
        onClick={() => onNavigate("about")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#374151",
          fontWeight: 600,
        }}
      >
        About
      </button>
    </div>
  );
}
