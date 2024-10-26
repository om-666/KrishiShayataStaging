import React from 'react';
import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-flex">
          <div className="footer-brand">
            <a href="#" className="footer-logo">
              {/* Uncomment this line and add the image if you have a logo */}
              {/* <img src="./assets/Navbar-Icon.jpeg" className="logo-image" alt="Krishi-Sahayak-Logo" /> */}
              <span className="footer-title">କୃଷି ସହାୟକ</span>
            </a>
          </div>
          <div className="footer-links">
            <div>
              <h2 className="footer-heading">Resources</h2>
              <ul className="footer-list">
                {/* Add resource links here */}
              </ul>
            </div>
            <div>
              <h2 className="footer-heading">Follow us</h2>
              <ul className="footer-list">
                {/* Add social media links here */}
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © 2024 Krishi Sahayta. All rights reserved. | Privacy Policy | Terms of Service | Contact Us
        </div>
      </div>
    </footer>
  );
};

export default Footer;
