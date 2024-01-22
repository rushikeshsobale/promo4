import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Offcanvas, Button, OffcanvasHeader } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomeList() {
  const navigate = useNavigate()
  const [flag, setFlag] = useState(false)
 /* global location */

const logOut = async () => {
  try {
    const response = await fetch("http://34.231.110.65:8080/logout", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', 
    });

    if (response.ok) {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // Redirect to the login page or perform any other post-logout actions
      window.location.reload();// Use location.href for redirect
    } else {
      console.log('Logout failed with status:', response.status);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
  
return (
  <>
   <div className=" text-white bg-dark kk" >
    <Button type="button" aria-label="next slide / item" className="before bg-dark cb" onClick={()=>{setFlag(!flag)}}>
    
    </Button>
    

    <Offcanvas  placement="start" show={flag} scroll={flag} backdrop={true} onHide={() => {}} >
      <Offcanvas.Header>
      <Offcanvas.Title>Backdrop with scrolling</Offcanvas.Title>
    <Button type="button" aria-label="next slide / item" className=" cb after bg-dark" onClick={()=>{setFlag(!flag)}}>
    
    </Button>
      
      </Offcanvas.Header>
      <Offcanvas.Body >
       <div className="text-white HomeList my-5 mx-1">
        <ul className="" onClick={()=>{setFlag(!flag)}} >
          <li onClick={() => navigate('/Profile')}>Account</li>
          <li>Your Orders</li>
          <li>About</li>
          <li onClick={() => navigate('/Help')}>Help</li>
          <li onClick={logOut}>Log Out</li>
          <li>Settings</li>
        </ul>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
    </div>
  </>
);

}