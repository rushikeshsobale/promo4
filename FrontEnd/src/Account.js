import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
  const navigate = useNavigate()
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNo, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const data = {
    userName: userName,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    phoneNo: phoneNo,
    address: address,
    birthdate: birthdate,
  };

  const isStrongPassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    return password.length >= minLength && hasUppercase && hasLowercase && hasNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Basic form validation
    if (!userName || !email || !password || !confirmPassword || !phoneNo || !address || !birthdate) {
      setNameError('Full Name is required');
      setEmailError('Email is required');
      setPasswordError('Password is required');
      setConfirmPasswordError('Confirm Password is required');
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      setConfirmPasswordError('Password do not match');
      return;
    }

    // Password strength validation
    if (!isStrongPassword(password)) {
      setPasswordError('Password must be at least 8 characters long and include uppercase, lowercase, and a number');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return;
    }

    try {
      const response = await fetch('http://3.210.184.253:8080/postData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials:'include',
      });

      console.log(response);
      if (response.ok) {
        await response.json();
         setSuccessMessage('Registration successful! Redirecting to login...');
         setTimeout(() => navigate('/Signin'), 2000);
      } else if (response.status === 400) {
        setEmailError('Email already exists');
        console.log('Email already exists');
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container-fluid  bg-dark formdiv" >
      <form onSubmit={handleSubmit} className="mx-auto" style={{marginTop:'-300px'}}>
      {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        <div className="p-1 cb  text-white mx-auto formdivdiv">
          <div className="row   ">
            <div className="col-6 mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="error-message text-danger">{nameError}</div>
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="error-message text-danger">{emailError}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-6 mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="error-message text-danger">{passwordError}</div>
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="error-message text-danger">{confirmPasswordError}</div>
            </div>
          </div>
          <div className="row ">
            <div className="col-6 mb-3">
              <label htmlFor="ph-no" className="form-label">
                Phone No
              </label>
              <input
                type="tel"
                className="form-control"
                id="ph-no"
                value={phoneNo}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6 mb-3">
              <label htmlFor="userAddress" className="form-label">
                User Address
              </label>
              
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="birthdate" className="form-label">
                Birthdate
              </label>
              <input
                type="date"
                className="form-control"
                id="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
          <button type="submit" className="btn btn-primary btn-block mx-3" onClick={()=>{navigate('/Signin')}}>
            Log In
          </button>
          <span> Log In if Already have an Account</span>
        </div>
      </form>
      </div>
  );
};
export default SignUp;