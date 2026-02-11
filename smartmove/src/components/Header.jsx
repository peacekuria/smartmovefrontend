import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Header.css";

export default function Header({ onNavigate, active }) {
  const { user, signOut } = useContext(AuthContext);
  const safeNavigate = (page, options) => {
    if (typeof onNavigate === "function") {
      onNavigate(page, options || {});
    } else if (typeof window !== "undefined") {
      // fallback: update location hash so user still sees something
      window.location.hash = `#${page}`;
    }
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div
          className="logo-container"
          onClick={() => onNavigate("home")}
          role="button"
          aria-label="Go to home"
        >
          <div className="h-11 w-11 rounded-lg bg-gradient-logo flex items-center justify-center logo-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
          </div>
          <div className="logo-text">
            <span className="font-semibold text-xl text-gray-900">
              Smart<span className="logo-highlight">Move</span>
            </span>
            <small className="logo-tagline">Reliable moving, simplified</small>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button
            type="button"
            className={`nav-link ${active === "about" ? "text-indigo-600" : ""}`}
            onClick={() => safeNavigate("about")}
          >
            About
          </button>
          <button
            type="button"
            className={`nav-link ${active === "services" ? "text-indigo-600" : ""}`}
            onClick={() => safeNavigate("services")}
          >
            Services
          </button>
          {user && (user.role === "client" || user.role === "mover") && (
            <button
              type="button"
              className={`nav-link ${active === "inventory" ? "text-indigo-600" : ""}`}
              onClick={() => safeNavigate("inventory")}
            >
              Inventory
            </button>
          )}
          {user && user.role === "client" && (
            <button
              type="button"
              className={`nav-link ${active === "mymoves" ? "text-indigo-600" : ""}`}
              onClick={() => safeNavigate("mymoves")}
            >
              My Moves
            </button>
          )}
          {user && user.role === "client" && (
            <button
              className={`nav-link ${active === "movers" ? "text-indigo-600" : ""}`}
              onClick={() => safeNavigate("movers")}
            >
              Find Movers
            </button>
          )}
          {user && user.role === "client" && (
            <button
              className={`nav-link ${active === "booking" ? "text-indigo-600" : ""}`}
              onClick={() => safeNavigate("booking")}
            >
              Booking
            </button>
          )}
          {user &&
            (user.role === "client" ||
              user.role === "mover" ||
              user.role === "admin") && (
              <button
                className={`nav-link ${active === "map" ? "text-indigo-600" : ""}`}
                onClick={() => safeNavigate("map")}
              >
                Track
              </button>
            )}
          <button
            className={`nav-link ${active === "support" ? "text-indigo-600" : ""}`}
            onClick={() => safeNavigate("support")}
          >
            Support
          </button>
          {user && user.role === "admin" && (
            <button
              className={`nav-link ${active === "admin" ? "text-indigo-600" : ""}`}
              onClick={() => safeNavigate("admin")}
            >
              Admin
            </button>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-sm font-medium text-indigo-600">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <button
                onClick={() => {
                  signOut();
                  safeNavigate("home");
                }}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                className={`nav-btn ${active === "signup" ? "active" : ""}`}
                onClick={() => safeNavigate("signup")}
              >
                Sign Up
              </button>
              <button
                className={`nav-btn ${active === "login" ? "active" : ""}`}
                onClick={() => safeNavigate("login")}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
