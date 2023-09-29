import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  const [navbarButtonToggler, setNavbarButtonToggler] = useState('');
  const [navbarMenuToggler, setNavbarMenuToggler] = useState('');
  const [dropDownButtonToggler, setDropDownButtonToggler] = useState('');
  const [dropDownMenuToggler, setDropDownMenuToggler] = useState('');

  const NavbarToggler = () => {
    setNavbarButtonToggler(prev => {
      if (prev == '') return 'collapsed';
      else return '';
    });
    setNavbarMenuToggler(prev => {
      if (prev == '') return 'show';
      else return '';
    });
  };

  const DropDownToggler = () => {
    setDropDownButtonToggler(prev => {
      if (prev == '') return 'show';
      else return '';
    });
    setDropDownMenuToggler(prev => {
      if (prev == '') return 'show';
      else return '';
    });
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark py-3 px-2'>
      <Link className='navbar-brand h5 m-0 ps-3' to='/admin'>
        ADMIN
      </Link>
      <button
        onClick={NavbarToggler}
        className={`navbar-toggler border-0 ${navbarButtonToggler} `}
        type='button'
      >
        <span className=' btn btn-dark'>
          <i className='fas fa-bars'></i>
        </span>
      </button>
      <div className={`collapse navbar-collapse ${navbarMenuToggler}`}>
        <ul className='navbar-nav ms-lg-auto'>
          <li className='nav-item'>
            {' '}
            <Link
              className='nav-link h6 m-0 mx-lg-2 text-uppercase active'
              to='/admin/introduction'
            >
              Introduction
            </Link>
          </li>
          <li className='nav-item'>
            {' '}
            <Link className='nav-link h6 m-0 mx-lg-2 text-uppercase' to='/admin/home-slider'>
              Home Slider
            </Link>
          </li>
          <li className='nav-item'>
            {' '}
            <Link className='nav-link h6 m-0 mx-lg-2 text-uppercase' to='/admin/social-media-links'>
              Social Media Links
            </Link>
          </li>
          <li className='nav-item dropdown'>
            <a
              className={`nav-link h6 m-0 mx-lg-2 text-uppercase dropdown-toggle ${dropDownButtonToggler}`}
              onClick={DropDownToggler}
            >
              Portfolio
            </a>
            <ul className={`dropdown-menu ${dropDownMenuToggler}`}>
              <li>
                <Link className='dropdown-item' to='/admin/portfolio/add'>
                  Add
                </Link>
              </li>
              <li>
                <Link className='dropdown-item' to='/admin/portfolio/edit'>
                  Edit
                </Link>
              </li>
              <li>
                <Link className='dropdown-item' to='/admin/portfolio/arrange'>
                  Arrange
                </Link>
              </li>
            </ul>
          </li>
          <li className='nav-item'>
            {' '}
            <Link className='nav-link h6 m-0 mx-lg-2 text-uppercase' to='/change-password'>
              Change Password
            </Link>
          </li>
          <li className='nav-item'>
            {' '}
            <Link className='nav-link h6 m-0 mx-lg-2 text-uppercase' to='/admin/resume-uploader'>
              Resume
            </Link>
          </li>
          <li className='nav-item'>
            {' '}
            <Link className='nav-link h6 m-0 mx-lg-2 text-uppercase' to='/logout'>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
