import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useContext } from 'react';
import Login from './components/Login/Login';
import Signup from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import NavigationBar from './common/NavigationBar/NavigationBar';
import PrivateRoute from './common/PrivateRoute/PrivateRoute';
import AuthContextProvider from './common/AuthContext/AuthContext';
import Products from './components/Products/Products';
import AddProduct from './components/AddProduct/AddProduct';
import SingleProduct from './components/SingleProduct/SingleProduct';
import CreateOrder from './components/CreateOrder/CreateOrder';
import EventProvider, { EventContext } from './common/EventContext/EventContext';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';


function App() {

  const { event, setEvent } = useContext(EventContext);

  function renderAlert(event) {

    const { message, type } = event;
    switch (type) {

      case "error":
        return <Alert severity='error' >{message}</Alert>
      case "success":
        return <Alert severity='success' >{message}</Alert>
      default:
        return <Alert severity='info' >{message}</Alert>
    }
  }
  renderAlert(event);

  return (
    <div className="App">
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        style={{ top: "80px" }}
        open={event.isEvent}
        autoHideDuration={3000}
        onClose={() => setEvent((prev) => {
          return {
            ...prev,
            isEvent: false
          }
        })} >
        {renderAlert(event)}

      </Snackbar>
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
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
