import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setJobList } from '../redux/slices/jobSlice';
import JobCard from './JobCard';
import '../styles/JobList.css';
import Loader from './Loader';

const JobList = ({ selectedLanguage }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.job.jobList);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = process.env.REACT_APP_API_TOKEN;
        const apiUrl =
          process.env.REACT_APP_PROXY_URL +
          encodeURIComponent(
            `${process.env.REACT_APP_API_BASE_URL}?search=${selectedLanguage}`
          );

        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching job data');
        }

        const data = await response.json();
        // Delay the dispatch by 5 seconds
        setTimeout(() => {
          dispatch(
            setJobList(data.results.map((job) => ({ ...job, id: job.id })))
          );
          setLoading(false);
        }, 5000);
      } catch (error) {
        console.error('Error fetching job data:', error.message);
        setError('Error fetching job data. Please try again later.');
        setLoading(false);
      }
    };

    if (selectedLanguage) {
      fetchJobs();
    }
  }, [dispatch, selectedLanguage]);

  return (
    <div className='joblist-container'>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className='job-list'>
          {jobs.map((job) => (
            <li key={job.id}>
              <JobCard
                name={job.company_name}
                role={job.role}
                employmentType={job.employment_type}
                location={job.location}
                remote={job.remote}
                logo={job.logo}
                date={job.date_posted}
                jobId={job.id}
                noOfEmployee={job.company_num_employees}
                text={job.text}
                keywords={job.keywords}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;
