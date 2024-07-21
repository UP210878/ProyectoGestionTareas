import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
    const isAuthenticated = sessionStorage.getItem('token');
    return isAuthenticated ? <Element /> : <Navigate to="/login" replace />;
  };

  export default PrivateRoute;