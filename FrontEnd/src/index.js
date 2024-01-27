
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import './style.css';
import Main from './Main';
import Gallery from './SlideBar'
import Footer from './Footer'
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  < div className="index">  
  <BrowserRouter>
     <Header/>
     <Navbar/>
     <Main/>
     <Gallery/>
     <Footer/>
    </BrowserRouter>
  </div>
   
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
