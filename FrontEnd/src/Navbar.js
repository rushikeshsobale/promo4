import React from 'react';
import $ from 'jquery'
import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import pic from './booklogo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCircleUser, faHouse, faHouseChimney, faHouseChimneyWindow } from '@fortawesome/free-solid-svg-icons';
// Import a custom CSS file for additional styling
import SearchBox from './SearchBox.js'

import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
//import LoginForm from './Account.js'
import Products from './Products.js';
import Api from "./Api.js";
import SignUp from "./Account.js";
import LoginForm from './Signin.js';
import Mycart from './Mycart.js';
import HomeList from './HomeList.js';
import Profile from './Profile.js';
import Cookies from 'js-cookie';
import Help from './Help.js'
import CheckoutPage from './CheckoutPage.js';
import Topcan from './Topcan'
const Home = () => <div>Home Page</div>;

const Gallery = () => <div>Gallery Page</div>;

const Navbar = () => {
  const [id, setId] = useState('');
  const [cart, setcart] = useState()
  const userToken = Cookies.get('token') || null;
  console.log("aaaaa" + cart)
  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://3.210.184.253:8080/profile", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        credentials: "include", // Include credentials for sending cookies
      });

      if (response.ok) {
        const userData = await response.json();
        const ID = userData._id;
        setId(ID);
        console.log("hi the fetchUserProfile triggered");
        const { newItem } = userData
        console.log(newItem); // Check if cartData is being logged correctly
        setcart(newItem);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const cartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserProfile();

    };

    fetchData();
  }, []);


  return (
    <>
      <nav className=" navbar navbar-expand-md navbar-dark bg-dark sticky-top h-40" >

        <HomeList />
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/Products" className="nav-link">Products</Link>
            </li>
            <li className="nav-item">
              <Link to="/gallery" className="nav-link">Gallery</Link>
            </li>

          </ul>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/Signin" element={<LoginForm />} />
          <Route path="/Api/:_id" element={<Api userId={id} />} />
          <Route path="/Account" element={<SignUp />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path='/Mycart' element={<Mycart fetchUserProfile={fetchUserProfile} />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/CheckoutPage" element={<CheckoutPage fetchUserProfile={fetchUserProfile} data={cart} />} />
        </Routes>
        <div className="container navcontent">
          <div class="d-flex justify-content-between menubar">
            <div class="topcan">
              <Topcan />
            </div>
            <div class=" searchBox">
              <SearchBox />
            </div>
          </div>


          <div className=' m-auto cart text-warning mx-3 fs-5 border rounded border-warning  p-1'>
            <Link to={`/Mycart`} className='nav-link'>
              <FontAwesomeIcon icon={faCartPlus} />
            </Link>
          </div>
          <div className=' cart text-white fs-3  p-1'>
            <Link to="/Signin" className='nav-link'>
              <FontAwesomeIcon icon={faCircleUser} />
            </Link>
          </div>
        </div>
      </nav>

    </>
  );
}

export default Navbar;
