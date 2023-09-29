import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Private = ({ component }) => {
  const isLogged = useSelector(state => state.auth.isLogged);
  return isLogged ? component : <Navigate to='/login' />;
};

export default Private;
