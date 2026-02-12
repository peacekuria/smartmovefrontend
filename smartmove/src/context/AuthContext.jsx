import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const normalizeUser = (user) => {
    if (!user) return null;
    const normalized = { ...user };
    if (normalized.role === 'customer') {
      normalized.role = 'client';
    }
    // Synthesize name if it exists but is missing from name field
    if (!normalized.name && (normalized.first_name || normalized.last_name)) {
      normalized.name = `${normalized.first_name || ''} ${normalized.last_name || ''}`.trim();
    }
    return normalized;
  };

  useEffect(() => {
    const raw = localStorage.getItem("sm_user");
    if (raw && raw !== "undefined") {
      try {
        const parsed = JSON.parse(raw);
        if (parsed) setUser(normalizeUser(parsed));
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
        localStorage.removeItem("sm_user");
      }
    } else if (raw === "undefined") {
      localStorage.removeItem("sm_user");
    }
  }, []);

  function signOut() {
    localStorage.removeItem('sm_user')
    localStorage.removeItem('auth_token')
    localStorage.removeItem('userRole')
    setUser(null)
  }

  function signIn(user, token) {
    if (!user) {
      console.error("Attempted to sign in with invalid user data");
      return;
    }
    const normalized = normalizeUser(user);
    localStorage.setItem('sm_user', JSON.stringify(normalized));
    localStorage.setItem('auth_token', token); // Store token for API calls
    localStorage.setItem('userRole', normalized.role);
    setUser(normalized);
  }

  return (
    <AuthContext.Provider value={{ user, signOut, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
