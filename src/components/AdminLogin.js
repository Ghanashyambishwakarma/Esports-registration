import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AdminLogin.css';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // IMPORTANT: Change this password for production!
  // For better security, consider using Firebase Authentication
  const ADMIN_PASSWORD = 'admin@2026';

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a brief delay for better UX
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        // Store authentication in sessionStorage
        sessionStorage.setItem('adminAuthenticated', 'true');
        toast.success('Access granted! Welcome, Admin.');
        navigate('/admin-dashboard');
      } else {
        toast.error('Invalid password. Access denied.');
        setPassword('');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="admin-login-section">
      <div className="login-container">
        <div className="login-header">
          <div className="lock-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="11" width="14" height="10" stroke="currentColor" strokeWidth="2" rx="2"/>
              <path d="M7 11V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79086 17 7V11" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="login-title">Admin Access</h2>
          <p className="login-subtitle">Enter password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter admin password"
              required
              autoFocus
            />
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading || !password}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Authenticating...
              </>
            ) : (
              <>
                <span className="btn-icon">🔓</span>
                Access Dashboard
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p className="security-note">
            <span className="warning-icon">⚠️</span>
            Restricted Area - Authorized Personnel Only
          </p>
          {/* <p className="default-password-note">
            Default password: <code>admin@2026</code>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;