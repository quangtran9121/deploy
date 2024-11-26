import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginRequiredRoute = ({ children, isLoggedIn, redirectPath}) => {
  if (!isLoggedIn) {

    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default LoginRequiredRoute;

