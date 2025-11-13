import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { signIn } from '@MEPageRoutes';

const ProtectedRoute = ({ children }) => {
  const { isValidUser } = useSelector((state) => state.signIn);

  if (!isValidUser) {
    return <Navigate to={signIn} replace />;
  }

  return children;
};

export default ProtectedRoute;
