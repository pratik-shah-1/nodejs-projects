import React from 'react';
import { Link } from 'react-router-dom';
import UserImg from '../assets/img/parallex/user.png';
import EnvelopeImg from '../assets/img/parallex/envelope.png';
import MessageImg from '../assets/img/parallex/message.png';
import CodeImg from '../assets/img/parallex/code.png';
import ContactImg from '../assets/img/parallex/contact.png';
import DatabaseImg from '../assets/img/parallex/database.png';

const NotFound = () => {
  return (
    <>
      <div className='page_not_found'>
        <h1>404</h1>
        <p>Page Not Found</p>
        <Link className='rounded-btn' to='/'>
          Home
        </Link>
      </div>

      <div className='page-not-found-icons'>
        <img src={UserImg} alt='' />
        <img src={EnvelopeImg} alt='' />
        <img src={MessageImg} alt='' />
        <img src={CodeImg} alt='' />
        <img src={DatabaseImg} alt='' />
        <img src={ContactImg} alt='' />
        <img src={EnvelopeImg} alt='' />
        <img src={CodeImg} alt='' />
      </div>
    </>
  );
};

export default NotFound;
