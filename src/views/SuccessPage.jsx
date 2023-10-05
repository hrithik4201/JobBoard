// SuccessPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import myGif from '../assets/Successfully Done.gif';

import '../styles/Success.css';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  const formData = useSelector((state) => state.form);

  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <div className='success-container'>
      <h2>Success! Your application has been submitted.</h2>
      <img className='gif-img' src={myGif} alt='' />
      <div className='application-preview'>
        <h3>Application Preview</h3>
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
        <p>Cover Letter: {formData.coverLetter}</p>
        {formData.resume && (
          <p>
            Resume:
            <a href={URL.createObjectURL(formData.resume)} download>
              Download Resume
            </a>
          </p>
        )}
      </div>
      <button className='apply-btn' onClick={redirectToHome}>
        Go To Home
      </button>
    </div>
  );
};

export default SuccessPage;
