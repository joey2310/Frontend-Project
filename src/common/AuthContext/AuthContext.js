import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // Initial state for user and authentication status
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle user login (set user and isAuthenticated)
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
  };

  // Function to handle user logout (clear user and isAuthenticated)
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/login'; 
  };

  
  useEffect(() => {
    // Check if user data is stored in localStorage (e.g., after page refresh)
    const storedUser = localStorage.getItem('user');
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');

    if (storedUser && storedIsAuthenticated) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(JSON.parse(storedIsAuthenticated));
    }
  }, []);

  useEffect(() => {
    // Save user data to localStorage when user and isAuthenticated change
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [user, isAuthenticated]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

