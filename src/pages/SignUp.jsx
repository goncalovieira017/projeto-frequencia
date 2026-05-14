import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Simulated registration
    navigate('/login');
  };

  return (
    <main className="d-flex align-items-center justify-content-center" style={{ minHeight: '85vh', backgroundColor: '#f8f9fa' }}>
      <div className="card" style={{ borderRadius: '20px', border: 'none', boxShadow: '0 12px 48px rgba(0,0,0,0.1)', maxWidth: '450px', width: '100%', margin: '0 20px' }}>
        <div className="card-body p-5">
          <h1 className="mb-2 text-center" style={{ fontSize: '1.8rem', fontWeight: '700' }}>
            Create Your Account
          </h1>
          <p className="text-muted text-center mb-4">Join us to explore amazing experiences</p>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ borderRadius: '10px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="form-label fw-bold" style={{ fontSize: '0.95rem' }}>
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
              <label htmlFor="email" className="form-label fw-bold" style={{ fontSize: '0.95rem' }}>
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
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
                placeholder="Create a password"
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

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label fw-bold" style={{ fontSize: '0.95rem' }}>
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              Create Account
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#fd7e14', fontWeight: '600', textDecoration: 'none' }}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default SignUp;
