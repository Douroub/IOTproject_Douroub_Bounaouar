import React, { useState, useEffect } from 'react';
import ApiService from '../services/apiservice';

function Vote() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchVote = async () => {
      try {
        const response = await ApiService.getVote();
        setQuestion(response.data.question);
        setOptions(response.data.options);
      } catch (error) {
        console.error('Error fetching vote:', error);
      }
    };

    fetchVote();
  }, []);

  const handleVote = async (option) => {
    try {
      await ApiService.submitVote({ selected_option: option });
      alert('Vote submitted successfully!');
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{question}</h1>
      {options.map((option, index) => (
        <button key={index} onClick={() => handleVote(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default Vote;
