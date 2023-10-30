import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './components/AuthContext';

function ProtectedRoute({ path, element }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
