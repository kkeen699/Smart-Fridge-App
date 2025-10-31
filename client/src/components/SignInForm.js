import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const { login } = useAuth();

  const validateForm = () => {
    const errors = {};
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = 'Please enter a valid email address';
    }
    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      const user = await login(email, password);
    } catch (err) {
      console.error('Sign-in failed:', err);
      // Handle Firebase Auth errors
      if (err.code) {
        setError(err.code.replace('auth/', '').replace(/-/g, ' '));
      } else {
        setError(err.message || 'An unknown error occurred during sign in.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={validationErrors.email ? 'error' : ''}
            required
          />
          {validationErrors.email && (
            <span className="error-message">{validationErrors.email}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={validationErrors.password ? 'error' : ''}
            required
          />
          {validationErrors.password && (
            <span className="error-message">{validationErrors.password}</span>
          )}
        </div>
        {error && <div className="error-message global-error">Error: {error}</div>}
        
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Logging In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}

export default SignInForm;