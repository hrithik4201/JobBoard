import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import JobDetails from './views/JobDetails';

import SuccessPage from './views/SuccessPage';

const AppRouter = () => {
  // Check if the user is authenticated based on local storage
  const isAuthenticated = !!localStorage.getItem('user');

  // Components that require authentication
  const AuthenticatedHome = isAuthenticated
    ? Home
    : () => <Navigate to='/login' />;
  const AuthenticatedJobDetails = isAuthenticated
    ? JobDetails
    : () => <Navigate to='/login' />;
  const AuthenticatedSuccessPage = isAuthenticated
    ? SuccessPage
    : () => <Navigate to='/login' />;

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<AuthenticatedHome />} />
      <Route path='/job/:id' element={<AuthenticatedJobDetails />} />
      <Route path='/success' element={<AuthenticatedSuccessPage />} />
    </Routes>
  );
};

export default AppRouter;
