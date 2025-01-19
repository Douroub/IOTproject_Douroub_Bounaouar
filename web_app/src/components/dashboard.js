import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/apiservice';

function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await ApiService.getSessions();
        setSessions(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des sessions :', error);
      }
    };

    fetchSessions();
  }, []);

  const handleSessionClick = (sessionId) => {
    navigate('/vote', { state: { sessionId } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tableau de bord</h1>
      <p>Bienvenue ! Veuillez sélectionner une session de vote :</p>
      <ul>
        {sessions.map((session) => (
          <li
            key={session.session_id}
            style={{ cursor: 'pointer', margin: '10px 0' }}
            onClick={() => handleSessionClick(session.session_id)}
          >
            Session ID: {session.session_id} - Statut: {session.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
