import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ragieService } from "@/services/ragieService";

interface Message {
  content: string;
  isUser: boolean;
}

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([{
    content: "Hello! I'm your AI legal research assistant. How can I help you with Nigerian law today?",
    isUser: false
  }]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { content: message, isUser: true }]);
    setIsLoading(true);

    try {
      if (!import.meta.env.VITE_RAGIE_API_KEY) {
        throw new Error('Ragie API key is not configured');
      }

      const response = await ragieService.generateAnswer(message);
      
      if (!response || !response.answer) {
        throw new Error('Invalid response from Ragie API');
      }

      setMessages(prev => [...prev, { 
        content: response.answer, 
        isUser: false 
      }]);
      
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please check your API key configuration and try again.",
        variant: "destructive"
      });
      
      // Add error message to chat
      setMessages(prev => [...prev, { 
        content: "I apologize, but I encountered an error processing your request. Please try again or contact support if the issue persists.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`bg-white p-4 rounded-lg shadow-sm max-w-[80%] ${
                msg.isUser ? "ml-auto bg-primary/10" : ""
              }`}
            >
              <p className="text-sm text-gray-800">{msg.content}</p>
            </div>
          ))}
          {isLoading && (
            <div className="bg-white p-4 rounded-lg shadow-sm max-w-[80%]">
              <p className="text-sm text-gray-500">Thinking...</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4 bg-white">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;