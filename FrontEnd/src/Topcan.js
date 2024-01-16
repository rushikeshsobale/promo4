import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Topcan = () => {
  const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);

  const toggleOffcanvas = () => {
    setOffcanvasOpen(!isOffcanvasOpen);
  };

  return (
    <div className="">
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
        className={`offcanvas offcanvas-top bg-info ${isOffcanvasOpen ? 'show  d-block' : ''}`}
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className='canvas-body d-flex flex-wrap justify-content-between' style={{background:"black", opacity:10}}>
          <div className="" id="navbarNav" style={{background:"black", opacity:10}}>

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
