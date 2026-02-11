import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import MyMoves from "./pages/MyMoves";
import Inventory from "./pages/Inventory";
import Movers from "./pages/Movers";
import Booking from "./pages/Booking";
import MapView from "./pages/MapView";
import Support from "./pages/Support";

import Admin from "./pages/Admin";
import MoverDashboard from "./pages/MoverDashboard";
import ClientDashboard from "./pages/ClientDashboard";

import ClientDemo from "./pages/ClientDemo";
import MoverDemo from "./pages/MoverDemo";
import AdminDemo from "./pages/AdminDemo";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import AccessDenied from "./components/AccessDenied";

export default function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState(null);
  const [selectedMover, setSelectedMover] = useState(null);
  const [loginRole, setLoginRole] = useState("client");

  const navigate = (nextPage, options = {}) => {
    // persist last visited page for context-aware navigation
    try {
      localStorage.setItem("lastPage", page || "home");
    } catch (e) {}
    if (options.role) {
      setLoginRole(options.role);
    }
    setPage(nextPage);
  };

  const handleLoginSuccess = (user) => {
    setRole(user.role);

    try {
      localStorage.setItem("userRole", user.role);
    } catch (e) {}

    if (user.role === "admin") {
      setPage("admin");
    } else if (user.role === "mover") {
      setPage("mover-dashboard");
    } else {
      setPage("client-dashboard");
    }
  };

  const renderPage = () => {
    switch (page) {
      case "map": {
        const storedRole = role || localStorage.getItem("userRole");
        let allow = false;
        if (storedRole === "mover" || storedRole === "admin") {
          allow = true;
        } else if (storedRole === "client") {
          try {
            const bookings = JSON.parse(
              localStorage.getItem("bookingHistory") || "[]",
            );
            allow = bookings.some(
              (b) => b.status === "Completed" || b.status === "completed",
            );
          } catch (e) {
            allow = false;
          }
        }

        if (!allow)
          return (
            <AccessDenied
              message={
                "Tracking is available to movers, admins, or clients with a verified booking."
              }
              onNavigate={navigate}
              required={["mover", "admin", "client (with booking)"]}
            />
          );

        return <MapView onNavigate={navigate} />;
      }
      case "signup":
        return (
          <Signup onSuccess={() => setPage("login")} onNavigate={navigate} />
        );

      case "services":
        return <Services onNavigate={navigate} />;

      case "about":
        return <About onNavigate={navigate} />;

      case "login":
        return (
          <Login
            role={loginRole}
            onSuccess={(user) => handleLoginSuccess(user)}
            onNavigate={navigate}
          />
        );

      case "client-demo":
        return <ClientDemo onNavigate={navigate} />;

      case "mover-demo":
        return <MoverDemo onNavigate={navigate} />;

      case "admin-demo":
        return <AdminDemo onNavigate={navigate} />;

      case "client-dashboard":
        return (
          <ProtectedRoute
            userRole={role}
            allowedRoles={["client"]}
            onNavigate={navigate}
          >
            <ClientDashboard onNavigate={navigate} />
          </ProtectedRoute>
        );

      case "mover-dashboard":
        return (
          <ProtectedRoute
            userRole={role}
            allowedRoles={["mover"]}
            onNavigate={navigate}
          >
            <MoverDashboard onNavigate={navigate} />
          </ProtectedRoute>
        );

      case "admin":
        return (
          <ProtectedRoute
            userRole={role}
            allowedRoles={["admin"]}
            onNavigate={navigate}
          >
            <Admin onNavigate={navigate} />
          </ProtectedRoute>
        );

      case "mymoves":
        return (
          <ProtectedRoute
            userRole={role}
            allowedRoles={["client", "mover", "admin"]}
            onNavigate={navigate}
          >
            <MyMoves onNavigate={navigate} />
          </ProtectedRoute>
        );

      case "inventory":
        return (
          <ProtectedRoute
            userRole={role}
            allowedRoles={["client", "mover"]}
            onNavigate={navigate}
          >
            <Inventory onNavigate={navigate} />
          </ProtectedRoute>
        );

      case "movers":
        return (
          <Movers
            onNavigate={navigate}
            onBook={(mover) => {
              setSelectedMover(mover);
              if (role === "client") {
                setPage("booking");
              } else {
                // prompt login as client if not logged-in client
                setLoginRole("client");
                setPage("login");
              }
            }}
          />
        );

      case "booking":
        return (
          <Booking
            onNavigate={navigate}
            selectedMover={selectedMover}
            onConfirm={() => setPage("mymoves")}
          />
        );

      case "map": {
        const storedRole = role || localStorage.getItem("userRole");
        let allow = false;
        if (storedRole === "mover" || storedRole === "admin") {
          allow = true;
        } else if (storedRole === "client") {
          try {
            const bookings = JSON.parse(
              localStorage.getItem("bookingHistory") || "[]",
            );
            allow = bookings.some(
              (b) => b.status === "Completed" || b.status === "completed",
            );
          } catch (e) {
            allow = false;
          }
        }

        if (!allow) return null;

        return <MapView onNavigate={navigate} />;
      }

      case "support":
        return <Support onNavigate={navigate} />;

      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <AuthProvider>
      <Header onNavigate={navigate} active={page} />
      <main>{renderPage()}</main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </AuthProvider>
  );
}
