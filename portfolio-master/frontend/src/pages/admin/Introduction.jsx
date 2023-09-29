import React from 'react';

const Introduction = () => {
  return (
    <div className='border rounded admin-form-container neumorphism'>
      <p className='text-center text-light bg-dark h5 py-3'>Introduction</p>
      <form className='p-4'>
        <textarea
          className='form-control mb-3'
          style={{ height: '150px' }}
          name=''
          placeholder='Who are you?'
        ></textarea>
        <button className='btn btn-outline-primary'>
          <h6 className='m-0'>Save</h6>
        </button>
      </form>
    </div>
  );
};

export default Introduction;
