import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor">
              <path d="M4 4.5c0-.88.39-1.67 1-2.21V4.5c0 .55.45 1 1 1h8.5c0 .55.45 1 1 1V2.29c.61.54 1 1.33 1 2.21v15c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3v-15zm9 4.5h-2V5h2v4zm0 2h-2v2h2v-2zm-2-4V5h-2v2h2zm4 4h-2v2h2v-2zm-4 2h-2v2h2v-2zm2 2h-2v2h2v-2z"/>
            </svg>
            <h1>BookFinder</h1>
          </div>

          {/* Navigation */}
          <nav className={`header-nav ${menuOpen ? 'active' : ''}`}>
            <button onClick={() => scrollToSection('search-section')}>Search</button>
            <button onClick={() => scrollToSection('featured-books')}>Featured</button>
            <button onClick={() => window.open('https://openlibrary.org', '_blank')}>
              About Open Library
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
