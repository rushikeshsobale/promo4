// MyComponent.js

import React from 'react';
import {  faCircleChevronDown, faCoffee, faAddressCard, faEnvelope } from './icons'; // Adjust the path accordingly
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Offcanvas, Button, OffcanvasHeader } from 'react-bootstrap';
const Mybtn = (props) => {

 
  return (
    <div className="text-white Mybtn"> 
      <Button onClick={props.fun}  className="down-arrow bg-dark cb mx-auto" style={{width:"100px", height:"20px"}}/>
    </div>
  );
}

export default Mybtn;
