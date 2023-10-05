// Header.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { setLoggedOut } from '../redux/slices/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

import '../styles/Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(setLoggedOut());
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Conditionally render the logout button
  const renderLogoutButton = () => {
    if (location.pathname === '/login' || location.pathname === '/register') {
      return null;
    }

    return (
      <button className='logout' onClick={handleLogout}>
        Log Out
      </button>
    );
  };

  return (
    <header>
      <div className='header'>
        <img className='logo' src={logo} alt='' />
        {renderLogoutButton()}
      </div>
    </header>
  );
};

export default Header;
