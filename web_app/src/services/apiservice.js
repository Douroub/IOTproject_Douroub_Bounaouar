import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const ApiService = {
  getSessions: async () => {
    return await axios.get(`${BASE_URL}/get_sessions/`);
  },

  getVote: async (sessionId) => {
    return await axios.get(`${BASE_URL}/get_vote/`, { params: { sessionId } });
  },

  submitVote: async (voteData) => {
    return await axios.post(`${BASE_URL}/submit_vote/`, voteData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};

export default ApiService;
