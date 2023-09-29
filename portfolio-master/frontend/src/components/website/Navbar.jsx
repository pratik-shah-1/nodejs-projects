import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState({ home: '', portfolio: '', contact: '' });
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case '/':
        setActiveLink(prev => {
          return { ...prev, home: 'navbar-active-link' };
        });
        break;
      case '/portfolio':
        setActiveLink(prev => {
          return { ...prev, portfolio: 'navbar-active-link' };
        });
        break;
      case '/contact':
        setActiveLink(prev => {
          return { ...prev, contact: 'navbar-active-link' };
        });
        break;
      default:
        setActiveLink(prev => {
          return { ...prev, home: 'navbar-active-link' };
        });
    }
  }, []);

  return (
    <nav className='website-navbar'>
      <div className='logo'>
        <Link to='/'>Pratik Jadav</Link>
      </div>
      <div className='nav-menu'>
        <Link className={activeLink.home} to='/'>
          Home
        </Link>
        <Link className={activeLink.portfolio} to='/portfolio'>
          Portfolio
        </Link>
        <Link className={activeLink.contact} to='/contact'>
          Contact
        </Link>
        <Link className='rounded-btn' to='/upload/resume.pdf' target='_blank'>
          Resume
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
