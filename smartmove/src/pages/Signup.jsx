import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import './Signup.css'

export default function Signup({ onSuccess, onNavigate }) {
  const { signIn } = useContext(AuthContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!agree) return alert('Please accept the terms')
    setLoading(true)
    const user = { name: `${firstName || 'User'} ${lastName || ''}`.trim(), email, role: 'client' }
    setTimeout(() => {
      signIn(user)
      setLoading(false)
      if (onSuccess) onSuccess()
    }, 600)
  }

  // Inline icons to avoid adding dependencies
  const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="input-icon">
      <path d="M12 12a5 5 0 100-10 5 5 0 000 10z" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 20a9 9 0 0118 0" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  const MailIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="input-icon">
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  const LockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="input-icon">
      <rect x="3" y="11" width="18" height="10" rx="2" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 11V8a5 5 0 0110 0v3" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  const GithubIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 2C6.477 2 2 6.485 2 12.02c0 4.43 2.866 8.19 6.839 9.51.5.09.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.07 1.532 1.034 1.532 1.034.892 1.528 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.337-2.22-.253-4.555-1.113-4.555-4.955 0-1.093.39-1.987 1.03-2.685-.103-.254-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.56 9.56 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.295 2.748-1.025 2.748-1.025.547 1.379.203 2.396.1 2.65.64.698 1.028 1.592 1.028 2.685 0 3.852-2.339 4.699-4.566 4.946.36.31.68.92.68 1.856 0 1.338-.012 2.418-.012 2.748 0 .268.18.577.688.48A10.02 10.02 0 0022 12.02C22 6.485 17.523 2 12 2z" />
    </svg>
  )

  return (
    <div className="signup-container">
      <div className="brand-logo">
        <div style={{ background: '#000', padding: '6px', borderRadius: '6px' }}>
          <img src="/truck-icon.svg" alt="logo" width="20" style={{ filter: 'invert(1)' }} />
        </div>
        <h1>SmartMove</h1>
      </div>

      <div className="signup-card">
        <h2>Create Your Account</h2>
        <p className="subtitle">Get started with SmartMove today</p>

        <form onSubmit={handleSubmit}>
          <div className="name-grid">
            <div className="form-group">
              <label>First Name</label>
              <div className="input-wrapper">
                <UserIcon />
                <input type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <div className="input-wrapper">
                <input type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ paddingLeft: '12px' }} />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <MailIcon />
              <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <LockIcon />
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right: '10px', color: '#9ca3af', cursor: 'pointer' }} aria-hidden>
                <path d="M1.42 12C2.73 7.55 6.6 4 12 4c5.4 0 9.27 3.55 10.58 8-.7 2.72-2.5 4.92-4.83 6.28C15.6 20.06 13.84 20.5 12 20.5c-1.84 0-3.6-.44-6-1.98C3.92 16.92 2.12 14.72 1.42 12z" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="password-hint">Must be at least 8 characters long</p>
          </div>

          <label className="terms-label">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <span>I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong></span>
          </label>

          <button type="submit" className="btn-create" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
        </form>

        <div className="divider">
          <span>OR CONTINUE WITH</span>
        </div>

        <div className="social-row">
          <button className="btn-social" onClick={() => { setLoading(true); setTimeout(() => { signIn({ name: 'Google User', email: 'google@example.com', role: 'client' }); setLoading(false); if (onSuccess) onSuccess(); }, 400) }}>
            <img src="https://www.google.com/favicon.ico" width="14" alt="Google" />
            Google
          </button>
          <button className="btn-social" onClick={() => { setLoading(true); setTimeout(() => { signIn({ name: 'GitHub User', email: 'github@example.com', role: 'client' }); setLoading(false); if (onSuccess) onSuccess(); }, 400) }}>
            <GithubIcon />
            GitHub
          </button>
        </div>

        <p className="login-link">
          Already have an account? <span onClick={() => onNavigate ? onNavigate('auth') : null}>Sign in</span>
        </p>
      </div>
    </div>
  )
}
