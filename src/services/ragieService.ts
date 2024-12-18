import axios from 'axios';

const RAGIE_API_BASE_URL = 'https://api.ragie.ai';
const RAGIE_API_KEY = import.meta.env.VITE_RAGIE_API_KEY;

if (!RAGIE_API_KEY) {
  console.error('RAGIE_API_KEY is not set in environment variables');
}

interface ScoredChunk {
  text: string;
  score: number;
  document_id: string;
  document_metadata: Record<string, any>;
}

interface RetrievalResponse {
  scored_chunks: ScoredChunk[];
}

export const ragieService = {
  async retrieveChunks(query: string): Promise<RetrievalResponse> {
    try {
      const response = await axios.post(
        `${RAGIE_API_BASE_URL}/retrievals`,
        {
          query,
          filter: { scope: "tutorial" },
          rerank: true
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RAGIE_API_KEY}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error retrieving chunks:', error);
      throw error;
    }
  },

  async generateAnswer(query: string) {
    try {
      // First retrieve relevant chunks
      const chunks = await this.retrieveChunks(query);
      console.log('Retrieved chunks:', chunks); // Helpful for debugging

      // Then generate answer using the tutorial endpoint
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
            'Authorization': `Bearer ${RAGIE_API_KEY}`
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
            'Authorization': `Bearer ${RAGIE_API_KEY}`
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