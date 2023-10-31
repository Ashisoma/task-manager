import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const jwtToken = localStorage.getItem('jwtToken');

  return jwtToken ? children : <Navigate to='/login' />
};

export default ProtectedRoute;
