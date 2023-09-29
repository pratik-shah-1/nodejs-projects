import React from 'react';

const SocialMediaLinks = () => {
  return (
    <div className='border rounded admin-form-container neumorphism'>
      <p className='text-center text-light bg-dark h5 py-3'>Social Media Links</p>
      <form className='p-4' action=''>
        <div className='form-group row mb-3'>
          <div className='col-5'>
            <input className='form-control' type='text' placeholder='Email Address' />
          </div>
          <div className='col-1 p-0'>
            <button className='btn'>
              <i className='fas fa-arrow-right'></i>
            </button>
          </div>
          <div className='col-6 '>
            <input className='form-control' type='text' placeholder='Email Address' />
          </div>
        </div>
        <div className='form-group row mb-3'>
          <div className='col-5'>
            <input className='form-control' type='text' placeholder='GitHub Name' />
          </div>
          <div className='col-1 p-0'>
            <button className='btn'>
              <i className='fas fa-arrow-right'></i>
            </button>
          </div>
          <div className='col-6 '>
            <input className='form-control' type='text' placeholder='GitHub Link' />
          </div>
        </div>
        <div className='form-group row mb-3'>
          <div className='col-5 '>
            <input className='form-control' type='text' placeholder='LinkedIn Name' />
          </div>
          <div className='col-1 p-0'>
            <button className='btn'>
              <i className='fas fa-arrow-right'></i>
            </button>
          </div>
          <div className='col-6 '>
            <input className='form-control' type='text' placeholder='LinkedIn Link' />
          </div>
        </div>
        <div className='form-group row mb-3'>
          <div className='col-5'>
            <input className='form-control' type='text' placeholder='Skype Name' />
          </div>
          <div className='col-1 p-0'>
            <button className='btn'>
              <i className='fas fa-arrow-right'></i>
            </button>
          </div>
          <div className='col-6 '>
            <input className='form-control' type='text' placeholder='Skype Link' />
          </div>
        </div>
        <button className='btn btn-outline-primary'>
          <h6 className='m-0'>Save</h6>
        </button>
      </form>
    </div>
  );
};

export default SocialMediaLinks;
