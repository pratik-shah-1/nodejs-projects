import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Swal from 'sweetalert2';

function ChangePassword() {
  const navigate = useNavigate();
  const email = useSelector(state => state.login.email);
  const [isDisabled, setIsDisabled] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const accessToken = useSelector(state => state.tokens.accessToken);

  const updatePassword = async e => {
    e.preventDefault();
    setIsDisabled(true);
    const options = {
      method: 'PUT',
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, oldPassword, newPassword, confirmPassword }),
    };
    const response = await fetch('/change-password', options);
    if (response.ok) {
      const result = await response.json();
      if (result) {
        Swal.fire({
          title: result.message,
          icon: 'success',
        });
      }
      navigate('/dashboard');
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
      <p className='py-3 h5 text-center text-light bg-dark'>CHANGE PASSWORD</p>
      <form onSubmit={updatePassword} className='p-4'>
        <div className='form-group mb-3'>
          <input
            className='form-control py-2 ps-3'
            type='password'
            placeholder='Old Password'
            value={oldPassword}
            onChange={e => {
              setOldPassword(e.target.value);
            }}
            required={true}
          />
        </div>
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
            <h6 className='m-0'>CHANGE</h6>
          </button>
        </div>
        {!isDisabled ? (
          <div className='d-flex mt-3 justify-content-center'>
            <Link to='/dashboard'>Go Back</Link>
          </div>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
}

export default ChangePassword;
