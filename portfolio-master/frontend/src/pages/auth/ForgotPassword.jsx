import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setForgotPasswordEmail } from '../../redux/actions/forgotPassword';
import Swal from 'sweetalert2';

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const sendOTP = async e => {
    e.preventDefault();
    setIsDisabled(true);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    };
    const response = await fetch(`/forgot-password`, options);
    if (response.ok) {
      const result = await response.json();
      if (result) {
        dispatch(setForgotPasswordEmail(email));
        navigate('/OTP');
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
      <p className='py-3 h5 text-center text-light bg-dark'>FORGOT PASSWORD</p>
      {/* <!-- FORGOT-PASSWORD-FORM --> */}
      <form onSubmit={sendOTP} className='p-4'>
        <div className='form-group mb-3'>
          <input
            className='form-control py-2 ps-3'
            type='text'
            placeholder='Email Address'
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
            required={true}
          />
        </div>
        <div className='d-flex justify-content-center'>
          <button className='btn btn-outline-primary py-2' disabled={isDisabled}>
            <h6 className='m-0'>SEND OTP</h6>
          </button>
        </div>
        {!isDisabled ? (
          <div className='mt-3 d-flex justify-content-center'>
            <Link to='/login'>Login Now</Link>
          </div>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;
