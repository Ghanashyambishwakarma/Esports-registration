import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-bg-effect"></div>
      <div className="header-container">
        <div className="logo-section">
          <div className="logo-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5L35 12.5V27.5L20 35L5 27.5V12.5L20 5Z" stroke="currentColor" strokeWidth="2"/>
              <circle cx="20" cy="20" r="6" fill="currentColor"/>
              <path d="M20 14V26M14 20H26" stroke="var(--bg-dark)" strokeWidth="2"/>
            </svg>
          </div>
          <div className="logo-text">
            <h1>ESPORTS<span className="arena">ARENA</span></h1>
            <p className="tagline">Tournament Registration System</p>
          </div>
        </div>
        
        {/* <nav className="nav-links">
          <a href="#register" className="nav-link">Register</a>
          <a href="#admin" className="nav-link">Admin</a>
        </nav> */}
      </div>
      <div className="header-line"></div>
    </header>
  );
};

export default Header;
