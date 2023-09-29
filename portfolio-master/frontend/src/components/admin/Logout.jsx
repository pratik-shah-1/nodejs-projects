import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAccessToken, setRefreshToken } from '../../redux/actions/tokens';
import { logout } from '../../redux/actions/login';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setAccessToken(''));
    dispatch(setRefreshToken(''));
    dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  return <></>;
};

export default Logout;
