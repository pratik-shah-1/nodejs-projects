import React from 'react';

const ScrollUpButton = () => {
  return (
    <button onClick={() => window.scrollTo(0, 0)} className='scroll-up-btn' title='Scroll Up'>
      <i className='fas fa-angle-up'></i>
    </button>
  );
};

export default ScrollUpButton;
