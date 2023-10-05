// Register.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import Layout from '../components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import '../styles/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    try {
      if (password !== confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }

      createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPasswordError('');

      // Store session information locally
      localStorage.setItem('user', JSON.stringify({ email }));

      console.log('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error('Error registering:', error.message);
    }
  };

  return (
    <Layout>
      <div className='register-container'>
        <form className='register-form'>
          <h1>Register</h1>
          <div>
            <label htmlFor='email'>Email:</label>
            <br />
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <br />
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='confirmPassword'>Confirm Password:</label>
            <br />
            <input
              type='password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordError('');
              }}
            />
            {passwordError && (
              <div className='error-message'>{passwordError}</div>
            )}
          </div>
          <button className='submit-btn' type='button' onClick={handleRegister}>
            Register
          </button>
          <div>
            Have an account?{' '}
            <Link className='redirect-link' to='/login'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
