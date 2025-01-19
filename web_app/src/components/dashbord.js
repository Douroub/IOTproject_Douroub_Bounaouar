import React, { useState, useEffect } from 'react';
import ApiService from '../services/apiservice';

function Dashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await ApiService.getSessions();
        setSessions(response.data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <ul>
        {sessions.map((session) => (
          <li key={session.session_id}>
            Session ID: {session.session_id} - Status: {session.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
