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

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState(null);
  const [selectedMover, setSelectedMover] = useState(null);

  const navigate = (nextPage) => {
    setPage(nextPage);
  };

  const handleLoginSuccess = (user) => {
    setRole(user.role);

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
      case "home":
        return <Home onNavigate={navigate} />;

      case "services":
        return <Services onNavigate={navigate} />;

      case "about":
        return <About onNavigate={navigate} />;

      case "login":
        return <Login onSuccess={handleLoginSuccess} onNavigate={navigate} />;

      case "signup":
        return (
          <Signup onSuccess={() => setPage("login")} onNavigate={navigate} />
        );

      case "client-dashboard":
        return (
          <ProtectedRoute userRole={role} allowedRoles={["client"]}>
            <ClientDashboard onNavigate={navigate} />
          </ProtectedRoute>
        );

      case "mover-dashboard":
        return (
          <ProtectedRoute userRole={role} allowedRoles={["mover"]}>
            <MoverDashboard onNavigate={navigate} />
          </ProtectedRoute>
        );

      case "admin":
        return (
          <ProtectedRoute userRole={role} allowedRoles={["admin"]}>
            <Admin onNavigate={navigate} />
          </ProtectedRoute>
        );

      case "mymoves":
        return <MyMoves onNavigate={navigate} />;

      case "inventory":
        return <Inventory onNavigate={navigate} />;

      case "movers":
        return (
          <Movers
            onNavigate={navigate}
            onBook={(mover) => {
              setSelectedMover(mover);
              setPage("booking");
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

      case "map":
        return <MapView onNavigate={navigate} />;

      case "support":
        return <Support onNavigate={navigate} />;

      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <AuthProvider>
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
