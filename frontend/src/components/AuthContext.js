import React, { createContext, useState, useContext } from 'react';

// Create Context
const AuthContext = createContext();

// Context Provider Component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ loggedIn: false });

  const login = (token) => {
    // Your login logic here
    setAuthState({ loggedIn: true });
  };

  const logout = () => {
    // Your logout logic here
    setAuthState({ loggedIn: false });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
