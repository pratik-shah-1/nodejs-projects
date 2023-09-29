import React from 'react';

const TopPortfolio = () => {
  return (
    <div className='border rounded admin-form-container neumorphism '>
      <p className='text-center text-light bg-dark h5 py-3'>Top Portfolio</p>
      <form className='p-4' action=''>
        <div className='row'>
          <div className='col-6 form-group mb-3'>
            <label className='form-label h6' htmlhtmlFor=''>
              TOP 1
            </label>
            <select className='form-select' name='' id=''>
              <option value=''>Book Web</option>
              <option value=''>MERN Stack</option>
              <option value=''>Gaurav Barai</option>
              <option value=''>Whatapp Web Clone</option>
              <option value=''>Postman Clone Design</option>
            </select>
          </div>
          <div className='col-6 form-group mb-3'>
            <label className='form-label h6' htmlFor=''>
              TOP 2
            </label>
            <select className='form-select' name='' id=''>
              <option value=''>MERN Stack</option>
              <option value=''>Gaurav Barai</option>
              <option value=''>Book Web</option>
              <option value=''>Whatapp Web Clone</option>
              <option value=''>Postman Clone Design</option>
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='col-6 form-group mb-3'>
            <label className='form-label h6' htmlFor=''>
              TOP 3
            </label>
            <select className='form-select' name='' id=''>
              <option value=''>Postman Clone Design</option>
              <option value=''>Gaurav Barai</option>
              <option value=''>Book Web</option>
              <option value=''>MERN Stack</option>
              <option value=''>Whatapp Web Clone</option>
            </select>
          </div>
          <div className='col-6 form-group mb-3'>
            <label className='form-label h6' htmlFor=''>
              TOP 4
            </label>
            <select className='form-select' name='' id=''>
              <option value=''>Whatapp Web Clone</option>
              <option value=''>Gaurav Barai</option>
              <option value=''>Book Web</option>
              <option value=''>MERN Stack</option>
              <option value=''>Postman Clone Design</option>
            </select>
          </div>
        </div>
        <div className='form-group mb-3'>
          <label className='form-label h6' htmlFor=''>
            TOP 5
          </label>
          <select className='form-select' name='' id=''>
            <option value=''>Gaurav Barai</option>
            <option value=''>Book Web</option>
            <option value=''>MERN Stack</option>
            <option value=''>Whatapp Web Clone</option>
            <option value=''>Postman Clone Design</option>
          </select>
        </div>
        <button className='btn btn-outline-primary'>
          <h6 className='m-0'>Save</h6>
        </button>
      </form>
    </div>
  );
};

export default TopPortfolio;
