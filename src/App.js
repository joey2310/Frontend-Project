import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import NavigationBar from './common/NavigationBar/NavigationBar';
import PrivateRoute from './common/PrivateRoute/PrivateRoute';
import AuthContextProvider from './common/AuthContext/AuthContext';
import Products from './components/Products/Products';
import AddProduct from './components/AddProduct/AddProduct';
import SingleProduct from './components/SingleProduct/SingleProduct';
import CreateOrder from './components/CreateOrder/CreateOrder';


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
          <Route path="/products" element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>} />
            <Route path="/add-product" element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>} />
            <Route path="/products/:productId" element={
            <PrivateRoute>
              <SingleProduct />
            </PrivateRoute>} />
            <Route path="/create-order" element={
            <PrivateRoute>
              <CreateOrder />
            </PrivateRoute>} />
          {/* 
          
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
