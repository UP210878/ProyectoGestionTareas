import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
    const isAuthenticated = localStorage.getItem('auth');
    return isAuthenticated ? <Element /> : <Navigate to="/login" replace />;
  };

  export default PrivateRoute;