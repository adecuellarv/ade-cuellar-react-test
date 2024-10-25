import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Login from './pages/login/Login';
import Products from './pages/products/Products';
import NotFound from './pages/not-found/NotFound';
import Product from './pages/product/Product';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/common/header/Header';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <MainLayout />
        </Router>
      </AuthProvider>
    </Provider>
  );
};

const MainLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RedirectBasedOnAuth />} />
        <Route path="/products" element={<PrivateRoute element={<Products />} />} />
        <Route path="/producto/:id" element={<PrivateRoute element={<Product />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const RedirectBasedOnAuth: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/products" replace /> : <Navigate to="/login" replace />;
};

export default App;
