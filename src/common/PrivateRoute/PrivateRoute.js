import React, { useContext } from 'react';
import {  Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';

function PrivateRoute({ children }) {

    const user =JSON.parse(localStorage.getItem('user'));
    return user ? children : <Navigate to="/login" />;
  }
  
  export default PrivateRoute;
