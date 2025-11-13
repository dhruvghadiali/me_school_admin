import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, redirectAuthenticated = false, redirectTo = '/' }) => {
  const { isValidUser } = useSelector((state) => state.signIn);

  if (redirectAuthenticated && isValidUser) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default PublicRoute;
