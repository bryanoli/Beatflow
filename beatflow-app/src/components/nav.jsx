import React, { useState, useEffect } from 'react';
import '../styles/components/desktopNav.css';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { useAuth } from '../authentication/auth.jsx';

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const {isLoggedIn} = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleItemClick = () => {
    alert('Item clicked!');
  };

  return (
    <nav className="nav">
      {/* Desktop Nav - Hidden on Small Screens */}
      {!isMobile && (
        <><Link to="/" className="site-title">BeatFlow
              </Link><ul>
                {isLoggedIn && <CustomLink to="/Discover">Discover</CustomLink>}
                {isLoggedIn && <CustomLink to="/Favorites">Favorites</CustomLink>}
                {isLoggedIn && <CustomLink to="/Settings">Settings</CustomLink>}
                  </ul></>
      )}

      {/* Mobile Nav - Hidden on Large Screens */}
      {isMobile && (
        <div className="mobile-nav">
          <button onClick={toggleMobileMenu}>☰</button>
          {isMobileMenuOpen && (
            <ul>
              <li onClick={handleItemClick}>Home</li>
              <li onClick={handleItemClick}>About</li>
              <li onClick={handleItemClick}>Contact</li>
            </ul>
          )}
        </div>
      )}
    </nav>
  );
}

function CustomLink({to, children, ...props}){
    const resolvePath = useResolvedPath(to);
    const isActive = useMatch(resolvePath.pathname, true);
    return(
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}
