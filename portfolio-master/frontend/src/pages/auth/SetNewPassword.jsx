import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function SetNewPassword() {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const email = useSelector(state => state.forgotPassword.email);
  const forgotPasswordToken = useSelector(state => state.forgotPassword.token);

  const updatePassword = async e => {
    e.preventDefault();
    setIsDisabled(true);
    const options = {
      method: 'PUT',
      headers: {
        Authorization: forgotPasswordToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, newPassword, confirmPassword }),
    };
    const response = await fetch('/set-new-password', options);
    if (response.ok) {
      const result = await response.json();
      if (result) {
        Swal.fire({
          title: result.message,
          icon: 'success',
        });
        navigate('/login');
      }
    } else {
      const error = await response.json();
      Swal.fire({
        title: error.message,
        icon: 'error',
      });
      setIsDisabled(false);
    }
  };

  return (
    <div className='my-form m-auto rounded neumorphism'>
      {/* <!-- TITLE --> */}
      <p className='py-3 h5 text-center text-light bg-dark'>SET NEW PASSWORD</p>
      {/* <!-- SET-NEW-PASSWORD-FORM --> */}
      <form onSubmit={updatePassword} className='p-4'>
        <div className='form-group mb-3'>
          <input
            className='form-control py-2 ps-3'
            type='password'
            placeholder='New Password'
            value={newPassword}
            onChange={e => {
              setNewPassword(e.target.value);
            }}
            required={true}
          />
        </div>
        <div className='form-group mb-3'>
          <input
            className='form-control py-2 ps-3'
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={e => {
              setConfirmPassword(e.target.value);
            }}
            required={true}
          />
        </div>
        <div className='d-flex justify-content-center'>
          <button className='btn btn-outline-primary py-2' disabled={isDisabled}>
            <h6 className='m-0'>SUBMIT</h6>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SetNewPassword;
