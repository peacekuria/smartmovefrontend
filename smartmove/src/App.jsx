import React, { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Signup from './pages/Signup'
import MyMoves from './pages/MyMoves'
import Inventory from './pages/Inventory'
import Movers from './pages/Movers'
import Booking from './pages/Booking'
import MapView from './pages/MapView'
import Admin from './pages/Admin'
import Login from './pages/Login'
export default function App() {
  const [page, setPage] = useState('home')
  const [selectedMover, setSelectedMover] = useState(null)

  return (
    <AuthProvider>
      <div className="app">
        <Header onNavigate={setPage} active={page} />
        <main className="container">
          {page === 'home' && <Home onNavigate={setPage} />}
          {page === 'services' && <Services onNavigate={setPage} />}
          {page === 'about' && <About onNavigate={setPage} />}
          {page === 'mymoves' && <MyMoves onNavigate={setPage} />}
          {page === 'inventory' && <Inventory onNavigate={setPage} />}
          {page === 'movers' && <Movers onBook={(m) => { setSelectedMover(m); setPage('booking') }} />}
          {page === 'booking' && (
            <Booking
              onNavigate={setPage}
              selectedMover={selectedMover}
              onConfirm={(details) => {
                // For now just navigate to MyMoves and show a simple confirmation
                alert(`Booking confirmed with ${details.mover?.name || 'N/A'} on ${details.date}`)
                // reset selected mover after confirmation
                setSelectedMover(null)
                setPage('mymoves')
              }}
            />
          )}
          {page === 'map' && <MapView />}
          {page === 'admin' && <Admin />}
          {page === 'auth' && <Login onSuccess={() => setPage('home')} />}
          {page === 'signup' && <Signup onSuccess={() => setPage('home')} onNavigate={setPage} />}
        </main>
      </div>
    </AuthProvider>
  )
}
