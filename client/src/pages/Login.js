import React from 'react';
import { Link } from 'react-router-dom';
import SignInForm from '../components/SignInForm';

const Login = () => {

  return (
    <div className="auth-container">
      <div className="auth-content">
        <h1>Sign in</h1>
        <SignInForm />
        <div className="auth-link">
          Don't have an account? 
          <Link to="/register">Sign up here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;