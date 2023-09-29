import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setForgotPasswordToken } from '../../redux/actions/forgotPassword';

function OTP() {
  const [otp, setOTP] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const email = useSelector(state => state.forgotPassword.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const verifyOTP = async e => {
    e.preventDefault();
    setIsDisabled(true);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    };
    const response = await fetch('/verify-otp', options);
    if (response.ok) {
      const result = await response.json();
      if (result) {
        dispatch(setForgotPasswordToken(result.accessToken));
        navigate('/set-new-password');
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
      <p className='py-3 h5 text-center text-light bg-dark'>VERIFY OTP</p>
      {/* <!-- VERIFY-OTP-FORM --> */}
      <form onSubmit={verifyOTP} className='p-4'>
        <div className='form-group mb-3'>
          <input
            className='form-control py-2 ps-3'
            type='text'
            placeholder='OTP'
            value={otp}
            onChange={e => {
              setOTP(e.target.value);
            }}
            required={true}
          />
        </div>
        <div className='d-flex justify-content-center'>
          <button className='btn btn-outline-primary py-2' disabled={isDisabled}>
            <h6 className='m-0'>VERIFY</h6>
          </button>
        </div>
      </form>
    </div>
  );
}

export default OTP;
