import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className='extra' >About Us</h3>
                    <p>Koi Ordering is your go-to platform for ordering koi fish online. We ensure quality and satisfaction.</p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/track-order">Track Order</a></li>
                        <li><a href="/policies">Policies</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3 className='extra' >Contact Us</h3>
                    <p>Email: support@koiordering.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
                <div className="footer-section">
                    <h3 className='extra' >Follow Us</h3>
                    <ul className="social-media">
                        <li className='extra' ><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li className='extra' ><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li className='extra'  ><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Koi Ordering Co. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;