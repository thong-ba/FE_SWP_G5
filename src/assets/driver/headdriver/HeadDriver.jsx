import { useState } from "react"
import { Link } from "react-router-dom";
import "./HeadDriver.css";

const HeadDriver = ({ handleLogout}) => {

    return (
        <header className="header">
            <div className="logo-container">
                <img src="koi-login.png" alt="Logo" className="logo-image" />
                <h1 className="logo">Koi Ordering</h1>
            </div>
            <nav className="navigation">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/driverInfo">
                            <img className="user-avatar profile-icon" src="hack.png" alt="Profile" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default HeadDriver;