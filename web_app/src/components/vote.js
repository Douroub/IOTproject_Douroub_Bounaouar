import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../services/apiservice';

function Vote() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { sessionId } = location.state || {};

  useEffect(() => {
    const fetchVote = async () => {
      try {
        const response = await ApiService.getVote(sessionId);
        setQuestion(response.data.question);
        setOptions(response.data.options);
      } catch (error) {
        console.error('Erreur lors du chargement du vote :', error);
      }
    };

    fetchVote();
  }, [sessionId]);

  const handleVoteSubmit = async () => {
    if (!selectedOption) {
      alert('Veuillez sélectionner une option.');
      return;
    }

    try {
      await ApiService.submitVote({ sessionId, selected_option: selectedOption });
      alert('Votre vote a été soumis avec succès !');
      navigate('/dashboard'); // Retourne au tableau de bord après le vote
    } catch (error) {
      console.error('Erreur lors de la soumission du vote :', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Vote</h1>
      <p>{question}</p>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`option-${index}`}
            name="vote"
            value={option}
            onChange={() => setSelectedOption(option)}
          />
          <label htmlFor={`option-${index}`}>{option}</label>
        </div>
      ))}
      <button onClick={handleVoteSubmit} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Soumettre le vote
      </button>
    </div>
  );
}

export default Vote;
