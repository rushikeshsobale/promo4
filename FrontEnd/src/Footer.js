import React from 'react';

const Footer = () => {
  return (
    <footer className="footer my-3 bg-dark ">
      <div className="container">
        <div className="footer-content  justify-content-center text-white">
          <div className="footer-section ">
            <h4>About Us</h4>
            <p>Discover a world of books with our bookstore app. Find your next great read!</p>
          </div>
          <div className="footer-section ">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/books">Books</a></li>
              <li><a href="/categories">Categories</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: info@bookstore.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Bookstore App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
