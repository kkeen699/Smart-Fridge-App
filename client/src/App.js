import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthProvider, useAuth, RequireAuth, RequireNoAuth } from './context/AuthContext';

const AppContent = () => {
  const { currentUser, logOut } = useAuth() || {};

  return (
    <div className="App">
      <nav style={{ padding: 12, borderBottom: '1px solid #eee' }}>
        <Link to="/" style={{ marginRight: 12 }} replace> Smart Fridge </Link>
        {currentUser && (
          <>
            <span style={{ marginLeft: 12 }}>Hi, {currentUser.displayName || currentUser.email}</span>
            <button onClick={logOut} style={{ marginLeft: 12 }}>Logout</button>
          </>
        )}
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/register" element={<RequireNoAuth><Register /></RequireNoAuth>} />
          <Route path="/login" element={<RequireNoAuth><Login /></RequireNoAuth>} />
        </Routes>
      </main>
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
