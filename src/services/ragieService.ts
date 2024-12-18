import axios from 'axios';

const SUPABASE_PROJECT_ID = 'zfeipxfyvimsjbsljpvc';
const EDGE_FUNCTION_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/ragie`;

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
      console.log('Attempting to retrieve chunks...');
      
      const response = await axios.post(
        `${EDGE_FUNCTION_URL}/retrievals`,
        {
          query,
          filter: { scope: "tutorial" },
          rerank: true
        }
      );
      
      console.log('Chunks retrieval successful:', response.status);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error retrieving chunks:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      } else {
        console.error('Error retrieving chunks:', error);
      }
      throw error;
    }
  },

  async generateAnswer(query: string) {
    try {
      console.log('Starting answer generation process...');
      
      const response = await axios.post(
        `${EDGE_FUNCTION_URL}/tutorial/generate`,
        {
          query,
          rerank: true,
          filter: { scope: "tutorial" }
        }
      );
      
      console.log('Answer generation successful:', response.status);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error generating answer:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      } else {
        console.error('Error generating answer:', error);
      }
      throw error;
    }
  },

  async uploadDocument(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify({ scope: "tutorial" }));
    formData.append('mode', 'fast');

    try {
      console.log('Attempting to upload document...');
      
      const response = await axios.post(
        `${EDGE_FUNCTION_URL}/documents`,
        formData,
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      );
      
      console.log('Document upload successful:', response.status);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error uploading document:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      } else {
        console.error('Error uploading document:', error);
      }
      throw error;
    }
  }
};