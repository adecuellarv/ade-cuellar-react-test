import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import CryptoJS from 'crypto-js';
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const secretKey: any = process.env.REACT_APP_SECRET_KEY;
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    const token = CryptoJS.AES.encrypt('tkn', secretKey).toString();
    const expirationTime: any = Date.now() + 300000;
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', expirationTime);
    setIsAuthenticated(true);
  }
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    setIsAuthenticated(false);
  }

  const isTokenValid = () => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('tokenExpiration');

    if (token && expirationTime) {
      const dateNow: any = Date.now();
      if (dateNow > expirationTime) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        return false;
      }
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!isTokenValid()) {
      setIsAuthenticated(false)
      //navigate('/login');
    } else {
      setIsAuthenticated(true)
      //navigate('/products');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse en AuthProvider');
  }
  return context;
};
