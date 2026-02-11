import React from "react";

export default function SectionHeading({ title, subtitle }) {
  return (
    <div
      style={{
        marginBottom: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: 40,
          letterSpacing: "-1px",
          color: "#111827",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ margin: "8px 0 0", color: "#6b7280" }}>{subtitle}</p>
      )}
    </div>
  );
}
