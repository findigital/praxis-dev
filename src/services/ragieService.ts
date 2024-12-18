import axios from 'axios';

const RAGIE_API_BASE_URL = 'https://api.ragie.ai';

export const ragieService = {
  async generateAnswer(query: string) {
    try {
      const response = await axios.post(
        `${RAGIE_API_BASE_URL}/tutorial/generate`,
        {
          query,
          rerank: true,
          filter: { scope: "tutorial" }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_RAGIE_API_KEY}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error generating answer:', error);
      throw error;
    }
  }
};