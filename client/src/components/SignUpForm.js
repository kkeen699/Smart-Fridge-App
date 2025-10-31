import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createUser } from '../services/userAPI';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const { signUp } = useAuth();

  const validateForm = () => {
    const errors = {};

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = 'Please enter a valid email address';
    }

    if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const user = await signUp(formData.email, formData.password);
      await createUser(await user.getIdToken());

    } catch (err) {
      console.error('Sign-up failed:', err);
      const errorMessages = {
        'auth/email-already-in-use': 'An account with this email already exists',
        'auth/invalid-email': 'Please enter a valid email address',
        'auth/operation-not-allowed': 'Email/password accounts are not enabled. Please contact support.',
        'auth/weak-password': 'Please choose a stronger password'
      };

      setError(errorMessages[err.code] || err.message || 'Failed to create account');
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
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
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
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            className={validationErrors.password ? 'error' : ''}
            required
          />
          {validationErrors.password && (
            <span className="error-message">{validationErrors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className={validationErrors.confirmPassword ? 'error' : ''}
            required
          />
          {validationErrors.confirmPassword && (
            <span className="error-message">{validationErrors.confirmPassword}</span>
          )}
        </div>

        {error && <div className="error-message global-error">Error: {error}</div>}

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;