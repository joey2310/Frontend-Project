import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
import { AuthContext } from '../AuthContext/AuthContext';
import SearchBar from '../SearchBar/SearchBar';


function NavigationBar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar className="nav-container">
        <div className='logo-div'>
          <Link to="/" className="no-decoration">
            <div className='logo'>
              <IconButton edge="start" color="inherit" aria-label="logo">
                <ShoppingCartIcon />
              </IconButton>
              <Typography variant="h6">upGrad Eshop</Typography>
            </div>
          </Link>
          <div className='nav-links auth-links'>
            <Link to="/products">Products</Link>
            {user && user.isAdmin && (
              <Link to="/add-product">Add Products</Link>
            )
            }
          </div>
        </div>
        
        <div className="auth-links">
          {user ? (
            <>
            <SearchBar />
              <span>Welcome, {user.name}</span>
              <IconButton color="inherit" aria-label="logout" className='logout' onClick={logout}>
                <ExitToAppIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Link to="/login">
                <ExitToAppIcon />
                Login
              </Link>
              <Link to="/signup">
                <PersonAddIcon />
                Signup
              </Link>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
