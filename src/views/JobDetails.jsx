import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import Layout from '../components/Layout';
import ApplicationForm from '../components/ApplicationForm';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

import '../styles/JobDetails.css';

const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const jobDetails = useSelector((state) =>
    state.job.jobList.find((job) => job.id === id)
  );

  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const placeholderImg = 'https://fakeimg.pl/200x200?text=Company';

  const formatDistance = (date) => {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: enUS,
    });
  };

  const handleApplyNowClick = () => {
    setShowApplicationModal(true);
  };

  const handleCloseModal = () => {
    setShowApplicationModal(false);
  };

  const redirectToHome = () => {
    navigate('/');
  };

  const capitalize = (str) => {
    if (typeof str !== 'string' || str === null) {
      return '';
    }
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const sanitizedHTML = DOMPurify.sanitize(jobDetails.text);

  return (
    <Layout>
      <div className='job-details-wrapper'>
        {jobDetails ? (
          <div className='job-details'>
            <div className='job-details-header'>
              <div className='company-details'>
                <div className='logo-container'>
                  <img
                    src={jobDetails.logo || placeholderImg}
                    alt='Company Logo'
                    className='img-logo'
                    onError={(e) => {
                      e.target.src = placeholderImg;
                    }}
                  />
                </div>
                <div className='company-info'>
                  <p className='company-name-label'>
                    {jobDetails.company_name}
                  </p>
                  <p className='employee-count'>
                    {jobDetails.company_num_employees}
                  </p>
                </div>
              </div>
              <button className='apply-btn' onClick={handleApplyNowClick}>
                Apply Now
              </button>
            </div>
            <div className='job-details-body'>
              <p className='time'>
                {formatDistance(new Date(jobDetails.date_posted))}
              </p>

              <h2>{jobDetails.role}</h2>
              <span className='job-type'>
                {capitalize(jobDetails.employment_type)}
              </span>
              <div className='company-location-container'>
                <p className='location'>{jobDetails.location}</p>
                {jobDetails.remote && <p className='remote'>Remote</p>}
              </div>

              <p dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></p>

              {jobDetails.keywords && (
                <div>
                  <strong>Skills</strong>
                  <ul className='skills-list'>
                    {jobDetails.keywords.map((keyword, index) => (
                      <li key={index}>{capitalizeFirstLetter(keyword)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='error-msg-container'>
            <h2 className='job-not-found'>Job details not found</h2>
            <button className='apply-btn' onClick={redirectToHome}>
              Go To Home
            </button>
          </div>
        )}
        {showApplicationModal && <ApplicationForm onClose={handleCloseModal} />}
      </div>
    </Layout>
  );
};

export default JobDetails;
