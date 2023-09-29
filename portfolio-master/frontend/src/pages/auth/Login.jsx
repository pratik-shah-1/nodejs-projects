import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setAccessToken, setRefreshToken } from '../../redux/actions/tokens';
import { login, setLoginEmail } from '../../redux/actions/login';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  const LoginSubmit = async e => {
    e.preventDefault();
    setIsDisabled(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    };

    const response = await fetch(`/login`, options);
    if (response.ok) {
      const tokens = await response.json();
      const { accessToken, refreshToken } = tokens;
      dispatch(setAccessToken(accessToken));
      dispatch(setRefreshToken(refreshToken));
      dispatch(login());
      dispatch(setLoginEmail(email));
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
      <p className='py-3 h5 text-center text-light bg-dark'>LOGIN</p>
      <form onSubmit={LoginSubmit} className='p-4'>
        <div className='form-group'>
          <input
            className='form-control py-2 ps-3'
            type='text'
            placeholder='Email Address'
            name='email'
            required={true}
          />
        </div>
        <div className='form-group my-3'>
          <input
            className='form-control py-2 ps-3'
            type='password'
            placeholder='Password'
            name='password'
            required={true}
          />
        </div>
        <div className='d-flex justify-content-center'>
          <button className='btn btn-outline-primary py-2' disabled={isDisabled}>
            <h6 className='m-0'>LOGIN</h6>
          </button>
        </div>
        {!isDisabled ? (
          <div className='mt-3 d-flex justify-content-center'>
            <Link to='/forgot-password'>Forgot Password?</Link>
          </div>
        ) : (
          <></>
        )}
        <p className='text-center pt-2 m-0 small'>
          Your access for 02:59 hours only, after that you will automatically logout from website
        </p>
      </form>
    </div>
  );
}

export default Login;
