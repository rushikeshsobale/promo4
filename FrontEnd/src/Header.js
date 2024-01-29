import React from 'react'
 import imgage from './hub.png'
 let Header =()=> {
  return (    
        <header>
           <div className="d-flex justify-content-center bg-white" style={{height:"45px", marginTop:"-5px"}}>
             <img src={imgage} width="300px" height="50px"></img>
           </div>
        </header>
  
  )
}

export default Header;