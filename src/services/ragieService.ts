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
  },

  async uploadDocument(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify({ scope: "tutorial" }));
    formData.append('mode', 'fast');

    try {
      const response = await axios.post(
        `${RAGIE_API_BASE_URL}/documents`,
        formData,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_RAGIE_API_KEY}`,
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  }
};