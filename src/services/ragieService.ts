import { supabase } from '@/integrations/supabase/client';

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
      
      const { data, error } = await supabase.functions.invoke('ragie/retrievals', {
        body: {
          query,
          filter: { scope: "tutorial" },
          rerank: true
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data) {
        throw new Error('No data received from Ragie API');
      }
      
      console.log('Chunks retrieval successful:', data);
      return data;
    } catch (error) {
      console.error('Error retrieving chunks:', error);
      throw error;
    }
  },

  async generateAnswer(query: string) {
    try {
      console.log('Starting answer generation process...');
      
      const { data, error } = await supabase.functions.invoke('ragie/tutorial/generate', {
        body: {
          query,
          rerank: true,
          filter: { scope: "tutorial" }
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data || !data.answer) {
        throw new Error('Invalid response format from Ragie API');
      }
      
      console.log('Answer generation successful:', data);
      return data;
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
      console.log('Attempting to upload document...');
      
      const { data, error } = await supabase.functions.invoke('ragie/documents', {
        body: formData
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data) {
        throw new Error('No data received from Ragie API');
      }
      
      console.log('Document upload successful:', data);
      return data;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  }
};