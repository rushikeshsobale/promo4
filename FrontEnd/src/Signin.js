// src/components/LoginForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailerror, setemailerror] = useState('');
  const [passworderror, setpassworderror] = useState('');
  const [alert, setAlert] = useState(false);

  const data = {
    email: email,
    password: password
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://3.210.184.253:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const tokenData = await response.json();
        const token = tokenData.token;
        setAlert(true);
        navigate("/Mycart")
        window.location.reload();

        // Set the token as an HTTP-only cookie
        document.cookie = `token=${token}; path=/; SameSite=Lax`;

        // Redirect to home page after successful login
        // navigate('/Products');
      } else if (response.status === 404) {
        setemailerror('Email Not Found');
        setAlert(false);
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.log('Password mismatch error:', errorData.message);
        setpassworderror('Password did not match');
      } else {
        console.log('Login failed with status:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className=" container-fluid m-auto  bg-dark formdiv  ">
          <div className=" bg-dark text-white mx-auto formdivdiv " style={{marginTop:"-350px"}}>
            <div className=" card-body cb ">
              
              {!alert && (
                <div className='m-3'>
                  <h2 className="card-title text-center ">Login</h2>
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Enter your username"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (e.target.value === "") {
                            setemailerror("Email cannot be empty");
                          } else {
                            setemailerror("");
                          }
                        }}
                      />
                      <div className="error-message text-danger">{emailerror}</div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                      />
                      <div className="error-message text-danger">{passworderror}</div>
                    </div>
                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                    <button
                      type="button"
                      className="btn btn-primary btn-block mx-3"
                      onClick={() => { navigate('/Account') }}>
                      Register
                    </button>
                    <span>Don't have an account? <a href="/Account">Create one</a></span>
                  </form>
                </div>
              )}
            </div>
          </div>

    </div>
  );
};

export default LoginForm;
