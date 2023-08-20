import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import './SignUp.css';
import { Input, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({
    visible: false,
    value: '',
  });
  const [confirmPass, setConfirmPass] = useState({
    visible: false,
    value: ""
  });
  const [role, setRole] = useState('USER'); // Default role is User
  const [contactNumber, setContactNumber] = useState('');
  const [signupError, setSignupError] = useState(false);

  const handleChange = (setState, e) => {
    setState(e.target.value);
  };

  const handleClickShowPassword = () => {
    setPassword({ ...password, visible: !password.visible });
  };

  const handleClickShowComfirmPass = () => {
    setConfirmPass({ ...confirmPass, visible: !confirmPass.visible });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (password.value === confirmPass.value) {
      setSignupError(false)
    } else {
      setSignupError(true)
    }
  }, [confirmPass])


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(e);
    if (password.value === confirmPass.value) {
      try {
        const response = await fetch('http://localhost:3001/api/v1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password.value,
            contactNumber: contactNumber,
          }),
        })

          .then(response => response.json())
          .then(data => {
            console.log(data);
            // data.isAdmin ? setAdmin() : login(userData);
            navigate('/login');
          })
          .catch(error => {
            setSignupError(true);
            console.error('An error occurred:', error);
          });

      } catch (error) {
        console.error('An error occurred:', error);
      }
    }};


    return (
      <div className="signup-container">
        <h2> PLEASE SIGNUP </h2>
        <form className="signup-form" onSubmit={handleSubmit} autoComplete="on">
          <div className="input-container">
            <span className="icon">👤</span>
            <Input
              className="name-input"
              label="First Name"
              type="text"
              value={firstName}
              placeholder='First Name'
              onChange={(e) => handleChange(setFirstName, e)}
            />
          </div>
          <div className="input-container">
            <span className="icon">👤</span>
            <Input
              className="name-input"
              label="Last Name"
              type="text"
              value={lastName}
              placeholder='Last Name'
              onChange={(e) => handleChange(setLastName, e)}
            />
          </div>
          <div className="input-container">
            <span className="icon">📧</span>
            <Input
              className="email-input"
              label="Email Address"
              value={email}
              type="email" // Use "email" type for email input
              placeholder='Email Address'
              onChange={(e) => handleChange(setEmail, e)}
            />
          </div>
          <div className="input-container">
            <span className="icon">🔐</span>
            <Input
              className="password-input"
              label="Password"
              type={password.visible ? 'text' : 'password'}
              value={password.value}
              placeholder='Password'
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
          <div className="input-container">
            <span className="icon">🔑</span>
            <Input
              className="confirm-password-input"
              label="Confirm Password"
              type={confirmPass.visible ? 'text' : 'password'}
              value={confirmPass.value}
              placeholder='Confirm Password'
              onChange={(e) => setConfirmPass({ ...confirmPass, value: e.target.value })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowComfirmPass}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {confirmPass.visible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div className="input-container">
            <span className="icon">🔑</span>
            <select
              className="role-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="default" disabled>Select A Role</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
          </div>

          <div className="input-container">
            <span className="icon">📞</span>
            <Input
              className="contact-input"
              label="Contact Number"
              type="tel" // Use "tel" type for phone numbers
              value={contactNumber}
              placeholder='Contact Number'
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
          {signupError && <p style={{ color: 'red' }}>Invalid Data</p>}

          <Button variant="contained" color="primary" type="submit">
            Sign Up
          </Button>
          <p>Already a user? please <a href="\login"> Log In</a></p>
        </form>
      </div>
    )
  }

  export default Signup