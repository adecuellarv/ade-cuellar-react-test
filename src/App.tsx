import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Products from './pages/products/Products';
import NotFound from './pages/not-found/NotFound';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RedirectBasedOnAuth />} />
          <Route path="/products" element={<PrivateRoute element={<Products />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const RedirectBasedOnAuth: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/products" replace /> : <Navigate to="/login" replace />;
};

export default App;
