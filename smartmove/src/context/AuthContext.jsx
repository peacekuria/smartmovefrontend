import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('sm_user')
    if (raw) setUser(JSON.parse(raw))
  }, [])

  function signOut() {
    localStorage.removeItem('sm_user')
    setUser(null)
  }

  function signIn(data) {
    localStorage.setItem('sm_user', JSON.stringify(data))
    setUser(data)
  }

  return (
    <AuthContext.Provider value={{ user, signOut, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
