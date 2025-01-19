import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const ApiService = {
  getSessions: async () => {
    return await axios.get(`${BASE_URL}/get_sessions/`);
  },

  getVote: async () => {
    return await axios.get(`${BASE_URL}/get_vote/`);
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
