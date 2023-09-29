import React from 'react';

const PortfolioDetails = () => {
  return (
    <div className='portfolio-full-details'>
      <p className='fd-title'>Gaurav Portfolio</p>
      <p className='fd-details'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sequi officia eaque ab
        aspernatur dolor, illum animi corporis laboriosam labore voluptatibus recusandae omnis
        nesciunt accusantium deserunt fugit vero beatae provident! Sequi officia assumenda
        dignissimos libero magnam ducimus magni quidem et. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Eligendi sequi officia eaque ab aspernatur dolor, illum animi corporis
        laboriosam labore voluptatibus recusandae omnis nesciunt accusantium deserunt fugit vero
        beatae provident! Sequi officia assumenda dignissimos libero magnam ducimus magni quidem
        et.Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sequi officia eaque ab
        aspernatur dolor, illum animi corporis laboriosam labore voluptatibus recusandae omnis
        nesciunt accusantium deserunt fugit vero beatae provident! Sequi officia assumenda
        dignissimos libero magnam ducimus magni quidem et.Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Eligendi sequi officia eaque ab aspernatur dolor, illum animi corporis
        laboriosam labore voluptatibus recusandae omnis nesciunt accusantium deserunt fugit vero
        beatae provident! Sequi officia assumenda dignissimos libero magnam ducimus magni quidem et.
      </p>
      <div className='fd-techs'>
        <button className='html-btn' title='HTML'>
          <i className='fab fa-html5'></i>
        </button>
        <button className='css-btn' title='CSS'>
          <i className='fab fa-css3'></i>
        </button>
        <button className='sass-btn' title='Scss'>
          <i className='fab fa-sass'></i>
        </button>
        <button className='bootstrap-btn' title='Bootstrap'>
          <i className='fab fa-bootstrap'></i>
        </button>
        <button className='js-btn' title='Javascript'>
          <i className='fab fa-js'></i>
        </button>
        <button className='jquery-btn' title='Jquery'>
          <i className='fi fi-jquery'></i>
        </button>
        <button className='react-btn' title='React Js'>
          <i className='fab fa-react'></i>
        </button>
        <button className='redux-btn' title='Redux'>
          <i className='fi fi-redux'></i>
        </button>
        <button className='php-btn' title='PHP'>
          <i className='fab fa-php'></i>
        </button>
        <button className='laravel-btn' title='Laravel'>
          <i className='fab fa-laravel'></i>
        </button>
        <button className='node-btn' title='Node Js'>
          <i className='fab fa-node-js'></i>
        </button>
        <button className='mongodb-btn' title='MongoDB'>
          <i className='fi fi-mongodb'></i>
        </button>
        <button className='mysql-btn' title='MySQL'>
          <i className='fi fi-mysql'></i>
        </button>
      </div>
      <ul className='fd-functionality-list'>
        <li>Login</li>
        <li>Signup</li>
        <li>Forgot Password</li>
        <li>Profile</li>
        <li>Change Password</li>
        <li>Dynamic add Social Media Links</li>
        <li>Dynamic change Email & Phone Number</li>
      </ul>
    </div>
  );
};

export default PortfolioDetails;
