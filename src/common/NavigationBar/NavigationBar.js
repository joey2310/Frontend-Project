import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
import { AuthContext } from '../AuthContext/AuthContext';


function NavigationBar() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);


  return (
    <AppBar position="static">
      <Toolbar className="nav-container">
        <div className='logo'>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <ShoppingCartIcon />
          </IconButton>
          <Typography variant="h6">upGrad Eshop</Typography>
        </div>

        <div className="auth-links">
          {isAuthenticated ? (
            <>

              <IconButton color="inherit" aria-label="logout" onClick={logout}>
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
