const STACK_AI_URL = "https://api.stack-ai.com/inference/v0/run/876e4adb-f918-4c45-870c-dd8f937f81e1/65e8ed41c1eab4f37ce059cb";

export const ragieService = {
  generateAnswer: async (message: string) => {
    try {
      const response = await fetch(STACK_AI_URL, {
        method: "POST",
        headers: {
          "Authorization": "Bearer b615fa22-65f3-4593-bb9a-32a0a177be4c",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "user_id": "default-user",
          "in-0": message
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Stack AI Response:", data);
      
      // Return the response from the "out-0" field, or a default message if not found
      return data["out-0"] || "I couldn't generate a response at this time.";
    } catch (error) {
      console.error("Error generating answer:", error);
      throw error;
    }
  }
};