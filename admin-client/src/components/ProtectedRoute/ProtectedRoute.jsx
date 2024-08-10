// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../utils/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    // Nếu người dùng chưa đăng nhập, chuyển hướng về trang đăng nhập
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
