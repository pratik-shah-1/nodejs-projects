import React from 'react';

const ResumeUploader = () => {
  return (
    <div className='border rounded admin-form-container neumorphism'>
      <p className='text-center text-light bg-dark h5 py-3'>Resume Uploader</p>
      <form className='p-4'>
        <input className='form-control mb-3' type='file' name='' id='' />
        <button className='btn btn-outline-primary'>
          <h6 className='m-0'>Save</h6>
        </button>
      </form>
    </div>
  );
};

export default ResumeUploader;
