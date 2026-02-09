import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header({ onNavigate, active }) {
  const { user, signOut } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-inner">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onNavigate("home")}
        >
          <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
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
          <span className="font-semibold text-xl text-gray-900">SmartMove</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button
            className={`nav-link ${active === "services" ? "text-indigo-600" : ""}`}
            onClick={() => onNavigate("services")}
          >
            Services
          </button>
          <button
            className={`nav-link ${active === "about" ? "text-indigo-600" : ""}`}
            onClick={() => onNavigate("about")}
          >
            About
          </button>
          <button
            className={`nav-link ${active === "inventory" ? "text-indigo-600" : ""}`}
            onClick={() => onNavigate("inventory")}
          >
            Inventory
          </button>
          <button
            className={`nav-link ${active === "mymoves" ? "text-indigo-600" : ""}`}
            onClick={() => onNavigate("mymoves")}
          >
            My Moves
          </button>
          <button
            className={`nav-link ${active === "movers" ? "text-indigo-600" : ""}`}
            onClick={() => onNavigate("movers")}
          >
            Find Movers
          </button>
          <button
            className={`nav-link ${active === "booking" ? "text-indigo-600" : ""}`}
            onClick={() => onNavigate("booking")}
          >
            Booking
          </button>
          <button
            className={`nav-link ${active === "map" ? "text-indigo-600" : ""}`}
            onClick={() => onNavigate("map")}
          >
            Track
          </button>
          <button
            className={`nav-link ${active === "support" ? "text-indigo-600" : ""}`}
            onClick={() => onNavigate("support")}
          >
            Support
          </button>
          {user && user.role === "admin" && (
            <button
              className={`nav-link ${active === "admin" ? "text-indigo-600" : ""}`}
              onClick={() => onNavigate("admin")}
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
                onClick={signOut}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                className={`nav-btn ${active === "signup" ? "active" : ""}`}
                onClick={() => onNavigate("signup")}
              >
                Sign Up
              </button>
              <button
                className={`nav-btn ${active === "login" ? "active" : ""}`}
                onClick={() => onNavigate("login")}
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
