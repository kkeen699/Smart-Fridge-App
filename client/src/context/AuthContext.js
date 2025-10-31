import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { auth } from '../services/firebaseClient';

const AuthContext = createContext({
  currentUser: null,
  loading: true,
  signUp: () => Promise.resolve(),
  logIn: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  getToken: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = async (email, password) => {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return user;
  };

  const logIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const getToken = async () => {
    if (currentUser) {
      return await currentUser.getIdToken();
    } else {
      throw new Error('No user is currently logged in');
    }
  };

  const value = {
    currentUser,
    loading,
    signUp,
    logIn,
    logOut,
    getToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}

// RequireAuth component to protect routes
export const RequireAuth = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export const RequireNoAuth = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (currentUser) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default AuthContext;
