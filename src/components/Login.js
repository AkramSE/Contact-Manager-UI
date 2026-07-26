import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault(); 
        setErrorMsg(''); 
        setIsLoading(true); 
        
        try {
            const response = await axios.post('http://localhost:8080/users/login', {
                email: email,
                password: password
            });

           if (response.data && response.data.token) {
                localStorage.setItem("jwtToken", response.data.token);
                localStorage.setItem("userId", response.data.id); 

                setTimeout(() => {
                    window.location.href = "/";
                }, 800);
            }
        } catch (error) {
            console.error("Login failed", error);
            setErrorMsg("Invalid Credentials. Please check your email or password.");
            setIsLoading(false); 
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(-45deg, #f3f4f6, #e0e7ff, #e5e7eb, #f8fafc)',
            backgroundSize: '400% 400%',
            animation: 'gradientBG 15s ease infinite',
            fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            margin: 0,
            padding: '20px'
        }}>
            
            <style>
                {`
                @keyframes gradientBG {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .premium-glass-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
                }
                .premium-input:focus {
                    border-color: #2a5298 !important;
                    box-shadow: 0 0 0 4px rgba(42, 82, 152, 0.1) !important;
                }
                `}
            </style>

            <div className="card premium-glass-card" style={{ width: '100%', maxWidth: '440px', borderRadius: '24px', overflow: 'hidden' }}>
                
                <div className="text-center p-5 pb-4">
                    <div className="d-inline-flex align-items-center justify-content-center mb-4" 
                         style={{ 
                             width: '75px', height: '75px', 
                             borderRadius: '22px', 
                             background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', 
                             color: 'white', fontSize: '32px', 
                             boxShadow: '0 12px 24px rgba(30,60,114,0.25)' 
                         }}>
                        🛡️
                    </div>
                    <h2 className="fw-bolder mb-2" style={{ color: '#0f172a', letterSpacing: '-0.5px' }}>Welcome Back</h2>
                    <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>Securely log in to your dashboard</p>
                </div>

                <div className="card-body px-5 pb-5 pt-0">
                    
                    {errorMsg && (
                        <div className="alert alert-danger d-flex align-items-center p-3 mb-4" 
                             style={{ borderRadius: '12px', border: '1px solid #fecaca', backgroundColor: '#fef2f2', color: '#991b1b', fontSize: '0.9rem' }}>
                            <span className="me-2 fw-bold">⚠️</span> {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        
                        <div className="form-floating mb-4 position-relative">
                            <input 
                                type="email" 
                                className="form-control premium-input" 
                                id="floatingEmail" 
                                placeholder="name@example.com"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                style={{ borderRadius: '14px', backgroundColor: '#f8fafc', border: '2px solid #e2e8f0', height: '60px', paddingLeft: '20px' }}
                            />
                            <label htmlFor="floatingEmail" className="text-muted fw-medium" style={{ paddingLeft: '20px' }}>Email Address</label>
                        </div>

                        <div className="form-floating mb-5 position-relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="form-control premium-input" 
                                id="floatingPassword" 
                                placeholder="Password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                style={{ borderRadius: '14px', backgroundColor: '#f8fafc', border: '2px solid #e2e8f0', height: '60px', paddingLeft: '20px', paddingRight: '50px' }}
                            />
                            <label htmlFor="floatingPassword" className="text-muted fw-medium" style={{ paddingLeft: '20px' }}>Password</label>
                            
                            <span 
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ 
                                    position: 'absolute', right: '20px', top: '18px', 
                                    cursor: 'pointer', fontSize: '1.2rem', color: '#64748b',
                                    userSelect: 'none'
                                }}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                        </div>

                        <button 
                            type="submit" 
                            className="btn w-100 fw-bold text-white d-flex justify-content-center align-items-center mb-4"
                            disabled={isLoading}
                            style={{ 
                                borderRadius: '14px', 
                                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', 
                                border: 'none',
                                height: '58px',
                                letterSpacing: '1px',
                                boxShadow: '0 8px 16px rgba(42, 82, 152, 0.25)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => !isLoading && (e.currentTarget.style.transform = 'translateY(-3px)')}
                            onMouseOut={(e) => !isLoading && (e.currentTarget.style.transform = 'translateY(0)')}
                        >
                            {isLoading ? (
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            ) : null}
                            {isLoading ? 'AUTHENTICATING...' : 'SECURE LOGIN'}
                        </button>

                        {/* Renders the link to the registration page. */}
                        <div className="text-center">
                            <span className="text-muted" style={{ fontSize: '0.95rem' }}>Don't have an account? </span>
                            <Link to="/register" className="fw-bold text-decoration-none" style={{ color: '#2a5298', fontSize: '0.95rem' }}>
                                Sign Up
                            </Link>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;