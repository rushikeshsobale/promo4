import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Topcan = () => {
  const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);
  const screenHeight= window.screenHeight
  const toggleOffcanvas = () => {
    setOffcanvasOpen(!isOffcanvasOpen);
  };

  return (
    <div className=""  onClick={toggleOffcanvas} style={{marginTop:"-5px"}}>
      <button
        className="bg-dark m-auto "
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasTop"
        aria-controls="offcanvasTop"
        onClick={toggleOffcanvas}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`offcanvas offcanvas-top  ${isOffcanvasOpen ? 'show  d-block' : ''}`}
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className='canvas-body d-flex flex-wrap justify-content-between' style={{background:"#787878", height:`${screenHeight}`}}>
          <div className="" id="navbarNav" style={{background:"black", height:'150px', width:"150px"}}>

            <ul className="navbar-nav ul ">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/Products" className="nav-link">Products</Link>
              </li>
              <li className="nav-item">
                <Link to="/gallery" className="nav-link">Gallery</Link>
              </li>
              <li className="nav-item">
                <Link to="/Mycart" className="nav-link">Cart</Link>
              </li>
              <li className="nav-item">
                <Link to="/Signin" className="nav-link">SignIn</Link>
              </li>

            </ul>
          </div>
          <button
            type="button"
            className="btn-close cb bg-danger"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={toggleOffcanvas}
          ></button>
        </div>


      </div>
    </div>
  );
};

export default Topcan;
