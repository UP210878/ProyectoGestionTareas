import React from 'react';
import { Navigate } from 'react-router-dom';

const LoginRoutes = ({ element: Element }) => {
    const isAuthenticated = sessionStorage.getItem('token');
    return isAuthenticated ? <Navigate to="/home" replace /> : <Element />;
  };

  export default LoginRoutes;