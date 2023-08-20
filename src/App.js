import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './components/Login/Login';
import Signup from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import NavigationBar from './common/NavigationBar/NavigationBar';
import AuthContextProvider from './common/AuthContext/AuthContext';


function App() {
  return (
    <div className="App">
      {/* <AuthProvider> */}
      <AuthContextProvider>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* 
          Add more routes here as needed.
          Example:
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="/create-order" element={<CreateOrder />} />
          */}
        </Routes>
        </AuthContextProvider>
      {/* </AuthProvider> */}
    </div>
  );
}

export default App;
