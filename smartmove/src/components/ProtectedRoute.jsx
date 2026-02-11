import React from "react";
import AccessDenied from "./AccessDenied";

export default function ProtectedRoute({
  userRole,
  allowedRoles,
  children,
  onNavigate,
}) {
  if (!userRole) {
    return (
      <AccessDenied
        message={"You must be signed in to access this page."}
        onNavigate={onNavigate}
        required={allowedRoles}
      />
    );
  }

  if (!allowedRoles.includes(userRole)) {
    return (
      <AccessDenied
        message={"Your account does not have the required permissions."}
        onNavigate={onNavigate}
        required={allowedRoles}
      />
    );
  }

  return children;
}
