import React, { useState } from 'react'; // useState import kiya hai Modal control karne ke liye
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Link nikal diya hai
import 'bootstrap/dist/css/bootstrap.min.css';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import Login from './components/Login';
import Register from './components/Register';
import ChangePassword from './components/ChangePassword';

function App() {
  const token = localStorage.getItem("jwtToken");

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = '/login';
  };

  const Dashboard = () => {
    // Modal state for Change Password
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    return (
      <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', paddingBottom: '50px' }}>

        {/* --- ENTERPRISE NAVBAR START --- */}
        <nav className="navbar navbar-expand-lg shadow-sm mb-4" style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', padding: '15px 0' }}>
          <div className="container">
            <span className="navbar-brand fw-bold text-white d-flex align-items-center" style={{ letterSpacing: '1px' }}>
              <span className="me-2" style={{ fontSize: '1.5rem' }}>🛡️</span>
              Secure Contact Manager
            </span>

            <div className="d-flex align-items-center">
              <span className="text-white-50 me-4 small fw-medium d-none d-md-block" style={{ letterSpacing: '0.5px' }}>
                ● Authenticated Session
              </span>

              {/* Rendered as a button to control modal visibility. */}
              <button
                onClick={() => setShowPasswordModal(true)}
                className="btn btn-sm btn-outline-light me-3 fw-bold rounded-pill px-3 d-flex align-items-center"
                style={{ transition: 'all 0.3s ease' }}
              >
                <span className="me-1">🔑</span> Change Password
              </button>

              <button
                className="btn btn-sm fw-bold text-white shadow d-flex align-items-center"
                onClick={handleLogout}
                style={{
                  background: 'rgba(220, 53, 69, 0.9)',
                  borderRadius: '50rem',
                  padding: '8px 20px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease'
                }}
              >
                Logout <span className="ms-1">🔒</span>
              </button>
            </div>
          </div>
        </nav>
        {/* --- ENTERPRISE NAVBAR END --- */}

        <div className="container">
          <div className="mb-2 d-flex justify-content-end w-100">
            <AddContact />
          </div>
          <div>
            <ContactList />
          </div>
        </div>

        {/* Yahan hum ChangePassword Modal component render kar rahe hain */}
        <ChangePassword
          showModal={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
        />

      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/contacts" /> : <Login />} />
        <Route path="/register" element={token ? <Navigate to="/contacts" /> : <Register />} />

        {/* The change password route was removed; it now opens exclusively as a modal on the dashboard. */} 
        <Route path="/contacts" element={token ? <Dashboard /> : <Navigate to="/login" />} />

        <Route path="*" element={<Navigate to={token ? "/contacts" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;