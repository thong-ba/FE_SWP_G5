import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3  >About Us</h3>
                    <p>Koi Ordering is your go-to platform for ordering koi fish online. We ensure quality and satisfaction.</p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/service">Services</a></li>
                        <li><a href="/trackorder">Track Order</a></li>
                        <li><a href="/policies">Policies</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3  >Contact Us</h3>
                    <p>Email: support@koiordering.com</p>
                    <p>Phone: 0909.888.6368</p>
                </div>
                <div className="footer-section">
                    <h3 >Follow Us</h3>
                    <ul className="social-media">
                        <li ><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li ><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li ><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
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