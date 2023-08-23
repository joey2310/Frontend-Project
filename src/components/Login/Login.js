import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Input, InputAdornment, IconButton, Snackbar } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { AuthContext } from '../../common/AuthContext/AuthContext';
import { Alert } from '@material-ui/lab';
import { useEventContext } from '../../common/EventContext/EventContext';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const { login } = useContext(AuthContext);
  const [password, setPassword] = useState({
    visible: false,
    value: ""
  });
  const [loginError, setLoginError] = useState(false);

  const { setEvent } = useEventContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/api/v1/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password.value,
      }),
    })
      .then(async response => {
        const token = response.headers.get('X-Auth-Token');
        localStorage.setItem('Token', token);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        } else {
          return response.json()
        }
      })
      .then(async data => {
        await login(data);

        // data.isAdmin ? setAdmin() : login(userData);
        navigate('/products');
      })
      .catch(error => {
        setEvent({
          isEvent: true,
          type: 'error',
          message: error.message
        })
        setLoginError(true);
      });

  };

  const handleClickShowPassword = () => {
    setPassword({ ...password, visible: !password.visible });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  return (
    <div className='login-section' >
      <div className="login-container">
        <h2> PLEASE LOGIN </h2>
        <form className="login-form" onSubmit={handleSubmit} autoComplete="on">
          <div className="input-container">
            <span className="icon">📧</span>
            <Input
              className="email-input"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder='Email Address'
            />
          </div>
          <div className="input-container">
            <span className="icon">🔐</span>
            <Input
              className="password-input"
              label='Password'
              id="standard-adornment-password"
              placeholder='Password'
              type={password.visible ? 'text' : 'password'}
              value={password.value}
              onChange={(e) => setPassword({ ...password, value: e.target.value })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}

                  >
                    {password.visible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <Button variant="contained" color="primary" type="submit">
            Sign In
          </Button>
          <p>New user ? please <a href="\signup"> Sign Up</a></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
