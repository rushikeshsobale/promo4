import React from 'react'
 import imgage from './hub.png'
 let Header =()=> {
  return (    
        <header>
           <div className="d-flex justify-content-center bg-white">
             <img src={imgage} width="300px" height="50px"></img>
           </div>
        </header>
  
  )
}

export default Header;