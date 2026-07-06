import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import './styles/index.css';
import './App.css';

const AdminEntry = () => {
  const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
  return <Navigate to={isAuthenticated ? '/admin-dashboard' : '/admin-login'} replace />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/admin" element={<AdminEntry />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="footer-content">
            <p className="footer-text">
              © 2026 ESPORTSARENA • Tournament Registration System
            </p>
            <div className="footer-links">
              <a href="#privacy" className="footer-link">Privacy Policy</a>
              <a href="#terms" className="footer-link">Terms of Service</a>
              <a href="#contact" className="footer-link">Contact</a>
            </div>
          </div>
        </footer>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{
            background: 'var(--bg-card)',
            border: '2px solid var(--primary-neon)',
            boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 600
          }}
        />
      </div>
    </Router>
  );
}

export default App;
