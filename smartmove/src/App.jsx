import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";

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

import Admin from "./pages/Admin";
import MoverDashboard from "./pages/MoverDashboard";
import ClientDashboard from "./pages/ClientDashboard";

export default function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState(null);
  const [selectedMover, setSelectedMover] = useState(null);

  const handleLoginSuccess = (userRole) => {
    setRole(userRole);

    if (userRole === "admin") setPage("admin");
    if (userRole === "mover") setPage("mover-dashboard");
    if (userRole === "client") setPage("client-dashboard");
  };

  return (
    <AuthProvider>
      <div className="app">
        <Header onNavigate={setPage} active={page} role={role} />

        <main className="container">
          {/* Public pages */}
          {page === "home" && <Home onNavigate={setPage} />}
          {page === "services" && <Services onNavigate={setPage} />}
          {page === "about" && <About onNavigate={setPage} />}

          {/* Auth */}
          {page === "login" && (
            <Login onSuccess={handleLoginSuccess} onNavigate={setPage} />
          )}

          {page === "signup" && (
            <Signup onSuccess={() => setPage("login")} onNavigate={setPage} />
          )}

          {/* Client flow */}
          {page === "client-dashboard" && <ClientDashboard />}
          {page === "mymoves" && <MyMoves />}
          {page === "inventory" && <Inventory />}

          {page === "movers" && (
            <Movers
              onBook={(mover) => {
                setSelectedMover(mover);
                setPage("booking");
              }}
            />
          )}

          {page === "booking" && (
            <Booking
              selectedMover={selectedMover}
              onConfirm={(details) => {
                alert(
                  `Booking confirmed with ${
                    details.mover?.name || "N/A"
                  } on ${details.date}`,
                );
                setSelectedMover(null);
                setPage("mymoves");
              }}
            />
          )}

          {page === "map" && <MapView />}

          {/* Role dashboards */}
          {page === "admin" && role === "admin" && <Admin />}
          {page === "mover-dashboard" && role === "mover" && <MoverDashboard />}
        </main>
      </div>
    </AuthProvider>
  );
}
