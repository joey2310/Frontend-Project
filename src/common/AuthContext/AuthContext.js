import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // Initial state for user and authentication status
  const [user, setUser] = useState(null);

  // Function to handle user login (set user and isAuthenticated)
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));

  };

  // Function to handle user logout (clear user and isAuthenticated)
  const logout = () => {
    setUser(null);
    window.location.href = '/login';
  };


  useEffect(() => {
    // Check if user data is stored in localStorage (e.g., after page refresh)
    const storedUser = localStorage.getItem('user');

    console.log("Page Refreshed");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  useEffect(() => {
    // Save user data to localStorage when user and isAuthenticated change
    localStorage.setItem('user', JSON.stringify(user));
    console.log("Page Refreshed New");

  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

