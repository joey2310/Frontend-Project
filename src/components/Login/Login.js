import React, { useContext, useState } from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Input, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { AuthContext } from '../../common/AuthContext/AuthContext';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const {login} = useContext(AuthContext);
  const [password, setPassword] = useState({
    visible: false,
    value: ""
  });
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
        .then(response => response.json())
        .then(async data => {
          console.log(data);
          await login(data);
          
          // data.isAdmin ? setAdmin() : login(userData);
          navigate('/products');
        })
        .catch(error => {
          setLoginError(true);
          console.error('An error occurred:', error);
        });

    } catch (error) {
      console.error('An error occurred:', error);
    }

  };

  const handleClickShowPassword = () => {
    setPassword({ ...password, visible: !password.visible });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (

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
        {loginError && <p style={{ color: 'red' }}>Invalid email or password</p>}
        <Button variant="contained" color="primary" type="submit">
          Sign In
        </Button>
        <p>New user ? please <a href="\signup"> Sign Up</a></p>
      </form>

    </div>
  );
}

export default Login;
