import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Demo credentials
    if (email === 'demo@madeira.com' && password === 'demo123') {
      setShowToast(true);
      setTimeout(() => navigate('/'), 2000);
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <main className="d-flex align-items-center justify-content-center" style={{ minHeight: '85vh', backgroundColor: '#f8f9fa' }}>
      <div className="card" style={{ borderRadius: '20px', border: 'none', boxShadow: '0 12px 48px rgba(0,0,0,0.1)', maxWidth: '450px', width: '100%', margin: '0 20px' }}>
        <div className="card-body p-5">
          <h1 className="mb-2 text-center" style={{ fontSize: '1.8rem', fontWeight: '700' }}>
            Login to Roteiros Turísticos - Madeira
          </h1>
          <p className="text-muted text-center mb-4">Welcome back! Please login to continue.</p>

          {showToast && (
            <div id="toast" className="alert alert-success alert-dismissible fade show" role="alert" style={{ borderRadius: '10px' }}>
              Login successful
            </div>
          )}

          {error && (
            <div id="errorMessage" className="alert alert-danger alert-dismissible fade show" role="alert" style={{ borderRadius: '10px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label fw-bold" style={{ fontSize: '0.95rem' }}>
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="nome@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  borderRadius: '10px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  padding: '0.85rem',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-bold" style={{ fontSize: '0.95rem' }}>
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Digite a sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  borderRadius: '10px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  padding: '0.85rem',
                  fontSize: '1rem'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success btn-lg w-100"
              style={{
                backgroundColor: '#198754',
                border: 'none',
                borderRadius: '25px',
                padding: '0.85rem',
                fontWeight: '600',
                fontSize: '1rem'
              }}
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4">
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#fd7e14', fontWeight: '600', textDecoration: 'none' }}>
              Sign up here
            </Link>
          </p>

          <div className="mt-5 p-4" style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
            <p className="fw-bold mb-2" style={{ fontSize: '0.9rem' }}>Demo Account:</p>
            <p className="mb-1" style={{ fontSize: '0.9rem' }}>Email: <code>demo@madeira.com</code></p>
            <p style={{ fontSize: '0.9rem' }}>Password: <code>demo123</code></p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
