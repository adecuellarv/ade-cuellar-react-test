import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const { isAuthenticated } = useAuth();

  console.log('####isAuthenticated', isAuthenticated)

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
