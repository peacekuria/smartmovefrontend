import React from "react";

export default function ProtectedRoute({ userRole, allowedRoles, children }) {
  if (!userRole) {
    return null;
  }

  if (!allowedRoles.includes(userRole)) {
    return null;
  }

  return children;
}
