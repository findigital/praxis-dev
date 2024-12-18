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
  chunks?: Array<{
    text: string;
    score: number;
  }>;
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
      // First get relevant chunks
      const chunksResponse = await ragieService.retrieveChunks(message);
      console.log('Retrieved chunks:', chunksResponse);

      // Then get the generated answer
      const response = await ragieService.generateAnswer(message);
      
      if (!response || !response.answer) {
        throw new Error('Invalid response from Ragie API');
      }

      setMessages(prev => [...prev, { 
        content: response.answer, 
        isUser: false,
        chunks: chunksResponse.scored_chunks.map(chunk => ({
          text: chunk.text,
          score: chunk.score
        }))
      }]);
      
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again or contact support if the issue persists.",
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
            <div key={index}>
              <div className={`bg-white p-4 rounded-lg shadow-sm max-w-[80%] ${
                msg.isUser ? "ml-auto bg-primary/10" : ""
              }`}>
                <p className="text-sm text-gray-800">{msg.content}</p>
              </div>
              
              {/* Show retrieved chunks if available */}
              {!msg.isUser && msg.chunks && msg.chunks.length > 0 && (
                <div className="mt-2 space-y-2">
                  <p className="text-xs text-gray-500 font-medium">Retrieved from:</p>
                  {msg.chunks.map((chunk, chunkIndex) => (
                    <div key={chunkIndex} className="bg-gray-50 p-2 rounded text-xs text-gray-600">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-400">Relevance: {(chunk.score * 100).toFixed(1)}%</span>
                      </div>
                      {chunk.text}
                    </div>
                  ))}
                </div>
              )}
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