import React, { useState } from 'react';
import './Navbar.css';
import officialLogo from '../../assets/officialLogo.png';

const Navbar = ({ onNavigate, currentView }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleNavClick = (sectionId, viewName = 'main') => {
        onNavigate(sectionId, viewName);
        setIsOpen(false);
    };

    return (
        <>
            <nav className="mobile-navbar">
                <div className="navbar-logo-container">
                    <img src={officialLogo} alt="OLSKIDO" className="navbar-logo" />
                </div>
                <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle menu">
                    <div className={`hamburger-line ${isOpen ? 'open' : ''}`}></div>
                    <div className={`hamburger-line ${isOpen ? 'open' : ''}`}></div>
                    <div className={`hamburger-line ${isOpen ? 'open' : ''}`}></div>
                </button>
            </nav>

            {/* Mobile Drawer */}
            <div className={`mobile-drawer-overlay ${isOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
            <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <span className="drawer-title">Menu</span>
                    <button className="close-btn" onClick={toggleMenu}>&times;</button>
                </div>
                <ul className="drawer-menu">
                    <li>
                        <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home', 'main'); }}>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#skills" onClick={(e) => { e.preventDefault(); handleNavClick('skills', 'main'); }}>
                            Skills
                        </a>
                    </li>
                    <li>
                        <a href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick('projects', 'main'); }}>
                            Projects
                        </a>
                    </li>
                    <li>
                        <a href="#experience" onClick={(e) => { e.preventDefault(); handleNavClick('experience', 'main'); }}>
                            Experience
                        </a>
                    </li>
                    <li>
                        {/* GitHub Activity - Redirects to standalone view */}
                        <a href="#github-activity" onClick={(e) => { e.preventDefault(); handleNavClick(null, 'github'); }}>
                            GitHub Activity
                        </a>
                    </li>
                    <li>
                        {/* Dev's Notes - Redirects to standalone view */}
                        <a href="#dev-notes" onClick={(e) => { e.preventDefault(); handleNavClick(null, 'notes'); }}>
                            Dev's Notes
                        </a>
                    </li>
                    <li>
                        <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact', 'main'); }}>
                            Contact Me
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;
