import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-content">
        <h1>Create an Account</h1>
        <SignUpForm />
        <div className="auth-link">
          Already have an account? 
          <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;