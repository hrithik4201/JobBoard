import React, { useState } from 'react';
import Layout from '../components/Layout';
import JobList from '../components/JobList';
import '../styles/Home.css';

const Home = () => {
  const programmingLanguages = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'C#',
    'Ruby',
    'Swift',
    'Kotlin',
    'TypeScript',
    'Go',
  ];

  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <Layout>
      <div className='home-container'>
        <label className='dropdown-label' htmlFor='language'>
          <h2>Select a programming language:</h2>
        </label>
        <select
          className='dropdown-menu'
          id='language'
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value=''>Choose a language</option>
          {programmingLanguages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
        {selectedLanguage && <JobList selectedLanguage={selectedLanguage} />}
      </div>
    </Layout>
  );
};

export default Home;
