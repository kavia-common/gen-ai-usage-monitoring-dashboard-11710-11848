import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../state/useAuth';

/**
 * PUBLIC_INTERFACE
 * Login page for mock auth. Accepts admin@example.com or viewer@example.com
 * with a password of at least 6 characters.
 */
export default function Login() {
  const { login, error } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      const dest = location.state?.from?.pathname || '/';
      nav(dest, { replace: true });
    } catch {
      // error handled in context
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="container">
        <div className="card auth-card">
          <h2 style={{ margin: '0 0 8px 0' }}>Sign in</h2>
          <div className="helper">Use admin@example.com or viewer@example.com</div>
          {error && <div className="helper" style={{ color: '#EF4444' }}>{error}</div>}
          <form onSubmit={onSubmit} className="section">
            <div className="form-row">
              <label>
                <div className="kpi-title">Email</div>
                <input
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label>
                <div className="kpi-title">Password</div>
                <input
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  minLength={6}
                  required
                />
              </label>
              <button className="btn btn-primary" type="submit" disabled={submitting}>
                {submitting ? 'Signing in…' : 'Sign in'}
              </button>
            </div>
          </form>
          <div className="helper">This is a local mock authentication. No data is sent to a server.</div>
        </div>
      </div>
    </div>
  );
}
