import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

import '../styles/JobCard.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedJob } from '../redux/slices/jobSlice';

const JobCard = ({
  role,
  employmentType,
  location,
  remote,
  logo,
  name,
  date,
  jobId,
}) => {
  const dispatch = useDispatch();

  const placeholderImg = 'https://fakeimg.pl/200x200?text=Company';

  const postedDate = new Date(date);
  const relativeTime = formatDistanceToNow(postedDate, {
    addSuffix: true,
    locale: enUS,
  });

  const logoSrc = logo || placeholderImg;

  const handleJobCardClick = () => {
    dispatch(
      setSelectedJob({
        jobId,
        role,
        employmentType,
        location,
        remote,
        logo,
        name,
        date,
      })
    );
  };

  const capitalize = (str) => {
    if (typeof str !== 'string' || str === null) {
      return '';
    }
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  const capitalizedEmploymentType = capitalize(employmentType);

  return (
    <div className='job-card' onClick={handleJobCardClick}>
      <div className='company-logo-container'>
        <img
          className='company-logo'
          src={logoSrc}
          alt='Company Logo'
          onError={(e) => {
            e.target.src = placeholderImg;
          }}
        />
      </div>
      <div className='job-card-body'>
        <div>
          <div className='timeline-wrapper'>
            <span className='time'>{relativeTime}</span>
            <br />
            <span className='job-type'>{capitalizedEmploymentType}</span>
          </div>
          <h2 className='job-role'>
            <Link to={`/job/${jobId}`} className='job-card-link'>
              {role}
            </Link>
          </h2>
          <p className='company-name'>{name}</p>
        </div>
        <p className='location'>{location}</p>
        {remote && <p className='remote'>Remote</p>}
      </div>
    </div>
  );
};

export default JobCard;
