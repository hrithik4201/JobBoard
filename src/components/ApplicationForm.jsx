import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateFormData } from '../redux/slices/formSlice';

import '../styles/ApplicationForm.css';

const ApplicationForm = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Dispatch the action to update the form data in Redux store
    dispatch(updateFormData({ name, email, coverLetter, resume }));

    // After form submission, close the modal
    onClose();

    // Redirect to /success
    navigate('/success');
  };

  return (
    <div className='application-form-modal'>
      <form onSubmit={handleFormSubmit}>
        <h2 className='application-form-header'>Apply Now!</h2>
        <label>
          Name:
          <br />
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <br />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Cover Letter:
          <br />
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
            rows='10'
            style={{ resize: 'none' }}
          />
        </label>
        <label>
          Resume:
          <br />
          <input
            type='file'
            accept='.pdf, .doc, .docx'
            onChange={(e) => setResume(e.target.files[0])}
          />
        </label>
        <button className='application-submit-btn' type='submit'>
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
