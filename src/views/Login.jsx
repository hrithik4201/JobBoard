// Login.js
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { auth } from '../firebase';

import '../styles/Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    try {
      signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful!');
      // Store session information locally
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error.message);
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        setError('Incorrect email or password');
      } else {
        setError('Error logging in');
      }
    }
  };

  return (
    <Layout>
      <div className='login-container'>
        <form className='login-form'>
          <h1>Login</h1>
          <div>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className='error-message'>{error}</div>}
          <button className='submit-btn' type='button' onClick={handleLogin}>
            Login
          </button>
          <div>
            Don't have an account?
            <Link className='redirect-link' to='/register'>
              Register
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
