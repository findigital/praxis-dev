import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ragieService } from "@/services/ragieService";

interface Message {
  content: string;
  isUser: boolean;
}

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([{
    content: "Hello! I'm your AI assistant. How can I help you today?",
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
      const response = await ragieService.generateAnswer(message);
      setMessages(prev => [...prev, { content: response, isUser: false }]);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
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
              className={`${
                msg.isUser 
                  ? "ml-auto bg-primary text-primary-foreground" 
                  : "bg-muted"
              } p-4 rounded-lg shadow-sm max-w-[80%]`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          ))}
          {isLoading && (
            <div className="bg-muted p-4 rounded-lg shadow-sm max-w-[80%]">
              <p className="text-sm text-muted-foreground">Thinking...</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
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