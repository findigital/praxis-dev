
import { supabase } from "@/integrations/supabase/client";

export const ragieService = {
  generateAnswer: async (message: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-legal-response', {
        body: { message },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (error) {
        console.error("Legal Response Error:", error);
        throw error;
      }

      console.log("Legal Response:", data);
      return data.response;
    } catch (error) {
      console.error("Error generating answer:", error);
      throw error;
    }
  }
};
