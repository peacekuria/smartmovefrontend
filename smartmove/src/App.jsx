import React, { useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
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

// Import API test utilities for development
if (import.meta.env.DEV) {
  import("./utils/apiTest");
}

export default function App() {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState("home");
  const [selectedMover, setSelectedMover] = useState(null);
  const [loginRole, setLoginRole] = useState("client");

  const navigate = (nextPage, options = {}) => {
    if (options.role) {
      setLoginRole(options.role);
    }
    setPage(nextPage);
  };

  const handleLoginSuccess = (user) => {
    const userRole = user.role || "client";

    if (userRole === "admin") {
      setPage("admin");
    } else if (userRole === "mover") {
      setPage("mover-dashboard");
    } else {
      setPage("client-dashboard");
    }
  };

  const renderPage = () => {
    const role = user?.role || null;
    switch (page) {
      case "map":
        return (
          <ProtectedRoute
            userRole={role}
            allowedRoles={["client", "mover", "admin"]}
            onNavigate={navigate}
          >
            <MapView onNavigate={navigate} />
          </ProtectedRoute>
        );
      case "signup":
        return (
          <Signup
            onSuccess={(selectedRole) => {
              setLoginRole(selectedRole || "client");
              setPage("login");
            }}
            onNavigate={navigate}
          />
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
          <ProtectedRoute
            userRole={role}
            allowedRoles={["client"]}
            onNavigate={navigate}
          >
            <Movers
              onNavigate={navigate}
              onBook={(mover) => {
                setSelectedMover(mover);
                setPage("booking");
              }}
            />
          </ProtectedRoute>
        );

      case "booking":
        return (
          <Booking
            onNavigate={navigate}
            selectedMover={selectedMover}
            onConfirm={() => setPage("mymoves")}
          />
        );

      case "support":
        return <Support onNavigate={navigate} />;

      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <>
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
    </>
  );
}
